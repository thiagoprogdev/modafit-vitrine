
import React from 'react';
import { CategoryGroup, Coupon } from './types';
import { Zap, Shirt, Dumbbell, Ticket } from 'lucide-react';

// LINK DO SEU GRUPO DE PROMOÇÕES
export const GROUP_WHATSAPP_URL = "https://chat.whatsapp.com/SEU_LINK_AQUI"; 

export const COUPONS: Coupon[] = [
  { code: 'MODAFIT10', description: 'Válido em Suplementos Amazon', discount: '10% OFF' },
  { code: 'FRETEGRATIS', description: 'Produtos FULL no Mercado Livre', discount: 'FRETE 0' },
];

export const CATEGORIES_DATA: CategoryGroup[] = [
  {
    id: 'suplementos',
    name: 'Suplementos',
    icon: <Zap className="w-6 h-6" />,
    sources: {
      amazon: [
        {
          id: 'whey-gold',
          title: 'Whey Protein Gold Standard 100% Isolate',
          description: 'O padrão ouro da nutrição. Proteína de altíssima qualidade para ganhos reais.',
          price: 249.90,
          originalPrice: 299.00,
          imageUrls: [
            'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80',
            'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800&q=80'
          ],
          affiliateLink: 'https://amzn.to/exemplo',
          source: 'amazon',
          rating: 4.9,
          reviews: 12500
        }
      ],
      mercadolivre: [],
      shopee: []
    }
  },
  {
    id: 'vestuario',
    name: 'Vestuário',
    icon: <Shirt className="w-6 h-6" />,
    sources: {
      mercadolivre: [
        {
          id: 'conjunto-fitness',
          title: 'Conjunto Fitness Feminino Sem Costura',
          description: 'Conforto absoluto e zero transparência para o seu leg day.',
          price: 97.90,
          originalPrice: 135.00,
          imageUrls: [
            'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80',
            'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80'
          ],
          affiliateLink: 'https://mercadolivre.com.br/exemplo',
          source: 'mercadolivre',
          rating: 4.8,
          reviews: 850
        }
      ],
      amazon: [],
      shopee: []
    }
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    icon: <Dumbbell className="w-6 h-6" />,
    sources: {
      shopee: [
        {
          id: 'kit-elastico',
          title: 'Kit 5 Faixas Elásticas Mini Band Exercícios',
          description: 'Treine em qualquer lugar com este kit completo de intensidades variadas.',
          price: 34.90,
          originalPrice: 59.90,
          imageUrls: [
            'https://images.unsplash.com/photo-1598289439248-b112a7ff40cb?w=800&q=80',
            'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=800&q=80'
          ],
          affiliateLink: 'https://shopee.com.br/exemplo',
          source: 'shopee',
          rating: 4.7,
          reviews: 2100
        }
      ],
      amazon: [],
      mercadolivre: []
    }
  }
];
