import React from 'react';
import { Product } from '../data/products';
import { useVisbuy } from '../context/VisbuyContext';
import { Star, Heart, Plus, ShoppingCart } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { formatPrice, openProductDetail, addToCart, wishlist, toggleWishlist } = useVisbuy();
  const isWishlisted = wishlist.includes(product.id);
  const image = product.images.find(src => src.startsWith('http')) || product.images[0];

  return (
    <article className="group min-w-0 h-full bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all flex flex-col">
      <div className="relative aspect-square bg-white overflow-hidden cursor-pointer border-b border-slate-100" onClick={() => openProductDetail(product)}>
        <img src={image} alt={product.name} loading="lazy" onError={(e) => { e.currentTarget.style.opacity = '0'; }} className="w-full h-full object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-300" />
        {product.discountPercent ? <span className="absolute left-2 top-2 rounded-md bg-emerald-600 px-1.5 py-1 text-[9px] sm:text-[10px] font-extrabold text-white">-{product.discountPercent}%</span> : null}
        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className={'absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm ' + (isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white/95 text-slate-600')} aria-label="Save to wishlist"><Heart className={'w-4 h-4 ' + (isWishlisted ? 'fill-rose-600' : '')}/></button>
        <button onClick={(e) => { e.stopPropagation(); addToCart(product, 'payNow'); }} aria-label="Add to cart" className="absolute bottom-2 right-2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#101828] text-white flex items-center justify-center shadow-lg hover:bg-[#0757ee] transition-colors"><Plus className="w-5 h-5"/></button>
      </div>
      <div className="p-2.5 sm:p-3 flex flex-1 flex-col">
        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 mb-1"><span className="font-bold uppercase tracking-wide truncate">{product.brand}</span><span className="ml-auto flex items-center gap-0.5 shrink-0"><Star className="w-3 h-3 fill-amber-400 text-amber-400"/>{product.rating.toFixed(1)} <span className="text-slate-400">({product.ratingCount})</span></span></div>
        <h3 onClick={() => openProductDetail(product)} className="text-[11px] sm:text-sm font-semibold text-slate-800 leading-snug line-clamp-2 min-h-[2.25rem] cursor-pointer hover:text-[#0757ee]">{product.name}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5"><span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">{formatPrice(product.basePriceUSD)}</span>{product.originalPriceUSD ? <span className="text-[9px] sm:text-[10px] text-slate-400 line-through">{formatPrice(product.originalPriceUSD)}</span> : null}</div>
        <div className="mt-1 min-h-3 text-[9px] font-semibold text-[#0757ee]">{product.paymentOptions.bnpl ? 'BNPL available' : product.paymentOptions.saveToBuy ? 'Save to Buy available' : 'Pay securely'}</div>
        <button onClick={() => openProductDetail(product)} className="mt-2 w-full rounded-lg bg-[#0757ee] hover:bg-blue-800 text-white py-2 px-2 text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"><ShoppingCart className="w-3.5 h-3.5"/>View product</button>
      </div>
    </article>
  );
};
