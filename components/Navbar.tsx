
import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-4 border-b border-slate-100' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className={`p-2 rounded-xl transition-colors ${isScrolled ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-xl'}`}>
              <Activity size={20} />
            </div>
            <span className={`text-xl font-black italic uppercase tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              ModaFit<span className="text-emerald-500">Suplementos</span>
            </span>
          </div>

          <div className={`hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest transition-colors ${isScrolled ? 'text-slate-500' : 'text-white/70'}`}>
            <button onClick={() => scrollToSection('suplementos')} className="hover:text-emerald-500 transition-colors">Suplementos</button>
            <button onClick={() => scrollToSection('vestuario')} className="hover:text-emerald-500 transition-colors">Vestuário</button>
            <button onClick={() => scrollToSection('acessorios')} className="hover:text-emerald-500 transition-colors">Acessórios</button>
            <button onClick={() => scrollToSection('cupons')} className="hover:text-emerald-500 transition-colors underline decoration-emerald-500/50 underline-offset-4">Cupons</button>
          </div>

          <button 
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`} 
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <aside className={`fixed inset-y-0 right-0 w-full md:w-[350px] bg-slate-950 z-[100] shadow-2xl transition-transform duration-500 ease-out flex flex-col p-10 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="self-end mb-16 text-slate-400 hover:text-white transition-colors">
          <X size={32} />
        </button>
        
        <div className="flex flex-col gap-8">
          {['suplementos', 'vestuario', 'acessorios', 'cupons'].map(id => (
            <button 
              key={id}
              onClick={() => scrollToSection(id)}
              className="group text-left text-3xl font-black uppercase tracking-tighter italic text-white/40 hover:text-emerald-500 flex items-center justify-between transition-all"
            >
              {id} <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" size={24} />
            </button>
          ))}
        </div>

        <div className="mt-auto pt-10 border-t border-white/10">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Ajuda & Suporte</p>
           <a href="https://wa.me/5521965928227" className="flex items-center gap-3 text-emerald-400 font-bold">
             <Activity size={16} /> Chamar no WhatsApp
           </a>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
