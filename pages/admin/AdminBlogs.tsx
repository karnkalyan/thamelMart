
import React from 'react';
import { Plus, Search, Edit, Trash2, Calendar } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { Link } from 'react-router-dom';

const AdminBlogs: React.FC = () => {
    const { blogs, deleteBlog } = useDataStore();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-black text-brand-primary">Blog Journal</h1>
                    <p className="text-sm text-brand-muted mt-1">Compose and manage your storytelling content.</p>
                </div>
                <Link to="/admin/blogs/add" className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg">
                    <Plus className="w-4 h-4 mr-2" /> Compose Article
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(post => (
                    <div key={post.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
                        <div className="h-48 relative overflow-hidden">
                            <img src={post.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/admin/blogs/edit/${post.id}`} className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white hover:text-brand-primary transition-all"><Edit className="w-4 h-4"/></Link>
                                <button onClick={() => deleteBlog(post.id)} className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-red-500 transition-all"><Trash2 className="w-4 h-4"/></button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-stone-400 text-[9px] font-black uppercase tracking-widest mb-3">
                                <Calendar className="w-3 h-3" /> {post.date}
                            </div>
                            <h3 className="text-lg font-serif font-bold text-brand-primary mb-3 line-clamp-2">{post.title}</h3>
                            <p className="text-xs text-brand-muted leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBlogs;
