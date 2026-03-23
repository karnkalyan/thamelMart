
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useDataStore } from '../../store/dataStore';
import { ShoppingCart, Search, Menu, X, ChevronDown, ArrowRight, User as UserIcon } from '../Icons';
import type { Category } from '../../types';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { categories, settings } = useDataStore();
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (categories.length > 0 && !hoveredCategory) {
        setHoveredCategory(categories[0]);
    }
  }, [categories, hoveredCategory]);
  
  const items = useCartStore(state => state.items);
  const openCart = useCartStore(state => state.openCart);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="relative border-b border-stone-200 bg-brand-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl font-serif font-black text-brand-primary tracking-tight">
            Thamel<span className="text-brand-secondary">Mart</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-10 h-full">
            {settings.headerLinks?.map((link, index) => {
                if (link.label.toLowerCase() === 'shop') {
                    return (
                        <div 
                            key={index}
                            className="group h-full flex items-center"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                        >
                            <button className="flex items-center text-sm font-semibold uppercase tracking-widest hover:text-brand-secondary transition-colors group-hover:text-brand-secondary">
                                {link.label} <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`absolute left-0 top-full w-full bg-white shadow-2xl border-b border-stone-200 z-50 transition-all duration-300 transform ${isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                <div className="container mx-auto px-8 py-10">
                                    <div className="grid grid-cols-12 gap-10">
                                        <div className="col-span-3 border-r border-stone-100 pr-10">
                                            <h3 className="text-xs font-bold text-brand-muted uppercase tracking-[0.2em] mb-6">Collections</h3>
                                            <ul className="space-y-4">
                                                {categories.map((cat) => (
                                                    <li key={cat.id}>
                                                        <Link 
                                                            to={`/category/${cat.slug}`}
                                                            className={`group flex items-center justify-between text-lg font-serif transition-all duration-200 ${hoveredCategory?.id === cat.id ? 'text-brand-primary pl-2' : 'text-stone-400 hover:text-brand-primary hover:pl-2'}`}
                                                            onMouseEnter={() => setHoveredCategory(cat)}
                                                            onClick={() => setIsMegaMenuOpen(false)}
                                                        >
                                                            <span>{cat.name}</span>
                                                            <ArrowRight className={`w-4 h-4 transition-all duration-300 ${hoveredCategory?.id === cat.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li className="pt-4 border-t border-stone-100">
                                                    <Link to="/category/all" className="text-xs font-bold text-brand-secondary uppercase tracking-[0.2em] hover:text-brand-primary transition-colors flex items-center">
                                                        Shop All Products <ArrowRight className="ml-2 w-3 h-3" />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        {hoveredCategory && (
                                            <div className="col-span-9 grid grid-cols-2 gap-8">
                                                <div className="relative overflow-hidden rounded-xl aspect-[16/9] group/img">
                                                    <img 
                                                        src={hoveredCategory.image} 
                                                        alt={hoveredCategory.name} 
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                                                        <span className="text-brand-secondary text-xs font-bold uppercase tracking-[0.3em] mb-2">Featured Collection</span>
                                                        <h4 className="text-white text-3xl font-serif font-bold mb-4">{hoveredCategory.name}</h4>
                                                        <Link 
                                                            to={`/category/${hoveredCategory.slug}`}
                                                            className="inline-flex items-center text-white text-sm font-bold uppercase tracking-widest hover:text-brand-secondary transition-colors"
                                                            onClick={() => setIsMegaMenuOpen(false)}
                                                        >
                                                            Explore Now <ArrowRight className="ml-2 w-4 h-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center bg-stone-50 p-8 rounded-xl border border-stone-100">
                                                    <h3 className="text-xl font-serif font-bold text-brand-primary mb-4">Why Shop Our {hoveredCategory.name}?</h3>
                                                    <p className="text-brand-muted text-sm leading-relaxed mb-6">
                                                        Each piece in our {hoveredCategory.name.toLowerCase()} collection is hand-selected from master artisans in Kathmandu. We ensure ethical sourcing for every item we sell.
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex flex-col items-center p-4 bg-white rounded-lg text-center">
                                                            <span className="text-brand-secondary font-bold text-lg mb-1">100%</span>
                                                            <span className="text-[10px] uppercase font-bold text-stone-400">Authentic</span>
                                                        </div>
                                                        <div className="flex flex-col items-center p-4 bg-white rounded-lg text-center">
                                                            <span className="text-brand-secondary font-bold text-lg mb-1">Fair</span>
                                                            <span className="text-[10px] uppercase font-bold text-stone-400">Trade</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                return (
                    <Link key={index} to={link.url} className="text-sm font-semibold uppercase tracking-widest hover:text-brand-secondary transition-colors">{link.label}</Link>
                );
            })}
          </nav>

          <div className="flex items-center space-x-6">
            <button className="text-brand-primary hover:text-brand-secondary transition-colors p-2"><Search className="w-5 h-5" /></button>
            
            <Link to={isAuthenticated ? (user?.isAdmin ? "/admin" : "/account") : "/login"} className="text-brand-primary hover:text-brand-secondary transition-colors p-2 flex items-center group">
              <UserIcon className="w-5 h-5" />
              {isAuthenticated && <span className="hidden lg:inline ml-2 text-[10px] font-bold uppercase tracking-wider">{user?.name.split(' ')[0]} {user?.isAdmin ? '(Admin)' : ''}</span>}
            </Link>

            <button onClick={openCart} className="relative text-brand-primary hover:text-brand-secondary transition-colors p-2">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-brand-background">{cartItemCount}</span>
              )}
            </button>
            <button className="md:hidden text-brand-primary p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif font-bold text-brand-primary border-b border-stone-100 pb-2">Home</Link>
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Shop Categories</p>
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setIsMenuOpen(false)} className="block text-lg font-serif text-brand-muted hover:text-brand-primary transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link to={user?.isAdmin ? "/admin" : "/account"} onClick={() => setIsMenuOpen(false)} className="text-lg font-serif font-bold text-brand-primary border-t border-stone-100 pt-4 pb-2">My Account</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif font-bold text-brand-primary border-t border-stone-100 pt-4 pb-2">Our Story</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif font-bold text-brand-primary border-b border-stone-100 pb-2">Contact</Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
