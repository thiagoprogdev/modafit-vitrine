
import React from 'react';
import { Product } from '../types';
import { X, Star, ShoppingCart, ShieldCheck, Zap, ExternalLink } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleBuy = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'shopee': return 'Shopee';
      case 'mercadolivre': return 'Mercado Livre';
      default: return 'Amazon';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col md:flex-row gap-8 p-6 md:p-10 animate-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
        >
          <X size={24} />
        </button>

        {/* Lado Esquerdo: Imagem */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
          {/* Fix: Accessing imageUrls[0] as Product type uses an array of images instead of a single string */}
          <img 
            src={product.imageUrls[0]} 
            alt={product.title} 
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>

        {/* Lado Direito: Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
              {product.title}
            </h2>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(product.rating) ? "" : "text-slate-200"}
                  />
                ))}
              </div>
              <span className="text-sm text-blue-600 font-medium underline underline-offset-2">
                {product.reviews} avaliações
              </span>
            </div>
            
            <div className="h-px bg-slate-100 w-full mb-6" />

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-3xl font-bold text-slate-900">
                  {formatCurrency(product.price)}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Consulte condições no site oficial
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider text-[10px]">Sobre este item</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {product.description || "Este produto de alta qualidade foi selecionado por nossa equipe de especialistas."}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>Compra Segura na {getSourceLabel(product.source)}</span>
              </div>
              {product.source === 'amazon' && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Zap size={18} className="text-emerald-500" />
                  <span>Entrega Rápida com Prime</span>
                </div>
              )}
            </div>

            <button 
              onClick={handleBuy}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95 mb-6"
            >
              <ShoppingCart size={20} />
              Comprar na {getSourceLabel(product.source)}
            </button>

            {/* List Grounding URLs as per requirements for Google Search tool usage */}
            {product.groundingUrls && product.groundingUrls.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Fontes Verificadas (Google Search):</h4>
                <div className="flex flex-wrap gap-2">
                  {product.groundingUrls.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] bg-slate-50 hover:bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 border border-slate-100"
                    >
                      <ExternalLink size={12} />
                      {link.title || 'Ver Fonte'}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
