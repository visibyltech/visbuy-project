import React from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { ShieldCheck, Globe, Lock, HelpCircle, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { currentCountry, setIsCountryModalOpen, setActiveView } = useVisbuy();

  return (
    <footer className="bg-[#0A1931] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/file_000000003fcc81f48a1417e03ba4b722_39cea0f0.png"
                alt="VISBUY"
                className="w-12 h-12 rounded-full bg-white p-0.5 object-cover"
              />
              <div>
                <span className="text-2xl font-extrabold text-white tracking-tight font-display">VISBUY</span>
                <span className="block text-[11px] tracking-widest text-blue-300 font-semibold uppercase">SHOP SMART.</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Africa’s premier e-commerce and flexible-payment platform by <strong>Visibyl Technologies</strong>.
              Combining the comprehensive catalog reach of Jumia with the flexible financial power of CDcare,
              empowered with digital Osusu group purchasing and Rent Savings.
            </p>

            {/* Country Selector badge */}
            <div className="pt-2">
              <button
                onClick={() => setIsCountryModalOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-medium transition-colors border border-white/10"
              >
                <span className="text-base">{currentCountry.flag}</span>
                <span>Active: {currentCountry.name} ({currentCountry.currencyCode})</span>
                <Globe className="w-3.5 h-3.5 text-blue-300" />
              </button>
            </div>
          </div>

          {/* Quick Links: Payment Modes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Payment Options</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  Pay Now (Instant Checkout)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  Buy Now, Pay Later (BNPL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('save-to-buy')}
                  className="hover:text-white transition-colors"
                >
                  Save to Buy (30% Layaway)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('osusu-hub')}
                  className="hover:text-white transition-colors"
                >
                  Buy with Osusu Groups
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('rent-savings')}
                  className="hover:text-white transition-colors"
                >
                  Targeted Rent Savings
                </button>
              </li>
            </ul>
          </div>

          {/* Marketplace Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('marketplace')} className="hover:text-white transition-colors">
                  Phones & Tablets
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('marketplace')} className="hover:text-white transition-colors">
                  Computers & Laptops
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('marketplace')} className="hover:text-white transition-colors">
                  Electronics & Audio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('marketplace')} className="hover:text-white transition-colors">
                  Home Appliances & Kitchen
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('marketplace')} className="hover:text-white transition-colors">
                  Fashion, Shoes & Beauty
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Support & Security</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('support')} className="hover:text-white transition-colors">
                  Help Desk & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('support')} className="hover:text-white transition-colors">
                  WhatsApp Business Care
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('support')} className="hover:text-white transition-colors">
                  Complaint & Ticket Management
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('customer-dashboard')} className="hover:text-white transition-colors">
                  My Rewards Wallet
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('admin-dashboard')} className="hover:text-white transition-colors">
                  Operations & Governance
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Supported Payment Providers in Africa */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400 font-semibold">Verified Payment Partners:</span>
            <span className="bg-white/10 text-slate-200 px-2 py-1 rounded">Paystack</span>
            <span className="bg-white/10 text-slate-200 px-2 py-1 rounded">Flutterwave</span>
            <span className="bg-white/10 text-slate-200 px-2 py-1 rounded">M-Pesa</span>
            <span className="bg-white/10 text-slate-200 px-2 py-1 rounded">MTN Mobile Money</span>
            <span className="bg-white/10 text-slate-200 px-2 py-1 rounded">Orange Money</span>
            <span className="bg-white/10 text-slate-200 px-2 py-1 rounded">Wave</span>
            <span className="bg-white/10 text-slate-200 px-2 py-1 rounded">Direct Bank Transfer</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted Escrows</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} VISBUY. All rights reserved. An innovation by <strong>Visibyl Technologies</strong>.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-300">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-300">Escrow Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
