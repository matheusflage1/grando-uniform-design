import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  nome: string;
  email: string;
  telefone: string;
  funcionarios: string;
  estado: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Contact form submission received');
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key for rate limiting
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get client IP address for rate limiting
    const getClientIP = () => {
      const xForwardedFor = req.headers.get('x-forwarded-for');
      if (xForwardedFor) {
        // Take the first IP from the comma-separated list
        return xForwardedFor.split(',')[0].trim();
      }
      return req.headers.get('x-real-ip') || '127.0.0.1';
    };
    
    const clientIP = getClientIP();

    const rawData: ContactFormData = await req.json();
    console.log('Received data for processing');
    
    // Enhanced sanitization function
    const sanitizeInput = (input: string | undefined | null): string => {
      if (!input || typeof input !== 'string') {
        return '';
      }
      return input
        .replace(/[<>'"&]/g, (match) => {
          const htmlEntities: { [key: string]: string } = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '&': '&amp;'
          };
          return htmlEntities[match] || match;
        })
        .trim()
        .substring(0, 500); // Limit length to prevent abuse
    };

    const formData: ContactFormData = {
      nome: sanitizeInput(rawData.nome),
      email: sanitizeInput(rawData.email),
      telefone: sanitizeInput(rawData.telefone),
      funcionarios: sanitizeInput(rawData.funcionarios),
      estado: sanitizeInput(rawData.estado)
    };

    // Validate required fields
    if (!formData.nome || !formData.email || !formData.telefone || 
        !formData.funcionarios || !formData.estado) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.error('Invalid email format');
      return new Response(
        JSON.stringify({ error: 'Formato de email inválido' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check rate limits using database function
    console.log('Checking rate limits for IP:', clientIP);
    const { data: rateLimitCheck, error: rateLimitError } = await supabase
      .rpc('check_contact_form_rate_limit', { 
        client_ip: clientIP, 
        client_email: formData.email 
      });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      return new Response(
        JSON.stringify({ error: 'Erro interno do servidor' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!rateLimitCheck) {
      console.log('Rate limit exceeded for IP:', clientIP);
      return new Response(
        JSON.stringify({ error: 'Muitas solicitações. Tente novamente em 1 hora.' }), 
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Log the submission for rate limiting (using service role key)
    const { error: logError } = await supabase
      .rpc('log_contact_submission', { 
        client_ip: clientIP, 
        client_email: formData.email 
      });

    if (logError) {
      console.error('Error logging submission:', logError);
      // Continue anyway - logging failure shouldn't block the submission
    }

    // Save data to natalia table
    console.log('Inserting data into database');
    const { error: dbError } = await supabase
      .from("natalia")
      .insert([formData]);

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar dados' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Send email to Natalia
    console.log('Sending email notification');
    try {
      const emailResponse = await resend.emails.send({
        from: "Formulário Natália Grando <onboarding@resend.dev>",
        to: ["comercial@nataliagrando.com.br"],
        subject: "Nova solicitação de orçamento",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #62624C; margin-bottom: 20px;">Nova Solicitação de Orçamento</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1B1B0C; margin-top: 0;">Dados do Cliente:</h3>
              
              <p><strong>Nome:</strong> ${formData.nome}</p>
              <p><strong>E-mail:</strong> ${formData.email}</p>
              <p><strong>Telefone:</strong> ${formData.telefone}</p>
              <p><strong>Número de funcionários:</strong> ${formData.funcionarios}</p>
              <p><strong>Estado:</strong> ${formData.estado}</p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>IP do Cliente:</strong> ${clientIP}<br>
                <strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Esta mensagem foi enviada através do formulário de contato do site com proteção anti-spam ativada.
            </p>
          </div>
        `,
      });

      if (emailResponse.error) {
        console.error("Email error:", emailResponse.error);
        // Don't fail the request if email fails - data is already saved
      } else {
        console.log("Email sent successfully:", emailResponse);
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails - data is already saved
    }

    console.log('Contact form submission completed successfully');
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Solicitação enviada com sucesso!" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erro interno do servidor" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);