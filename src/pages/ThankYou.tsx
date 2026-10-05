import React from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWhatsApp } from '@/components/WhatsAppProvider';

const ThankYou = () => {
  const { openWhatsApp } = useWhatsApp();
  return (
    <main className="min-h-screen bg-gold flex items-center justify-center p-4">
      <section className="w-full max-w-xl rounded-2xl bg-background p-8 md:p-12 text-center shadow-lift">
        <img src="/img/logo-h96.webp" width={126} height={96} alt="Natalia Grando Uniformes Corporativos" className="h-20 w-auto mx-auto" />
        <CheckCircle2 className="w-14 h-14 text-success mx-auto mt-8" aria-hidden />
        <h1 className="mt-5 text-3xl md:text-4xl font-bold text-ink">Solicitação recebida</h1>
        <p className="mt-4 text-lg text-muted-foreground">Obrigada pelo contato. Nossa equipe analisará seus dados e entrará em contato em breve.</p>
        <Button onClick={() => openWhatsApp('pagina_obrigado')} size="lg" className="mt-8 h-12">
          <MessageCircle className="w-5 h-5 mr-2" aria-hidden /> Conversar no WhatsApp
        </Button>
        <p className="mt-5"><a href="/" className="text-sm font-medium text-olive-deep underline underline-offset-4">Voltar ao site</a></p>
      </section>
    </main>
  );
};

export default ThankYou;