
import React from 'react';
import { Users, Scissors, Shirt, ShoppingCart, CheckCircle, Package, BarChart3, RotateCcw, Ruler, Award } from 'lucide-react';

const Differentials = () => {
  const differentials = [
    {
      title: "Qualidade Premium",
      subtitle: "Materiais e acabamentos superiores",
      items: [
        { icon: <Ruler className="w-4 h-4" />, text: "Grade de tamanhos do 34 ao 62" },
        { icon: <Scissors className="w-4 h-4" />, text: "Costuras premium que não desfiam" },
        { icon: <Shirt className="w-4 h-4" />, text: "Tecidos de alta qualidade" }
      ],
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Processo Facilitado",
      subtitle: "Experiência simplificada do início ao fim",
      items: [
        { icon: <ShoppingCart className="w-4 h-4" />, text: "Loja virtual para pedidos" },
        { icon: <CheckCircle className="w-4 h-4" />, text: "Aprovação de peças piloto (físicas ou digitais)" },
        { icon: <Package className="w-4 h-4" />, text: "Entrega por kits personalizados por colaborador" }
      ],
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Pós-venda",
      subtitle: "Suporte contínuo e relatórios completos",
      items: [
        { icon: <BarChart3 className="w-4 h-4" />, text: "Relatórios gerenciais dos pedidos" },
        { icon: <Users className="w-4 h-4" />, text: "Consultoria para medição da equipe" },
        { icon: <RotateCcw className="w-4 h-4" />, text: "Reposição facilitada" }
      ],
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="py-16 bg-white font-inter relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#ECE08A]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#62624C]/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#ECE08A]/20 px-4 py-2 rounded-full mb-6">
            <Award className="w-5 h-5 text-[#62624C]" />
            <span className="text-sm font-medium text-[#62624C]">Nossos diferenciais</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1B1B0C] mb-4">
            Por que escolher a Natalia Grando?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combinamos qualidade premium, processo simplificado e suporte completo
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {differentials.map((differential, index) => (
            <div key={index} className="group">
              <div className={`${differential.bgColor} p-8 rounded-2xl border-2 border-transparent hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}>
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${differential.gradient}`}></div>
                
                {/* Icon background */}
                <div className={`w-12 h-12 bg-gradient-to-r ${differential.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Award className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-[#1B1B0C] mb-2 group-hover:text-[#62624C] transition-colors">
                  {differential.title}
                </h3>
                
                <p className="text-sm text-gray-500 mb-6 font-medium">
                  {differential.subtitle}
                </p>
                
                <ul className="space-y-3">
                  {differential.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start group/item">
                      <div className="flex-shrink-0 p-1 bg-white rounded-lg shadow-sm mr-3 group-hover/item:shadow-md transition-shadow">
                        <span className="text-green-500">{item.icon}</span>
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed group-hover/item:text-gray-900 transition-colors">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional trust section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#62624C]/5 to-[#ECE08A]/10 p-8 rounded-2xl border border-[#ECE08A]/30">
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#62624C]">+500</div>
                <div className="text-sm text-gray-600">Empresas atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#62624C]">45 dias</div>
                <div className="text-sm text-gray-600">Prazo de entrega</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#62624C]">2x</div>
                <div className="text-sm text-gray-600">Mais durabilidade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#62624C]">100%</div>
                <div className="text-sm text-gray-600">Satisfação garantida</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
