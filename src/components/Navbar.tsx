import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCT_CATEGORIES } from '../data/products';
import { Search, ShoppingCart, Heart, Bell, Globe, UserRound, Shield, Menu, X, Sparkles, HelpCircle, Users2, PiggyBank, Home, House, LayoutGrid, Headphones } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentCountry, setIsCountryModalOpen, activeView, setActiveView, cart, wishlist,
    rewardsWallet, notifications, markNotificationAsRead, searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory, formatPrice, isMobileMenuOpen, setIsMobileMenuOpen,
  } = useVisbuy();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const goHome = () => {
    setActiveView('marketplace');
    setSelectedCategory('All Categories');
  };
  const goCategory = () => {
    setActiveView('categories');
  };

  return (
    <>
      {activeView === 'categories' ? (
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-3 py-3 flex items-center gap-3">
            <button onClick={() => setActiveView('marketplace')} aria-label="Back to home" className="shrink-0 text-slate-800"><span className="text-3xl leading-none">‹</span></button>
            <div className="relative flex-1"><Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"/><input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setActiveView('marketplace'); }} placeholder="Search on VISBUY" className="w-full h-11 pl-12 pr-4 rounded-full bg-[#f1f2f4] border border-transparent text-sm outline-none focus:bg-white focus:border-blue-300"/></div>
          </div>
        </header>
      ) : (
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="bg-[#071a36] text-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 h-8 flex items-center justify-between text-[10px] sm:text-xs">
            <span className="font-semibold tracking-wide">VISBUY <span className="text-blue-300 font-normal">· Shop smart. Pay your way.</span></span>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsCountryModalOpen(true)} className="flex items-center gap-1.5 text-slate-200"><span>{currentCountry.flag}</span><span>{currentCountry.code} · {currentCountry.currencyCode}</span><Globe className="w-3 h-3" /></button>
              <button onClick={() => setActiveView('admin-dashboard')} className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white"><Shield className="w-3 h-3" /> Admin</button>
              <button onClick={() => setActiveView('support')} className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white"><Headphones className="w-3 h-3" /> Help</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3">
          <button onClick={goHome} className="flex items-center gap-2 shrink-0 text-left">
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0757ee] to-[#082d86] text-white flex items-center justify-center font-black text-lg shadow-sm">V</span>
            <span className="leading-none"><span className="block text-lg sm:text-xl font-black tracking-tight text-[#09285c]">VISBUY</span><span className="block mt-1 text-[8px] sm:text-[9px] tracking-[0.2em] font-bold text-[#1768df]">SHOP SMART</span></span>
          </button>

          <div className="hidden lg:flex flex-1 items-center justify-center gap-5 text-xs font-bold text-slate-600">
            <button onClick={goHome} className={activeView === 'marketplace' ? 'text-[#0757ee]' : 'hover:text-[#0757ee]'}>Home</button>
            <button onClick={goCategory} className="hover:text-[#0757ee]">Categories</button>
            <button onClick={() => setActiveView('osusu-hub')} className="hover:text-[#0757ee]">Osusu</button>
            <button onClick={() => setActiveView('save-to-buy')} className="hover:text-[#0757ee]">Save to Buy</button>
            <button onClick={() => setActiveView('rent-savings')} className="hover:text-[#0757ee]">Rent Savings</button>
          </div>

          <div className="hidden md:block flex-1 max-w-xl relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (activeView !== 'marketplace') setActiveView('marketplace'); }} placeholder="Search phones, laptops, appliances and more" className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-100 border border-slate-200 text-sm outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2 shrink-0">
            <button onClick={() => setActiveView('customer-dashboard')} className="hidden sm:flex items-center gap-1.5 px-2 py-2 text-slate-600 hover:text-blue-700 text-xs font-semibold"><Heart className="w-5 h-5" /><span className="hidden lg:inline">Wishlist</span></button>
            <div className="relative">
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative p-2 text-slate-600 hover:text-blue-700"><Bell className="w-5 h-5" />{unreadNotifs > 0 && <span className="absolute top-0 right-0 min-w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center">{unreadNotifs}</span>}</button>
              {isNotifOpen && <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50"><div className="flex justify-between border-b pb-2 mb-2 text-sm font-bold"><span>Notifications</span><span className="text-xs text-slate-500">{unreadNotifs} new</span></div><div className="max-h-72 overflow-y-auto space-y-2">{notifications.map(n => <button key={n.id} onClick={() => markNotificationAsRead(n.id)} className={'block w-full text-left rounded-lg p-2 border ' + (n.read ? 'bg-slate-50 border-transparent' : 'bg-blue-50 border-blue-100')}><span className="block text-xs font-bold">{n.title}</span><span className="block text-[11px] text-slate-600 mt-1">{n.message}</span></button>)}</div></div>}
            </div>
            <button onClick={() => setActiveView('cart')} className="relative p-2 text-slate-700 hover:text-blue-700"><ShoppingCart className="w-5 h-5" />{cartItemCount > 0 && <span className="absolute top-0 right-0 min-w-4 h-4 px-1 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center">{cartItemCount}</span>}</button>
            <button onClick={() => setActiveView('customer-dashboard')} className="hidden sm:flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700"><UserRound className="w-4 h-4" /><span>Account</span></button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-600"><Menu className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="md:hidden px-3 pb-3">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (activeView !== 'marketplace') setActiveView('marketplace'); }} placeholder="Search on VISBUY" className="w-full h-11 pl-12 pr-4 rounded-full bg-[#f1f3f6] border border-transparent text-sm outline-none focus:bg-white focus:border-blue-300" />
          </div>
        </div>

        {activeView === 'marketplace' && <div className="hidden lg:block border-t border-slate-100"><div className="max-w-7xl mx-auto px-6 py-2 flex gap-2 overflow-x-auto">{PRODUCT_CATEGORIES.map(cat => <button key={cat} onClick={() => setSelectedCategory(cat)} className={'px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ' + (selectedCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100')}>{cat}</button>)}</div></div>}

        {isMobileMenuOpen && <div className="lg:hidden border-t bg-white p-3 grid grid-cols-2 gap-2"><button onClick={() => setActiveView('osusu-hub')} className="p-3 rounded-lg bg-slate-50 text-left text-sm font-semibold"><Users2 className="inline w-4 mr-2 text-blue-600"/>Osusu Groups</button><button onClick={() => setActiveView('save-to-buy')} className="p-3 rounded-lg bg-slate-50 text-left text-sm font-semibold"><PiggyBank className="inline w-4 mr-2 text-blue-600"/>Save to Buy</button><button onClick={() => setActiveView('rent-savings')} className="p-3 rounded-lg bg-slate-50 text-left text-sm font-semibold"><Home className="inline w-4 mr-2 text-blue-600"/>Rent Savings</button><button onClick={() => setActiveView('support')} className="p-3 rounded-lg bg-slate-50 text-left text-sm font-semibold"><HelpCircle className="inline w-4 mr-2 text-blue-600"/>Support</button></div>}
      </header>
      )}

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 shadow-[0_-4px_18px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-5 max-w-xl mx-auto h-[66px]">
          <button onClick={goHome} className={'flex flex-col items-center justify-center gap-1 ' + (activeView === 'marketplace' && selectedCategory === 'All Categories' ? 'text-[#0757ee]' : 'text-slate-600')}><House className="w-5 h-5"/><span className="text-[10px] font-semibold">Home</span></button>
          <button onClick={goCategory} className={'flex flex-col items-center justify-center gap-1 ' + (activeView === 'categories' ? 'text-[#f28a24]' : 'text-slate-600')}><LayoutGrid className="w-5 h-5"/><span className="text-[10px] font-semibold">Categories</span></button>
          <button onClick={() => setActiveView('cart')} className={'relative flex flex-col items-center justify-center gap-1 ' + (activeView === 'cart' ? 'text-[#0757ee]' : 'text-slate-600')}><span className="relative"><ShoppingCart className="w-5 h-5"/>{cartItemCount > 0 && <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-orange-500 text-white text-[9px] flex items-center justify-center">{cartItemCount}</span>}</span><span className="text-[10px] font-semibold">Cart</span></button>
          <button onClick={() => setActiveView('customer-dashboard')} className="flex flex-col items-center justify-center gap-1 text-slate-600"><Heart className="w-5 h-5"/><span className="text-[10px] font-semibold">Wishlist</span></button>
          <button onClick={() => setActiveView('customer-dashboard')} className={'flex flex-col items-center justify-center gap-1 ' + (activeView === 'customer-dashboard' ? 'text-[#0757ee]' : 'text-slate-600')}><UserRound className="w-5 h-5"/><span className="text-[10px] font-semibold">Account</span></button>
        </div>
      </nav>
    </>
  );
};
