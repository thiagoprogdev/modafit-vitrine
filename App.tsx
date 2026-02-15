
import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CouponCard from './components/CouponCard';
import SmartSearch from './components/SmartSearch';
import ProductModal from './components/ProductModal';
import { CATEGORIES_DATA, COUPONS } from './constants';
import { Product } from './types';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Activity, 
  Search 
} from 'lucide-react';

const trackEvent = (action: string, category: string, label: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
};

const App = () => {
  const [showFloatBtn, setShowFloatBtn] = useState<boolean>(false);
  const [dynamicProducts, setDynamicProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatBtn(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductFound = useCallback((product: Product) => {
    setDynamicProducts(prev => [product, ...prev]);
    trackEvent('produto_espelhado', 'IA', product.title);
  }, []);

  const handleWhatsAppClick = (location: string) => {
    trackEvent('clique_whatsapp', 'contato', location);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <a 
        href="https://wa.me/5521965928227"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleWhatsAppClick('botao_flutuante')}
        className={`fixed bottom-8 right-8 z-[100] bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 flex items-center gap-2 group ${
          showFloatBtn ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'
        }`}
        aria-label="Falar no WhatsApp"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold uppercase text-[10px] tracking-widest pl-2">
          Dúvidas? Chame aqui
        </span>
        <MessageCircle size={24} />
      </a>

      <header className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110 animate-[pulse_20s_infinite]">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" 
            alt="Performance Fitness"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-8 border border-emerald-500/30">
              <Sparkles size={12} className="animate-pulse" /> Foco & Performance Absoluta
            </div>
            
            <h1 className="text-6xl md:text-[9rem] font-black text-white mb-6 tracking-tighter leading-[0.85] italic uppercase">
              Estilo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Superior.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-lg mb-10 font-medium leading-relaxed">
              Curadoria de elite para atletas que não aceitam mediocridade. Equipamentos e suplementos testados por especialistas.
            </p>
            
            <div className="flex flex-wrap gap-6 mb-12">
              {['Amazon', 'Mercado Livre', 'Shopee'].map(store => (
                <div key={store} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Parceiro {store}
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                const el = document.getElementById('vitrine');
                el?.scrollIntoView({ behavior: 'smooth' });
                trackEvent('clique_hero', 'navegacao', 'ver_vitrine');
              }}
              className="px-12 py-6 bg-emerald-500 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/40 hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Explorar Vitrine
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </header>

      <main id="vitrine" className="flex-grow">
        <div className="bg-white py-24 px-6 border-b border-slate-100">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <div className="inline-block bg-slate-50 px-4 py-1 rounded-full mb-4">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Motor de Busca Inteligente</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4 text-slate-900">Encontre qualquer Produto</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">Cole um link ou digite o nome e nossa IA trará o preço e as fotos atualizadas da Amazon.</p>
          </div>
          <SmartSearch onProductFound={handleProductFound} />
        </div>

        {dynamicProducts.length > 0 && (
          <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200">
                  <Search size={24}/>
                </div>
                <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Explorados Recentemente</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {dynamicProducts.map((product) => (
                  <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {CATEGORIES_DATA.map((category) => (
          <section key={category.id} id={category.id} className="py-24 px-6 border-b border-slate-200 scroll-mt-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-16">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl">
                  {category.icon}
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                  {category.name}
                </h2>
              </div>

              {(['amazon', 'mercadolivre', 'shopee'] as const).map((source) => (
                <div key={`${category.id}-${source}`} className="mb-20 last:mb-0 bg-white p-6 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-10 border-l-4 border-emerald-500 pl-6">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">
                      Na {source === 'mercadolivre' ? 'Mercado Livre' : source.charAt(0).toUpperCase() + source.slice(1)}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {category.sources[source]?.map((product) => (
                      <div 
                        key={product.id} 
                        onClick={() => setSelectedProduct(product)} 
                        className="cursor-pointer transform hover:-translate-y-1 transition-transform h-full"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section id="cupons" className="py-32 px-6 bg-slate-950 text-white scroll-mt-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase mb-8 leading-none">
                Códigos de <br/><span className="text-emerald-400 underline decoration-white/20">Desconto</span>
              </h2>
              <p className="text-slate-400 uppercase tracking-[0.4em] text-[10px] font-black">Copie e use no checkout para economizar</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {COUPONS.map((coupon, idx) => (
                <CouponCard key={`coupon-${idx}`} coupon={coupon} themeColorClass="text-emerald-400" />
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        </section>

        <section className="py-24 px-6 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic mb-8 leading-none">
                Dúvida na <br /> <span className="text-emerald-400">Escolha?</span>
              </h2>
              <p className="text-slate-400 font-medium mb-12 max-w-sm mx-auto text-sm leading-relaxed">
                Nossa curadoria está pronta para ajudar você a escolher o melhor produto para o seu treino.
              </p>
              
              <a 
                href="https://wa.me/5521965928227" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppClick('secao_final')}
                className="inline-flex items-center gap-4 px-12 py-6 bg-emerald-500 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:bg-white transition-all transform hover:scale-105 active:scale-95"
              >
                <MessageCircle size={24} />
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-10">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 text-white p-2.5 rounded-xl"><Activity size={20} /></div>
              <span className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">ModaFit<span className="text-emerald-500">Suplementos</span></span>
            </div>
            
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-loose max-w-2xl">
              &copy; {new Date().getFullYear()} MODAFIT SUPLEMENTOS. <br />
              ESTE SITE É UMA VITRINE DE AFILIADOS. PODEMOS RECEBER COMISSÕES POR COMPRAS REALIZADAS ATRAVÉS DOS LINKS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
