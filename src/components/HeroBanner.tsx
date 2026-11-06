import React from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { ArrowRight, Zap, Clock, PiggyBank, Users2, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveView, currentCountry, formatPrice } = useVisbuy();

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background soft ambient gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/80 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-semibold text-[#0047FF]">
              <span className="text-sm">{currentCountry.flag}</span>
              <span>Delivering across {currentCountry.name} & all 54 African Nations</span>
              <span className="text-blue-300">·</span>
              <span className="font-mono">{currentCountry.currencyCode} Live</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display text-balance">
              Shop Smart. <br />
              <span className="text-[#0047FF]">Four Flexible Ways</span> to Pay in Africa.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              VISBUY combines Africa’s premier e-commerce marketplace with innovative financial freedom.
              Pay in full, spread installments with <strong>BNPL</strong>, lock prices with <strong>Save to Buy</strong>, or group-purchase with <strong>Osusu</strong>.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('marketplace-products');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#0047FF] hover:bg-[#0036cc] active:scale-[0.99] text-white text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('osusu-hub')}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200/80 active:scale-[0.99] text-slate-800 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-200"
              >
                <Users2 className="w-4 h-4 text-[#0047FF]" />
                <span>Join Osusu Group</span>
              </button>

              <button
                onClick={() => setActiveView('save-to-buy')}
                className="px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-emerald-200"
              >
                <PiggyBank className="w-4 h-4 text-emerald-600" />
                <span>Save to Buy (30% Deposit)</span>
              </button>
            </div>

            {/* Adjacent Trust Proofs */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0047FF]" />
                <span>100% Verified Warranties</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Paystack & Flutterwave Escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>54 African Countries Supported</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 aspect-4/3 lg:aspect-square">
              <img
                src="/src/assets/images/hero_visbuy_banner_1793992277346.jpg"
                alt="African E-Commerce Experience on VISBUY"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Floating Overlay Badge 1: Osusu Live Alert */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 max-w-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0047FF] flex items-center justify-center shrink-0">
                  <Users2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Live Osusu Circle</div>
                  <div className="text-xs font-bold text-slate-900">iPhone 16 Pro Max (Cycle 2/4)</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Allocation Dispatched · Verified</div>
                </div>
              </div>

              {/* Floating Overlay Badge 2: Price Hedge */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Save to Buy</div>
                  <div className="text-xs font-bold text-slate-900">Price Locked at 30% Deposit</div>
                  <div className="text-[10px] text-slate-500">Zero Inflation Surcharges</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Strip (Full-width row directly below hero) */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#0047FF]/40 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0047FF] flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">1. Pay Now</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full instant payment via Card, Mobile Money, or Bank Transfer. Earn 2.5% VISBUY rewards cashback.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#0047FF]/40 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">2. Buy Now, Pay Later</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take your items home today. Spread the balance across 3 to 6 transparent monthly installments.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#0047FF]/40 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <PiggyBank className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">3. Save to Buy</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Start with a 30% deposit to lock inventory and hedge against inflation. Delivered upon 100% payment.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#0047FF]/40 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Users2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">4. Buy with Osusu</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Join a trusted circle of 4 to 6 buyers. Each cycle, members contribute and one receives their order.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
