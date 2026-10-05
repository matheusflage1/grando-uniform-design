import React, { useEffect, useRef, useState } from 'react';
import { Gem, Workflow, LifeBuoy, Check, Store } from 'lucide-react';

const cards = [
  { icon: Gem, title: 'Qualidade premium', items: ['Costuras que não desfiam', 'Tecidos de alta durabilidade', 'Grade do 34 ao 62'] },
  { icon: Workflow, title: 'Processo simplificado', items: ['__store__', 'Aprovação de amostra', 'Entrega em kits individuais'] },
  { icon: LifeBuoy, title: 'Pós-venda', items: ['Relatórios gerenciais', 'Consultoria de medição', 'Reposição facilitada'] },
];

const Differentials = () => (
  <section id="diferenciais" className="py-16 md:py-24 bg-cream">
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <h2 className="text-[28px] md:text-[40px] font-bold text-ink text-center reveal">Diferenciais</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, items }) => (
          <article key={title} className="rounded-2xl bg-card p-6 md:p-8 shadow-card border border-border reveal">
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-gold text-olive-deep">
              <Icon className="w-6 h-6" aria-hidden />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
            <ul className="mt-4 space-y-3">
              {items.map((it) =>
                it === '__store__' ? (
                  <li key={it} className="rounded-xl border border-olive/30 bg-gold-soft p-3">
                    <span className="inline-block rounded-full bg-olive px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">Exclusivo</span>
                    <p className="mt-1.5 flex items-center gap-2 font-semibold text-ink">
                      <Store className="w-4 h-4 text-olive-deep" aria-hidden />
                      Loja virtual para os colaboradores
                    </p>
                  </li>
                ) : (
                  <li key={it} className="flex items-start gap-2.5 text-ink/85">
                    <Check className="w-4 h-4 mt-1 text-olive shrink-0" aria-hidden />
                    {it}
                  </li>
                )
              )}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Counter = ({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1200);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
};

export const Stats = () => (
  <section aria-label="Números" className="py-14 md:py-16 bg-olive text-primary-foreground">
    <dl className="container mx-auto px-4 md:px-6 max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div><dt className="sr-only">Empresas atendidas</dt><dd className="text-4xl md:text-5xl font-bold"><Counter to={500} prefix="+" /></dd><p className="mt-1 text-primary-foreground/85">empresas atendidas</p></div>
      <div><dt className="sr-only">Prazo médio</dt><dd className="text-4xl md:text-5xl font-bold"><Counter to={45} /></dd><p className="mt-1 text-primary-foreground/85">dias úteis de prazo médio</p></div>
      <div><dt className="sr-only">Durabilidade</dt><dd className="text-4xl md:text-5xl font-bold"><Counter to={2} suffix="x" /></dd><p className="mt-1 text-primary-foreground/85">mais durabilidade</p></div>
      <div><dt className="sr-only">Reposição</dt><dd className="text-2xl md:text-3xl font-bold leading-[3rem] md:leading-[3.75rem]">Reposição</dd><p className="mt-1 text-primary-foreground/85">garantida</p></div>
    </dl>
  </section>
);

export default Differentials;
