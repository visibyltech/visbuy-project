import React from 'react';
import { Product } from '../data/products';
import { useVisbuy } from '../context/VisbuyContext';
import { Star, Heart, ShoppingBag, Users2, PiggyBank, Clock, Check } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { formatPrice, openProductDetail, addToCart, wishlist, toggleWishlist } = useVisbuy();
  const isWishlisted = wishlist.includes(product.id);

  // Calculate sample BNPL (3 months installment)
  const bnplMonthlyUSD = product.basePriceUSD / 3;
  // Calculate sample Save to Buy (30% deposit)
  const saveToBuyDepositUSD = (product.basePriceUSD * product.saveToBuyMinDepositPercent) / 100;
  // Calculate sample Osusu contribution (4 members)
  const osusuMonthlyUSD = product.basePriceUSD / 4;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 bg-slate-50 overflow-hidden cursor-pointer" onClick={() => openProductDetail(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-600'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Discount tag if applicable */}
        {product.discountPercent && (
          <div className="absolute top-3 left-3 bg-[#0047FF] text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-xs">
            -{product.discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata: Category and Rating (zero-pill discipline) */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700 tracking-wider uppercase text-[10px]">{product.brand}</span>
            <div className="flex items-center gap-1 text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900 font-mono">{product.rating}</span>
              <span className="text-slate-400">({product.ratingCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetail(product)}
            className="text-sm font-bold text-slate-900 group-hover:text-[#0047FF] transition-colors line-clamp-2 cursor-pointer font-display"
          >
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-extrabold text-[#0047FF] font-mono tabular-nums">
              {formatPrice(product.basePriceUSD)}
            </span>
            {product.originalPriceUSD && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                {formatPrice(product.originalPriceUSD)}
              </span>
            )}
          </div>

          {/* Flexible Payment Options Preview Strip */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
            {product.paymentOptions.bnpl && (
              <div className="flex items-center gap-1.5 text-[11px] text-indigo-700">
                <Clock className="w-3 h-3 text-indigo-600 shrink-0" />
                <span>BNPL: <strong>{formatPrice(bnplMonthlyUSD)}</strong>/mo</span>
              </div>
            )}
            {product.paymentOptions.saveToBuy && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                <PiggyBank className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Save to Buy: 30% deposit ({formatPrice(saveToBuyDepositUSD)})</span>
              </div>
            )}
            {product.paymentOptions.osusu && (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-800">
                <Users2 className="w-3 h-3 text-amber-600 shrink-0" />
                <span>Osusu Group: {formatPrice(osusuMonthlyUSD)}/cycle</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => openProductDetail(product)}
            className="flex-1 py-2 px-3 bg-blue-50 hover:bg-[#0047FF] text-[#0047FF] hover:text-white rounded-xl text-xs font-semibold transition-all text-center cursor-pointer"
          >
            Payment Options
          </button>
          <button
            onClick={() => addToCart(product, 'payNow')}
            className="p-2 bg-slate-900 hover:bg-[#0047FF] text-white rounded-xl transition-all cursor-pointer"
            title="Quick Add to Cart (Pay Now)"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
