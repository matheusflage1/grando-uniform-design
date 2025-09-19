import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, CheckCircle, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    funcionarios: '',
    estado: ''
  });
  
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      // Track conversion
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-11200620047/6tpRCMqZ16YYEI_M79wp',
          'user_data': {
            'email_address': formData.email.toLowerCase(),
            'phone_number': formData.telefone,
            'first_name': formData.nome.split(' ')[0],
            'last_name': formData.nome.split(' ').slice(1).join(' ') || ''
          }
        });
      }

      toast.success('Formulário enviado com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        funcionarios: '',
        estado: ''
      });
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const whatsappLink = "https://wa.me/555433831351?text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa";
  
  const benefits = ["Orçamento sem compromisso", "Atendimento personalizado", "Resposta em até 24h", "Consultoria gratuita"];

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white font-inter relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#ECE08A]/10 rounded-full blur-3xl -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#62624C]/5 rounded-full blur-3xl translate-x-32 translate-y-32"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#ECE08A]/20 px-4 py-2 rounded-full mb-6">
                <Mail className="w-5 h-5 text-[#62624C]" />
                <span className="text-sm font-medium text-[#62624C]">Entre em contato</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1B1B0C] mb-4">
                Pronto para transformar os uniformes da sua empresa?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Solicite seu orçamento personalizado e descubra como podemos ajudar sua empresa
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#62624C] to-[#ECE08A]"></div>
                
                <div className="text-center mb-8">
                  <img src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" alt="Natalia Grando Logo" className="h-28 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-[#1B1B0C] mb-2">
                    Solicite seu orçamento
                  </h3>
                  <p className="text-gray-600">
                    Preencha os dados e nossa equipe entrará em contato
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input type="text" name="nome" placeholder="Nome completo" value={formData.nome} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all" />
                  <Input type="email" name="email" placeholder="E-mail corporativo" value={formData.email} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all" />
                  <Input type="tel" name="telefone" placeholder="Telefone / WhatsApp" value={formData.telefone} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all" />
                  <Input type="text" name="funcionarios" placeholder="Número de funcionários" value={formData.funcionarios} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all" />
                  <Input type="text" name="estado" placeholder="Estado da empresa" value={formData.estado} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all" />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar solicitação'}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-[#1B1B0C] mb-3 text-center">O que você ganha:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="relative">
                  <img src="/lovable-uploads/50adb655-c7ac-4ff0-a696-c1494c8f8401.png" alt="Uniformes Profissionais" className="w-full h-80 object-cover" />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-[#1B1B0C] mb-4 text-center">Outras formas de contato</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-[#62624C] rounded-lg">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1B1B0C]">WhatsApp</p>
                        <p className="text-sm text-gray-600">(54) 3383-1351</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-[#62624C] rounded-lg">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1B1B0C]">E-mail</p>
                        <p className="text-sm text-gray-600">comercial@nataliagrando.com.br</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-[#62624C] rounded-lg">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1B1B0C]">Localização</p>
                        <p className="text-sm text-gray-600">Rio Grande do Sul</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#1B1B0C]">
              Obrigado pelo seu interesse!
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Recebemos sua solicitação e entraremos em contato em breve para apresentar nossa proposta personalizada.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 space-y-3">
            <Button 
              asChild 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window.gtag !== 'undefined') {
                    window.gtag('event', 'conversion', {'send_to': 'AW-11200620047/6tpRCMqZ16YYEI_M79wp'});
                  }
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp agora
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setShowSuccessDialog(false)}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl transition-all duration-300"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactForm;
