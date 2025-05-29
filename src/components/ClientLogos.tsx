
import React from 'react';

const ClientLogos = () => {
  const clients = [
    { src: "/lovable-uploads/b1d7426f-07a1-4759-9576-63cba2af27a7.png", alt: "Felice" },
    { src: "/lovable-uploads/2bf53af5-57c1-48af-b2b9-a6446ae8c6a0.png", alt: "Bunge" },
    { src: "/lovable-uploads/23bb6955-9be2-4e15-9fbb-5a36f5badf32.png", alt: "Central IT" },
    { src: "/lovable-uploads/2670d8cf-0345-4a29-8af3-b7ca0180cbac.png", alt: "Intercity Hotels" },
    { src: "/lovable-uploads/4ed3793c-ab99-4452-8b40-26943aff24ed.png", alt: "Unicred" },
    { src: "/lovable-uploads/aeeef78c-2260-428c-a59e-76329d5594cb.png", alt: "Iochpe-Maxion" }
  ];

  return (
    <div className="py-6">
      <div className="flex justify-center items-center gap-12 flex-wrap">
        {clients.map((client, index) => (
          <div key={index} className="flex-shrink-0">
            <img 
              src={client.src} 
              alt={client.alt} 
              className="h-24 w-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
