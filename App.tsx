
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CouponCard from './components/CouponCard';
import ProductModal from './components/ProductModal';
import { CATEGORIES_DATA, COUPONS, GROUP_WHATSAPP_URL } from './constants';
import { Product } from './types';
import { 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  Activity,
  Users,
  Bell,
  ArrowDown
} from 'lucide-react';

const App = () => {
  const [showFloatBtn, setShowFloatBtn] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowFloatBtn(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      {/* Botão Flutuante de Suporte */}
      <a 
        href="https://wa.me/5521965928227"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 right-8 z-[100] bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 active:scale-95 flex items-center gap-2 group ${
          showFloatBtn ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'
        }`}
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold uppercase text-[10px] tracking-widest pl-2">
          Dúvidas? Chame agora
        </span>
        <MessageCircle size={24} />
      </a>

      {/* Hero Section de Alto Impacto */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 scale-110 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000" 
            className="w-full h-full object-cover animate-[pulse_20s_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl animate-fade-up">
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-8 border border-emerald-500/30">
              <Sparkles size={12} /> Curadoria Premium para Atletas
            </div>
            
            <h1 className="text-6xl md:text-[9rem] font-black text-white mb-6 tracking-tighter leading-[0.8] italic uppercase">
              Seu Treino <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Outro Nível.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-lg mb-12 font-medium leading-relaxed">
              Selecionamos a dedo os melhores suplementos e vestuário da Amazon, Shopee e Mercado Livre. Qualidade garantida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-6 bg-emerald-500 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/40 hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                Explorar Vitrine <ArrowDown size={20} />
              </button>
              
              <a 
                href={GROUP_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                Grupo Vip <Users size={20} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="vitrine">
        {/* Seção de Cupons Relâmpago */}
        <section id="cupons" className="py-20 px-6 bg-white border-b border-slate-100 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">Cupons Ativos</h2>
                <p className="text-slate-500 font-medium">Copie e use no fechamento da compra.</p>
              </div>
              <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0">
                {COUPONS.map((coupon, idx) => (
                  <CouponCard key={idx} coupon={coupon} themeColorClass="text-emerald-600" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Listagem de Categorias */}
        {CATEGORIES_DATA.map((category) => (
          <section key={category.id} id={category.id} className="py-24 px-6 border-b border-slate-200 scroll-mt-24 bg-slate-50/50">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-16">
                <div className="p-4 bg-white text-emerald-600 rounded-2xl shadow-sm border border-slate-100">{category.icon}</div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter">{category.name}</h2>
              </div>

              {(['amazon', 'mercadolivre', 'shopee'] as const).map((source) => {
                const products = category.sources[source];
                if (!products || products.length === 0) return null;

                return (
                  <div key={`${category.id}-${source}`} className="mb-20 last:mb-0">
                    <div className="flex items-center gap-4 mb-10">
                       <span className={`w-8 h-[2px] ${source === 'amazon' ? 'bg-orange-400' : source === 'shopee' ? 'bg-orange-600' : 'bg-yellow-400'}`}></span>
                       <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">
                        Achados na {source === 'mercadolivre' ? 'Mercado Livre' : source.charAt(0).toUpperCase() + source.slice(1)}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                      {products.map((product) => (
                        <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* CTA GRUPO WHATSAPP */}
        <section className="py-32 px-6 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-12 md:p-24 text-center border border-white/10 shadow-3xl">
              <div className="flex justify-center mb-10">
                <div className="p-6 bg-emerald-500/20 text-emerald-400 rounded-full animate-bounce">
                  <Bell size={48} />
                </div>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-8 leading-[0.9]">
                Não Perca <br /> <span className="text-emerald-400">Nenhuma Oferta!</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium mb-12 max-w-md mx-auto leading-relaxed">
                Entrar no grupo é a única forma de garantir os cupons que esgotam em minutos. Junte-se a mais de 2.000 pessoas.
              </p>
              
              <a 
                href={GROUP_WHATSAPP_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-16 py-8 bg-emerald-500 text-slate-950 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:bg-white transition-all transform hover:scale-105 active:scale-95"
              >
                <Users size={24} /> Quero Entrar Agora
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2.5 rounded-xl"><Activity size={24} /></div>
            <span className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">ModaFit<span className="text-emerald-500">Suplementos</span></span>
          </div>
          
          <div className="flex gap-10 text-[11px] font-black uppercase tracking-widest text-slate-400">
             <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-emerald-500 transition-colors">Início</button>
             <button onClick={() => document.getElementById('vitrine')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-emerald-500 transition-colors">Produtos</button>
             <button onClick={() => document.getElementById('cupons')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-emerald-500 transition-colors">Cupons</button>
          </div>

          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] text-center max-w-md">
            &copy; {new Date().getFullYear()} MODAFIT SUPLEMENTOS. SITE COM FINS DE AFILIAÇÃO. AS OFERTAS PODEM MUDAR SEM AVISO PRÉVIO.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
