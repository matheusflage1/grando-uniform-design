import React from 'react';

const clients = ['Unimed', 'Mackenzie', 'Sicoob', 'Dasa', 'Sicredi', 'Bourbon', 'RAR', 'Unisinos'];

const LogoSet = ({ hidden = false }: { hidden?: boolean }) => (
  <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
    {clients.map((name, i) => (
      <li key={name} className="shrink-0">
        <img
          src={`/img/cliente-${i}.webp`}
          alt={hidden ? '' : `Logo ${name}`}
          width={170}
          height={80}
          loading="lazy"
          decoding="async"
          className="h-14 md:h-16 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
        />
      </li>
    ))}
  </ul>
);

const ClientLogos = () => (
  <section aria-labelledby="clientes-title" className="bg-background py-8 md:py-10 border-b border-border">
    <h2 id="clientes-title" className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-5">
      Empresas que vestem Natalia Grando
    </h2>
    <div
      className="group overflow-hidden"
      style={{ maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}
    >
      <div className="flex w-max animate-scroll-infinite-mobile md:animate-scroll-infinite group-hover:[animation-play-state:paused]">
        <LogoSet />
        <LogoSet hidden />
      </div>
    </div>
  </section>
);

export default ClientLogos;
