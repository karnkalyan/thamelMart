import React from 'react';
import { useDataStore } from '../../store/dataStore';

const TrustedBySection: React.FC = () => {
    const settings = useDataStore(state => state.settings.trustedBy);

    if (!settings) return null;

    return (
        <section className="py-16 bg-brand-footer">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold text-center mb-12 text-brand-primary">{settings.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {(settings.items || []).map((item) => (
                        <div key={item.name} className="text-center group">
                            <div className="aspect-square rounded-lg overflow-hidden mb-4">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <h3 className="font-semibold text-brand-primary">{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBySection;
