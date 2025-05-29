
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WorkProcess from '../components/WorkProcess';
import Differentials from '../components/Differentials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WorkProcess />
      <Differentials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
