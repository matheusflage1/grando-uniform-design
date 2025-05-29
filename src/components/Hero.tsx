
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=555433831351&text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa&type=phone_number&app_absent=0";

  return (
    <section className="pt-24 bg-[#ECE08A] font-inter min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
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
          <div className="flex justify-center h-full">
            <img 
              src="/lovable-uploads/2368c040-635f-4c4d-ad03-30011f0af2f8.png" 
              alt="Uniformes Profissionais" 
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
