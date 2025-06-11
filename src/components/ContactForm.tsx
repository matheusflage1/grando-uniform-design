
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

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

  const benefits = [
    "Orçamento sem compromisso",
    "Atendimento personalizado",
    "Resposta em até 24h",
    "Consultoria gratuita"
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white font-inter relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#ECE08A]/10 rounded-full blur-3xl -translate-x-36 -translate-y-36"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#62624C]/5 rounded-full blur-3xl translate-x-32 translate-y-32"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#ECE08A]/20 px-4 py-2 rounded-full mb-6">
              <Mail className="w-5 h-5 text-[#62624C]" />
              <span className="text-sm font-medium text-[#62624C]">Entre em contato</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B1B0C] mb-4">
              Pronto para transformar os uniformes da sua empresa?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Solicite seu orçamento personalizado e descubra como podemos ajudar sua empresa
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Form section */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#62624C] to-[#ECE08A]"></div>
              
              <div className="text-center mb-8">
                <img 
                  src="/lovable-uploads/4376058e-6435-4383-808e-6c861f93344c.png" 
                  alt="Natalia Grando Logo" 
                  className="h-28 mx-auto mb-6"
                />
                <h3 className="text-2xl font-bold text-[#1B1B0C] mb-2">
                  Solicite seu orçamento
                </h3>
                <p className="text-gray-600">
                  Preencha os dados e nossa equipe entrará em contato
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="nome"
                  placeholder="Nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="E-mail corporativo"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all"
                />
                <Input
                  type="tel"
                  name="telefone"
                  placeholder="Telefone / WhatsApp"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all"
                />
                <Input
                  type="text"
                  name="funcionarios"
                  placeholder="Número de funcionários"
                  value={formData.funcionarios}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all"
                />
                <Input
                  type="text"
                  name="estado"
                  placeholder="Estado da empresa"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#62624C] focus:border-transparent transition-all"
                />
                
                <Button 
                  type="submit"
                  className="w-full bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Enviar solicitação
                </Button>
              </form>

              {/* Benefits list */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-[#1B1B0C] mb-3 text-center">O que você ganha:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Image and contact info section */}
            <div className="space-y-8">
              {/* Image */}
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#62624C]/10 rounded-2xl blur-sm"></div>
                <img 
                  src="/lovable-uploads/e978153f-3136-45f9-98ad-4f6ad0dc4617.png" 
                  alt="Uniformes Profissionais" 
                  className="w-full h-80 object-cover rounded-2xl shadow-xl relative z-10"
                />
              </div>

              {/* Contact information */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="font-semibold text-[#1B1B0C] mb-4 text-center">Outras formas de contato</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-[#62624C] rounded-lg">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1B1B0C]">WhatsApp</p>
                      <p className="text-sm text-gray-600">(55) 5433-831351</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-[#62624C] rounded-lg">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1B1B0C]">E-mail</p>
                      <p className="text-sm text-gray-600">contato@nataliagrando.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-[#62624C] rounded-lg">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1B1B0C]">Localização</p>
                      <p className="text-sm text-gray-600">Rio Grande do Sul</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
