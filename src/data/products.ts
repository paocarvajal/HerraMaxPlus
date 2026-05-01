import catalogData from './fiero_catalog.json';
import pintumexData from './pintumex_catalog.json';

const allCategories = [...catalogData.categories];
pintumexData.categories.forEach(cat => {
  if (!allCategories.find(c => c.id === cat.id)) {
    allCategories.push(cat);
  }
});

const allProducts = [...catalogData.products, ...pintumexData.products];


export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  rating: number;
  inStock: boolean;
  description: string;
  featured?: boolean;
  variants?: ProductVariant[];
  variantLabel?: string;
}

export interface RentalTool {
  id: string;
  name: string;
  pricePerHour: number;
  pricePerDay: number;
  deposit: number;
  image: string;
  available: boolean;
  description: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  spotsLeft: number;
  totalSpots: number;
  instructor: string;
  type: "presencial" | "virtual";
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export const categories = allCategories;

export const products: Product[] = allProducts.map(p => ({
  ...p,
  image: p.image.startsWith('http') ? p.image : import.meta.env.BASE_URL + p.image,
  variants: p.variants ? p.variants.map(v => ({
    ...v,
    image: v.image && !v.image.startsWith('http') ? import.meta.env.BASE_URL + v.image : v.image
  })) : undefined
}));


// We can clear these out or keep them empty since it's a clean start
export const rentalTools: RentalTool[] = [];
export const workshops: Workshop[] = [];
export const blogPosts: BlogPost[] = [];
