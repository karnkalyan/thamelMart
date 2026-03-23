
import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import type { Category } from '../../types';

const CategoryModal = ({ isOpen, onClose, category }: { isOpen: boolean; onClose: () => void; category?: Category }) => {
    const { addCategory, updateCategory } = useDataStore();
    const [formData, setFormData] = useState<Partial<Category>>(category || { name: '', slug: '', image: '' });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalCategory = {
            ...formData,
            id: category?.id || `cat-${Date.now()}`,
            slug: formData.slug || formData.name?.toLowerCase().replace(/\s+/g, '-') || ''
        } as Category;
        
        if (category) updateCategory(finalCategory);
        else addCategory(finalCategory);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-primary/40 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-stone-100 flex justify-between items-center">
                    <h3 className="text-xl font-serif font-black text-brand-primary">{category ? 'Modify Category' : 'New Collection'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-muted mb-2">Display Name</label>
                        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-muted mb-2">Cover Image URL</label>
                        <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10" />
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-stone-200 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-muted hover:bg-stone-50 transition-all">Cancel</button>
                        <button type="submit" className="flex-1 py-3 bg-brand-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/95 transition-all shadow-lg">Save Collection</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminCategories: React.FC = () => {
    const { categories, deleteCategory, products } = useDataStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>();

    const handleEdit = (c: Category) => {
        setEditingCategory(c);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingCategory(undefined);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} category={editingCategory} />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-black text-brand-primary">Collections</h1>
                    <p className="text-sm text-brand-muted mt-1">Found {categories.length} active collection types.</p>
                </div>
                <button onClick={handleAdd} className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/10 cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" /> New Collection
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat.slug).length;
                    return (
                        <div key={cat.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
                            <div className="h-48 relative overflow-hidden">
                                <img src={cat.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                    <h3 className="text-2xl font-serif font-bold text-white">{cat.name}</h3>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEdit(cat)} className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white hover:text-brand-primary transition-all cursor-pointer"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => deleteCategory(cat.id)} className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-red-500 hover:text-white transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-stone-50/50 border-t border-stone-100 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">URL Slug: /{cat.slug}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent">{count} Treasures</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminCategories;
