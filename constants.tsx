
import React from 'react';
import { CategoryGroup, Product, Coupon } from './types';
import { Zap, Shirt, Watch } from 'lucide-react';

export const COUPONS: Coupon[] = [
  { code: 'MODAFIT10', description: 'Válido em toda linha de Suplementos Amazon', discount: '10% OFF' },
  { code: 'BEMVINDO5', description: 'Primeira compra em acessórios na Shopee', discount: 'R$ 5 OFF' },
  { code: 'FRETEGRATIS', description: 'Produtos FULL no Mercado Livre acima de R$79', discount: 'FRETE 0' },
];

const createRealLookData = (source: 'amazon' | 'shopee' | 'mercadolivre', category: string, count: number): Product[] => {
  const fitnessItems = {
    suplementos: [
      { title: 'Whey Protein Isolate 900g', price: 149.90, img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&q=80' },
      { title: 'Creatina Monohidratada 300g', price: 89.00, img: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&q=80' },
      { title: 'Pré-Treino Extreme Focus', price: 115.50, img: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500&q=80' }
    ],
    vestuario: [
      { title: 'Shorts de Compressão Masculino', price: 59.90, img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80' },
      { title: 'Top Fitness Alta Sustentação', price: 45.00, img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&q=80' },
      { title: 'Camiseta Dry-Fit Performance', price: 39.90, img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80' }
    ],
    acessorios: [
      { title: 'Smartwatch Monitor Cardíaco', price: 299.00, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
      { title: 'Corda de Pular Rolamentada', price: 35.00, img: 'https://images.unsplash.com/photo-1598971639058-aba7c12af93a?w=500&q=80' },
      { title: 'Kit Faixas Elásticas (Mini Bands)', price: 42.90, img: 'https://images.unsplash.com/photo-1591117207239-788ec1641ba4?w=500&q=80' }
    ]
  };

  const pool = fitnessItems[category as keyof typeof fitnessItems] || fitnessItems.suplementos;

  return Array.from({ length: count }).map((_, i) => {
    const item = pool[i % pool.length];
    return {
      id: `${category}-${source}-${i + 1}`,
      title: `${item.title} - Edição ${source.toUpperCase()}`,
      description: `Alta qualidade garantida para seus treinos. Produto testado e aprovado por nossa curadoria na ${source}. Aproveite o melhor preço hoje.`,
      price: item.price + (i * 5),
      originalPrice: item.price * 1.3,
      imageUrls: [item.img],
      affiliateLink: '#',
      source: source,
      rating: 4.8,
      reviews: 1250 + (i * 100)
    };
  });
};

export const CATEGORIES_DATA: CategoryGroup[] = [
  {
    id: 'suplementos',
    name: 'Suplementos',
    icon: <Zap className="w-6 h-6" />,
    sources: {
      amazon: createRealLookData('amazon', 'suplementos', 6),
      mercadolivre: createRealLookData('mercadolivre', 'suplementos', 6),
      shopee: createRealLookData('shopee', 'suplementos', 6),
    }
  },
  {
    id: 'vestuario',
    name: 'Vestuário',
    icon: <Shirt className="w-6 h-6" />,
    sources: {
      amazon: createRealLookData('amazon', 'vestuario', 6),
      mercadolivre: createRealLookData('mercadolivre', 'vestuario', 6),
      shopee: createRealLookData('shopee', 'vestuario', 6),
    }
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    icon: <Watch className="w-6 h-6" />,
    sources: {
      amazon: createRealLookData('amazon', 'acessorios', 6),
      mercadolivre: createRealLookData('mercadolivre', 'acessorios', 6),
      shopee: createRealLookData('shopee', 'acessorios', 6),
    }
  }
];
