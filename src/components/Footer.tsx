import React from 'react';
import { Link } from 'react-router-dom';
import { track } from '@/lib/track';

const Footer = () => (
  <footer className="bg-ink text-primary-foreground pb-24 md:pb-0">
    <div className="container mx-auto px-4 md:px-6 py-12 grid gap-8 md:grid-cols-3 items-start">
      <div className="inline-flex rounded-xl bg-gold p-3 w-fit">
        <img src="/img/logo-h96.webp" srcSet="/img/logo-h96.webp 1x, /img/logo-h192.webp 2x" width={126} height={96} loading="lazy" alt="Natalia Grando Uniformes Corporativos" className="h-16 w-auto" />
      </div>
      <div className="space-y-1.5 text-sm text-primary-foreground/85">
        <p className="font-semibold text-primary-foreground">Formidabili Brasil Uniformes Corporativos Ltda</p>
        <p>CNPJ 86.794.534/0001-52</p>
        <p>Espumoso/RS</p>
      </div>
      <div className="space-y-1.5 text-sm text-primary-foreground/85">
        <p>Segunda a Sexta, das 9h às 18h</p>
        <p>
          <a href="mailto:comercial@nataliagrando.com.br" onClick={() => track('click_email')} className="underline underline-offset-4 hover:text-primary-foreground">
            comercial@nataliagrando.com.br
          </a>
        </p>
        <p><Link to="/privacidade" className="underline underline-offset-4 hover:text-primary-foreground">Política de Privacidade</Link></p>
      </div>
    </div>
    <p className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/70">
      © {new Date().getFullYear()} Natalia Grando. Todos os direitos reservados.
    </p>
  </footer>
);

export default Footer;
