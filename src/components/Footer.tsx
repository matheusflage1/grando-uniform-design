
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-[#ECE08A] font-inter">
      <div className="container mx-auto px-6 text-center">
        <img 
          src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" 
          alt="Natalia Grando Logo" 
          className="h-20 mx-auto mb-4"
        />
        <div className="text-[#1B1B0C] space-y-2 text-base">
          <p className="font-semibold">
            Telefone: (54) 3383 1351
          </p>
          <p>
            E-mail: comercial@nataliagrando.com.br
          </p>
          <p>
            Atendimento: Segunda a Sexta, das 9h às 18h
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
