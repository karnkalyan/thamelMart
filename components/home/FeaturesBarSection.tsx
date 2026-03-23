
import React from 'react';
import { useDataStore } from '../../store/dataStore';

const FeatureItem: React.FC<{ icon: string, text: string }> = ({ icon, text }) => (
    <div className="text-center px-4">
        <img src={icon} alt="" className="mx-auto h-12 w-12 mb-4 object-contain" />
        <p className="text-sm text-brand-muted">{text}</p>
    </div>
);

const FeaturesBarSection = () => {
    const features = useDataStore(state => state.settings.features);

    if (!features || features.length === 0) return null;

    return (
        <section className="bg-brand-footer py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureItem key={idx} icon={feature.icon} text={feature.text} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesBarSection;
