
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    funcionarios: '',
    estado: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Formulário enviado com sucesso! Entraremos em contato em breve.');
    setFormData({ nome: '', email: '', telefone: '', funcionarios: '', estado: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 bg-gray-50 font-inter">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <img 
              src="/lovable-uploads/ba16b65e-acda-4529-a800-823145226d7b.png" 
              alt="Natalia Grando Logo" 
              className="h-16 mx-auto mb-6"
            />
            <h2 className="text-3xl font-bold text-[#1B1B0C] mb-4">
              Fale conosco
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Solicite seu orçamento agora e leve a qualidade premium para sua empresa!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
              <Input
                type="tel"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
              <Input
                type="text"
                name="funcionarios"
                placeholder="Número de funcionários"
                value={formData.funcionarios}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
              <Input
                type="text"
                name="estado"
                placeholder="Estado da empresa"
                value={formData.estado}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
              <Button 
                type="submit"
                className="w-full bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold py-4 rounded-lg text-lg"
              >
                Enviar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
