
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProductCard from '../components/shared/ProductCard';
import ReviewForm from '../components/shared/ReviewForm';
import { Skeleton } from '../components/ui/Skeleton';
import { getProductById, getProducts } from '../lib/api';
import type { Product, Review } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import { useSettingsStore } from '../store/settingsStore';
import { Plus, Minus, Truck, Heart, ShieldCheck, Star, Volume2 } from '../components/Icons';

const RatingStars: React.FC<{ rating: number, size?: string }> = ({ rating, size = "w-4 h-4" }) => (
    <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn(size, i < rating ? "text-brand-secondary fill-brand-secondary" : "text-stone-300")} />
        ))}
    </div>
);

const AccordionItem: React.FC<{ title: string; children: React.ReactNode, defaultOpen?: boolean, isLast?: boolean }> = ({ title, children, defaultOpen = false, isLast = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className={cn("border-t border-stone-200", isLast && "border-b")}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-5 text-left transition-colors hover:bg-stone-50/50 px-2 -mx-2">
                <span className="font-semibold uppercase tracking-wider text-sm text-brand-text">{title}</span>
                {isOpen ? <Minus className="w-4 h-4 text-brand-muted" /> : <Plus className="w-4 h-4 text-brand-muted" />}
            </button>
            {isOpen && <div className="pb-5 text-brand-muted text-sm leading-relaxed max-w-none prose prose-sm prose-p:my-2 prose-ul:my-2 prose-ul:list-none prose-ul:p-0 px-2 -mx-2">{children}</div>}
        </div>
    );
};

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
    <div className="py-8 border-b border-stone-100 last:border-0 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-footer flex items-center justify-center text-brand-primary font-bold uppercase ring-1 ring-stone-200">
                    {review.userName.charAt(0)}
                </div>
                <div>
                    <h4 className="font-semibold text-brand-text text-sm">{review.userName}</h4>
                    {review.isVerified && <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> Verified Buyer</p>}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <RatingStars rating={review.rating} />
                <span className="text-xs text-brand-muted">{review.date}</span>
            </div>
        </div>
        <p className="text-brand-muted text-sm leading-relaxed">{review.comment}</p>
    </div>
);

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { addToCart } = useCartStore();
  const currency = useSettingsStore(state => state.currency);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setQuantity(1);
      setActiveTab('description');
      setShowReviewForm(false);
      const mainProduct = await getProductById(id);
      if (mainProduct) {
        setProduct(mainProduct);
        setLocalReviews(mainProduct.reviews || []);
        setActiveImage(0);
        const related = await getProducts(mainProduct.category, 4);
        setRelatedProducts(related.filter(p => p.id !== mainProduct.id));
      }
      setLoading(false);
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleReviewSubmit = (reviewData: Omit<Review, 'id' | 'date' | 'isVerified'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      isVerified: false 
    };
    
    setLocalReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
  };
  
  const TabButton: React.FC<{ tabName: string; children: React.ReactNode }> = ({ tabName, children }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={cn(
        'px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors whitespace-nowrap',
        activeTab === tabName
          ? 'text-brand-primary border-b-2 border-brand-primary'
          : 'text-brand-muted hover:text-brand-primary'
      )}
    >
      {children}
    </button>
  );

  const tabContent: Record<string, React.ReactNode> = {
    description: <div className="prose prose-sm max-w-none text-brand-muted leading-relaxed"><p>{product?.description}</p></div>,
    loveit: (
        <div className="prose prose-sm max-w-none text-brand-muted">
            <ul className="list-none p-0 m-0 space-y-3">
              {product?.whyYoullLoveIt.map((item, i) => <li key={i} className="flex items-start"><span className="mr-3 text-brand-secondary font-bold">✓</span><span>{item}</span></li>)}
            </ul>
        </div>
    ),
    includes: (
        <div className="prose prose-sm max-w-none text-brand-muted">
            <ul className="list-none p-0 m-0 space-y-3">
                {product?.includes.map((item, i) => <li key={i} className="flex items-start"><span className="mr-3 text-brand-secondary font-bold">✓</span><span>{item}</span></li>)}
            </ul>
        </div>
    ),
    specs: (
        <div className="prose prose-sm max-w-none text-brand-muted">
            <div className="grid grid-cols-2 gap-y-4 max-w-md">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-text">Material</span>
              <span className="text-sm">{product?.specs.material}</span>
              
              <span className="text-xs font-bold uppercase tracking-widest text-brand-text">Weight</span>
              <span className="text-sm">{product?.specs.weight}</span>
              
              <span className="text-xs font-bold uppercase tracking-widest text-brand-text">Dimensions</span>
              <span className="text-sm">{product?.specs.size}</span>
            </div>
        </div>
    )
  };

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <Skeleton className="w-full aspect-square" />
                    <div className="flex space-x-2 mt-4">
                        <Skeleton className="w-20 h-20" />
                        <Skeleton className="w-20 h-20" />
                        <Skeleton className="w-20 h-20" />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-10 sm:h-12 w-3/4" />
                    <Skeleton className="h-8 sm:h-10 w-1/3" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const averageRating = localReviews.length 
    ? localReviews.reduce((acc, rev) => acc + rev.rating, 0) / localReviews.length 
    : 0;

  return (
    <>
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm relative group">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover"/>
            {product.audioUrl && (
                <div className="absolute top-6 right-6">
                    <div className="bg-brand-primary/90 backdrop-blur-sm text-white p-3 rounded-full shadow-2xl animate-pulse">
                        <Volume2 className="w-5 h-5" />
                    </div>
                </div>
            )}
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, index) => (
              <button 
                key={index} 
                onClick={() => setActiveImage(index)} 
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 border rounded-2xl overflow-hidden transition-all duration-300 ${index === activeImage ? 'ring-2 ring-brand-primary ring-offset-4' : 'border-stone-100 hover:border-brand-accent grayscale hover:grayscale-0'}`}
              >
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <nav className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-4 flex items-center space-x-2">
            <Link to="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-brand-primary">{product.category.replace('-', ' ')}</Link>
          </nav>
          
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-text mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center gap-2">
                <RatingStars rating={Math.round(averageRating)} />
                <span className="text-xs font-bold text-brand-primary">{averageRating.toFixed(1)}</span>
              </div>
              <div className="h-4 w-px bg-stone-200" />
              <span className="text-xs font-bold text-brand-muted uppercase tracking-widest">{localReviews.length} Verified Reviews</span>
          </div>

          <div className="mb-8">
            <p className="text-3xl text-brand-primary font-serif font-bold">{formatCurrency(product.price, currency)}</p>
            {product.tags?.includes('Limited Stock') && <p className="text-[10px] font-black uppercase text-red-500 mt-2 tracking-widest animate-pulse">Only a few left in stock</p>}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <div className="flex items-center border border-stone-200 rounded-full h-14 bg-stone-50/50">
                <button onClick={() => handleQuantityChange(-1)} className="w-14 h-full flex items-center justify-center text-brand-muted hover:text-brand-primary transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="px-2 font-bold text-lg w-10 text-center">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="w-14 h-full flex items-center justify-center text-brand-muted hover:text-brand-primary transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
            <Button 
                size="lg" 
                className="w-full sm:flex-1 bg-brand-primary hover:bg-brand-primary/90 h-14 rounded-full shadow-xl shadow-brand-primary/10 transition-all active:scale-95 text-xs font-bold uppercase tracking-widest" 
                onClick={() => addToCart(product, quantity)} 
                disabled={product.tags?.includes('Sold Out')}
            >
                {product.tags?.includes('Sold Out') ? 'Currently Unavailable' : 'Add to Collection'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[9px] font-black uppercase tracking-widest text-brand-muted mb-10">
              <div className="flex items-center p-3 bg-stone-50 rounded-xl border border-stone-100"><Truck className="w-3.5 h-3.5 mr-2 text-brand-accent" /> Express Shipping</div>
              <div className="flex items-center p-3 bg-stone-50 rounded-xl border border-stone-100"><ShieldCheck className="w-3.5 h-3.5 mr-2 text-brand-accent" /> Lifetime Guarantee</div>
              <div className="flex items-center p-3 bg-stone-50 rounded-xl border border-stone-100"><Heart className="w-3.5 h-3.5 mr-2 text-brand-accent" /> Ethically Crafted</div>
          </div>

          <div className="flex-1">
            <div className="border-b border-stone-200 overflow-x-auto scrollbar-hide">
                <nav className="-mb-px flex space-x-2" aria-label="Tabs">
                    <TabButton tabName="description">Details</TabButton>
                    <TabButton tabName="loveit">Philosophy</TabButton>
                    <TabButton tabName="includes">What's Inside</TabButton>
                    <TabButton tabName="specs">Specifications</TabButton>
                </nav>
            </div>
            <div className="py-8 min-h-[150px]">
                {tabContent[activeTab]}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Accordions & Help */}
    <div className="container mx-auto px-4 max-w-4xl py-12 border-t border-stone-100">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-muted mb-6 text-center">Shipping & Returns</h3>
        <AccordionItem title="Peace of Mind Return Policy" defaultOpen={false}>
            <p>At Thamel Mart, we are committed to providing exceptional customer satisfaction. Our return policy is designed to ensure a smooth process while maintaining clarity and fairness.</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>30-Day Window:</strong> Returns accepted within 30 days of arrival.</li>
                <li><strong>Artisan Quality:</strong> Items must be returned in original handcrafted condition.</li>
                <li><strong>Refunds:</strong> Processed within 5 business days of receiving the return.</li>
            </ul>
        </AccordionItem>
        <AccordionItem title="Global & Local Delivery" isLast={true}>
            <p>We process all orders from Kathmandu within 1-2 business days. Standard international shipping typically takes 7-14 business days, while express options are available for those seeking their treasures sooner.</p>
        </AccordionItem>
    </div>

    {/* Reviews Section */}
    <section className="bg-brand-footer/30 py-20 border-t border-stone-100">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-serif font-bold text-brand-text mb-4">Artisan Feedback</h2>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="text-6xl font-serif font-bold text-brand-primary">{averageRating.toFixed(1)}</div>
                        <div className="text-center md:text-left">
                            <RatingStars rating={Math.round(averageRating)} size="w-6 h-6" />
                            <p className="text-[10px] text-brand-muted mt-2 uppercase tracking-widest font-black">Community Consensus ({localReviews.length} souls)</p>
                        </div>
                    </div>
                </div>
                {!showReviewForm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowReviewForm(true)}
                    className="h-14 px-10 uppercase tracking-widest text-xs font-black border-brand-primary hover:bg-brand-primary hover:text-white transition-all rounded-full shadow-lg shadow-brand-primary/5"
                  >
                    Contribute Your Review
                  </Button>
                )}
            </div>

            {showReviewForm && (
              <div className="mb-16">
                <ReviewForm 
                  onSubmit={handleReviewSubmit} 
                  onCancel={() => setShowReviewForm(false)} 
                />
              </div>
            )}

            <div className="divide-y divide-stone-100 bg-white rounded-3xl p-8 border border-stone-200/50 shadow-sm">
                {localReviews.length > 0 ? (
                    localReviews.map(review => (
                        <ReviewItem key={review.id} review={review} />
                    ))
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-brand-muted font-serif italic mb-2">The silence here is waiting for your voice.</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Be the first to share your experience</p>
                    </div>
                )}
            </div>
        </div>
    </section>

    {/* Related Products */}
    <div className="bg-brand-background">
        <div className="container mx-auto px-4 py-20 lg:py-24">
            <div className="flex flex-col items-center mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-muted mb-4">Curated Collection</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center">You May Also Seek</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
            ))}
            </div>
        </div>
    </div>
    </>
  );
};

export default ProductDetailPage;
