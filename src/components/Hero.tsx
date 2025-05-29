
import React from 'react';
import { Button } from '@/components/ui/button';
import ClientLogos from './ClientLogos';

const Hero = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=555433831351&text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa&type=phone_number&app_absent=0";

  return (
    <section className="pt-32 bg-gradient-to-r from-[#CECED1] to-[#E8E8EA] font-inter">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-12">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1B1B0C] leading-tight">
              Uniformes corporativos de alta durabilidade e qualidade.
            </h1>
            <p className="text-xl text-[#1B1B0C] font-semibold">
              Duram até 2x mais que os tradicionais.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Solicite seu orçamento
              </a>
            </Button>
          </div>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/525fb8fe-e0b1-44bd-b579-5eaadae77deb.png" 
              alt="Uniformes Profissionais" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Client Logos moved here */}
        <ClientLogos />
      </div>
      
      <div className="bg-white py-16">
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
