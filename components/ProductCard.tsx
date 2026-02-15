
import React, { useState } from 'react';
import { Product, AffiliateSource } from '../types';
import { Star, ChevronLeft, ChevronRight, ShoppingCart, Share2 } from 'lucide-react';

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
    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm ${config.color}`}>
      {config.label}
    </span>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % product.imageUrls.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + product.imageUrls.length) % product.imageUrls.length);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Olha esse achadinho: ${product.title}`,
        url: window.location.href, // Aqui você pode colocar o link direto do produto se preferir
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link da página copiado!');
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 group">
      {/* Galeria */}
      <div className="relative aspect-square bg-slate-50 group/gallery overflow-hidden">
        <img
          src={product.imageUrls[currentImg]}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply p-4"
        />
        
        {product.imageUrls.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/gallery:opacity-100 transition-opacity">
            <button onClick={prevImg} className="p-1 bg-white/90 rounded-full shadow-md hover:bg-white"><ChevronLeft size={16}/></button>
            <button onClick={nextImg} className="p-1 bg-white/90 rounded-full shadow-md hover:bg-white"><ChevronRight size={16}/></button>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <SourceBadge source={product.source} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            <Star size={10} fill="currentColor" />
          </div>
          <span className="text-[10px] font-bold text-slate-400">{product.rating} ({product.reviews})</span>
        </div>

        {/* Descrição Expansível */}
        <div className="mb-4">
          <p className={`text-[11px] text-slate-500 leading-relaxed ${!isExpanded && 'line-clamp-2'}`}>
            {product.description}
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tighter"
          >
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </button>
        </div>

        {/* Preço e CTA */}
        <div className="mt-auto pt-4 border-t border-slate-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              {product.originalPrice && (
                <span className="text-[10px] text-slate-400 line-through block">R$ {product.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-lg font-black text-slate-900">R$ {product.price.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
              title="Compartilhar"
            >
              <Share2 size={18} />
            </button>
          </div>
          
          <a 
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-200"
          >
            <ShoppingCart size={14} />
            Ir para Loja
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
