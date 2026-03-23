
import React from 'react';
import { ShoppingBag, DollarSign, ArrowUpRight, ArrowRight, TrendingUp, Package, Mail } from 'lucide-react';
import { formatCurrency, cn } from '../../lib/utils';
import { useSettingsStore } from '../../store/settingsStore';
import { useDataStore } from '../../store/dataStore';
import { Link } from 'react-router-dom';

const StatCard = ({ label, value, icon: Icon, trend, color, link }: any) => (
    <Link to={link || '#'} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform", color)}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            {trend && (
                <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">
                    <TrendingUp className="w-3 h-3 mr-1" /> {trend}
                </div>
            )}
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1">{label}</p>
        <h3 className="text-2xl font-serif font-black text-brand-primary">{value}</h3>
    </Link>
);

const AdminDashboard: React.FC = () => {
    const currency = useSettingsStore(state => state.currency);
    const { products, orders, messages } = useDataStore();
    
    const totalRevenue = orders.filter(o => o.status !== 'Cancelled').reduce((acc, o) => acc + o.total, 0);
    const newMessages = messages.filter(m => m.status === 'new').length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-black text-brand-primary">Command Center</h1>
                    <p className="text-sm text-brand-muted mt-1">Foundational insights for Thamel Mart operations.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Revenue" value={formatCurrency(totalRevenue, currency)} icon={DollarSign} trend="+12.5%" color="bg-brand-primary" link="/admin/orders" />
                <StatCard label="Live Orders" value={orders.length} icon={ShoppingBag} trend="+8.2%" color="bg-brand-accent" link="/admin/orders" />
                <StatCard label="Items in Vault" value={products.length} icon={Package} color="bg-stone-400" link="/admin/products" />
                <StatCard label="New Inquiries" value={newMessages} icon={Mail} color="bg-brand-secondary" link="/admin/messages" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                        <h2 className="text-lg font-serif font-bold text-brand-primary">Recent Transactions</h2>
                        <Link to="/admin/orders" className="text-[10px] font-black uppercase tracking-widest text-brand-accent hover:underline flex items-center">Manage All <ArrowRight className="ml-1 w-3 h-3" /></Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-stone-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Order ID</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Customer</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Stage</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {orders.length > 0 ? orders.slice(0, 5).map((row) => (
                                    <tr key={row.id} className="hover:bg-stone-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs font-bold text-stone-400">#{row.id}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-brand-primary">{row.customerName || 'Explorer'}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                                row.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-brand-footer text-brand-primary'
                                            )}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-brand-primary">{formatCurrency(row.total, currency)}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-stone-400 italic text-sm">Waiting for the first shipment...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-6">
                    <h2 className="text-lg font-serif font-bold text-brand-primary mb-6">Popular Treasures</h2>
                    <div className="space-y-6">
                        {products.slice(0, 4).map((prod) => (
                            <div key={prod.id} className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-stone-100 flex-shrink-0">
                                    <img src={prod.images[0]} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-brand-primary truncate">{prod.name}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">{prod.category.replace('-', ' ')}</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-brand-accent" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
