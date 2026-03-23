
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Package, 
    Layers, 
    Users, 
    ShoppingBag, 
    LogOut,
    Bell,
    Settings,
    Search,
    Mail,
    Palette,
    FileText,
    Star,
    Quote
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

import { motion, AnimatePresence } from 'motion/react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const SidebarLink = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
    <Link 
        to={to} 
        className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
            active 
                ? "text-white" 
                : "text-brand-muted hover:bg-stone-100 hover:text-brand-primary"
        )}
    >
        {active && (
            <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 bg-brand-primary rounded-xl shadow-lg shadow-brand-primary/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
        <Icon className={cn("w-5 h-5 relative z-10", active ? "text-white" : "text-stone-400 group-hover:text-brand-primary")} />
        <span className="text-sm font-semibold tracking-wide relative z-10">{label}</span>
    </Link>
);

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAuthStore(state => state.logout);
    const user = useAuthStore(state => state.user);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-stone-50 overflow-hidden font-sans">
            <aside className="w-72 bg-white border-r border-stone-200 flex flex-col">
                <div className="p-8">
                    <Link to="/admin" className="text-2xl font-serif font-black text-brand-primary tracking-tight">
                        TM<span className="text-brand-secondary">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 mt-4">Main Menu</p>
                    <SidebarLink to="/admin" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/admin'} />
                    <SidebarLink to="/admin/products" icon={Package} label="Product Catalog" active={location.pathname.startsWith('/admin/products')} />
                    <SidebarLink to="/admin/categories" icon={Layers} label="Collections" active={location.pathname.startsWith('/admin/categories')} />
                    
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 mt-8">Operations</p>
                    <SidebarLink to="/admin/orders" icon={ShoppingBag} label="Orders Tracking" active={location.pathname.startsWith('/admin/orders')} />
                    <SidebarLink to="/admin/customers" icon={Users} label="Customer Intelligence" active={location.pathname.startsWith('/admin/customers')} />
                    <SidebarLink to="/admin/messages" icon={Mail} label="Inquiries" active={location.pathname.startsWith('/admin/messages')} />
                    <SidebarLink to="/admin/reviews" icon={Star} label="Reflections" active={location.pathname.startsWith('/admin/reviews')} />
                    <SidebarLink to="/admin/testimonials" icon={Quote} label="Voices" active={location.pathname.startsWith('/admin/testimonials')} />
                    
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 mt-8">Content CMS</p>
                    <SidebarLink to="/admin/blogs" icon={FileText} label="Blog Journal" active={location.pathname.startsWith('/admin/blogs')} />
                    <SidebarLink to="/admin/settings" icon={Palette} label="Site Identity" active={location.pathname.startsWith('/admin/settings')} />
                </nav>

                <div className="p-4 border-t border-stone-100">
                    <Link to="/" className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-brand-muted hover:bg-stone-50 transition-all font-semibold text-sm mb-2">
                        <Settings className="w-5 h-5" />
                        <span>View Live Store</span>
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all font-semibold text-sm cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-20 bg-white border-b border-stone-200 px-8 flex items-center justify-between">
                    <div className="flex items-center flex-1 max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                            type="text" 
                            placeholder="Global Search..." 
                            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative p-2 text-stone-400 hover:text-brand-primary transition-colors cursor-pointer">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-stone-200"></div>
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-brand-primary">{user?.name}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Master Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-brand-footer border border-stone-200 flex items-center justify-center font-bold text-brand-primary shadow-sm">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 bg-stone-50/50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
