
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useSettingsStore } from '../store/settingsStore';
import { formatCurrency } from '../lib/utils';
import Button from './ui/Button';
import CartItem from './shared/CartItem';
import { X } from './Icons';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const items = useCartStore(state => state.items);
  const currency = useSettingsStore(state => state.currency);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold font-serif">Your Cart</h2>
            <Button variant="ghost" onClick={onClose} className="p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-brand-muted mb-6">Your cart is currently empty.</p>
                <Button onClick={onClose} variant="outline" className="border-brand-primary text-brand-primary">Continue Shopping</Button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="p-6 border-t bg-brand-footer/50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-500 font-medium">Estimated Subtotal</span>
                <span className="text-xl font-bold font-serif text-brand-primary">{formatCurrency(totalPrice, currency)}</span>
              </div>
              <p className="text-[10px] text-brand-muted text-center uppercase tracking-widest">Taxes and shipping calculated at checkout</p>
              <Button size="lg" className="w-full bg-brand-primary hover:bg-brand-primary/90 h-14" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <button 
                onClick={onClose}
                className="w-full text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-colors text-center"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPanel;
