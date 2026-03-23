
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useDataStore } from '../store/dataStore';
import { useSettingsStore } from '../store/settingsStore';
import { formatCurrency, cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { MapPin, ShieldCheck, Truck, ArrowRight, Plus, CreditCard } from '../components/Icons';
import type { Order } from '../types';

const StepIndicator = ({ step }: { step: string }) => (
  <div className="flex items-center justify-center space-x-2 sm:space-x-8 mb-12">
    {[
      { id: 'shipping', label: '1. Shipping' },
      { id: 'payment', label: '2. Payment' },
      { id: 'review', label: '3. Review' }
    ].map((s, i) => (
      <React.Fragment key={s.id}>
        <div className={cn(
          "text-[10px] sm:text-xs font-black uppercase tracking-widest pb-3 border-b-2 transition-all",
          step === s.id ? "text-brand-primary border-brand-primary" : "text-stone-300 border-transparent"
        )}>
          {s.label}
        </div>
        {i < 2 && <ArrowRight className="w-3 h-3 text-stone-200 hidden sm:block" />}
      </React.Fragment>
    ))}
  </div>
);

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const addOrderToUser = useAuthStore(state => state.addOrder);
  const addOrderToGlobal = useDataStore(state => state.addOrder);
  const addAddress = useAuthStore(state => state.addAddress);
  const currency = useSettingsStore(state => state.currency);

  const totalPrice = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items]);

  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [selectedAddressId, setSelectedAddressId] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Shipping',
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Nepal',
    isDefault: true
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true });
    } else if (items.length === 0) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, items.length, navigate, location]);

  useEffect(() => {
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
      setSelectedAddressId(defaultAddr.id);
    } else {
      setShowNewAddressForm(true);
    }
  }, [user?.addresses]);

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return;
    
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    
    const shippingAddress = user?.addresses.find(a => a.id === selectedAddressId) || user!.addresses[0];
    const orderData: Order = {
      id: `${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Processing',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.images[0]
      })),
      total: totalPrice,
      shippingAddress,
      paymentMethod,
      customerEmail: user?.email,
      customerName: user?.name
    };

    // Save to both User state and Global Admin state
    addOrderToUser(orderData);
    addOrderToGlobal(orderData);
    
    clearCart();
    navigate(`/order-success/${orderData.id}`);
  };

  return (
    <div className="bg-brand-background min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary text-center mb-4">Secure Checkout</h1>
        <p className="text-center text-brand-muted mb-12 font-medium">Finalize your Himalayan collection journey.</p>
        
        <StepIndicator step={step} />

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 sm:p-10">
              {step === 'shipping' && (
                <div className="animate-in fade-in duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif font-bold text-brand-primary">Delivery Destination</h2>
                  </div>
                  <div className="space-y-4">
                    {user?.addresses.map(addr => (
                      <label key={addr.id} className={cn("flex items-start p-6 rounded-2xl border-2 cursor-pointer transition-all", selectedAddressId === addr.id ? "border-brand-primary bg-brand-primary/5 shadow-md" : "border-stone-100 bg-white")}>
                        <input type="radio" className="sr-only" checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} />
                        <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-stone-300">
                          {selectedAddressId === addr.id && <div className="h-2.5 w-2.5 rounded-full bg-brand-primary" />}
                        </div>
                        <div className="ml-5">
                          <p className="font-serif text-lg font-bold text-brand-text">{addr.fullName} {addr.isDefault && <span className="ml-2 text-[8px] bg-brand-primary text-white px-2 rounded-full uppercase">Default</span>}</p>
                          <p className="text-sm text-brand-muted mt-1">{addr.street}, {addr.city}, {addr.country}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-end">
                    <Button size="lg" disabled={!selectedAddressId} onClick={() => setStep('payment')} className="px-12 rounded-full h-14">Continue to Payment</Button>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="text-2xl font-serif font-bold text-brand-primary mb-8 border-b border-stone-100 pb-4">Secure Payment Method</h2>
                  <div className="space-y-4">
                    {['Credit Card', 'PayPal'].map(method => (
                      <label key={method} className={cn("flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all", paymentMethod === method ? "border-brand-primary bg-brand-primary/5 shadow-md" : "border-stone-100 bg-white")}>
                        <input type="radio" className="sr-only" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-stone-300">
                          {paymentMethod === method && <div className="h-2.5 w-2.5 rounded-full bg-brand-primary" />}
                        </div>
                        <span className="ml-5 font-bold text-brand-text text-lg">{method}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-between items-center">
                    <Button variant="ghost" onClick={() => setStep('shipping')} className="text-stone-400">Back</Button>
                    <Button size="lg" onClick={() => setStep('review')} className="px-12 rounded-full h-14">Review Order</Button>
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div className="animate-in fade-in duration-500 text-center">
                    <h2 className="text-2xl font-serif font-bold text-brand-primary mb-8 border-b border-stone-100 pb-4">Review Your Selection</h2>
                    <div className="p-8 bg-stone-50 rounded-2xl text-left mb-8">
                        <p className="text-sm font-bold text-brand-text mb-2">Shipping To:</p>
                        <p className="text-sm text-brand-muted">{user?.addresses.find(a => a.id === selectedAddressId)?.fullName}</p>
                        <p className="text-sm text-brand-muted">{user?.addresses.find(a => a.id === selectedAddressId)?.street}</p>
                    </div>
                    <Button size="lg" onClick={handlePlaceOrder} disabled={isProcessing} className="w-full h-16 rounded-full text-xl font-serif">
                        {isProcessing ? 'Processing Transaction...' : 'Place My Order'}
                    </Button>
                </div>
              )}
            </div>
          </div>
          <aside className="lg:w-1/3">
             <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 sticky top-24">
                <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-6">Order Manifest</h3>
                <div className="space-y-4 mb-8">
                    {items.map(item => (
                        <div key={item.id} className="flex gap-4">
                            <img src={item.images[0]} className="w-12 h-12 object-cover rounded-lg" />
                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-brand-text line-clamp-1">{item.name}</p>
                                <p className="text-[9px] text-stone-400">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-xs font-bold">{formatCurrency(item.price * item.quantity, currency)}</p>
                        </div>
                    ))}
                </div>
                <div className="pt-6 border-t border-stone-200 space-y-2">
                    <div className="flex justify-between text-lg font-serif font-black text-brand-primary">
                        <span>Grand Total</span>
                        <span>{formatCurrency(totalPrice, currency)}</span>
                    </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
