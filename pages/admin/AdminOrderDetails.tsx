
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Truck, CheckCircle, Package, MoreHorizontal } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import type { Order } from '../../types';
import { formatCurrency, cn } from '../../lib/utils';
import { useSettingsStore } from '../../store/settingsStore';

const AdminOrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { orders, updateOrderStatus } = useDataStore();
    const [order, setOrder] = useState<Order | null>(null);
    const currency = useSettingsStore(state => state.currency);

    useEffect(() => {
        const found = orders.find(o => o.id === id);
        setOrder(found || null);
    }, [id, orders]);

    if (!order) return <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 font-serif italic text-brand-muted">Order details could not be found.</div>;

    const handleStatusUpdate = (newStatus: Order['status']) => {
        updateOrderStatus(order.id, newStatus);
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <Link to="/admin/orders" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-stone-200 transition-all">
                        <ArrowLeft className="w-5 h-5 text-stone-400" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-serif font-black text-brand-primary">Shipment {order.id}</h1>
                        <p className="text-sm text-brand-muted mt-1">Received {order.date}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="inline-flex items-center px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-brand-muted hover:bg-stone-50 transition-colors cursor-pointer">
                        <Printer className="w-4 h-4 mr-2" /> Invoice
                    </button>
                    <div className="relative group">
                        <button className="inline-flex items-center px-4 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-lg cursor-pointer">
                            Update Stage
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-stone-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                            {(['Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map(s => (
                                <button 
                                    key={s} 
                                    onClick={() => handleStatusUpdate(s)}
                                    className={cn(
                                        "w-full text-left px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors",
                                        order.status === s ? "text-brand-accent bg-stone-50/50" : "text-brand-muted"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                            <h2 className="text-lg font-serif font-bold text-brand-primary flex items-center">
                                <Package className="w-5 h-5 mr-2 text-brand-secondary" /> Manifest & Fulfillment
                            </h2>
                            <span className={cn(
                                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                                order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 
                                order.status === 'Cancelled' ? 'bg-red-50 text-red-700' :
                                'bg-brand-footer text-brand-primary'
                            )}>
                                {order.status}
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex items-center space-x-6">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-100 bg-stone-50">
                                            <img src={item.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-brand-primary">{item.name}</h4>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Qty: {item.quantity} • {formatCurrency(item.price, currency)}</p>
                                        </div>
                                        <p className="text-sm font-black text-brand-primary">{formatCurrency(item.price * item.quantity, currency)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-stone-100 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-brand-muted font-bold uppercase tracking-widest text-[10px]">Financial Manifest</span>
                                    <span className="font-bold text-brand-primary">{formatCurrency(order.total, currency)}</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-stone-200">
                                    <span className="text-lg font-serif font-black text-brand-primary">Settled Total</span>
                                    <span className="text-2xl font-serif font-black text-brand-primary">{formatCurrency(order.total, currency)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-8">Shipment History</h3>
                        <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-stone-100">
                            {[
                                { status: 'Manifest Created', date: order.date, icon: CheckCircle, active: true },
                                { status: 'Payment Authorized', date: order.date, icon: CheckCircle, active: true },
                                { status: 'In Processing', date: order.date, icon: Package, active: order.status !== 'Processing' },
                                { status: 'In Transit', date: 'TBD', icon: Truck, active: order.status === 'Delivered' },
                            ].map((step, i) => (
                                <div key={i} className="flex items-start space-x-6 relative">
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center relative z-10",
                                        step.active ? "bg-brand-primary text-white" : "bg-stone-100 text-stone-400"
                                    )}>
                                        <step.icon className="w-3 h-3" />
                                    </div>
                                    <div>
                                        <p className={cn("text-sm font-bold", step.active ? "text-brand-primary" : "text-stone-400")}>{step.status}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-6">Customer Profile</h3>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-brand-footer flex items-center justify-center font-bold text-brand-primary border border-stone-100">
                                {order.customerName?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-primary">{order.customerName || 'Explorer'}</p>
                                <p className="text-[10px] font-medium text-stone-400">{order.customerEmail || 'No verified email'}</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-stone-100">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Destination</p>
                                <p className="text-xs text-brand-muted leading-relaxed">
                                    {order.shippingAddress.fullName}<br />
                                    {order.shippingAddress.street}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                                    {order.shippingAddress.country}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Settlement Method</p>
                                <p className="text-xs font-bold text-brand-primary">{order.paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-brand-primary p-8 rounded-3xl shadow-xl shadow-brand-primary/20 text-white">
                        <h3 className="text-xs font-black uppercase tracking-widest mb-4">Operations Journal</h3>
                        <textarea 
                            placeholder="Attach internal notes for this shipment..."
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none h-32 mb-4"
                        ></textarea>
                        <button className="w-full py-3 bg-white text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-50 transition-colors cursor-pointer">
                            Log Memo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetails;
