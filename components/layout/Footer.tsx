
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useDataStore } from '../../store/dataStore';
import { ArrowRight, Facebook, Instagram, Amex, ApplePay, GooglePay, Mastercard, Paypal, Visa, ShopPay } from '../Icons';

const Footer = () => {
  const { settings } = useDataStore();

  return (
    <footer className="bg-brand-footer border-t border-stone-200 text-brand-muted">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-brand-text mb-4 uppercase tracking-wider text-sm">ABOUT THAMEL MART</h3>
            <p className="text-sm leading-relaxed mb-4">
              {settings.footerAbout}
            </p>
            <div className="flex space-x-4">
              {settings.socialLinks?.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary"><Instagram className="w-5 h-5" /></a>}
              {settings.socialLinks?.facebook && <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary"><Facebook className="w-5 h-5" /></a>}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-brand-text mb-4 uppercase tracking-wider text-sm">Shop Info</h4>
            <ul className="space-y-3 text-sm">
              {settings.footerLinks?.slice(0, 5).map((link, idx) => (
                <li key={idx}><Link to={link.url} className="hover:text-brand-primary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-text mb-4 uppercase tracking-wider text-sm">Helpful Links</h4>
            <ul className="space-y-3 text-sm">
              {settings.footerLinks?.slice(5).map((link, idx) => (
                <li key={idx}><Link to={link.url} className="hover:text-brand-primary transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-semibold text-brand-text mb-4 uppercase tracking-wider text-sm">Newsletter Sign Up</h4>
            <p className="text-sm mb-4">Receive Our Latest Updates About Our Products And Promotions.</p>
            <form>
                <div className="mb-4">
                    <input type="text" placeholder="Name" className="w-full bg-transparent px-3 py-2 border-b border-stone-400 focus:ring-brand-primary focus:border-brand-primary text-sm placeholder:text-brand-muted" />
                </div>
                 <div className="flex">
                    <input type="email" placeholder="Email" className="w-full bg-transparent px-3 py-2 border-b border-stone-400 focus:ring-brand-primary focus:border-brand-primary text-sm placeholder:text-brand-muted" />
                    <Button type="submit" variant="ghost" className="p-2 -ml-2">
                        <ArrowRight />
                    </Button>
                </div>
            </form>
          </div>
        </div>
        
        <div className="mt-16 border-t border-stone-300 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Thamel Mart</p>
          <div className="flex items-center space-x-2">
            <Amex />
            <ApplePay />
            <GooglePay />
            <Mastercard />
            <Paypal />
            <ShopPay />
            <Visa />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
