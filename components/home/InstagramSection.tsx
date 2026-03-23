import React from 'react';
import { useDataStore } from '../../store/dataStore';

const InstagramSection = () => {
    const settings = useDataStore(state => state.settings.instagram);

    if (!settings) return null;

    return (
        <section className="py-16 bg-brand-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold text-center mb-8">{settings.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {(settings.images || []).map((src, index) => (
                        <a href="#" key={index} className="group block overflow-hidden aspect-square">
                            <img src={src} alt={`Instagram post ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramSection;
