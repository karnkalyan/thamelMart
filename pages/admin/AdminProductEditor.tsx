
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Image as ImageIcon, 
  CheckCircle, 
  Video, 
  Music, 
  Tags, 
  Upload, 
  Info, 
  DollarSign,
  Package,
  FileText,
  BadgeInfo,
  Layers,
  Trash2,
  Globe,
  RefreshCw,
  Star
} from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import type { Product } from '../../types';
import Button from '../../components/ui/Button';
import { cn } from '../../lib/utils';

const AdminProductEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);
    
    const { products, categories, addProduct, updateProduct, settings, updateSettings } = useDataStore();
    
    const [isSaving, setIsSaving] = useState(false);
    const [showcaseSettings, setShowcaseSettings] = useState({
        isTrending: settings.trendingProducts?.includes(id || '') || false,
        isFeatured: settings.featuredProducts?.includes(id || '') || false,
        isNewArrival: settings.newArrivals?.includes(id || '') || false,
        isPopular: settings.popularProducts?.includes(id || '') || false,
        isBestSeller: settings.bestSellers?.includes(id || '') || false,
    });
    const [formData, setFormData] = useState<Product>({
        id: '',
        name: '',
        price: 0,
        description: '',
        category: categories[0]?.slug || '',
        images: [],
        secondaryImage: '',
        videoUrl: '',
        audioUrl: '',
        tags: [],
        specs: { material: '', weight: '', size: '' },
        whyYoullLoveIt: [],
        includes: [],
        brand: 'Thamel Mart',
        seoTitle: '',
        seoDescription: '',
        reviews: []
    });

    useEffect(() => {
        if (id) {
            const prod = products.find(p => p.id === id);
            if (prod) {
                setFormData({
                    ...prod,
                    images: prod.images || [],
                    whyYoullLoveIt: prod.whyYoullLoveIt || [],
                    includes: prod.includes || [],
                    tags: prod.tags || [],
                    seoTitle: prod.seoTitle || '',
                    seoDescription: prod.seoDescription || '',
                    reviews: prod.reviews || []
                });
            }
        }
    }, [id, products]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'images' | 'videoUrl' | 'audioUrl') => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        Array.from(files).forEach((file: File) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (field === 'images') {
                    setFormData(prev => ({ ...prev, images: [...prev.images, base64String] }));
                } else {
                    setFormData(prev => ({ ...prev, [field]: base64String }));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const toggleTag = (tag: string) => {
        const tags = formData.tags || [];
        const updated = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
        setFormData({ ...formData, tags: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1000));

        const cleaned = {
            ...formData,
            id: id || `prod-${Date.now()}`,
            whyYoullLoveIt: formData.whyYoullLoveIt.filter(item => item.trim() !== ''),
            includes: formData.includes.filter(item => item.trim() !== ''),
        };

        if (id) updateProduct(cleaned);
        else addProduct(cleaned);

        // Update SiteSettings for showcases
        const productId = id || cleaned.id;
        const updateShowcase = (field: keyof typeof settings, isSelected: boolean) => {
            const current = (settings[field] as string[]) || [];
            if (isSelected && !current.includes(productId)) {
                updateSettings({ [field]: [...current, productId] });
            } else if (!isSelected && current.includes(productId)) {
                updateSettings({ [field]: current.filter(id => id !== productId) });
            }
        };

        updateShowcase('trendingProducts', showcaseSettings.isTrending);
        updateShowcase('featuredProducts', showcaseSettings.isFeatured);
        updateShowcase('newArrivals', showcaseSettings.isNewArrival);
        updateShowcase('popularProducts', showcaseSettings.isPopular);
        updateShowcase('bestSellers', showcaseSettings.isBestSeller);
        
        setIsSaving(false);
        navigate('/admin/products');
    };

    return (
        <div className="max-w-7xl mx-auto pb-24">
            <div className="sticky top-0 z-40 -mx-8 px-8 py-4 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/admin/products" className="p-2.5 hover:bg-white rounded-xl border border-stone-200 transition-all"><ArrowLeft className="w-5 h-5 text-stone-400" /></Link>
                    <div>
                        <h1 className="text-2xl font-serif font-black text-brand-primary leading-none">{id ? 'Refine Record' : 'Create Masterpiece'}</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mt-2">{id ? `ID: ${id}` : 'Draft Mode'}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => navigate('/admin/products')} className="bg-white">Discard</Button>
                    <Button onClick={handleSubmit} disabled={isSaving} className="shadow-xl">
                        {isSaving ? <RefreshCw className="animate-spin mr-2" /> : <CheckCircle className="mr-2" />}
                        {id ? 'Update Treasure' : 'Enshrine Product'}
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 border-b border-stone-100 pb-4">
                            <FileText className="w-5 h-5 text-brand-primary" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Identity & Narrative</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Product Name</label>
                                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-sm font-bold text-brand-primary" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Description</label>
                                <textarea required rows={6} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-sm leading-relaxed" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Category</label>
                                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-sm font-bold text-brand-primary outline-none focus:ring-2 focus:ring-brand-primary/10">
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Media Management */}
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8 border-b border-stone-100 pb-4">
                            <div className="flex items-center gap-3">
                                <ImageIcon className="w-5 h-5 text-brand-secondary" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Media Manifest</h3>
                            </div>
                            <Button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] font-black uppercase tracking-widest h-9 px-4">
                                <Upload className="w-3 h-3 mr-2" /> Upload Images
                            </Button>
                            <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'images')} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-stone-100 relative group">
                                    <img src={img} className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => setFormData({...formData, images: formData.images.filter((_, i) => i !== idx)})} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3"/></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SEO Metadata */}
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 border-b border-stone-100 pb-4">
                            <Globe className="w-5 h-5 text-blue-500" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Search Engine Optimization</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Meta Title</label>
                                <input value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} placeholder="Focus Keyword - Store Name" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Meta Description</label>
                                <textarea rows={3} value={formData.seoDescription} onChange={e => setFormData({...formData, seoDescription: e.target.value})} placeholder="Briefly describe for Google results..." className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {/* Interactive Previews (Video/Audio) */}
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Interactive Manifest</h3>
                        <div className="space-y-6">
                            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-2"><Video className="w-3 h-3" /> Video Showcase</label>
                                {formData.videoUrl ? (
                                    <div className="relative rounded-lg overflow-hidden border border-stone-100">
                                        <video src={formData.videoUrl} className="w-full aspect-video object-cover" />
                                        <button type="button" onClick={() => setFormData({...formData, videoUrl: ''})} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full"><Trash2 className="w-3 h-3"/></button>
                                    </div>
                                ) : (
                                    <Button type="button" variant="outline" onClick={() => videoInputRef.current?.click()} className="w-full h-24 border-dashed border-2 flex flex-col"><Upload className="mb-2" /> Upload Video</Button>
                                )}
                                <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={e => handleFileUpload(e, 'videoUrl')} />
                            </div>

                            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-2"><Music className="w-3 h-3" /> Audio Sample</label>
                                {formData.audioUrl ? (
                                    <div className="flex items-center gap-4">
                                        <audio controls src={formData.audioUrl} className="flex-1 h-8" />
                                        <button type="button" onClick={() => setFormData({...formData, audioUrl: ''})} className="text-red-500"><Trash2 className="w-4 h-4"/></button>
                                    </div>
                                ) : (
                                    <Button type="button" variant="outline" onClick={() => audioInputRef.current?.click()} className="w-full h-20 border-dashed border-2 flex flex-col"><Upload className="mb-2" /> Upload Audio</Button>
                                )}
                                <input ref={audioInputRef} type="file" accept="audio/*" className="hidden" onChange={e => handleFileUpload(e, 'audioUrl')} />
                            </div>
                        </div>
                    </div>

                    {/* Financials & Stock */}
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Financials</h3>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Base Price (USD)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-12 pr-4 py-4 text-lg font-black" />
                            </div>
                        </div>
                    </div>

                    {/* Marketing Highlights */}
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-4 flex items-center gap-2"><Star className="w-4 h-4" /> Homepage Showcases</h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Trending', key: 'isTrending' },
                                    { label: 'Featured', key: 'isFeatured' },
                                    { label: 'New Arrival', key: 'isNewArrival' },
                                    { label: 'Popular', key: 'isPopular' },
                                    { label: 'Best Seller', key: 'isBestSeller' },
                                ].map(item => (
                                    <label key={item.key} className="flex items-center p-3 bg-stone-50 rounded-xl border border-stone-100 cursor-pointer hover:bg-white transition-all">
                                        <input 
                                            type="checkbox" 
                                            checked={showcaseSettings[item.key as keyof typeof showcaseSettings]} 
                                            onChange={e => setShowcaseSettings({...showcaseSettings, [item.key]: e.target.checked})}
                                            className="w-4 h-4 text-brand-primary border-stone-300 rounded focus:ring-brand-primary mr-3"
                                        />
                                        <span className="text-sm font-bold text-brand-primary">{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-4 flex items-center gap-2"><Tags className="w-4 h-4" /> Visibility Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Limited Stock', 'Sold Out', 'Handmade', 'Ethical'].map(tag => (
                                    <button key={tag} type="button" onClick={() => toggleTag(tag)} className={cn("px-3 py-2 rounded-full text-[9px] font-black uppercase transition-all", formData.tags?.includes(tag) ? "bg-brand-primary text-white shadow-lg" : "bg-stone-50 text-stone-400 border border-stone-100")}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Reviews Management */}
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary flex items-center gap-2"><Star className="w-4 h-4" /> Reviews</h3>
                            <Button type="button" variant="outline" size="sm" onClick={() => {
                                const newReview = { id: `rev-${Date.now()}`, userName: 'New User', rating: 5, date: new Date().toISOString().split('T')[0], comment: 'Great product!', isVerified: true };
                                setFormData({...formData, reviews: [...(formData.reviews || []), newReview]});
                            }}>
                                <Plus className="w-4 h-4 mr-1" /> Add Review
                            </Button>
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {(formData.reviews || []).map((review, idx) => (
                                <div key={review.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 relative group">
                                    <button type="button" onClick={() => {
                                        const newReviews = [...(formData.reviews || [])];
                                        newReviews.splice(idx, 1);
                                        setFormData({...formData, reviews: newReviews});
                                    }} className="absolute top-2 right-2 p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4"/></button>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Reviewer Name</label>
                                            <input value={review.userName} onChange={e => {
                                                const newReviews = [...(formData.reviews || [])];
                                                newReviews[idx].userName = e.target.value;
                                                setFormData({...formData, reviews: newReviews});
                                            }} className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Rating (1-5)</label>
                                            <input type="number" min="1" max="5" value={review.rating} onChange={e => {
                                                const newReviews = [...(formData.reviews || [])];
                                                newReviews[idx].rating = parseInt(e.target.value) || 5;
                                                setFormData({...formData, reviews: newReviews});
                                            }} className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Comment</label>
                                        <textarea rows={2} value={review.comment} onChange={e => {
                                            const newReviews = [...(formData.reviews || [])];
                                            newReviews[idx].comment = e.target.value;
                                            setFormData({...formData, reviews: newReviews});
                                        }} className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm" />
                                    </div>
                                </div>
                            ))}
                            {(!formData.reviews || formData.reviews.length === 0) && (
                                <p className="text-sm text-stone-400 text-center py-4 italic">No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminProductEditor;
