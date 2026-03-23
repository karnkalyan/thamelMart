import type { Currency } from '../types';

export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

const CONVERSION_RATES = {
  USD: 1,
  NPR: 133.65,
  EUR: 0.93,
};

// Assuming all product prices in mockData are in USD
export const formatCurrency = (amount: number, currency: Currency) => {
  const convertedAmount = amount * (CONVERSION_RATES[currency] || 1);
  // Use appropriate locales for formatting
  const locale = currency === 'EUR' ? 'de-DE' : 'en-US'; 

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(convertedAmount);
};