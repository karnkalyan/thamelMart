
import React from 'react';
import { Instagram, Facebook } from '../Icons';
import { useSettingsStore, SUPPORTED_CURRENCIES } from '../../store/settingsStore';
import { useDataStore } from '../../store/dataStore';
import type { Currency } from '../../types';

const TopBar = () => {
  const { currency, setCurrency } = useSettingsStore();
  const { settings } = useDataStore();

  return (
    <div className="bg-brand-primary text-white text-[10px] sm:text-xs border-b border-stone-800">
      <div className="container mx-auto px-4 h-9 flex items-center justify-between overflow-hidden">
        <div className="flex-1 flex justify-start items-center">
            <div className="flex space-x-4">
              {settings.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-secondary transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-secondary transition-colors">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
            <p className="w-full text-center uppercase tracking-[0.15em] font-medium transition-all">
              {settings.promoText}
            </p>
        </div>

        <div className="flex-1 flex justify-end items-center">
          <div className="relative group">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent appearance-none cursor-pointer focus:outline-none pr-4 font-semibold uppercase tracking-widest hover:text-brand-secondary transition-colors"
              aria-label="Select currency"
            >
              {SUPPORTED_CURRENCIES.map((curr) => (
                <option key={curr} value={curr} className="text-brand-text">
                  {curr}
                </option>
              ))}
            </select>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
