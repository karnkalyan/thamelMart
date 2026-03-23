
import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import ProductCard from '../components/shared/ProductCard';
import { Card, CardContent } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { getProducts, getTestimonials } from '../lib/api';
import { useDataStore } from '../store/dataStore';
import type { Product, Testimonial } from '../types';

import MarqueeSection from '../components/home/MarqueeSection';
import InnerCalmSection from '../components/home/InnerCalmSection';
import HandcraftedSection from '../components/home/HandcraftedSection';
import TrustedBySection from '../components/home/TrustedBySection';
import BlogSection from '../components/home/BlogSection';
import InstagramSection from '../components/home/InstagramSection';
import FeaturesBarSection from '../components/home/FeaturesBarSection';

const ProductGrid: React.FC<{products: Product[], loading: boolean, count?: number}> = ({ products, loading, count = 4}) => (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? Array.from({ length: count }).map((_, i) => (
            <div key={i}>
                <Skeleton className="aspect-square" />
                <Skeleton className="h-5 mt-4 w-3/4" />
                <Skeleton className="h-5 mt-2 w-1/2" />
            </div>
        ))
          : products.map(prod => <ProductCard key={prod.id} product={prod} />)
        }
    </div>
);

const HomePage: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [featuredBowls, setFeaturedBowls] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { settings, products, testimonials, categories } = useDataStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Use admin-selected products if available, otherwise fallback to tags
      const getProductsList = (adminIds: string[], tag: string) => {
          if (adminIds && adminIds.length > 0) {
              return adminIds.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
          }
          return products.filter(p => p.tags?.includes(tag)).slice(0, 4);
      };

      setTrendingProducts(getProductsList(settings.trendingProducts, 'Best Seller'));
      setNewArrivals(getProductsList(settings.newArrivals, 'New Arrival'));
      setPopularProducts(getProductsList(settings.popularProducts, 'Popular'));
      setBestSellers(getProductsList(settings.bestSellers, 'Best Seller'));
      
      const featuredCat = settings.featuredCategorySlug || 'singing-bowls';
      setFeaturedBowls(products.filter(p => p.category === featuredCat).slice(0, 8));
      setLoading(false);
    };
    fetchData();
  }, [products, settings.trendingProducts, settings.newArrivals, settings.popularProducts, settings.bestSellers, settings.featuredCategorySlug]);

  return (
    <div>
      {settings.flashSaleActive && (
        <div className="bg-brand-primary text-white text-center py-2 px-4 text-sm font-bold tracking-wider animate-in slide-in-from-top flex items-center justify-center gap-2">
            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs animate-pulse">SALE</span>
            {settings.flashSaleText} - Save {settings.flashSaleDiscount}%
        </div>
      )}
      <section className="relative h-[80vh] bg-cover bg-center text-white" style={{ backgroundImage: `url('${settings.heroImage || "https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Handmade-Healing-Yoga-Meditation-Sound-Bath-Kundalini-Himalayan-Bazaar-48873170.jpg"}')` }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center container mx-auto px-4">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{settings.heroTitle}</h1>
            <p className="text-lg md:text-xl mb-8">{settings.heroSubtitle}</p>
            <Button size="lg" as="a" href="#/category/all" variant='outline' className="bg-white/20 border-white text-white hover:bg-white/30 backdrop-blur-sm">Explore Collection</Button>
          </div>
        </div>
      </section>
      
      <MarqueeSection />

      <section className="py-16 bg-brand-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Trending Products</h2>
          <ProductGrid products={trendingProducts} loading={loading} />
        </div>
      </section>
      
      <section className="py-16 bg-brand-footer">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">New Arrivals</h2>
          <ProductGrid products={newArrivals} loading={loading} />
        </div>
      </section>

      <section className="py-16 bg-brand-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Popular Picks</h2>
          <ProductGrid products={popularProducts} loading={loading} />
        </div>
      </section>

      <section className="py-16 bg-brand-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Best Sellers</h2>
          <ProductGrid products={bestSellers} loading={loading} />
        </div>
      </section>

      <InnerCalmSection />
      
       <section className="py-16 bg-brand-footer">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Featured {categories.find(c => c.slug === (settings.featuredCategorySlug || 'singing-bowls'))?.name || 'Treasures'}
          </h2>
          <ProductGrid products={featuredBowls} loading={loading} count={8} />
        </div>
      </section>

      <HandcraftedSection />

      <section className="py-20 bg-brand-background">
        <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Words of Wellness</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-transparent border-none shadow-none">
                        <CardContent className="p-0 text-center md:text-left">
                            <p className="text-lg font-serif italic text-brand-text mb-4">"{testimonial.quote}"</p>
                            <p className="font-semibold text-brand-primary">- {testimonial.name}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      <TrustedBySection />
      <BlogSection />
      <InstagramSection />
      <FeaturesBarSection />
    </div>
  );
};

export default HomePage;
