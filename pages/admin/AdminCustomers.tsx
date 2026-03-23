
import React, { useState } from 'react';
import { Search, Mail, MoreVertical, ShieldCheck, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataStore } from '../../store/dataStore';
import { cn } from '../../lib/utils';

const AdminCustomers: React.FC = () => {
    const customers = useDataStore(state => state.customers);
    const [search, setSearch] = useState('');

    const filtered = customers.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-serif font-black text-brand-primary">Customer Explorer</h1>
                <p className="text-sm text-brand-muted mt-1">Manage {customers.length} registered members of your Himalayan community.</p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
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
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Explorer Details</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Engagement</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filtered.map((cust) => (
                                <tr key={cust.id} className="hover:bg-stone-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-full bg-brand-footer flex items-center justify-center font-bold text-brand-primary border border-stone-100 shadow-sm">
                                                {cust.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-brand-primary">{cust.name}</p>
                                                <p className="text-[10px] font-medium text-stone-400">{cust.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {cust.isAdmin ? (
                                            <span className="px-3 py-1 bg-brand-primary text-white rounded-full text-[9px] font-black uppercase tracking-widest flex items-center w-fit">
                                                <ShieldCheck className="w-3 h-3 mr-1" /> Master Admin
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[9px] font-black uppercase tracking-widest w-fit">
                                                Verified Member
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs font-bold text-brand-muted uppercase tracking-widest">Active Explorer</p>
                                        <p className="text-[10px] text-stone-400 mt-1">Member since 2024</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button 
                                                onClick={() => {
                                                    const { toggleAdmin } = useDataStore.getState();
                                                    toggleAdmin(cust.id);
                                                }}
                                                className={cn(
                                                    "p-2 rounded-lg transition-colors cursor-pointer",
                                                    cust.isAdmin ? "text-brand-primary hover:bg-brand-primary/10" : "text-stone-400 hover:text-brand-primary hover:bg-stone-50"
                                                )}
                                                title={cust.isAdmin ? "Revoke Admin" : "Promote to Admin"}
                                            >
                                                <ShieldCheck className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-stone-400 hover:text-brand-primary transition-colors cursor-pointer"><Mail className="w-4 h-4" /></button>
                                            <Link to={`/admin/customers/${cust.id}`} className="p-2 text-stone-400 hover:text-brand-primary transition-colors cursor-pointer"><MoreVertical className="w-4 h-4" /></Link>
                                            <button 
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to remove this explorer?')) {
                                                        const { deleteCustomer } = useDataStore.getState();
                                                        deleteCustomer(cust.id);
                                                    }
                                                }}
                                                className="p-2 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
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

export default AdminCustomers;
