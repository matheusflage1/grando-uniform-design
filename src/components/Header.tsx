
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const whatsappLink = "https://api.whatsapp.com/send/?phone=555433831351&text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa&type=phone_number&app_absent=0";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 w-full bg-[#ECE08A] shadow-sm z-50 font-inter transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex justify-between lg:justify-center items-center relative px-6 lg:px-6">
        <div className="flex items-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <img 
            src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" 
            alt="Natalia Grando Logo" 
            className="h-28"
          />
        </div>
        <Button 
          asChild 
          className="bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-6 py-3 rounded-lg transition-colors lg:absolute lg:right-6"
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
