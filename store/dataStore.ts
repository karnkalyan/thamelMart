
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts, categories as initialCategories, blogPosts as initialBlogs, testimonials as initialTestimonials } from '../lib/mockData';
import type { Product, Category, Order, User, BlogPost, Testimonial, Feature, BlogComment, Review, TrustedByItem } from '../types';

export interface SiteSettings {
  promoText: string;
  marqueeText: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  footerAbout: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  trendingProducts: string[];
  featuredProducts: string[];
  newArrivals: string[];
  popularProducts: string[];
  bestSellers: string[];
  flashSaleActive: boolean;
  flashSaleText: string;
  flashSaleDiscount: number;
  features: Feature[];
  innerCalm: {
    title: string;
    subtitle: string;
    text1: string;
    text2: string;
    buttonText: string;
    buttonLink: string;
  };
  handcrafted: {
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
    buttonLink: string;
  };
  instagram: {
    title: string;
    images: string[];
  };
  trustedBy: {
    title: string;
    items: TrustedByItem[];
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  headerLinks: { label: string; url: string }[];
  footerLinks: { label: string; url: string }[];
  featuredCategorySlug: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

interface DataState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  customers: User[];
  settings: SiteSettings;
  
  // Product Actions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Blog Actions
  addBlog: (blog: BlogPost) => void;
  updateBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;
  addBlogComment: (blogId: string, comment: Omit<BlogComment, 'id' | 'date'>) => void;
  deleteBlogComment: (blogId: string, commentId: string) => void;

  // Customer/User Actions
  toggleAdmin: (userId: string) => void;
  deleteCustomer: (userId: string) => void;

  // Testimonial Actions
  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  
  // Order Actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  syncOrdersFromUser: (userOrders: Order[]) => void;
  
  // Category Actions
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  
  // Message Actions
  addMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  
  // Settings Actions
  updateSettings: (settings: Partial<SiteSettings>) => void;

  // Global Review Actions
  deleteReview: (productId: string, reviewId: string) => void;
  updateReview: (productId: string, review: Review) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      categories: initialCategories,
      blogs: initialBlogs,
      testimonials: initialTestimonials.map((t, i) => ({ ...t, id: `test-${i}` })),
      orders: [],
      messages: [],
      customers: [
        { id: 'user-1', name: 'Tenzin Gyatso', email: 'tenzin@himalaya.com', addresses: [], orders: [], isAdmin: false, joinDate: 'Jan 2024' },
        { id: 'user-2', name: 'Emma Watson', email: 'emma@granger.com', addresses: [], orders: [], isAdmin: false, joinDate: 'Feb 2024' },
      ],
      settings: {
        promoText: "FREE GLOBAL SHIPPING ON ALL ORDERS OVER $150",
        marqueeText: "DEEP RELAXATION • HEALING SOUND • MINDFUL MEDITATION • POSITIVE ENERGY • SPIRITUAL BALANCE",
        heroTitle: "Authentic Himalayan Treasures",
        heroSubtitle: "Handcrafted with devotion by master artisans in Nepal. Discover the resonance of peace.",
        heroImage: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=2000&auto=format&fit=crop",
        footerAbout: "Your gateway to authentic Nepali handicrafts. We bridge the gap between traditional Thamel artisans and the global community.",
        contactEmail: "support@thamelmart.com",
        contactPhone: "+977 1 4700000",
        contactAddress: "123 Thamel Street, Kathmandu, Nepal",
        trendingProducts: [],
        featuredProducts: [],
        newArrivals: [],
        popularProducts: [],
        bestSellers: [],
        flashSaleActive: false,
        flashSaleText: "Flash Sale! Up to 50% Off",
        flashSaleDiscount: 20,
        features: [
          { icon: 'https://www.silentmindsingingbowls.com/cdn/shop/files/icon3.png?v=1737933916', text: 'Meditate Anywhere with a Portable Singing Bowl' },
          { icon: 'https://www.silentmingingbowls.com/cdn/shop/files/icon2.png?v=1737933916', text: 'Soothing Tones for a Deeper Spiritual Connection' },
          { icon: 'https://www.silentmindsingingbowls.com/cdn/shop/files/icon4.png?v=1737933916', text: 'Ergonomically Designed to Fit Perfectly in Your Hand' },
          { icon: 'https://www.silentmindsingingbowls.com/cdn/shop/files/icon1.png?v=1737933759', text: 'Compact and Space-Saving, this Sound Bowl Brings Serenity Wherever You Go' },
        ],
        innerCalm: {
          title: "Your Inner Calm",
          subtitle: "Find",
          text1: "Thamel Mart brings you premium Tibetan singing bowls, accessible tools for finding inner peace through meditation and mindfulness. We prioritize authenticity and quality, curating designs that deliver exceptional sound and craftsmanship.",
          text2: "Our commitment to quality and community sets us apart.",
          buttonText: "Center Yourself",
          buttonLink: "/category/singing-bowls"
        },
        handcrafted: {
          title: "Every Singing Bowl is Lovingly Handcrafted",
          subtitle: "by Highly Skilled Artisans In Nepal",
          image: "https://www.silentmindsingingbowls.com/cdn/shop/files/Copy_of_Copy_of_Copy_of_Copy_of_Beige_and_Black_Minimalist_Modern_Typographic_Business_Card_2000x.png?v=1746592233",
          buttonText: "Experience The Sound of Calm",
          buttonLink: "/category/singing-bowls"
        },
        instagram: {
          title: "Follow Us On Instagram",
          images: [
            'https://picsum.photos/seed/insta1/400/400',
            'https://picsum.photos/seed/insta2/400/400',
            'https://picsum.photos/seed/insta3/400/400',
            'https://picsum.photos/seed/insta4/400/400',
            'https://picsum.photos/seed/insta5/400/400',
            'https://picsum.photos/seed/insta6/400/400',
          ]
        },
        trustedBy: {
          title: "Our Singing Bowls Are Trusted Worldwide By",
          items: [
            { name: "Yoga Studios", image: "https://picsum.photos/seed/yoga/400/400" },
            { name: "Meditation Centers", image: "https://picsum.photos/seed/meditation/400/400" },
            { name: "Wellness Spas", image: "https://picsum.photos/seed/spa/400/400" },
            { name: "Sound Healers", image: "https://picsum.photos/seed/healing/400/400" },
            { name: "Mindfulness Coaches", image: "https://picsum.photos/seed/coach/400/400" },
          ]
        },
        socialLinks: {
          facebook: "https://facebook.com",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com"
        },
        headerLinks: [
          { label: "Home", url: "/" },
          { label: "Shop", url: "/category/all" },
          { label: "About", url: "/about" },
          { label: "Contact", url: "/contact" }
        ],
        footerLinks: [
          { label: "About Us", url: "/about" },
          { label: "Return Policy", url: "/returns" },
          { label: "Shipping Info", url: "/shipping" },
          { label: "Privacy Policy", url: "/privacy" },
          { label: "Terms of Service", url: "/terms" },
          { label: "FAQ's", url: "/faq" },
          { label: "Blogs", url: "/blogs" },
          { label: "Contact Us", url: "/contact" }
        ],
        featuredCategorySlug: 'singing-bowls'
      },

      addCategory: (c) => set((state) => ({ categories: [...state.categories, c] })),
      updateCategory: (c) => set((state) => ({ categories: state.categories.map(item => item.id === c.id ? c : item) })),
      deleteCategory: (id) => set((state) => ({ categories: state.categories.filter(item => item.id !== id) })),

      addProduct: (p) => set((state) => ({ products: [p, ...state.products] })),
      updateProduct: (p) => set((state) => ({ 
        products: state.products.map(item => item.id === p.id ? p : item) 
      })),
      deleteProduct: (id) => set((state) => ({ 
        products: state.products.filter(item => item.id !== id) 
      })),

      addBlog: (b) => set((state) => ({ blogs: [b, ...state.blogs] })),
      updateBlog: (b) => set((state) => ({ blogs: state.blogs.map(item => item.id === b.id ? b : item) })),
      deleteBlog: (id) => set((state) => ({ blogs: state.blogs.filter(item => item.id !== id) })),
      addBlogComment: (blogId, comment) => set((state) => ({
        blogs: state.blogs.map(b => b.id === blogId ? {
          ...b,
          comments: [
            ...(b.comments || []),
            {
              ...comment,
              id: `comment-${Date.now()}`,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
            }
          ]
        } : b)
      })),
      deleteBlogComment: (blogId, commentId) => set((state) => ({
        blogs: state.blogs.map(b => b.id === blogId ? {
          ...b,
          comments: (b.comments || []).filter(c => c.id !== commentId)
        } : b)
      })),

      toggleAdmin: (userId) => set((state) => ({
        customers: state.customers.map(c => c.id === userId ? { ...c, isAdmin: !c.isAdmin } : c)
      })),
      deleteCustomer: (userId) => set((state) => ({
        customers: state.customers.filter(c => c.id !== userId)
      })),

      addTestimonial: (t) => set((state) => ({ testimonials: [...state.testimonials, t] })),
      updateTestimonial: (t) => set((state) => ({ testimonials: state.testimonials.map(item => item.id === t.id ? t : item) })),
      deleteTestimonial: (id) => set((state) => ({ testimonials: state.testimonials.filter(item => item.id !== id) })),

      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      })),

      syncOrdersFromUser: (userOrders) => {
        const currentOrders = get().orders;
        const newOrders = userOrders.filter(uo => !currentOrders.find(co => co.id === uo.id));
        if (newOrders.length > 0) {
            set({ orders: [...newOrders, ...currentOrders] });
        }
      },

      addMessage: (msg) => set((state) => ({
        messages: [{
          ...msg,
          id: `msg-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          status: 'new'
        }, ...state.messages]
      })),
      markMessageRead: (id) => set((state) => ({
        messages: state.messages.map(m => m.id === id ? { ...m, status: 'read' } : m)
      })),
      deleteMessage: (id) => set((state) => ({
        messages: state.messages.filter(m => m.id !== id)
      })),

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      deleteReview: (productId, reviewId) => set((state) => ({
        products: state.products.map(p => p.id === productId ? {
          ...p,
          reviews: (p.reviews || []).filter(r => r.id !== reviewId)
        } : p)
      })),

      updateReview: (productId, review) => set((state) => ({
        products: state.products.map(p => p.id === productId ? {
          ...p,
          reviews: (p.reviews || []).map(r => r.id === review.id ? review : r)
        } : p)
      }))
    }),
    { name: 'thamel-mart-master-v11' }
  )
);
