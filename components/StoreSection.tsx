
import React from 'react';
import { StoreData } from '../types';
import ProductCard from './ProductCard';
import CouponCard from './CouponCard';
import { ExternalLink, Ticket } from 'lucide-react';

interface StoreSectionProps {
  data: StoreData;
  bgColorClass: string;
  textColorClass: string;
  buttonColorClass: string;
  isDark?: boolean;
}

const StoreSection: React.FC<StoreSectionProps> = ({ 
  data, 
  bgColorClass, 
  textColorClass, 
  buttonColorClass,
  isDark = false
}) => {
  return (
    <section 
        id={data.id} 
        className={`py-16 px-4 sm:px-6 lg:px-8 scroll-mt-16 ${bgColorClass}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className={`inline-flex items-center justify-center p-3 rounded-full bg-white shadow-md mb-4 ${data.themeColor === 'amazon' ? 'text-gray-900' : 'text-' + data.themeColor + '-600'}`}>
            <span className={data.themeColor === 'amazon' ? 'text-slate-900' : 'text-' + data.themeColor}>
                {data.logoIcon}
            </span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Achadinhos {data.name}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {data.description}
          </p>
        </div>

        {/* Coupons Area */}
        {data.coupons.length > 0 && (
            <div className="mb-12 max-w-3xl mx-auto">
                <div className={`flex items-center gap-2 mb-4 justify-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Ticket size={20} />
                    <span className="font-semibold uppercase tracking-wide text-sm">Cupons Disponíveis</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {data.coupons.map((coupon, idx) => (
                        <CouponCard 
                            key={idx} 
                            coupon={coupon} 
                            themeColorClass={textColorClass}
                        />
                    ))}
                </div>
            </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {data.products.map((product) => (
            <ProductCard 
                key={product.id} 
                product={product} 
                // Removed accentColor and buttonColorClass as they are not defined in ProductCardProps
            />
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-12 text-center">
            <a 
                href="#" 
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all ${isDark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
            >
                Ver todos na {data.name}
                <ExternalLink size={18} />
            </a>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
