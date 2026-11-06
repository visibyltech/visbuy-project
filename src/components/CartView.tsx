import React from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotalUSD,
    formatPrice,
    currentCountry,
    setActiveView,
    rewardsWallet,
  } = useVisbuy();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0047FF] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 font-display">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          Discover genuine electronics, smartphones, fashion, and home appliances with 4 flexible African payment options.
        </p>
        <button
          onClick={() => setActiveView('marketplace')}
          className="px-6 py-3 bg-[#0047FF] hover:bg-[#0036cc] text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  const shippingUSD = currentCountry.baseShippingUSD;
  const taxUSD = (cartTotalUSD * currentCountry.taxRatePercent) / 100;
  const finalTotalUSD = cartTotalUSD + shippingUSD + taxUSD;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Shopping Cart</h1>
          <p className="text-xs text-slate-500">{cart.length} item(s) selected</p>
        </div>
        <button
          onClick={() => setActiveView('marketplace')}
          className="text-xs font-semibold text-[#0047FF] hover:underline"
        >
          Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedPaymentMode}`}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.product.brand}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate font-display">{item.product.name}</h3>

                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Mode:</span>
                    <span className="font-semibold text-[#0047FF] bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      {item.selectedPaymentMode === 'payNow'
                        ? 'Pay Now'
                        : item.selectedPaymentMode === 'bnpl'
                        ? `BNPL (${item.bnplDurationMonths || 3} Mos)`
                        : item.selectedPaymentMode === 'saveToBuy'
                        ? `Save to Buy (${item.saveToBuyDepositPercent || 30}% Deposit)`
                        : 'Osusu Group'}
                    </span>
                  </div>

                  <div className="mt-1 font-extrabold text-[#0047FF] font-mono text-sm">
                    {formatPrice(item.product.basePriceUSD)}
                  </div>
                </div>
              </div>

              {/* Quantity steppers & remove */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold font-mono text-slate-800">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-900 font-mono text-sm">
                    {formatPrice(item.product.basePriceUSD * item.quantity)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-400 hover:text-rose-600 text-xs mt-1 transition-colors flex items-center gap-1 ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-display">Order Summary</h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-semibold text-slate-900 font-mono">{formatPrice(cartTotalUSD)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping ({currentCountry.name}):</span>
                <span className="font-semibold text-slate-900 font-mono">{formatPrice(shippingUSD)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated VAT / Tax ({currentCountry.taxRatePercent}%):</span>
                <span className="font-semibold text-slate-900 font-mono">{formatPrice(taxUSD)}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-emerald-700">
                <span className="flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>2.5% Cashback Rewards:</span>
                </span>
                <strong className="font-mono">+ {formatPrice((cartTotalUSD * 2.5) / 100)}</strong>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between text-base">
                <span className="font-bold text-slate-900">Total Payable:</span>
                <strong className="font-extrabold text-[#0047FF] font-mono text-lg">
                  {formatPrice(finalTotalUSD)}
                </strong>
              </div>
            </div>

            <button
              onClick={() => setActiveView('checkout')}
              className="w-full py-3.5 px-4 bg-[#0047FF] hover:bg-[#0036cc] active:scale-[0.99] text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Paystack & Flutterwave Escrow Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
