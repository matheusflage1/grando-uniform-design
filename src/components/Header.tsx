import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scrollToForm } from '@/lib/track';
import { useWhatsApp } from './WhatsAppProvider';

const links = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#faq', label: 'FAQ' },
];

const Header = () => {
  const { openWhatsApp } = useWhatsApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled ? 'bg-cream/85 backdrop-blur-md shadow-card' : 'bg-gold'
      )}
    >
      <div className={cn('container mx-auto flex items-center justify-between gap-4 px-4 md:px-6 transition-all duration-300', scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20')}>
        <a href="#topo" aria-label="Natalia Grando — início" className="shrink-0">
          <img
            src="/img/logo-h96.webp"
            srcSet="/img/logo-h96.webp 1x, /img/logo-h192.webp 2x"
            width={53}
            height={40}
            alt="Natalia Grando Uniformes Corporativos"
            className={cn('w-auto transition-all duration-300', scrolled ? 'h-9 md:h-11' : 'h-10 md:h-14')}
          />
        </a>

        <nav aria-label="Seções" className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink/80 hover:text-ink transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => openWhatsApp('header')}
            className="hidden md:inline-flex h-11 border-olive bg-transparent text-olive-deep hover:bg-olive hover:text-primary-foreground"
          >
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden />
            WhatsApp
          </Button>
          <Button onClick={() => scrollToForm('header')} className="h-11 px-4 md:px-5 font-semibold">
            <span className="md:hidden">Orçamento</span>
            <span className="hidden md:inline">Solicitar orçamento</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
