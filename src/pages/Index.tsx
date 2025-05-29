
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import Benefits from '../components/Benefits';
import WorkProcess from '../components/WorkProcess';
import Differentials from '../components/Differentials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ClientLogos />
      <Benefits />
      <WorkProcess />
      <Differentials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
