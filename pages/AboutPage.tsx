import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Banner */}
      <section className="bg-brand-secondary py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-brand-primary">About Thamel Mart</h1>
          <p className="text-brand-text mt-2 max-w-2xl mx-auto">Connecting you with the heart and soul of Himalayan craftsmanship.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-brand-background">
        <div className="container mx-auto px-4 space-y-16">
          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-text mb-4">Our Story</h2>
              <p className="text-brand-muted mb-4 leading-relaxed">
                Thamel Mart was born from a deep love for the rich cultural heritage of Nepal and the Himalayas. Our journey began in the bustling, vibrant streets of Thamel, Kathmandu, where every corner holds a story and every craft is a testament to centuries of tradition.
              </p>
              <p className="text-brand-muted leading-relaxed">
                We wanted to create a bridge between the talented artisans of this region and a global audience that appreciates authentic, handmade treasures. We are more than just a marketplace; we are a community dedicated to preserving ancient crafts and supporting the livelihoods of the artisans who create them.
              </p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1547297992-a9a7a0f76de8?q=80&w=2070&auto=format&fit=crop" alt="Artisan hands" className="rounded-lg shadow-lg"/>
            </div>
          </div>

          {/* Our Philosophy */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-serif font-bold text-brand-text mb-4">Our Philosophy</h2>
              <p className="text-brand-muted mb-4 leading-relaxed">
                Our philosophy is rooted in authenticity, quality, and fairness. We work directly with artisans and small cooperatives, ensuring that each product is not only of the highest quality but also ethically sourced.
              </p>
              <ul className="list-disc list-inside text-brand-muted space-y-2">
                <li><strong>Authenticity:</strong> Every item in our collection is a genuine piece of Himalayan art.</li>
                <li><strong>Fair Trade:</strong> We are committed to fair wages and ethical practices that empower our artisan partners.</li>
                <li><strong>Sustainability:</strong> We encourage the use of traditional methods and sustainable materials.</li>
              </ul>
            </div>
            <div className="md:order-1">
              <img src="https://images.unsplash.com/photo-1600271573436-13a22b7a0b5a?q=80&w=1974&auto=format&fit=crop" alt="Himalayan landscape" className="rounded-lg shadow-lg"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;
