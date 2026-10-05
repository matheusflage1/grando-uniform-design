import React from 'react';
import { HeartPulse, Factory, ShoppingBag, BedDouble, Briefcase, GraduationCap, Handshake, Truck } from 'lucide-react';

const segments = [
  { icon: HeartPulse, label: 'Saúde' },
  { icon: Factory, label: 'Indústria' },
  { icon: ShoppingBag, label: 'Varejo' },
  { icon: BedDouble, label: 'Hotelaria' },
  { icon: Briefcase, label: 'Escritório' },
  { icon: GraduationCap, label: 'Educação' },
  { icon: Handshake, label: 'Cooperativas' },
  { icon: Truck, label: 'Logística' },
];

const Segments = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center reveal">
      <h2 className="text-[28px] md:text-[40px] font-bold leading-tight text-ink">
        Fábrica própria de uniformes, feita para empresas
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Desenvolvemos o uniforme da sua equipe do projeto à entrega: tecidos escolhidos para durar,
        acabamento cuidadoso e modelos que continuam disponíveis para reposição.
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2.5" aria-label="Segmentos atendidos">
        {segments.map(({ icon: Icon, label }) => (
          <li key={label} className="inline-flex items-center gap-2 rounded-full border border-border bg-cream px-4 py-2 text-sm font-medium text-ink">
            <Icon className="w-4 h-4 text-olive" aria-hidden />
            {label}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Segments;
