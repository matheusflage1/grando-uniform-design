
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Shield, Truck, Repeat } from 'lucide-react';

const WorkProcess = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=555433831351&text=Quero+fazer+or%C3%A7amento+de+uniformes+corporativos+para+minha+empresa&type=phone_number&app_absent=0";

  const steps = [
    {
      icon: <div className="text-4xl">🧩</div>,
      lucideIcon: <Shield className="w-6 h-6" />,
      title: "Projeto Sob Medida",
      description: "Desenvolvemos um projeto com sugestão de modelos, tecidos e orçamento com base nas necessidades da equipe.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <div className="text-4xl">📏</div>,
      lucideIcon: <Clock className="w-6 h-6" />,
      title: "Medição e Aprovação",
      description: "Facilitamos a medição da equipe e a escolha dos tamanhos para garantir conforto e segurança antes da produção.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <div className="text-4xl">🚚</div>,
      lucideIcon: <Truck className="w-6 h-6" />,
      title: "Produção e Entrega Rápida",
      description: "Entrega direta no endereço corporativo. Prazo médio: 45 dias úteis.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <div className="text-4xl">♻️</div>,
      lucideIcon: <Repeat className="w-6 h-6" />,
      title: "Reposições Garantidas",
      description: "Peças não saem de catálogo. Mantemos padronização e suporte para novas demandas.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#FAF9F4] to-white font-inter relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#62624C] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#ECE08A] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block p-2 bg-[#ECE08A]/20 rounded-full mb-4">
            <div className="w-8 h-1 bg-[#62624C] rounded-full"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1B1B0C] mb-4">
            Como Trabalhamos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Um processo transparente e eficiente para garantir os melhores resultados
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`}></div>
                
                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-[#ECE08A]/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-[#62624C]">{index + 1}</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  {step.icon}
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${step.color} text-white`}>
                    {step.lucideIcon}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-[#1B1B0C] mb-3 group-hover:text-[#62624C] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#FFF5CC] to-[#ECE08A]/30 border border-[#ECE08A]/50 p-8 rounded-2xl text-center shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#62624C]/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Shield className="w-5 h-5 text-[#62624C]" />
                <span className="text-sm font-medium text-[#1B1B0C]">Garantia de qualidade</span>
              </div>
              
              <p className="text-lg font-semibold text-[#1B1B0C] mb-2">
                Pedido mínimo: 60 peças (até 3 modelos diferentes)
              </p>
              <p className="text-gray-700 mb-2">
                Ideal para empresas com mais de 10 funcionários
              </p>
              <p className="text-sm font-bold text-[#1B1B0C] bg-white/50 inline-block px-3 py-1 rounded-full">
                Prazo de entrega com garantia de cumprimento
              </p>
            </div>
            
            <Button 
              asChild 
              className="bg-[#62624C] hover:bg-[#4e4e3c] text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                FALE COM UM CONSULTOR
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
