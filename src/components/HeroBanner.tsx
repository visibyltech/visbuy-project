import React from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { ArrowRight, Users2, PiggyBank, Clock, CreditCard } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveView, currentCountry } = useVisbuy();

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-5">
        <div className="rounded-xl bg-[#eef4ff] border border-blue-100 px-3 py-2 flex items-center justify-between gap-2 text-xs sm:text-sm">
          <span className="font-semibold text-slate-700">{currentCountry.flag} Shop across Africa with local payment options</span>
          <span className="shrink-0 font-bold text-[#0047FF]">{currentCountry.currencyCode}</span>
        </div>

        <div className="mt-3 sm:mt-4 rounded-2xl bg-gradient-to-r from-[#082d86] to-[#0755ff] text-white px-4 py-4 sm:px-7 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-blue-100">VISBUY · SHOP SMART</p>
            <h1 className="mt-1 text-xl sm:text-3xl font-extrabold leading-tight">Everything you need. More ways to pay.</h1>
            <p className="mt-1 text-xs sm:text-sm text-blue-100">Pay now · Buy Now, Pay Later · Save to Buy · Osusu</p>
          </div>
          <button
            onClick={() => document.getElementById('marketplace-products')?.scrollIntoView({ behavior: 'smooth' })}
            className="shrink-0 self-start sm:self-center rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#0047FF] hover:bg-blue-50 flex items-center gap-2"
          >
            Shop now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          <button onClick={() => setActiveView('marketplace')} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left hover:border-blue-300">
            <CreditCard className="w-4 h-4 text-[#0047FF] shrink-0" /><span className="text-xs sm:text-sm font-semibold text-slate-700">Pay in full</span>
          </button>
          <button onClick={() => setActiveView('marketplace')} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left hover:border-blue-300">
            <Clock className="w-4 h-4 text-[#0047FF] shrink-0" /><span className="text-xs sm:text-sm font-semibold text-slate-700">Buy Now, Pay Later</span>
          </button>
          <button onClick={() => setActiveView('save-to-buy')} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left hover:border-blue-300">
            <PiggyBank className="w-4 h-4 text-[#0047FF] shrink-0" /><span className="text-xs sm:text-sm font-semibold text-slate-700">Save to Buy</span>
          </button>
          <button onClick={() => setActiveView('osusu-hub')} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left hover:border-blue-300">
            <Users2 className="w-4 h-4 text-[#0047FF] shrink-0" /><span className="text-xs sm:text-sm font-semibold text-slate-700">Buy with Osusu</span>
          </button>
        </div>
      </div>
    </section>
  );
};
