
import React from 'react';
import { Button } from '@/components/ui/button';
import ClientLogos from './ClientLogos';
import { CheckCircle, Star } from 'lucide-react';

const Hero = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=555433831351&text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa&type=phone_number&app_absent=0";

  return (
    <section className="pt-8 bg-gradient-to-br from-[#ECE08A] via-[#ECE08A] to-[#F5F1A0] font-inter relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#62624C]/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center pb-0">
          <div className="space-y-6">
            {/* Trust indicators */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#1B1B0C]/80">+500 empresas atendidas</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[#1B1B0C] leading-tight">
              Uniformes corporativos de <span className="text-[#62624C]">alta durabilidade</span> e qualidade.
            </h1>
            
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-sm">
              <p className="text-xl text-[#1B1B0C] font-semibold mb-3">
                Duram até 2x mais que os tradicionais.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-[#1B1B0C]/80">Entrega média em 45 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-[#1B1B0C]/80">Mínimo de 60 peças</span>
                </div>
              </div>
            </div>

            <Button 
              asChild 
              size="lg"
              className="bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Solicite seu orçamento
              </a>
            </Button>
          </div>
          
          <div className="flex justify-center relative">
            <img 
              src="/lovable-uploads/844ce183-22a2-46d6-9be3-3630503e47ee.png" 
              alt="Casal usando uniformes corporativos" 
              className="w-4/5 h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Client Logos with white background */}
      <div className="bg-white py-4 w-full border-t border-gray-200">
        <div className="text-center mb-2">
          <p className="text-sm font-medium text-[#1B1B0C]/70">Empresas que confiam em nosso trabalho</p>
        </div>
        <ClientLogos />
      </div>
      
      <div className="bg-white py-6 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B1B0C] mb-6">
              <span className="animate-text-color">
                Seus uniformes não precisam ser um problema — precisam ser uma solução.
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Com foco total na escolha de tecidos de alta qualidade e acabamentos impecáveis, 
              evitamos reposições recorrentes e entregamos uniformes que beneficiam tanto sua 
              empresa quanto seus colaboradores.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
