
import React, { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { formatCurrency, cn } from '../../lib/utils';
import { useSettingsStore } from '../../store/settingsStore';
import { Link } from 'react-router-dom';

const AdminOrders: React.FC = () => {
    const orders = useDataStore(state => state.orders);
    const [search, setSearch] = useState('');
    const currency = useSettingsStore(state => state.currency);

    const filtered = orders.filter(o => 
        o.id.toLowerCase().includes(search.toLowerCase()) || 
        o.customerName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-black text-brand-primary">Order Management</h1>
                    <p className="text-sm text-brand-muted mt-1">Found {orders.length} transactions across your store.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                            type="text" 
                            placeholder="Search by Order ID or Customer..." 
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
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Reference</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Customer</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Settlement</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filtered.length > 0 ? filtered.map((order) => (
                                <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs font-bold text-brand-primary">#{order.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-brand-primary">{order.customerName || 'Guest'}</p>
                                        <p className="text-[10px] font-medium text-stone-400">{order.customerEmail}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-brand-muted">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                            order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 
                                            order.status === 'Cancelled' ? 'bg-red-50 text-red-700' :
                                            'bg-brand-footer text-brand-primary'
                                        )}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-brand-primary">{formatCurrency(order.total, currency)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/admin/orders/${order.id}`} className="inline-flex items-center p-2 text-stone-400 hover:text-brand-primary transition-colors cursor-pointer">
                                            <Eye className="w-4 h-4 mr-1.5" /> View
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center text-stone-400 italic text-sm">No orders match your criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
