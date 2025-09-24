import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut, Shield } from 'lucide-react';
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    gtag_report_conversion: (url?: string) => boolean;
  }
}
const Header = () => {
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();
  const whatsappLink = "https://wa.me/555433831351?text=Quero%20fazer%20or%C3%A7amento%20de%20uniformes%20corporativos%20para%20minha%20empresa";
  const handleSignOut = async () => {
    await signOut();
  };
  return <header className="w-full bg-gradient-to-br from-[#ECE08A] via-[#ECE08A] to-[#F5F1A0] shadow-sm z-50 font-inter py-[0px]">
      <div className="flex justify-between lg:justify-center items-center relative px-6 lg:px-6">
        <div className="flex items-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <img src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" alt="Natalia Grando Logo" className="h-36 object-fill" />
        </div>
        
        <div className="flex items-center space-x-3 lg:absolute lg:right-6">
          {user ? <>
              {isAdmin && <Button asChild variant="outline" className="border-[#62624C] text-[#62624C] hover:bg-[#62624C] hover:text-white">
                  <Link to="/admin">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </Button>}
              <Button onClick={handleSignOut} variant="outline" className="border-[#62624C] text-[#62624C] hover:bg-[#62624C] hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </> : <Button asChild variant="outline" className="border-[#62624C] text-[#62624C] hover:bg-[#62624C] hover:text-white mr-3">
              
            </Button>}
          
          <Button asChild className="bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={(e) => {
            e.preventDefault();
            if (typeof window.gtag_report_conversion !== 'undefined') {
              window.gtag_report_conversion(whatsappLink);
            } else {
              window.open(whatsappLink, '_blank');
            }
          }}>
              Solicitar Orçamento
            </a>
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;