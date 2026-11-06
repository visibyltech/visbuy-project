import React from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { ArrowRight, Users2, PiggyBank, Clock, CreditCard } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveView, currentCountry } = useVisbuy();
  const paymentLinks = [
    { label: 'Pay Now', icon: CreditCard, action: () => setActiveView('marketplace') },
    { label: 'BNPL', icon: Clock, action: () => setActiveView('marketplace') },
    { label: 'Save to Buy', icon: PiggyBank, action: () => setActiveView('save-to-buy') },
    { label: 'Osusu', icon: Users2, action: () => setActiveView('osusu-hub') },
  ];

  return (
    <section className="bg-[#f5f7fb] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 pb-3">
        <div className="rounded-lg bg-[#eaf1ff] border border-blue-100 px-3 py-2 flex items-center justify-between gap-2 text-[11px] sm:text-sm">
          <span className="font-semibold text-slate-700">{currentCountry.flag} Shopping across Africa · Local currency and payment options</span>
          <span className="shrink-0 font-bold text-[#0047FF]">{currentCountry.currencyCode}</span>
        </div>
        <div className="mt-3 rounded-xl overflow-hidden bg-gradient-to-r from-[#082d86] via-[#0648d9] to-[#1768ff] text-white min-h-[116px] sm:min-h-[150px] flex items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <div className="max-w-[76%]">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-100">VISBUY · SHOP SMART</p>
            <h1 className="mt-1 text-xl sm:text-3xl font-extrabold leading-tight">Shop more. Pay your way.</h1>
            <p className="mt-1 text-[11px] sm:text-sm text-blue-100">Pay now, pay later, save or shop together with Osusu.</p>
            <button onClick={() => document.getElementById('marketplace-products')?.scrollIntoView({ behavior: 'smooth' })} className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-[11px] sm:text-xs font-bold text-[#0047FF]">
              Shop deals <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-4xl sm:text-6xl opacity-90" aria-hidden="true">🛍️</div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {paymentLinks.map(({ label, icon: Icon, action }) => (
            <button key={label} onClick={action} className="min-w-0 rounded-lg border border-slate-200 bg-white px-1.5 py-2 sm:px-3 sm:py-3 text-center hover:border-blue-300 hover:shadow-sm">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-[#0047FF]" />
              <span className="block mt-1 text-[10px] sm:text-xs font-bold text-slate-800 truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
