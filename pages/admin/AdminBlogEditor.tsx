
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, ImageIcon, Trash2 } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import type { BlogPost } from '../../types';
import Button from '../../components/ui/Button';

const AdminBlogEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { blogs, addBlog, updateBlog } = useDataStore();

    const [formData, setFormData] = useState<BlogPost>({
        id: '',
        title: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        excerpt: '',
        content: '',
        image: '',
        author: 'Thamel Editor'
    });

    useEffect(() => {
        if (id) {
            const post = blogs.find(b => b.id === id);
            if (post) setFormData(post);
        }
    }, [id, blogs]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const post = { ...formData, id: id || `blog-${Date.now()}` };
        if (id) updateBlog(post);
        else addBlog(post);
        navigate('/admin/blogs');
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link to="/admin/blogs" className="p-2.5 hover:bg-white rounded-xl border border-stone-200 transition-all"><ArrowLeft className="w-5 h-5 text-stone-400" /></Link>
                    <h1 className="text-2xl font-serif font-black text-brand-primary">{id ? 'Refining Article' : 'Drafting Article'}</h1>
                </div>
                <Button onClick={handleSubmit} className="px-8"><Save className="mr-2 w-4 h-4"/> Publish Article</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Headline</label>
                            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-xl font-serif font-bold text-brand-primary" placeholder="Enter an engaging title..." />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Article Body</label>
                            <textarea rows={15} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-sm leading-relaxed" placeholder="Share your story..." />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Cover Visualization</h3>
                        {formData.image ? (
                            <div className="relative rounded-2xl overflow-hidden group">
                                <img src={formData.image} className="w-full aspect-[4/3] object-cover" />
                                <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"><Trash2 className="w-4 h-4"/></button>
                            </div>
                        ) : (
                            <button onClick={() => fileInputRef.current?.click()} className="w-full h-40 border-2 border-dashed border-stone-100 rounded-2xl flex flex-col items-center justify-center text-stone-300 hover:text-brand-primary hover:bg-stone-50 transition-all">
                                <Upload className="mb-2" /> <span className="text-[10px] font-black uppercase">Upload Cover</span>
                            </button>
                        )}
                        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} />
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Short Excerpt</label>
                            <textarea rows={4} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-3 text-xs" placeholder="Used in previews..." />
                        </div>
                    </div>

                    {id && (
                        <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary">Community Comments ({formData.comments?.length || 0})</h3>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {formData.comments && formData.comments.length > 0 ? formData.comments.map(comment => (
                                    <div key={comment.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex justify-between items-start">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-brand-primary truncate">{comment.userName}</span>
                                                <span className="text-[9px] text-stone-400 flex-shrink-0">{comment.date}</span>
                                            </div>
                                            <p className="text-[11px] text-brand-muted leading-relaxed">{comment.text}</p>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const { deleteBlogComment } = useDataStore.getState();
                                                deleteBlogComment(id, comment.id);
                                                setFormData(prev => ({
                                                    ...prev,
                                                    comments: (prev.comments || []).filter(c => c.id !== comment.id)
                                                }));
                                            }}
                                            className="p-1.5 text-stone-400 hover:text-red-500 transition-colors ml-2"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )) : (
                                    <p className="text-[11px] text-stone-400 italic text-center py-4">No comments yet.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminBlogEditor;
