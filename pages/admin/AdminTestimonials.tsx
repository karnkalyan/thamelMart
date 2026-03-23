
import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Quote, User, Save } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import type { Testimonial } from '../../types';
import Button from '../../components/ui/Button';

const TestimonialModal = ({ isOpen, onClose, testimonial }: { isOpen: boolean; onClose: () => void; testimonial?: Testimonial }) => {
    const { addTestimonial, updateTestimonial } = useDataStore();
    const [formData, setFormData] = useState<Testimonial>(testimonial || { id: '', name: '', quote: '' });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalTestimonial = {
            ...formData,
            id: testimonial?.id || `test-${Date.now()}`
        };
        
        if (testimonial) updateTestimonial(finalTestimonial);
        else addTestimonial(finalTestimonial);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-primary/40 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-stone-100 flex justify-between items-center">
                    <h3 className="text-xl font-serif font-black text-brand-primary">{testimonial ? 'Refine Reflection' : 'New Voice'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-muted mb-2">Customer Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-muted mb-2">Testimonial Quote</label>
                        <div className="relative">
                            <Quote className="absolute left-4 top-4 w-4 h-4 text-stone-400" />
                            <textarea required rows={4} value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10 leading-relaxed" />
                        </div>
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-stone-200 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-muted hover:bg-stone-50 transition-all">Cancel</button>
                        <button type="submit" className="flex-1 py-3 bg-brand-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/95 transition-all shadow-lg flex items-center justify-center">
                            <Save className="w-4 h-4 mr-2" /> Save Voice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminTestimonials: React.FC = () => {
    const { testimonials, deleteTestimonial } = useDataStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | undefined>();

    const handleEdit = (t: Testimonial) => {
        setEditingTestimonial(t);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingTestimonial(undefined);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} testimonial={editingTestimonial} />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-black text-brand-primary">Words of Wellness</h1>
                    <p className="text-sm text-brand-muted mt-1">Manage customer testimonials and brand endorsements.</p>
                </div>
                <button onClick={handleAdd} className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm hover:shadow-md transition-all relative group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-brand-footer rounded-2xl">
                                <Quote className="w-6 h-6 text-brand-secondary" />
                            </div>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(t)} className="p-2 bg-stone-50 text-stone-400 hover:text-brand-primary rounded-lg transition-all cursor-pointer"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => deleteTestimonial(t.id)} className="p-2 bg-stone-50 text-stone-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <p className="text-lg font-serif italic text-brand-primary mb-6 leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center gap-3 border-t border-stone-100 pt-6">
                            <div className="w-10 h-10 rounded-full bg-brand-footer flex items-center justify-center text-brand-primary font-bold">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-primary">{t.name}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Verified Customer</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {testimonials.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 border-dashed">
                    <Quote className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                    <p className="text-stone-400 font-serif italic">No voices shared yet. Be the first to add a testimonial.</p>
                </div>
            )}
        </div>
    );
};

export default AdminTestimonials;
