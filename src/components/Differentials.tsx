
import React from 'react';
import { Users, Scissors, Shirt, ShoppingCart, CheckCircle, Package, BarChart3, RotateCcw, Ruler } from 'lucide-react';

const Differentials = () => {
  const differentials = [
    {
      title: "Qualidade Premium",
      items: [
        { icon: <Ruler className="w-4 h-4" />, text: "Grade de tamanhos do 34 ao 62" },
        { icon: <Scissors className="w-4 h-4" />, text: "Costuras premium que não desfiam" },
        { icon: <Shirt className="w-4 h-4" />, text: "Tecidos de alta qualidade" }
      ]
    },
    {
      title: "Processo Facilitado",
      items: [
        { icon: <ShoppingCart className="w-4 h-4" />, text: "Loja virtual para pedidos" },
        { icon: <CheckCircle className="w-4 h-4" />, text: "Aprovação de peças piloto (físicas ou digitais)" },
        { icon: <Package className="w-4 h-4" />, text: "Entrega por kits personalizados por colaborador" }
      ]
    },
    {
      title: "Pós-venda",
      items: [
        { icon: <BarChart3 className="w-4 h-4" />, text: "Relatórios gerenciais dos pedidos" },
        { icon: <Users className="w-4 h-4" />, text: "Consultoria para medição da equipe" },
        { icon: <RotateCcw className="w-4 h-4" />, text: "Reposição facilitada" }
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
                    <span className="text-green-500 mr-2 mt-1">{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
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
