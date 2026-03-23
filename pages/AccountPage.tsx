
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';
import Button from '../components/ui/Button';
import { formatCurrency, cn } from '../lib/utils';
import { 
  User as UserIcon, 
  MapPin, 
  ShoppingCart, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  ArrowRight,
  X
} from '../components/Icons';

const AddressModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const addAddress = useAuthStore(state => state.addAddress);
  const [formData, setFormData] = useState({
    label: 'Home',
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Nepal',
    isDefault: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(formData);
    onClose();
    setFormData({ label: 'Home', fullName: '', street: '', city: '', state: '', zip: '', country: 'Nepal', isDefault: false });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-stone-100">
          <h3 className="text-xl font-serif font-bold text-brand-primary">Add New Address</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Label</label>
              <input required value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-primary" placeholder="Home, Office..." />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Full Name</label>
              <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-primary" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Street Address</label>
            <input required value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">City</label>
              <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-primary" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">State / Region</label>
              <input required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Zip Code</label>
              <input required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-primary" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Country</label>
              <select value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-primary">
                <option value="Nepal">Nepal</option>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer pt-2">
            <input type="checkbox" checked={formData.isDefault} onChange={e => setFormData({...formData, isDefault: e.target.checked})} className="rounded text-brand-primary focus:ring-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">Set as default address</span>
          </label>
          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-12">Cancel</Button>
            <Button type="submit" className="flex-1 h-12">Save Address</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center space-x-3 px-6 py-4 border-l-4 transition-all w-full text-left",
      active 
        ? 'bg-brand-primary/5 border-brand-primary text-brand-primary font-bold' 
        : 'border-transparent text-brand-muted hover:bg-stone-50'
    )}
  >
    <span className={active ? 'text-brand-primary' : 'text-stone-400'}>{icon}</span>
    <span className="uppercase tracking-[0.1em] text-[10px] sm:text-xs">{label}</span>
  </button>
);

