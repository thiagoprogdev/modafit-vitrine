
import React, { useState } from 'react';
import { Product, AffiliateSource } from '../types';
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const SourceBadge = ({ source }: { source: AffiliateSource }) => {
  const configs = {
    amazon: { label: 'Amazon', color: 'bg-orange-500 text-white' },
    shopee: { label: 'Shopee', color: 'bg-orange-600 text-white' },
    mercadolivre: { label: 'Mercado Livre', color: 'bg-yellow-400 text-slate-900' },
  };
  const config = configs[source];
  return (
    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-lg ${config.color}`}>
      {config.label}
    </span>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % product.imageUrls.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + product.imageUrls.length) % product.imageUrls.length);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500 group relative">
      <div className="relative aspect-square bg-white group/gallery overflow-hidden">
        <img
          src={product.imageUrls[currentImg]}
          alt={product.title}
          className="w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-105"
        />
        
        {product.imageUrls.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover/gallery:opacity-100 transition-all duration-300">
            <button onClick={prevImg} className="p-1.5 bg-white/90 rounded-full shadow-xl hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-110 active:scale-90">
              <ChevronLeft size={16}/>
            </button>
            <button onClick={nextImg} className="p-1.5 bg-white/90 rounded-full shadow-xl hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-110 active:scale-90">
              <ChevronRight size={16}/>
            </button>
          </div>
        )}

        <div className="absolute top-4 left-4 z-10">
          <SourceBadge source={product.source} />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-sm font-black text-slate-900 mb-2 line-clamp-2 min-h-[2.5rem] tracking-tight leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-4">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{product.rating}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-[11px] text-slate-400 line-through block font-bold">R$ {product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-xl font-black text-slate-900 italic tracking-tighter">R$ {product.price.toFixed(2)}</span>
          </div>
          
          <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-emerald-500 transition-all active:scale-90 shadow-lg shadow-slate-900/10 group-hover:shadow-emerald-500/20">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
