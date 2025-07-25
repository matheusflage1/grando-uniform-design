import React from 'react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
const Header = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=555433831351&text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa&type=phone_number&app_absent=0";
  return <header className="w-full bg-gradient-to-br from-[#ECE08A] via-[#ECE08A] to-[#F5F1A0] shadow-sm z-50 font-inter py-[49px]">
      <div className="flex justify-between lg:justify-center items-center relative px-6 lg:px-6">
        <div className="flex items-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <img src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" alt="Natalia Grando Logo" className="h-36 object-fill" />
        </div>
        <Button asChild className="bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-6 py-3 rounded-lg transition-colors lg:absolute lg:right-6">
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
            Solicitar Orçamento
          </a>
        </Button>
      </div>
    </header>;
};
export default Header;