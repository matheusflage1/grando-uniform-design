import React from 'react';
import Footer from '@/components/Footer';

const Privacy = () => (
  <div className="min-h-screen bg-cream">
    <header className="bg-gold py-4">
      <a href="/" aria-label="Voltar à página inicial" className="container mx-auto px-4 md:px-6 block">
        <img src="/img/logo-h96.webp" width={126} height={96} alt="Natalia Grando Uniformes Corporativos" className="h-14 w-auto" />
      </a>
    </header>
    <main className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-3xl">
      <h1 className="text-3xl md:text-5xl font-bold text-ink">Política de Privacidade</h1>
      <div className="mt-8 space-y-7 text-muted-foreground leading-relaxed">
        <section><h2 className="text-xl font-semibold text-ink">Dados coletados</h2><p className="mt-2">Coletamos os dados informados nos formulários de orçamento e contato, como nome, empresa, e-mail, telefone, estado, segmento e tamanho da equipe.</p></section>
        <section><h2 className="text-xl font-semibold text-ink">Finalidade</h2><p className="mt-2">Usamos essas informações para analisar a solicitação, preparar propostas comerciais e entrar em contato sobre uniformes corporativos.</p></section>
        <section><h2 className="text-xl font-semibold text-ink">Armazenamento e proteção</h2><p className="mt-2">Os dados são armazenados com acesso restrito e medidas de segurança compatíveis com a finalidade do atendimento comercial.</p></section>
        <section><h2 className="text-xl font-semibold text-ink">Seus direitos</h2><p className="mt-2">Você pode solicitar acesso, correção ou exclusão dos seus dados pelo e-mail comercial@nataliagrando.com.br.</p></section>
        <section><h2 className="text-xl font-semibold text-ink">Cookies e métricas</h2><p className="mt-2">O site utiliza ferramentas de medição para entender interações e acompanhar conversões de campanhas.</p></section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;