
import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShoppingCart, ShieldCheck, Zap, ExternalLink, MessageSquareText, Copy, Check, Loader2 } from 'lucide-react';
import { generateMarketingCopy } from '../services/gemini';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [caption, setCaption] = useState<string>('');
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-8 p-6 md:p-10 animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
          <X size={24} />
        </button>

        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
          <img src={product.imageUrls[0]} alt={product.title} className="max-w-full max-h-[400px] object-contain" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2 leading-tight uppercase italic italic tracking-tighter">
              {product.title}
            </h2>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-slate-200"} />
                ))}
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400">
                {product.reviews} avaliações verificadas
              </span>
            </div>
            
            <div className="h-px bg-slate-100 w-full mb-6" />

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-medium">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-4xl font-black text-slate-900 italic">
                  {formatCurrency(product.price)}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <button 
                onClick={handleBuy}
                className="w-full py-5 bg-emerald-500 hover:bg-slate-900 text-slate-950 hover:text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingCart size={20} />
                Comprar na {getSourceLabel(product.source)}
              </button>

              <button 
                onClick={handleGenerateCopy}
                disabled={loadingCopy}
                className="w-full py-4 bg-slate-50 border-2 border-slate-100 hover:border-emerald-500 text-slate-600 hover:text-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loadingCopy ? <Loader2 size={16} className="animate-spin" /> : <MessageSquareText size={16} />}
                {caption ? 'Regerar Legenda IA' : 'Gerar Legenda p/ Instagram'}
              </button>
            </div>

            {caption && (
              <div className="mb-8 bg-emerald-50 border border-emerald-100 rounded-2xl p-5 relative group">
                <p className="text-xs text-emerald-900 leading-relaxed font-medium mb-3 pr-8">
                  {caption}
                </p>
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 p-2 bg-white text-emerald-600 rounded-lg shadow-sm hover:scale-110 transition-transform"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            )}

            {product.groundingUrls && product.groundingUrls.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Verificado via Google Search:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.groundingUrls.slice(0, 3).map((link, idx) => (
                    <a key={idx} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-[9px] bg-slate-50 hover:bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 border border-slate-100 font-bold uppercase">
                      <ExternalLink size={10} />
                      Fonte {idx + 1}
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