const AccountPage: React.FC = () => {
  const { user, logout, removeAddress, setDefaultAddress, updateProfile, isAuthenticated } = useAuthStore();
  const { currency } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileData.name, profileData.email);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  return (
    <div className="bg-brand-background min-h-screen py-12">
      <AddressModal isOpen={isAddrModalOpen} onClose={() => setIsAddrModalOpen(false)} />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden sticky top-24">
              <div className="p-8 border-b border-stone-100 text-center">
                <div className="w-20 h-20 bg-brand-footer rounded-full mx-auto mb-4 flex items-center justify-center border border-stone-100">
                  <UserIcon className="w-10 h-10 text-brand-primary" />
                </div>
                <h2 className="font-serif text-xl font-bold text-brand-primary truncate px-2">{user?.name}</h2>
                <p className="text-[10px] uppercase font-bold tracking-widest text-brand-muted mt-1 truncate">{user?.email}</p>
              </div>
              
              <div className="flex flex-col py-2">
                <TabButton 
                  active={activeTab === 'orders'} 
                  onClick={() => setActiveTab('orders')} 
                  icon={<ShoppingCart className="w-4 h-4" />} 
                  label="My Orders" 
                />
                <TabButton 
                  active={activeTab === 'addresses'} 
                  onClick={() => setActiveTab('addresses')} 
                  icon={<MapPin className="w-4 h-4" />} 
                  label="Addresses" 
                />
                <TabButton 
                  active={activeTab === 'profile'} 
                  onClick={() => setActiveTab('profile')} 
                  icon={<ShieldCheck className="w-4 h-4" />} 
                  label="Account Info" 
                />
              </div>

              <div className="p-6 border-t border-stone-100">
                <button 
                  onClick={logout}
                  className="w-full py-3 rounded-lg border border-red-100 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-10 min-h-[600px]">
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="animate-in fade-in duration-500">
                  <h2 className="text-2xl font-serif font-bold text-brand-primary mb-8 border-b border-stone-100 pb-4">Purchase History</h2>
                  
                  {!user?.orders || user.orders.length === 0 ? (
                    <div className="py-24 text-center border-2 border-dashed border-stone-100 rounded-3xl bg-stone-50/30">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <ShoppingCart className="w-8 h-8 text-stone-200" />
                      </div>
                      <p className="text-brand-muted italic mb-8 max-w-xs mx-auto">It looks like you haven't brought any treasures home yet.</p>
                      <Link to="/" className="inline-flex items-center px-8 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all shadow-md">
                        Start Exploring <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {user.orders.map(order => (
                        <div key={order.id} className="border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                          <div className="bg-stone-50/50 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-100">
                            <div className="flex gap-8">
                              <div>
                                <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-1">Date</p>
                                <p className="text-sm font-semibold">{order.date}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-1">Total</p>
                                <p className="text-sm font-bold text-brand-primary">{formatCurrency(order.total, currency)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-1">Order Ref</p>
                              <p className="text-sm font-mono text-stone-400">#{order.id.split('-')[1]}</p>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-brand-footer text-brand-primary'
                              )}>
                                • {order.status}
                              </span>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Payment: {order.paymentMethod}</p>
                            </div>
                            <div className="space-y-4">
                              {order.items.map(item => (
                                <div key={item.id} className="flex items-center gap-5 p-3 rounded-xl hover:bg-stone-50 transition-colors">
                                  <div className="w-14 h-14 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-sm font-bold text-brand-text line-clamp-1">{item.name}</h4>
                                    <p className="text-xs text-brand-muted mt-0.5">Quantity: {item.quantity} • {formatCurrency(item.price, currency)}</p>
                                  </div>
                                  <Link to={`/product/${item.id}`} className="text-[10px] font-bold uppercase tracking-widest text-brand-primary px-3 py-1.5 border border-stone-200 rounded-full hover:bg-white hover:shadow-sm transition-all whitespace-nowrap">View Item</Link>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-stone-100">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-brand-muted mb-2">Shipping To:</p>
                                <p className="text-xs text-brand-muted">{order.shippingAddress.fullName} • {order.shippingAddress.street}, {order.shippingAddress.city}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="animate-in fade-in duration-500">
                  <div className="flex items-center justify-between mb-8 border-b border-stone-100 pb-4">
                    <h2 className="text-2xl font-serif font-bold text-brand-primary">Stored Addresses</h2>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddrModalOpen(true)}
                      className="text-[10px] uppercase tracking-widest font-bold px-5 h-10 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
                    >
                      <Plus className="w-4 h-4 mr-2" /> New Address
                    </Button>
                  </div>

                  {user?.addresses.length === 0 ? (
                    <div className="py-20 text-center text-brand-muted italic">No addresses saved yet.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {user?.addresses.map(addr => (
                        <div key={addr.id} className={cn(
                          "p-6 rounded-2xl border-2 transition-all relative group shadow-sm hover:shadow-md",
                          addr.isDefault ? 'border-brand-primary bg-brand-primary/5' : 'border-stone-100 bg-white'
                        )}>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                              {addr.label}
                            </span>
                            <div className="flex items-center gap-1">
                               <button onClick={() => removeAddress(addr.id)} className="text-stone-300 hover:text-red-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                          <p className="font-serif text-lg font-bold text-brand-text mb-2">{addr.fullName}</p>
                          <div className="space-y-0.5 text-xs text-brand-muted leading-relaxed">
                            <p>{addr.street}</p>
                            <p>{addr.city}, {addr.state} {addr.zip}</p>
                            <p>{addr.country}</p>
                          </div>
                          <div className="mt-5 flex items-center justify-between">
                            {addr.isDefault ? (
                                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-primary flex items-center">
                                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Primary Address
                                </span>
                            ) : (
                                <button 
                                    onClick={() => setDefaultAddress(addr.id)}
                                    className="text-[9px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-colors underline decoration-dotted underline-offset-4"
                                >
                                    Make Default
                                </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="animate-in fade-in duration-500 max-w-xl">
                  <h2 className="text-2xl font-serif font-bold text-brand-primary mb-8 border-b border-stone-100 pb-4">Personal Details</h2>
                  
                  {profileSuccess && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest rounded-xl border border-green-100 animate-in slide-in-from-top-2">
                        Profile updated successfully!
                    </div>
                  )}

                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Full Name</label>
                      <input 
                        required
                        value={profileData.name}
                        onChange={e => setProfileData({...profileData, name: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Email Identity</label>
                      <input 
                        required
                        type="email"
                        value={profileData.email}
                        onChange={e => setProfileData({...profileData, email: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2">Security</label>
                      <div className="flex items-center justify-between p-4 bg-stone-100/50 rounded-xl border border-stone-200/50">
                        <span className="text-sm font-mono text-stone-400">••••••••••••</span>
                        <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:underline">Change</button>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button type="submit" className="h-14 px-10 font-bold uppercase tracking-[0.1em] text-xs shadow-lg shadow-brand-primary/10">Update Information</Button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
