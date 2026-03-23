
export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  customerEmail?: string;
  customerName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
  isAdmin?: boolean;
  joinDate?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  secondaryImage?: string;
  videoUrl?: string; // Stored as Base64 or URL
  audioUrl?: string; // Stored as Base64 or URL
  category: string;
  brand?: string;
  tags?: string[];
  specs: {
    material: string;
    weight: string;
    size: string;
  };
  whyYoullLoveIt: string[];
  includes: string[];
  reviews?: Review[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
}

export interface BlogComment {
  id: string;
  userName: string;
  date: string;
  text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  author?: string;
  comments?: BlogComment[];
}

export interface Feature {
  icon: string;
  text: string;
}

export interface TrustedByItem {
    name: string;
    image: string;
}

export type Currency = 'NPR' | 'USD' | 'EUR';
