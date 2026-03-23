
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';
import { formatCurrency } from '../lib/utils';
import Button from '../components/ui/Button';
import { ShieldCheck, ArrowRight, Truck } from '../components/Icons';

const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuthStore();
  const { currency } = useSettingsStore();

  const order = user?.orders.find(o => o.id === orderId);

  if (!order) return <Navigate to="/account" replace />;

  return (
    <div className="bg-brand-background min-h-[80vh] flex items-center py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-10 sm:p-16 rounded-3xl shadow-xl border border-stone-200 text-center animate-in zoom-in-95 duration-500">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-8">
            <ShieldCheck className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-primary mb-4">Namaste!</h1>
          <p className="text-lg text-brand-muted mb-8 leading-relaxed">
            Your order <strong>{order.id}</strong> has been successfully placed. We're getting your Himalayan treasures ready for their journey to you.
          </p>

          <div className="bg-stone-50 rounded-2xl p-6 mb-10 text-left space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <Truck className="w-5 h-5" />
              <p className="text-sm font-bold uppercase tracking-widest">Tracking Information</p>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              We will send you a confirmation email shortly with your tracking number. Expected delivery is within 5-7 business days to:
            </p>
            <p className="text-sm font-bold text-brand-text italic">
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.country}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button as={Link} to="/account" variant="outline" className="flex-1 h-14 border-brand-primary text-brand-primary">
              View Order History
            </Button>
            <Button as={Link} to="/" className="flex-1 h-14 bg-brand-primary text-white">
              Back to Shop <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
