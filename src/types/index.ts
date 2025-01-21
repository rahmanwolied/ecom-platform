export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  seller: {
    name: string;
    rating: number;
    contact: string;
  };
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
}

export interface User {
  id: string;
  type: 'buyer' | 'seller';
  name: string;
  phone: string;
  nidDoc: string;
  licenseDoc?: string;
  rating: number;
  trustScore: number;
  transactions: {
    id: string;
    date: string;
    amount: number;
    trustScore: number;
  }[];
} 