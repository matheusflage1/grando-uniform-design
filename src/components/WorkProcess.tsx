
import React from 'react';
import { Button } from '@/components/ui/button';

const WorkProcess = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=555433831351&text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa&type=phone_number&app_absent=0";

  const steps = [
    {
      icon: "🧩",
      title: "Projeto Sob Medida",
      description: "Desenvolvemos um projeto com sugestão de modelos, tecidos e orçamento com base nas necessidades da equipe."
    },
    {
      icon: "📏",
      title: "Medição e Aprovação",
      description: "Facilitamos a medição da equipe e a escolha dos tamanhos para garantir conforto e segurança antes da produção."
    },
    {
      icon: "🚚",
      title: "Produção e Entrega Rápida",
      description: "Entrega direta no endereço corporativo. Prazo médio: 45 dias úteis."
    },
    {
      icon: "♻️",
      title: "Reposições Garantidas",
      description: "Peças não saem de catálogo. Mantemos padronização e suporte para novas demandas."
    }
  ];

  return (
    <section className="py-16 bg-[#FAF9F4] font-inter">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1B1B0C] mb-4">
            Como Trabalhamos
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-[#1B1B0C] mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#FFF5CC] border-l-4 border-[#ECE08A] p-8 rounded-lg text-center">
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#1B1B0C] mb-2">
              Pedido mínimo: 60 peças (até 3 modelos diferentes)
            </p>
            <p className="text-gray-700 mb-4">
              Ideal para empresas com mais de 10 funcionários
            </p>
            <p className="text-sm font-bold text-[#1B1B0C]">
              Prazo de entrega com garantia de cumprimento
            </p>
          </div>
          <Button 
            asChild 
            className="bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-8 py-3 rounded-lg"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              FALE COM UM CONSULTOR
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
