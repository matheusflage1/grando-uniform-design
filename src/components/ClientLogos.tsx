
import React from 'react';

const ClientLogos = () => {
  const clients = [
    { src: "/lovable-uploads/6eea3808-94c5-49cf-ad90-4a3c089bd34c.png", alt: "Cliente 1" },
    { src: "/lovable-uploads/9bc7fe96-eaa0-4479-bea1-35d9e573c7f9.png", alt: "Cliente 2" },
    { src: "/lovable-uploads/12884885-02de-450b-9ad1-610077e721ea.png", alt: "Cliente 3" },
    { src: "/lovable-uploads/fd84a10e-de84-425f-a262-0f418492b22c.png", alt: "Cliente 4" },
    { src: "/lovable-uploads/6eea3808-94c5-49cf-ad90-4a3c089bd34c.png", alt: "Cliente 5" },
    { src: "/lovable-uploads/9bc7fe96-eaa0-4479-bea1-35d9e573c7f9.png", alt: "Cliente 6" }
  ];

  // Duplicamos o array para criar o efeito de loop infinito
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-12 bg-gray-50 font-inter overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative">
          <div className="flex animate-scroll-infinite">
            {duplicatedClients.map((client, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <img 
                  src={client.src} 
                  alt={client.alt} 
                  className="h-16 w-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
