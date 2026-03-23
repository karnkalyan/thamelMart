
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address, Order } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Order) => void;
  updateProfile: (name: string, email: string) => void;
  clearError: () => void;
}

const MOCK_DB = {
  admin: {
    email: 'admin@thamelmart.com',
    password: 'admin123',
    user: {
      id: 'admin-1',
      name: 'Thamel Admin',
      email: 'admin@thamelmart.com',
      addresses: [],
      orders: [],
      isAdmin: true
    }
  },
  customer: {
    email: 'tenzin@himalaya.com',
    password: 'tenzin123',
    user: {
      id: 'user-1',
      name: 'Tenzin Gyatso',
      email: 'tenzin@himalaya.com',
      addresses: [
        {
          id: 'addr-1',
          label: 'Home',
          fullName: 'Tenzin Gyatso',
          street: '123 Peace Avenue',
          city: 'Kathmandu',
          state: 'Bagmati',
          zip: '44600',
          country: 'Nepal',
          isDefault: true,
        }
      ],
      orders: [],
      isAdmin: false
    }
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      error: null,

      login: (email, password) => {
        set({ error: null });
        const lowerEmail = email.toLowerCase();
        
        // 1. Check Admin Credentials
        if (lowerEmail === MOCK_DB.admin.email && password === MOCK_DB.admin.password) {
          set({ user: MOCK_DB.admin.user, isAuthenticated: true });
          return true;
        }

        // 2. Check Demo Customer Credentials
        if (lowerEmail === MOCK_DB.customer.email && password === MOCK_DB.customer.password) {
          set({ user: MOCK_DB.customer.user, isAuthenticated: true });
          return true;
        }

        // 3. Simple validation for any other user (convenience for demo)
        if (password === 'tenzin123' || password === 'admin123') {
           const isAttemptingAdmin = lowerEmail.includes('admin');
           set({ 
             user: { 
               ...(isAttemptingAdmin ? MOCK_DB.admin.user : MOCK_DB.customer.user), 
               email: lowerEmail, 
               name: lowerEmail.split('@')[0],
               isAdmin: isAttemptingAdmin
             }, 
             isAuthenticated: true 
           });
           return true;
        }

        set({ error: 'Invalid credentials. Use admin@thamelmart.com / admin123 or tenzin@himalaya.com / tenzin123' });
        return false;
      },

      logout: () => set({ isAuthenticated: false, user: null, error: null }),

      clearError: () => set({ error: null }),

      addAddress: (newAddr) => {
        const user = get().user;
        if (!user) return;
        const id = `addr-${Date.now()}`;
        const address = { ...newAddr, id };
        
        let addresses = [...user.addresses];
        if (address.isDefault) {
          addresses = addresses.map(a => ({ ...a, isDefault: false }));
        }
        addresses.push(address);
        
        set({ user: { ...user, addresses } });
      },

      removeAddress: (id) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, addresses: user.addresses.filter(a => a.id !== id) } });
      },

      setDefaultAddress: (id) => {
        const user = get().user;
        if (!user) return;
        set({ 
          user: { 
            ...user, 
            addresses: user.addresses.map(a => ({ ...a, isDefault: a.id === id })) 
          } 
        });
      },

      addOrder: (order) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, orders: [order, ...user.orders] } });
      },

      updateProfile: (name, email) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, name, email } });
      }
    }),
    {
      name: 'thamel-mart-auth-v4',
    }
  )
);
