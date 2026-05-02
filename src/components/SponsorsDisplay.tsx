import React, { useState } from 'react';

const SponsorsDisplay = () => {
  // Placeholder logos - replace with actual sponsor logos
  const sponsors = [
    { id: 1, name: 'Sponsor 1', logo: '/src/assets/sponsor1.png', description: 'Description for Sponsor 1' },
    { id: 2, name: 'Sponsor 2', logo: '/src/assets/sponsor2.png', description: 'Description for Sponsor 2' },
    { id: 3, name: 'Sponsor 3', logo: '/src/assets/sponsor3.png', description: 'Description for Sponsor 3' },
    { id: 4, name: 'Sponsor 4', logo: '/src/assets/sponsor4.png', description: 'Description for Sponsor 4' },
    { id: 5, name: 'Sponsor 5', logo: '/src/assets/sponsor5.png', description: 'Description for Sponsor 5' },
    { id: 6, name: 'Sponsor 6', logo: '/src/assets/sponsor6.png', description: 'Description for Sponsor 6' },
  ];

  const [hoveredSponsor, setHoveredSponsor] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Sponsors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are grateful to our sponsors for their support in making Jatra 2026 possible.
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredSponsor(sponsor.id)}
              onMouseLeave={() => setHoveredSponsor(null)}
              onTouchStart={() => setHoveredSponsor(sponsor.id)}
              onTouchEnd={() => setHoveredSponsor(null)}
            >
              {/* Logo Container */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 group-hover:scale-105">
                {/* Placeholder for logo - replace with actual image */}
                <div className="text-2xl font-bold text-gray-400">
                  {sponsor.name}
                </div>
                {/* Uncomment and use actual logo */}
                {/* <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain p-2" /> */}
              </div>

              {/* Pop-up on hover/touch */}
              {hoveredSponsor === sponsor.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg z-10 whitespace-nowrap">
                  {sponsor.description}
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Interested in becoming a sponsor?</p>
          <a
            href="/sponsor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#fca311] hover:bg-[#e08e0b] text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
};

export default SponsorsDisplay;