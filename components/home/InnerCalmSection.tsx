import React from 'react';
import Button from '../ui/Button';
import { useDataStore } from '../../store/dataStore';

const InnerCalmSection = () => {
  const settings = useDataStore(state => state.settings.innerCalm);

  if (!settings) return null;

  return (
    <section className="py-20 bg-brand-secondary text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="uppercase tracking-widest text-sm mb-2 text-brand-primary">{settings.subtitle}</p>
        <h2 className="text-4xl font-serif font-bold text-brand-primary mb-4">{settings.title}</h2>
        <p className="text-brand-text mb-6">
          {settings.text1}
        </p>
        <p className="text-brand-text mb-8">
            {settings.text2}
        </p>
        <Button as="a" href={settings.buttonLink} variant="outline" className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white">
          {settings.buttonText}
        </Button>
      </div>
    </section>
  );
};

export default InnerCalmSection;