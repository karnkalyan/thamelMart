
import React from 'react';
import { useDataStore } from '../../store/dataStore';

const MarqueeSection = () => {
    const { settings } = useDataStore();
    
    const MarqueeText = () => (
        <span className="font-semibold uppercase tracking-wider text-sm mx-4">
            {settings.marqueeText}
        </span>
    );

    return (
        <section className="py-4 bg-brand-footer overflow-hidden">
            <div className="relative flex overflow-x-hidden text-brand-primary">
                <div className="animate-marquee whitespace-nowrap">
                    <MarqueeText />
                    <MarqueeText />
                    <MarqueeText />
                </div>
                 <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
                    <MarqueeText />
                    <MarqueeText />
                    <MarqueeText />
                </div>
            </div>
             <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                 @keyframes marquee2 {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee2 {
                    animation: marquee2 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default MarqueeSection;
