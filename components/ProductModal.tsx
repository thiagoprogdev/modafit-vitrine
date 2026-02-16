
import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShoppingCart, Share2, MessageSquareText, Copy, Check, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateMarketingCopy } from '../services/gemini';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [caption, setCaption] = useState<string>('');
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

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

  const handleGenerateCopy = async () => {
    setLoadingCopy(true);
    const text = await generateMarketingCopy(product.title, product.price);
    setCaption(text);
    setLoadingCopy(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'shopee': return 'Shopee';
      case 'mercadolivre': return 'Mercado Livre';
      default: return 'Amazon';
    }
  };

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % product.imageUrls.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + product.imageUrls.length) % product.imageUrls.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-8 p-6 md:p-12 animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 z-10">
          <X size={24} />
        </button>

        {/* Galeria do Modal */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden flex items-center justify-center">
            <img src={product.imageUrls[currentImg]} alt={product.title} className="max-w-full max-h-full object-contain p-8 transition-all duration-500" />
            
            {product.imageUrls.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
                <button onClick={prevImg} className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-emerald-500 hover:text-white transition-all"><ChevronLeft size={20}/></button>
                <button onClick={nextImg} className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-emerald-500 hover:text-white transition-all"><ChevronRight size={20}/></button>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.imageUrls.map((url, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentImg(idx)}
                className={`w-20 h-20 rounded-xl border-2 flex-shrink-0 overflow-hidden transition-all ${currentImg === idx ? 'border-emerald-500 scale-105 shadow-md' : 'border-slate-100 opacity-50'}`}
              >
                <img src={url} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 leading-tight uppercase italic tracking-tighter">
              {product.title}
            </h2>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-slate-200"} />
                ))}
              </div>
              <span className="text-[11px] font-black uppercase text-slate-400">
                {product.reviews} clientes satisfeitos
              </span>
            </div>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                {product.originalPrice && (
                  <span className="text-lg text-slate-400 line-through font-medium">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-5xl font-black text-slate-900 italic">
                  {formatCurrency(product.price)}
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <button 
                onClick={handleBuy}
                className="w-full py-6 bg-emerald-500 hover:bg-slate-900 text-slate-950 hover:text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingCart size={22} />
                Ir para {getSourceLabel(product.source)}
              </button>

              <button 
                onClick={handleGenerateCopy}
                disabled={loadingCopy}
                className="w-full py-4 bg-slate-50 border-2 border-slate-100 hover:border-emerald-500 text-slate-600 hover:text-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loadingCopy ? <Loader2 size={16} className="animate-spin" /> : <MessageSquareText size={16} />}
                {caption ? 'Nova Legenda p/ Reels/Insta' : 'Gerar Legenda de Vendas IA'}
              </button>
            </div>

            {caption && (
              <div className="mb-8 bg-emerald-50 border border-emerald-100 rounded-3xl p-6 relative group animate-in slide-in-from-top-2">
                <p className="text-xs text-emerald-900 leading-relaxed font-medium mb-4 pr-8">
                  {caption}
                </p>
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 p-2 bg-white text-emerald-600 rounded-xl shadow-sm hover:scale-110 transition-transform"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
