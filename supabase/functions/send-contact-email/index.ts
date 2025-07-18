import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";
import { Resend } from "npm:resend@2.0.0";

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData: ContactFormData = await req.json();
    
    // Sanitize input data to prevent XSS
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
        .trim();
    };

    const formData: ContactFormData = {
      nome: sanitizeInput(rawData.nome),
      email: sanitizeInput(rawData.email),
      telefone: sanitizeInput(rawData.telefone),
      funcionarios: sanitizeInput(rawData.funcionarios),
      estado: sanitizeInput(rawData.estado)
    };
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Save data to natalia table
    const { error: dbError } = await supabase
      .from("natalia")
      .insert([formData]);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Erro ao salvar dados no banco");
    }

    // Send email to Natalia
    const emailResponse = await resend.emails.send({
      from: "Formulário Natália Grando <onboarding@resend.dev>",
      to: ["matheusfonsecalage@gmail.com"],
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
          
          <p style="color: #666; font-size: 14px;">
            Esta mensagem foi enviada através do formulário de contato do site.
          </p>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Email error:", emailResponse.error);
      throw new Error("Erro ao enviar email");
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Dados salvos e email enviado com sucesso!" 
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
        error: error.message || "Erro interno do servidor" 
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