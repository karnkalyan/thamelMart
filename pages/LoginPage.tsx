
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import { Mail, ArrowRight, X } from '../components/Icons';
import { Eye, EyeOff, Info, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearError, isAuthenticated, user } = useAuthStore();

  // Get path to redirect back after login for regular users
  const from = (location.state as any)?.from?.pathname || "/account";

  // Handle automatic redirection if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
    return () => clearError();
  }, [isAuthenticated, user, navigate, from, clearError]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    // Redirection happens in the useEffect above once isAuthenticated becomes true
  };

  const fillCredentials = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      setEmail('admin@thamelmart.com');
      setPassword('admin123');
    } else {
      setEmail('tenzin@himalaya.com');
      setPassword('tenzin123');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-brand-background py-12 px-4">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-stone-200/50 text-center relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-footer rounded-full mb-8 border-4 border-white shadow-sm">
              <Lock className="w-8 h-8 text-brand-primary" />
            </div>
            <h1 className="text-4xl font-serif font-black text-brand-primary mb-3">Gateway to Thamel</h1>
            <p className="text-brand-muted mb-10 text-sm font-medium">Please verify your identity to continue.</p>

            {error && (
              <div className="mb-8 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 flex items-center justify-between">
                <span>{error}</span>
                <button onClick={clearError}><X className="w-4 h-4" /></button>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6 text-left">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 pl-12 outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary/20 transition-all font-medium"
                  />
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-brand-primary transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-2 ml-1">Secret Password</label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 pl-12 pr-12 outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary/20 transition-all font-medium"
                  />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-brand-primary transition-colors" />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-brand-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-16 bg-brand-primary hover:bg-brand-primary/95 text-white text-sm font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 transition-all active:scale-[0.98]">
                Unlock Account <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            {/* Demo Credentials Box */}
            <div className="mt-10 p-5 bg-brand-footer/50 rounded-[1.5rem] border border-stone-200/50 text-left">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-brand-secondary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Demo Credentials (Click to fill)</span>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => fillCredentials('admin')}
                  className="w-full text-left bg-white/80 p-3 rounded-xl border border-stone-100 hover:border-brand-primary/30 transition-all"
                >
                  <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Administrator Access</p>
                  <p className="text-[11px] font-mono text-brand-text">User: admin@thamelmart.com</p>
                  <p className="text-[11px] font-mono text-brand-text">Pass: admin123</p>
                </button>
                <button 
                  onClick={() => fillCredentials('customer')}
                  className="w-full text-left bg-white/80 p-3 rounded-xl border border-stone-100 hover:border-brand-primary/30 transition-all"
                >
                  <p className="text-[10px] font-bold text-brand-muted uppercase mb-1">Customer Access</p>
                  <p className="text-[11px] font-mono text-brand-text">User: tenzin@himalaya.com</p>
                  <p className="text-[11px] font-mono text-brand-text">Pass: tenzin123</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
