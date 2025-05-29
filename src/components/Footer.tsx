
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Se está rolando para baixo, esconde o footer
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        // Se está rolando para cima ou está no topo, mostra o footer
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      
      // Limpa o timeout anterior
      clearTimeout(timeoutId);
      
      // Mostra o footer após parar de rolar por 2 segundos
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return (
    <footer 
      className={`py-12 bg-[#ECE08A] font-inter transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
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
