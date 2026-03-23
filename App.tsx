
import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CartPanel from './components/CartPanel';
import { useCartStore } from './store/cartStore';
import { useAuthStore } from './store/authStore';
import { useDataStore } from './store/dataStore';
import TopBar from './components/layout/TopBar';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogDetailPage from './pages/BlogDetailPage';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductEditor from './pages/admin/AdminProductEditor';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetails from './pages/admin/AdminOrderDetails';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminCustomerDetails from './pages/admin/AdminCustomerDetails';
import AdminMessages from './pages/admin/AdminMessages';
import AdminReviews from './pages/admin/AdminReviews';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminSettings from './pages/admin/AdminSettings';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminBlogEditor from './pages/admin/AdminBlogEditor';

const AdminRoute = ({ children }: React.PropsWithChildren) => {
    const { isAuthenticated, user } = useAuthStore();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    if (!user?.isAdmin) {
        return <Navigate to="/account" replace />;
    }
    
    return <AdminLayout>{children}</AdminLayout>;
};

function App() {
  const isCartOpen = useCartStore(state => state.isCartOpen);
  const closeCart = useCartStore(state => state.closeCart);
  
  const user = useAuthStore(state => state.user);
  const syncOrders = useDataStore(state => state.syncOrdersFromUser);
  
  React.useEffect(() => {
    if (user?.orders) {
        syncOrders(user.orders);
    }
  }, [user?.orders, syncOrders]);

  return (
    <HashRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/products/add" element={<AdminRoute><AdminProductEditor /></AdminRoute>} />
        <Route path="/admin/products/edit/:id" element={<AdminRoute><AdminProductEditor /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
        <Route path="/admin/blogs" element={<AdminRoute><AdminBlogs /></AdminRoute>} />
        <Route path="/admin/blogs/add" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
        <Route path="/admin/blogs/edit/:id" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/orders/:id" element={<AdminRoute><AdminOrderDetails /></AdminRoute>} />
        <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
        <Route path="/admin/customers/:id" element={<AdminRoute><AdminCustomerDetails /></AdminRoute>} />
        <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
        <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />
        <Route path="/admin/testimonials" element={<AdminRoute><AdminTestimonials /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />

        {/* Public Routes */}
        <Route path="*" element={
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 bg-brand-background/80 backdrop-blur-sm">
              <TopBar />
              <Header />
            </header>
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
              </Routes>
            </main>
            <Footer />
            <CartPanel isOpen={isCartOpen} onClose={closeCart} />
          </div>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;
