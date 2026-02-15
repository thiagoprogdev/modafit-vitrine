
import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, Home, Tag, MessageCircle, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-emerald-500 text-white p-2 rounded-lg"><Activity size={18} /></div>
            <span className="text-lg font-black italic uppercase tracking-tighter">ModaFit<span className="text-emerald-500">Suplementos</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <button onClick={() => scrollToSection('suplementos')} className="hover:text-emerald-500 transition-colors">Suplementos</button>
            <button onClick={() => scrollToSection('vestuario')} className="hover:text-emerald-500 transition-colors">Vestuário</button>
            <button onClick={() => scrollToSection('acessorios')} className="hover:text-emerald-500 transition-colors">Acessórios</button>
            <button onClick={() => scrollToSection('cupons')} className="hover:text-emerald-500 transition-colors">Cupons</button>
          </div>

          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 right-0 w-[280px] bg-white z-[70] shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8">
          <button onClick={() => setIsMenuOpen(false)} className="mb-10 text-slate-400 hover:text-slate-900 transition-colors">
            <X size={24} />
          </button>
          <div className="space-y-6">
            {['suplementos', 'vestuario', 'acessorios', 'cupons'].map(id => (
              <button 
                key={id}
                onClick={() => scrollToSection(id)}
                className="w-full text-left text-sm font-black uppercase tracking-widest text-slate-600 hover:text-emerald-500 flex items-center justify-between"
              >
                {id} <ChevronRight size={14} />
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
