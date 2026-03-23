
import { useDataStore } from '../store/dataStore';
import type { Product, Category, Testimonial, BlogPost, TrustedByItem, Order, User } from '../types';
import { testimonials, blogPosts, trustedByItems } from './mockData';

const LATENCY = 50; 

export const getCategories = (): Promise<Category[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(useDataStore.getState().categories), LATENCY);
  });
};

export const getProducts = (categorySlug?: string, limit?: number): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredProducts = useDataStore.getState().products;
      if (categorySlug && categorySlug !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === categorySlug);
      }
      if (limit) {
        filteredProducts = filteredProducts.slice(0, limit);
      }
      resolve(filteredProducts);
    }, LATENCY);
  });
};

export const getProductById = (id: string): Promise<Product | undefined> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const product = useDataStore.getState().products.find(p => p.id === id);
            resolve(product);
        }, LATENCY);
    });
}

export const getAllOrders = (): Promise<Order[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(useDataStore.getState().orders), LATENCY);
  });
};

export const getTestimonials = (): Promise<Testimonial[]> => Promise.resolve(testimonials);
export const getBlogPosts = (limit?: number): Promise<BlogPost[]> => Promise.resolve(limit ? blogPosts.slice(0, limit) : blogPosts);
export const getTrustedByItems = (): Promise<TrustedByItem[]> => Promise.resolve(trustedByItems);

export const getAllCustomers = (): Promise<User[]> => {
  return new Promise(resolve => {
    resolve([
      { id: '1', name: 'Emma Watson', email: 'emma@granger.com', addresses: [], orders: [], isAdmin: false },
      { id: '2', name: 'John Doe', email: 'john@example.com', addresses: [], orders: [], isAdmin: false },
      { id: '3', name: 'Tenzin Gyatso', email: 'tenzin@himalaya.com', addresses: [], orders: [], isAdmin: false },
      { id: 'admin-1', name: 'Thamel Admin', email: 'admin@thamelmart.com', addresses: [], orders: [], isAdmin: true },
    ]);
  });
};
