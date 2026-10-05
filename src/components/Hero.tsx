import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, MessageCircle, Star } from 'lucide-react';
import { useWhatsApp } from './WhatsAppProvider';

const bullets = ['Pedido a partir de 60 peças', 'Grade do 34 ao 62', 'Entrega em ~45 dias úteis'];

const Hero = () => {
  const { openWhatsApp } = useWhatsApp();
  return (
    <section id="topo" className="bg-gold overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-[55fr_45fr] gap-6 lg:gap-10 items-end">
        <div className="pt-6 pb-2 lg:py-20 space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-olive-deep text-olive-deep" />
              ))}
            </div>
            <span className="text-sm font-medium text-ink">+500 empresas atendidas</span>
          </div>

          <h1 className="text-[40px] leading-[1.08] md:text-[56px] font-bold text-ink">
            Uniformes corporativos que duram até <span className="text-olive-deep underline decoration-olive/40 decoration-4 underline-offset-4">2x mais</span>.
          </h1>

          <p className="text-lg text-ink/85">Tecidos e costuras premium para sua equipe vestir bem por mais tempo.</p>

          <ul className="space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-ink font-medium">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-olive text-primary-foreground shrink-0">
                  <Check className="w-3.5 h-3.5" aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="pt-1">
            <Button
              size="lg"
              onClick={() => openWhatsApp('hero')}
              className="w-full sm:w-auto h-14 px-8 text-base font-semibold shadow-lift"
            >
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden />
              Falar no WhatsApp
            </Button>
            <p className="mt-3 text-sm text-ink/75">Resposta em até 24h úteis • Sem compromisso</p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src="/img/hero-800.webp"
            srcSet="/img/hero-480.webp 480w, /img/hero-800.webp 800w, /img/hero-1100.webp 1100w"
            sizes="(min-width: 1024px) 45vw, 100vw"
            width={1172}
            height={1250}
            alt="Homem e mulher vestindo camisas jeans e calças sociais de uniforme corporativo Natalia Grando"
            ref={(node) => node?.setAttribute('fetchpriority', 'high')}
            className="w-full max-w-[520px] h-[340px] lg:h-auto object-cover object-top lg:object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
