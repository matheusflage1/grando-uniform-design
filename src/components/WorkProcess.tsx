import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardList, Ruler, BadgeCheck, PackageCheck, RefreshCcw, Boxes, Users, CalendarCheck, MessageCircle } from 'lucide-react';
import { scrollToForm } from '@/lib/track';
import { useWhatsApp } from './WhatsAppProvider';

const steps = [
  { icon: ClipboardList, title: 'Diagnóstico e proposta', text: 'Sugestão de modelos e tecidos conforme a rotina da equipe.' },
  { icon: Ruler, title: 'Medição da equipe', text: 'Ajudamos na medição e na escolha dos tamanhos.' },
  { icon: BadgeCheck, title: 'Aprovação de amostra', text: 'Peça piloto física ou digital antes da produção.' },
  { icon: PackageCheck, title: 'Produção e entrega', text: 'Kits por colaborador, em ~45 dias úteis.' },
];

const conditions = [
  { icon: Boxes, text: 'Mínimo de 60 peças (até 3 modelos)' },
  { icon: Users, text: 'Ideal para empresas com +10 colaboradores' },
  { icon: CalendarCheck, text: 'Prazo de entrega garantido' },
];

const WorkProcess = () => {
  const { openWhatsApp } = useWhatsApp();
  return (
    <>
      <section id="como-funciona" className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <h2 className="text-[28px] md:text-[40px] font-bold text-ink text-center reveal">Como funciona</h2>

          <ol className="mt-10 md:mt-14 relative grid gap-6 md:grid-cols-4 md:gap-8">
            {/* connecting line */}
            <span aria-hidden className="absolute bg-olive/25 left-6 top-6 bottom-6 w-px md:left-[12.5%] md:right-[12.5%] md:top-6 md:bottom-auto md:h-px md:w-auto" />
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative flex md:flex-col md:items-center md:text-center gap-4 reveal">
                <span className="relative z-10 grid place-items-center w-12 h-12 shrink-0 rounded-full bg-olive text-primary-foreground shadow-card">
                  <Icon className="w-5 h-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-olive-deep">Etapa {i + 1}</p>
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <p className="text-muted-foreground mt-1">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-center gap-5 text-center reveal">
            <p className="inline-flex items-center gap-2 font-medium text-ink">
              <RefreshCcw className="w-4 h-4 text-olive" aria-hidden />
              Reposição garantida — os modelos não saem de linha.
            </p>
            <Button size="lg" onClick={() => scrollToForm('como_funciona')} className="h-12 px-8 font-semibold">
              Solicitar orçamento
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="condicoes-title" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="rounded-2xl bg-gold p-6 md:p-10 shadow-card reveal">
            <h2 id="condicoes-title" className="text-[28px] md:text-[40px] font-bold text-ink">Condições</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {conditions.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 rounded-xl bg-background/70 p-4">
                  <Icon className="w-5 h-5 text-olive-deep shrink-0 mt-0.5" aria-hidden />
                  <span className="font-medium text-ink">{text}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" onClick={() => openWhatsApp('condicoes')} className="mt-6 w-full md:w-auto h-12 px-8 font-semibold">
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden />
              Falar com um consultor
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkProcess;
