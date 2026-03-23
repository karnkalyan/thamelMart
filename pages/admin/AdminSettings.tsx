
import React, { useState } from 'react';
import { Save, RefreshCcw, Layout, Type, Info, Globe, Bell, Zap, Image as ImageIcon, Tag, Star, Trash2, Instagram, Heart, Users } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { cn } from '../../lib/utils';

const AdminSettings: React.FC = () => {
    const { settings, updateSettings, products, categories } = useDataStore();
    const [formData, setFormData] = useState(settings);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<'general' | 'homepage' | 'social'>('general');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleSocialLinkChange = (platform: 'facebook' | 'instagram' | 'twitter', value: string) => {
        setFormData({
            ...formData,
            socialLinks: {
                ...(formData.socialLinks || { facebook: '', instagram: '', twitter: '' }),
                [platform]: value
            }
        });
    };

    const handleFeatureChange = (index: number, field: 'text' | 'icon', value: string) => {
        const newFeatures = [...(formData.features || [])];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({
            ...formData,
            features: [...(formData.features || []), { text: 'New Feature', icon: '' }]
        });
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...(formData.features || [])];
        newFeatures.splice(index, 1);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleHeaderLinkChange = (index: number, field: 'label' | 'url', value: string) => {
        const newLinks = [...(formData.headerLinks || [])];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setFormData({ ...formData, headerLinks: newLinks });
    };

    const addHeaderLink = () => {
        setFormData({
            ...formData,
            headerLinks: [...(formData.headerLinks || []), { label: 'New Link', url: '/' }]
        });
    };

    const removeHeaderLink = (index: number) => {
        const newLinks = [...(formData.headerLinks || [])];
        newLinks.splice(index, 1);
        setFormData({ ...formData, headerLinks: newLinks });
    };

    const handleFooterLinkChange = (index: number, field: 'label' | 'url', value: string) => {
        const newLinks = [...(formData.footerLinks || [])];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setFormData({ ...formData, footerLinks: newLinks });
    };

    const addFooterLink = () => {
        setFormData({
            ...formData,
            footerLinks: [...(formData.footerLinks || []), { label: 'New Link', url: '/' }]
        });
    };

    const removeFooterLink = (index: number) => {
        const newLinks = [...(formData.footerLinks || [])];
        newLinks.splice(index, 1);
        setFormData({ ...formData, footerLinks: newLinks });
    };

    // Instagram Handlers
    const handleInstaImageChange = (index: number, value: string) => {
        const newImages = [...(formData.instagram?.images || [])];
        newImages[index] = value;
        setFormData({ ...formData, instagram: { ...formData.instagram, images: newImages } });
    };

    const addInstaImage = () => {
        setFormData({
            ...formData,
            instagram: { 
                ...formData.instagram, 
                images: [...(formData.instagram?.images || []), ''] 
            }
        });
    };

    const removeInstaImage = (index: number) => {
        const newImages = [...(formData.instagram?.images || [])];
        newImages.splice(index, 1);
        setFormData({ ...formData, instagram: { ...formData.instagram, images: newImages } });
    };

    // TrustedBy Handlers
    const handleTrustedByChange = (index: number, field: 'name' | 'image', value: string) => {
        const newItems = [...(formData.trustedBy?.items || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData({ ...formData, trustedBy: { ...formData.trustedBy, items: newItems } });
    };

    const addTrustedBy = () => {
        setFormData({
            ...formData,
            trustedBy: { 
                ...formData.trustedBy, 
                items: [...(formData.trustedBy?.items || []), { name: '', image: '' }] 
            }
        });
    };

    const removeTrustedBy = (index: number) => {
        const newItems = [...(formData.trustedBy?.items || [])];
        newItems.splice(index, 1);
        setFormData({ ...formData, trustedBy: { ...formData.trustedBy, items: newItems } });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-black text-brand-primary">Site Experience CMS</h1>
                    <p className="text-sm text-brand-muted mt-1">Directly control the brand voice and homepage presentation.</p>
                </div>
                <div className="flex items-center space-x-3">
                    {saved && <span className="text-green-600 text-[10px] font-black uppercase tracking-widest animate-bounce">Live Changes Synced!</span>}
                    <button onClick={() => setFormData(settings)} className="p-3 bg-white border border-stone-200 rounded-xl text-stone-400 hover:text-brand-primary transition-all"><RefreshCcw className="w-5 h-5" /></button>
                    <button onClick={handleSave} className="inline-flex items-center px-8 py-3 bg-brand-primary text-white rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl">
                        <Save className="w-4 h-4 mr-2" /> Commit Updates
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-stone-200 gap-8">
                {[
                    { id: 'general', label: 'General & Branding', icon: Globe },
                    { id: 'homepage', label: 'Homepage Modules', icon: Layout },
                    { id: 'social', label: 'Social & Community', icon: Instagram }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex items-center gap-2 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2",
                            activeTab === tab.id ? "border-brand-primary text-brand-primary" : "border-transparent text-stone-400 hover:text-brand-primary"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activeTab === 'general' && (
                    <>
                        <div className="space-y-8">
                            {/* Header & Marquee */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Bell className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Alerts & Navigation</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Topbar Announcement</label>
                                        <input value={formData.promoText} onChange={e => setFormData({...formData, promoText: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest text-brand-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Homepage Marquee Text</label>
                                        <textarea rows={2} value={formData.marqueeText} onChange={e => setFormData({...formData, marqueeText: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide" />
                                        <p className="text-[9px] text-brand-muted mt-2 italic">Use " • " to separate phrases for a continuous loop effect.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Header Links */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Layout className="w-5 h-5 text-brand-secondary" />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Header Navigation</h3>
                                    </div>
                                    <button onClick={addHeaderLink} className="text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">
                                        + Add Link
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(formData.headerLinks || []).map((link, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <input 
                                                value={link.label} 
                                                onChange={e => handleHeaderLinkChange(index, 'label', e.target.value)} 
                                                placeholder="Label"
                                                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                            />
                                            <input 
                                                value={link.url} 
                                                onChange={e => handleHeaderLinkChange(index, 'url', e.target.value)} 
                                                placeholder="URL"
                                                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                            />
                                            <button onClick={() => removeHeaderLink(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Links */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Layout className="w-5 h-5 text-brand-secondary" />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Footer Navigation</h3>
                                    </div>
                                    <button onClick={addFooterLink} className="text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">
                                        + Add Link
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(formData.footerLinks || []).map((link, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <input 
                                                value={link.label} 
                                                onChange={e => handleFooterLinkChange(index, 'label', e.target.value)} 
                                                placeholder="Label"
                                                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                            />
                                            <input 
                                                value={link.url} 
                                                onChange={e => handleFooterLinkChange(index, 'url', e.target.value)} 
                                                placeholder="URL"
                                                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                            />
                                            <button onClick={() => removeFooterLink(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Operational Contacts */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Operational Contacts</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Public Support Email</label>
                                        <input value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Support Phone Number</label>
                                        <input value={formData.contactPhone} onChange={e => setFormData({...formData, contactPhone: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Store Address</label>
                                        <textarea rows={2} value={formData.contactAddress} onChange={e => setFormData({...formData, contactAddress: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Brand Philosophy */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Type className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Brand Philosophy (Footer)</h3>
                                </div>
                                <textarea rows={5} value={formData.footerAbout} onChange={e => setFormData({...formData, footerAbout: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm leading-relaxed" />
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'homepage' && (
                    <>
                        <div className="space-y-8">
                            {/* Hero Module */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Zap className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Primary Hero Module</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Impact Title</label>
                                        <textarea rows={2} value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-lg font-serif font-black" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Supportive Subtitle</label>
                                        <textarea rows={3} value={formData.heroSubtitle} onChange={e => setFormData({...formData, heroSubtitle: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm leading-relaxed" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Hero Background Image URL</label>
                                        <input value={formData.heroImage || ''} onChange={e => setFormData({...formData, heroImage: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" placeholder="https://..." />
                                    </div>
                                </div>
                            </div>

                            {/* Inner Calm Section */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Heart className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Inner Calm Module</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Title</label>
                                            <input value={formData.innerCalm?.title} onChange={e => setFormData({...formData, innerCalm: {...formData.innerCalm, title: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Subtitle (Above Title)</label>
                                            <input value={formData.innerCalm?.subtitle} onChange={e => setFormData({...formData, innerCalm: {...formData.innerCalm, subtitle: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Paragraph 1</label>
                                        <textarea rows={3} value={formData.innerCalm?.text1} onChange={e => setFormData({...formData, innerCalm: {...formData.innerCalm, text1: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Paragraph 2</label>
                                        <textarea rows={2} value={formData.innerCalm?.text2} onChange={e => setFormData({...formData, innerCalm: {...formData.innerCalm, text2: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Button Text</label>
                                            <input value={formData.innerCalm?.buttonText} onChange={e => setFormData({...formData, innerCalm: {...formData.innerCalm, buttonText: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Button Link</label>
                                            <input value={formData.innerCalm?.buttonLink} onChange={e => setFormData({...formData, innerCalm: {...formData.innerCalm, buttonLink: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Handcrafted Section */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <ImageIcon className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Handcrafted Module</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Title</label>
                                        <input value={formData.handcrafted?.title} onChange={e => setFormData({...formData, handcrafted: {...formData.handcrafted, title: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Subtitle</label>
                                        <input value={formData.handcrafted?.subtitle} onChange={e => setFormData({...formData, handcrafted: {...formData.handcrafted, subtitle: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Background Image URL</label>
                                        <input value={formData.handcrafted?.image} onChange={e => setFormData({...formData, handcrafted: {...formData.handcrafted, image: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Button Text</label>
                                            <input value={formData.handcrafted?.buttonText} onChange={e => setFormData({...formData, handcrafted: {...formData.handcrafted, buttonText: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Button Link</label>
                                            <input value={formData.handcrafted?.buttonLink} onChange={e => setFormData({...formData, handcrafted: {...formData.handcrafted, buttonLink: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Category */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Tag className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Featured Category Section</h3>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Select Category to Feature</label>
                                    <select 
                                        value={formData.featuredCategorySlug} 
                                        onChange={e => setFormData({...formData, featuredCategorySlug: e.target.value})}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm font-bold text-brand-primary outline-none focus:ring-2 focus:ring-brand-primary/10"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <p className="text-[9px] text-brand-muted mt-2 italic">This category will be showcased in the "Featured Singing Bowls" (or similar) section on the homepage.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Flash Sale */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Tag className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Flash Sale Banner</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="flashSaleActive" checked={formData.flashSaleActive || false} onChange={e => setFormData({...formData, flashSaleActive: e.target.checked})} className="w-4 h-4 text-brand-primary border-stone-300 rounded focus:ring-brand-primary" />
                                        <label htmlFor="flashSaleActive" className="ml-2 block text-sm font-bold text-brand-primary">Enable Flash Sale Banner</label>
                                    </div>
                                    {formData.flashSaleActive && (
                                        <>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Flash Sale Text</label>
                                                <input value={formData.flashSaleText || ''} onChange={e => setFormData({...formData, flashSaleText: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Discount Percentage (%)</label>
                                                <input type="number" value={formData.flashSaleDiscount || 0} onChange={e => setFormData({...formData, flashSaleDiscount: parseInt(e.target.value) || 0})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Features Bar */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Star className="w-5 h-5 text-brand-secondary" />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Features Bar</h3>
                                    </div>
                                    <button onClick={addFeature} className="text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">
                                        + Add Feature
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    {(formData.features || []).map((feature, index) => (
                                        <div key={index} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Feature #{index + 1}</span>
                                                <button onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                <input 
                                                    value={feature.text} 
                                                    onChange={e => handleFeatureChange(index, 'text', e.target.value)} 
                                                    placeholder="Feature Text"
                                                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                                />
                                                <input 
                                                    value={feature.icon} 
                                                    onChange={e => handleFeatureChange(index, 'icon', e.target.value)} 
                                                    placeholder="Icon URL"
                                                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'social' && (
                    <>
                        <div className="space-y-8">
                            {/* Social Links */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-5 h-5 text-brand-secondary" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Social Media Presence</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Facebook URL</label>
                                        <input value={formData.socialLinks?.facebook || ''} onChange={e => handleSocialLinkChange('facebook', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" placeholder="https://facebook.com/..." />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Instagram URL</label>
                                        <input value={formData.socialLinks?.instagram || ''} onChange={e => handleSocialLinkChange('instagram', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" placeholder="https://instagram.com/..." />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Twitter URL</label>
                                        <input value={formData.socialLinks?.twitter || ''} onChange={e => handleSocialLinkChange('twitter', e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" placeholder="https://twitter.com/..." />
                                    </div>
                                </div>
                            </div>

                            {/* Instagram Feed */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Instagram className="w-5 h-5 text-brand-secondary" />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Instagram Visual Feed</h3>
                                    </div>
                                    <button onClick={addInstaImage} className="text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">
                                        + Add Image
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Feed Title</label>
                                        <input value={formData.instagram?.title} onChange={e => setFormData({...formData, instagram: {...formData.instagram, title: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        {(formData.instagram?.images || []).map((img, index) => (
                                            <div key={index} className="flex gap-4 items-center">
                                                <input 
                                                    value={img} 
                                                    onChange={e => handleInstaImageChange(index, e.target.value)} 
                                                    placeholder="Image URL"
                                                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                                />
                                                <button onClick={() => removeInstaImage(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Trusted By Section */}
                            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-brand-secondary" />
                                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Trusted Partners Module</h3>
                                    </div>
                                    <button onClick={addTrustedBy} className="text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors">
                                        + Add Partner
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Section Title</label>
                                        <input value={formData.trustedBy?.title} onChange={e => setFormData({...formData, trustedBy: {...formData.trustedBy, title: e.target.value}})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        {(formData.trustedBy?.items || []).map((item, index) => (
                                            <div key={index} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Partner #{index + 1}</span>
                                                    <button onClick={() => removeTrustedBy(index)} className="text-red-500 hover:text-red-700 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input 
                                                        value={item.name} 
                                                        onChange={e => handleTrustedByChange(index, 'name', e.target.value)} 
                                                        placeholder="Partner Name"
                                                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                                    />
                                                    <input 
                                                        value={item.image} 
                                                        onChange={e => handleTrustedByChange(index, 'image', e.target.value)} 
                                                        placeholder="Logo URL"
                                                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm" 
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminSettings;
