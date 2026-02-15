
import React, { useState } from 'react';
import { Search, Loader2, Link as LinkIcon, Sparkles, TrendingUp } from 'lucide-react';
import { fetchProductInfo } from '../services/gemini';
import { Product } from '../types';

interface SmartSearchProps {
  onProductFound: (product: Product) => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ onProductFound }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestions = ["Whey Protein", "Creatina Pura", "Legging Academia", "Pre-Treino", "Garrafa Térmica"];

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const data = await fetchProductInfo(searchTerm);
      
      const newProduct: Product = {
        id: `dynamic-${Date.now()}`,
        title: data.title || 'Produto Encontrado',
        description: data.description || '',
        price: data.price || 0,
        imageUrls: [data.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'],
        affiliateLink: searchTerm.includes('amazon.com') ? searchTerm : (data.affiliateLink || '#'),
        source: searchTerm.includes('shopee.com') ? 'shopee' : (searchTerm.includes('mercadolivre.com') ? 'mercadolivre' : 'amazon'),
        rating: data.rating || 4.5,
        reviews: data.reviews || 100,
        groundingUrls: data.groundingUrls
      };

      onProductFound(newProduct);
      setQuery('');
    } catch (error) {
      alert("A IA está ocupada ou o link é inválido. Tente buscar pelo nome do produto!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
          <LinkIcon size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cole o link ou nome do produto..."
          className="w-full pl-14 pr-36 py-5 bg-white border-2 border-slate-100 rounded-2xl shadow-xl focus:border-emerald-500 focus:ring-0 transition-all text-sm font-medium"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Sparkles size={16} />
              Espelhar
            </>
          )}
        </button>
      </form>
      
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 overflow-hidden">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1 mr-2">
          <TrendingUp size={12}/> Sugestões:
        </span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => performSearch(s)}
            className="text-[10px] bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 px-3 py-1.5 rounded-full font-bold transition-colors border border-transparent hover:border-emerald-200"
          >
            {s}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        Powered by <span className="text-emerald-500">Gemini AI</span> & Google Search Grounding
      </p>
    </div>
  );
};

export default SmartSearch;
