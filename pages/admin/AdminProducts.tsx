
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { formatCurrency, cn } from '../../lib/utils';
import { useSettingsStore } from '../../store/settingsStore';
import { Link, useNavigate } from 'react-router-dom';

const AdminProducts: React.FC = () => {
    const navigate = useNavigate();
    const { products, deleteProduct } = useDataStore();
    const [search, setSearch] = useState('');
    const currency = useSettingsStore(state => state.currency);

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-black text-brand-primary">Inventory Management</h1>
                    <p className="text-sm text-brand-muted mt-1">Manage {products.length} active treasures in your catalog.</p>
                </div>
                <Link to="/admin/products/add" className="inline-flex items-center px-6 py-3 bg-brand-primary text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/10 cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" /> New Product
                </Link>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                            type="text" 
                            placeholder="Search catalog..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-50/50">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Product</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Category</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Pricing</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Inventory</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filtered.map((prod) => (
                                <tr key={prod.id} className="hover:bg-stone-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-stone-100 flex-shrink-0">
                                                <img src={prod.images[0]} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-brand-primary truncate">{prod.name}</p>
                                                <p className="text-[10px] font-mono text-stone-400">#{prod.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted bg-stone-100 px-3 py-1 rounded-full">{prod.category.replace('-', ' ')}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-brand-primary">{formatCurrency(prod.price, currency)}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                            prod.tags?.includes('Sold Out') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
                                        )}>
                                            {prod.tags?.includes('Sold Out') ? 'Out of Stock' : 'Available'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <Link to={`/product/${prod.id}`} target="_blank" className="p-2 text-stone-400 hover:text-brand-primary transition-colors cursor-pointer"><ExternalLink className="w-4 h-4" /></Link>
                                            <Link to={`/admin/products/edit/${prod.id}`} className="p-2 text-stone-400 hover:text-brand-primary transition-colors cursor-pointer"><Edit className="w-4 h-4" /></Link>
                                            <button onClick={() => deleteProduct(prod.id)} className="p-2 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
