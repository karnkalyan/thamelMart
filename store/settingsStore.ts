import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Currency } from '../types';

export const SUPPORTED_CURRENCIES: Currency[] = ['NPR', 'USD', 'EUR'];

interface SettingsState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'thamel-mart-settings',
    }
  )
);