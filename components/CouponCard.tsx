import React, { useState } from 'react';
import { Coupon } from '../types';
import { Copy, Check } from 'lucide-react';

interface CouponCardProps {
  coupon: Coupon;
  themeColorClass: string;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon, themeColorClass }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:border-gray-400 transition-colors">
      <div className="flex-1 text-center sm:text-left">
        <div className={`font-black text-xl tracking-wider mb-1 ${themeColorClass}`}>
            {coupon.discount}
        </div>
        <p className="text-sm text-gray-600">{coupon.description}</p>
      </div>
      
      <button
        onClick={handleCopy}
        className="group relative flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-mono font-bold border border-gray-200 transition-all active:scale-95 w-full sm:w-auto justify-center"
      >
        {coupon.code}
        {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-400 group-hover:text-gray-600" />}
        
        {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-100 transition-opacity">
                Copiado!
            </span>
        )}
      </button>
    </div>
  );
};

export default CouponCard;