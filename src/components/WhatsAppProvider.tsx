import React, { createContext, useCallback, useContext, useState } from 'react';
import WhatsAppPopup from './WhatsAppPopup';
import { track } from '@/lib/track';

export const WHATSAPP_LINK =
  'https://wa.me/555433831351?text=Quero%20fazer%20or%C3%A7amento%20de%20uniformes%20corporativos%20para%20minha%20empresa';

const Ctx = createContext<{ openWhatsApp: (source: string) => void }>({ openWhatsApp: () => {} });

export const WhatsAppProvider = ({ children }: { children: React.ReactNode }) => {
  const [source, setSource] = useState<string | null>(null);

  const openWhatsApp = useCallback((src: string) => {
    track('cta_click', { source: src, target: 'whatsapp_modal' });
    track('whatsapp_modal_open', { source: src });
    // Existing Google Ads "Lead" conversion when the popup opens
    if (typeof window.gtag_report_conversion_lead === 'function') window.gtag_report_conversion_lead();
    setSource(src);
  }, []);

  return (
    <Ctx.Provider value={{ openWhatsApp }}>
      {children}
      <WhatsAppPopup
        isOpen={source !== null}
        source={source ?? ''}
        onClose={() => setSource(null)}
        whatsappLink={WHATSAPP_LINK}
      />
    </Ctx.Provider>
  );
};

export const useWhatsApp = () => useContext(Ctx);
