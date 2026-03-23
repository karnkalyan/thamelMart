import React from 'react';
import Button from '../ui/Button';
import { useDataStore } from '../../store/dataStore';

const HandcraftedSection = () => {
    const settings = useDataStore(state => state.settings.handcrafted);

    if (!settings) return null;

    return (
        <section className="relative h-[60vh] bg-cover bg-center text-white" style={{ backgroundImage: `url('${settings.image}')` }}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-2">{settings.title}</h2>
                <p className="text-lg md:text-xl mb-8">{settings.subtitle}</p>
                <Button as="a" href={settings.buttonLink} variant="outline" className="border-white text-white hover:bg-white/20 backdrop-blur-sm">
                    {settings.buttonText}
                </Button>
            </div>
        </section>
    );
};

export default HandcraftedSection;