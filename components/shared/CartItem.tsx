
import React from 'react';
import type { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useSettingsStore } from '../../store/settingsStore';
import { formatCurrency } from '../../lib/utils';
import { Plus, Minus, Trash2 } from '../Icons';
import Button from '../ui/Button';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const currency = useSettingsStore(state => state.currency);

  return (
    <div className="flex items-start space-x-4 py-4">
      <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-brand-muted text-sm">{formatCurrency(item.price, currency)}</p>
        <div className="flex items-center mt-2">
          <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 h-8">
            <Minus />
          </Button>
          <span className="px-3">{item.quantity}</span>
           <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 h-8">
            <Plus />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{formatCurrency(item.price * item.quantity, currency)}</p>
        <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 mt-2 px-2 h-8">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
