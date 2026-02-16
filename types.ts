
import React from 'react';

export type AffiliateSource = 'amazon' | 'shopee' | 'mercadolivre';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrls: string[]; 
  affiliateLink: string;
  source: AffiliateSource;
  rating: number;
  reviews: number;
}

export interface Coupon {
  code: string;
  description: string;
  discount: string;
}

// Added StoreData interface used by StoreSection component
export interface StoreData {
  id: string;
  name: string;
  description: string;
  themeColor: string;
  logoIcon: React.ReactNode;
  coupons: Coupon[];
  products: Product[];
}

export interface CategoryGroup {
  id: string;
  name: string;
  icon: React.ReactNode;
  sources: {
    amazon: Product[];
    mercadolivre: Product[];
    shopee: Product[];
  };
}
