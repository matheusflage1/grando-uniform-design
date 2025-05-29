
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=555433831351&text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa&type=phone_number&app_absent=0";

  return (
    <header className="fixed top-0 w-full bg-[#ECE08A] shadow-sm z-50 font-inter">
      <div className="container mx-auto px-6 py-4 flex justify-center items-center relative">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" 
            alt="Natalia Grando Logo" 
            className="h-20"
          />
        </div>
        <Button 
          asChild 
          className="absolute right-6 bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Solicitar Orçamento
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
