
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, MapPin, Package, ExternalLink, ShieldCheck } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { formatCurrency, cn } from '../../lib/utils';
import { useSettingsStore } from '../../store/settingsStore';

const AdminCustomerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { customers, orders } = useDataStore();
    const currency = useSettingsStore(state => state.currency);

    const customer = customers.find(c => c.id === id);
    const customerOrders = orders.filter(o => o.customerEmail === customer?.email);

    if (!customer) return <div className="p-8 text-center text-brand-muted italic">Profile not found.</div>;

    const lifetimeValue = customerOrders.reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/customers" className="p-2.5 hover:bg-white rounded-xl border border-stone-200 transition-all"><ArrowLeft className="w-5 h-5 text-stone-400" /></Link>
                <div>
                    <h1 className="text-2xl font-serif font-black text-brand-primary leading-none">{customer.name}</h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mt-2">Loyalty Tier: Active Explorer</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-24 h-24 bg-brand-footer rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl font-black text-brand-primary mb-4">
                                {customer.name.charAt(0)}
                            </div>
                            <h3 className="text-xl font-bold text-brand-primary">{customer.name}</h3>
                            <p className="text-xs text-brand-muted">{customer.email}</p>
                        </div>
                        <div className="space-y-4 pt-6 border-t border-stone-100">
                            <div className="flex items-center gap-3 text-brand-muted">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs">Joined {customer.joinDate || '2024'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-brand-muted">
                                <Mail className="w-4 h-4" />
                                <span className="text-xs">{customer.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-brand-primary p-8 rounded-3xl text-white shadow-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Lifetime Value</h4>
                        <div className="text-3xl font-serif font-black mb-4">{formatCurrency(lifetimeValue, currency)}</div>
                        <p className="text-xs opacity-80 leading-relaxed">Total expenditures across {customerOrders.length} completed transactions.</p>
                    </div>
                </div>

                {/* Order History */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary flex items-center gap-2">
                                <Package className="w-4 h-4" /> Transaction History
                            </h3>
                            <span className="text-[10px] font-bold text-stone-400">{customerOrders.length} Total Records</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-stone-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Order</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Date</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {customerOrders.length > 0 ? customerOrders.map(order => (
                                        <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <Link to={`/admin/orders/${order.id}`} className="text-xs font-mono font-bold text-brand-primary hover:text-brand-accent flex items-center gap-2">
                                                    #{order.id} <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-brand-muted">{order.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                                                    order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-brand-footer text-brand-primary'
                                                )}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-xs font-bold">{formatCurrency(order.total, currency)}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="py-12 text-center text-stone-400 text-xs italic">No orders found for this user.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomerDetails;
