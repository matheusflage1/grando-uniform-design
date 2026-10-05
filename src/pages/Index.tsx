import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import Segments from '../components/Segments';
import WorkProcess from '../components/WorkProcess';
import Differentials, { Stats } from '../components/Differentials';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import StickyCTA from '../components/StickyCTA';
import { track } from '@/lib/track';

const Index = () => {
  useEffect(() => {
    const revealed = new WeakSet<Element>();
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !revealed.has(entry.target)) {
          entry.target.classList.add('is-visible');
          revealed.add(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    let hit50 = false;
    let hit90 = false;
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0) return;
      const progress = window.scrollY / available;
      if (!hit50 && progress >= 0.5) { hit50 = true; track('scroll_50'); }
      if (!hit90 && progress >= 0.9) { hit90 = true; track('scroll_90'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { revealObserver.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ClientLogos />
        <Segments />
        <WorkProcess />
        <Differentials />
        <Stats />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;