import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { track } from '@/lib/track';

export const faqs = [
  { q: 'Qual é o pedido mínimo?', a: 'O pedido mínimo é de 60 peças, com até 3 modelos diferentes na primeira compra. Atendemos melhor empresas com mais de 10 colaboradores.' },
  { q: 'Qual é o prazo de entrega?', a: 'O prazo médio é de 45 dias úteis e varia conforme o tamanho do pedido. O prazo combinado tem garantia de cumprimento.' },
  { q: 'Quais tamanhos vocês produzem?', a: 'Trabalhamos com grade ampla, do 34 ao 62, e ajudamos na medição da equipe para acertar os tamanhos antes da produção.' },
  { q: 'Posso aprovar uma peça antes da produção?', a: 'Sim. Enviamos uma peça piloto física ou digital para aprovação antes de produzir o pedido.' },
  { q: 'Como funcionam as reposições?', a: 'Os modelos não saem de linha, então você pode repor peças mantendo o mesmo padrão. A loja virtual exclusiva facilita novos pedidos.' },
  { q: 'Como os uniformes são entregues?', a: 'Entregamos no endereço da empresa, organizados em kits individuais por colaborador.' },
];

const FAQ = () => (
  <section id="faq" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
      <h2 className="text-[28px] md:text-[40px] font-bold text-ink text-center reveal">Perguntas frequentes</h2>
      <Accordion
        type="single"
        collapsible
        className="mt-8 reveal"
        onValueChange={(v) => v && track('faq_open', { question: v })}
      >
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-ink min-h-[48px]">{f.q}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
