
import React from 'react';

const Differentials = () => {
  const differentials = [
    {
      title: "Qualidade Premium",
      items: [
        "Grade de tamanhos do 34 ao 62",
        "Costuras premium que não desfiam",
        "Tecidos de alta qualidade"
      ]
    },
    {
      title: "Processo Facilitado",
      items: [
        "Loja virtual para pedidos",
        "Aprovação de peças piloto (físicas ou digitais)",
        "Entrega por kits personalizados por colaborador"
      ]
    },
    {
      title: "Pós-venda",
      items: [
        "Relatórios gerenciais dos pedidos",
        "Consultoria para medição da equipe",
        "Reposição facilitada"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white font-inter">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1B1B0C]">
            Diferenciais
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {differentials.map((differential, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border-l-4 border-[#62624C] shadow-sm">
              <h3 className="text-xl font-semibold text-[#1B1B0C] mb-4">
                {differential.title}
              </h3>
              <ul className="space-y-2">
                {differential.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
