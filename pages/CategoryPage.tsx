
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/shared/ProductCard';
import { Skeleton } from '../components/ui/Skeleton';
import { getProducts, getCategories } from '../lib/api';
import { useSettingsStore } from '../store/settingsStore';
import { formatCurrency, cn } from '../lib/utils';
import type { Product, Category } from '../types';
import { ChevronDown, X } from '../components/Icons';

const PRICE_RANGES = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $300', min: 100, max: 300 },
  { label: 'Over $300', min: 300, max: Infinity },
];

const MATERIALS = ['Seven Metal Alloy', 'Brass Alloy', 'Bronze', 'Cotton', 'Bronze Alloy', 'Hand-hammered Bronze', 'Etched Brass', '7-Metal Bronze', 'Colored Metal Alloy'];

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currency = useSettingsStore(state => state.currency);
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{min: number, max: number} | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [prods, cats] = await Promise.all([
        getProducts(slug),
        getCategories(),
      ]);
      setAllProducts(prods);
      setCategory(cats.find(c => c.slug === slug) || null);
      setLoading(false);
      // Reset filters when category changes
      setSelectedMaterials([]);
      setSelectedPriceRange(null);
      setSelectedTags([]);
    };
    fetchData();
  }, [slug]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.specs.material));
    }

    if (selectedPriceRange) {
      result = result.filter(p => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max);
    }

    if (selectedTags.length > 0) {
      result = result.filter(p => p.tags?.some(tag => selectedTags.includes(tag)));
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') result.sort((a, b) => (a.tags?.includes('New Arrival') ? -1 : 1));

    return result;
  }, [allProducts, selectedMaterials, selectedPriceRange, selectedTags, sortBy]);

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev => prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearAllFilters = () => {
    setSelectedMaterials([]);
    setSelectedPriceRange(null);
    setSelectedTags([]);
  };

  const title = slug === 'all' ? 'All Collections' : category?.name || 'Products';

  return (
    <>
      <section className="bg-brand-footer py-16 border-b border-stone-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-3">Explore</p>
          {loading ? (
            <Skeleton className="h-12 w-64 mx-auto" />
          ) : (
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">{title}</h1>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 space-y-8">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-brand-primary">Filters</h2>
              {(selectedMaterials.length > 0 || selectedPriceRange || selectedTags.length > 0) && (
                <button onClick={clearAllFilters} className="text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:underline flex items-center">
                  Clear All <X className="ml-1 w-3 h-3" />
                </button>
              )}
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-4">Price</h3>
              <div className="space-y-3">
                {PRICE_RANGES.map((range, idx) => (
                  <label key={idx} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="radio" 
                        name="price-range" 
                        className="sr-only"
                        checked={selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max}
                        onChange={() => setSelectedPriceRange(range)}
                      />
                      <div className={cn(
                        "h-4 w-4 border transition-all rounded-full flex items-center justify-center",
                        selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max ? "border-brand-primary bg-brand-primary" : "border-stone-300 group-hover:border-brand-primary"
                      )}>
                        {selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-brand-muted group-hover:text-brand-primary transition-colors">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Collection/Tags */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-4">Highlights</h3>
              <div className="space-y-3">
                {['Best Seller', 'New Arrival', 'Popular'].map((tag) => (
                  <label key={tag} className="flex items-center group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-stone-300 text-brand-primary focus:ring-brand-primary h-4 w-4"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                    />
                    <span className="ml-3 text-sm text-brand-muted group-hover:text-brand-primary transition-colors">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-4">Material</h3>
              <div className="space-y-3">
                {MATERIALS.map((mat) => (
                  <label key={mat} className="flex items-center group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-stone-300 text-brand-primary focus:ring-brand-primary h-4 w-4"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => toggleMaterial(mat)}
                    />
                    <span className="ml-3 text-sm text-brand-muted group-hover:text-brand-primary transition-colors">{mat}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 border-b border-stone-100 pb-6">
              <div className="text-sm font-medium text-brand-muted">
                Showing <span className="text-brand-primary font-bold">{filteredProducts.length}</span> of {allProducts.length} products
              </div>
              <div className="flex items-center bg-white border border-stone-200 rounded-full px-4 py-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mr-3">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold uppercase tracking-widest text-brand-primary outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="ml-2 w-3 h-3 text-brand-primary" />
              </div>
            </div>

            {filteredProducts.length === 0 && !loading ? (
              <div className="py-24 text-center bg-stone-50 rounded-3xl border border-stone-100 border-dashed">
                <p className="text-brand-muted font-serif italic mb-6">No treasures match your current filters.</p>
                <button onClick={clearAllFilters} className="text-xs font-bold uppercase tracking-widest text-brand-primary underline underline-offset-4">Reset All Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {loading ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square rounded-2xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                )) : filteredProducts.map(prod => <ProductCard key={prod.id} product={prod} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
