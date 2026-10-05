import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useWhatsApp } from './WhatsAppProvider';

const StickyCTA = () => {
  const { openWhatsApp } = useWhatsApp();
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('topo');
    const form = document.getElementById('orcamento');
    const ios: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0 });
      io.observe(hero); ios.push(io);
    }
    if (form) {
      const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 });
      io.observe(form); ios.push(io);
    }
    return () => ios.forEach((i) => i.disconnect());
  }, []);

  const show = pastHero && !formVisible;

  return (
    <>
      {/* Mobile bottom bar */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 bottom-0 z-40 bg-cream/95 backdrop-blur border-t border-border px-4 pt-3 transition-transform duration-300',
          show ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        aria-hidden={!show}
      >
        <Button onClick={() => openWhatsApp('sticky_mobile')} tabIndex={show ? 0 : -1} className="w-full h-12 font-semibold">
          <MessageCircle className="w-5 h-5 mr-2" aria-hidden />
          WhatsApp
        </Button>
      </div>

      {/* Desktop floating button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => openWhatsApp('floating_desktop')}
            aria-label="Fale com um consultor no WhatsApp"
            className={cn(
              'hidden md:grid fixed bottom-6 right-6 z-40 place-items-center w-14 h-14 rounded-full bg-success text-primary-foreground shadow-lift transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40',
              pastHero ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            <MessageCircle className="w-6 h-6" aria-hidden />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">Fale com um consultor</TooltipContent>
      </Tooltip>
    </>
  );
};

export default StickyCTA;
