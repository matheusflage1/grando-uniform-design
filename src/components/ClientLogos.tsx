
import React from 'react';

const ClientLogos = () => {
  const clients = [
    { src: "/lovable-uploads/6eea3808-94c5-49cf-ad90-4a3c089bd34c.png", alt: "UniCred" },
    { src: "/lovable-uploads/9bc7fe96-eaa0-4479-bea1-35d9e573c7f9.png", alt: "Bunge" },
    { src: "/lovable-uploads/12884885-02de-450b-9ad1-610077e721ea.png", alt: "InterCity Hotels" },
    { src: "/lovable-uploads/fd84a10e-de84-425f-a262-0f418492b22c.png", alt: "Central IT" }
  ];

  return (
    <section className="py-12 bg-gray-50 font-inter">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {clients.map((client, index) => (
            <img 
              key={index}
              src={client.src} 
              alt={client.alt} 
              className="h-12 lg:h-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
