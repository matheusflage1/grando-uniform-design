import React from 'react';
import { Button } from '@/components/ui/button';
import ClientLogos from './ClientLogos';
import { CheckCircle, Star } from 'lucide-react';
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
const Hero = () => {
  const whatsappLink = "https://wa.me/555433831351?text=Quero%20fazer%20or%C3%A7amento%20de%20uniformes%20corporativos%20para%20minha%20empresa";
  return <section className="pt-8 bg-gradient-to-br from-[#ECE08A] via-[#ECE08A] to-[#F5F1A0] font-inter relative overflow-hidden py-0">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#62624C]/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center pb-0">
          <div className="space-y-6">
            {/* Trust indicators */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm font-medium text-[#1B1B0C]/80">+500 empresas atendidas</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[#1B1B0C] leading-tight">
              Uniformes corporativos de <span className="text-[#62624C]">alta durabilidade</span> e qualidade.
            </h1>
            
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-sm">
              <p className="text-xl text-[#1B1B0C] font-semibold mb-3">
                Confecção de uniformes empresariais que duram até 2x mais que os tradicionais.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-[#1B1B0C]/80 text-sm">Uniformes personalizados para empresas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-[#1B1B0C]/80">Vestuário de trabalho industrial</span>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-md">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => {
              if (typeof window.gtag !== 'undefined') {
                window.gtag('event', 'conversion', {
                  'send_to': 'AW-11200620047/6tpRCMqZ16YYEI_M79wp'
                });
              }
            }}>
                Solicite seu orçamento
              </a>
            </Button>
          </div>
          
          <div className="flex justify-center relative">
            <img src="/lovable-uploads/844ce183-22a2-46d6-9be3-3630503e47ee.png" alt="Uniformes profissionais corporativos - Fardas de trabalho personalizadas para empresas - Natalia Grando Confecções" className="w-4/5 h-auto" />
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
                Fábrica de uniformes profissionais — especializada em soluções corporativas personalizadas.
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Confecções de uniformes empresariais com foco em tecidos de alta qualidade, 
              fardamento feminino e masculino, uniformes industriais e vestuário de trabalho 
              que beneficiam tanto sua empresa quanto seus colaboradores.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;