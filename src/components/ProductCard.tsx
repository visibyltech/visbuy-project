import React from 'react';
import { Product } from '../data/products';
import { useVisbuy } from '../context/VisbuyContext';
import { Star, Heart, ShoppingCart } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { formatPrice, openProductDetail, addToCart, wishlist, toggleWishlist } = useVisbuy();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="group min-w-0 bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all flex flex-col">
      <div className="relative aspect-square bg-slate-50 overflow-hidden cursor-pointer" onClick={() => openProductDetail(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            const fallback = product.images.find((src) => src !== img.src && !src.startsWith('/src/'));
            if (fallback && img.dataset.fallback !== 'used') {
              img.dataset.fallback = 'used';
              img.src = fallback;
            } else {
              img.style.display = 'none';
            }
          }}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white/90 text-slate-600'}`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>
        {product.discountPercent ? <span className="absolute top-2 left-2 rounded bg-[#0047FF] px-1.5 py-1 text-[10px] font-bold text-white">-{product.discountPercent}%</span> : null}
      </div>

      <div className="p-2.5 sm:p-3 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-1 text-[10px] text-slate-500 mb-1">
          <span className="font-bold uppercase tracking-wide truncate">{product.brand}</span>
          <span className="flex items-center gap-0.5 shrink-0"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{product.rating}</span>
        </div>
        <h3 onClick={() => openProductDetail(product)} className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug line-clamp-2 min-h-[2rem] cursor-pointer hover:text-[#0047FF]">
          {product.name}
        </h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">{formatPrice(product.basePriceUSD)}</span>
          {product.originalPriceUSD ? <span className="text-[10px] text-slate-400 line-through">{formatPrice(product.originalPriceUSD)}</span> : null}
        </div>
        <div className="mt-1.5 min-h-4 text-[9px] sm:text-[10px] font-medium text-[#0047FF]">
          {[
            product.paymentOptions.bnpl ? 'BNPL' : '',
            product.paymentOptions.saveToBuy ? 'Save to Buy' : '',
            product.paymentOptions.osusu ? 'Osusu' : '',
          ].filter(Boolean).join(' · ')}
        </div>
        <button
          onClick={() => openProductDetail(product)}
          className="mt-2 w-full rounded-lg bg-[#0047FF] hover:bg-blue-700 text-white py-2 px-2 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> View & Buy
        </button>
      </div>
    </article>
  );
};
