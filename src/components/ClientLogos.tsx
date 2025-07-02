
import React from 'react';

const ClientLogos = () => {
  const clients = [
    { src: "/lovable-uploads/806bf8db-52cb-4d59-852e-cd2c5258a08a.png", alt: "Unimed" },
    { src: "/lovable-uploads/4a68a2f5-2e72-4838-9aa7-730a0cb492ad.png", alt: "Mackenzie" },
    { src: "/lovable-uploads/7489014b-7cd6-45b0-bc89-e7d3f815e367.png", alt: "Sicoob" },
    { src: "/lovable-uploads/f9e80f0a-ec77-4f82-9647-d59140e506b0.png", alt: "Dasa" },
    { src: "/lovable-uploads/884ffccb-325d-4fb6-a081-ab51b4f18ff6.png", alt: "Sicredi" },
    { src: "/lovable-uploads/cb7c2ce0-0d00-4b91-88e2-52f5c6907529.png", alt: "Bourbon" },
    { src: "/lovable-uploads/269dffbe-9b5c-49a6-91a9-0dcca8f15133.png", alt: "RAR" },
    { src: "/lovable-uploads/ab7cb13d-d692-4f8b-af47-c85e07e60dae.png", alt: "Unisinos" }
  ];

  // Duplicate the clients array for infinite scroll effect
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="py-6">
      {/* Desktop version */}
      <div className="hidden md:flex justify-center items-center gap-12 flex-wrap">
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

      {/* Mobile version - infinite scroll */}
      <div className="md:hidden overflow-hidden">
        <div className="flex animate-scroll-infinite gap-8">
          {duplicatedClients.map((client, index) => (
            <div key={index} className="flex-shrink-0">
              <img 
                src={client.src} 
                alt={client.alt} 
                className="h-16 w-auto opacity-70 grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
