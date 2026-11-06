import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCT_CATEGORIES } from '../data/products';
import {
  Search,
  ShoppingCart,
  Heart,
  Bell,
  Globe,
  User,
  Shield,
  Menu,
  X,
  Sparkles,
  HelpCircle,
  Users2,
  PiggyBank,
  Home,
  Check,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentCountry,
    setIsCountryModalOpen,
    activeView,
    setActiveView,
    cart,
    wishlist,
    rewardsWallet,
    notifications,
    markNotificationAsRead,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    formatPrice,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useVisbuy();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadNotifs = notifications.filter((n) => !n.read).length;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Utility Bar */}
      <div className="bg-[#0A1931] text-white text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate text-slate-300">
            <span className="font-semibold text-white tracking-wide">VISBUY</span>
            <span className="text-slate-500">·</span>
            <span className="hidden sm:inline">An Innovation by Visibyl Technologies</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-blue-200">Shop Smart across 54 African Countries</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-slate-300">
            {/* Country Selector Button */}
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 text-white font-medium transition-colors"
            >
              <span className="text-base">{currentCountry.flag}</span>
              <span className="text-xs">{currentCountry.code}</span>
              <span className="text-slate-400">({currentCountry.currencySymbol})</span>
              <Globe className="w-3.5 h-3.5 text-blue-300 ml-0.5" />
            </button>

            {/* Rewards wallet balance */}
            <button
              onClick={() => setActiveView('customer-dashboard')}
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600/30 text-blue-200 hover:text-white transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Rewards: {formatPrice(rewardsWallet.equivalentUSD)}</span>
            </button>

            {/* Admin Switcher */}
            <button
              onClick={() => setActiveView('admin-dashboard')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                activeView === 'admin-dashboard' ? 'bg-[#0047FF] text-white' : 'hover:bg-white/10 text-slate-300'
              }`}
            >
              <Shield className="w-3 h-3 text-blue-400" />
              <span className="hidden xs:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
        {/* Zone 1: Single element Brand wordmark + logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveView('marketplace');
              setSelectedCategory('All Categories');
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <img
              src="/assets/aistudio/file_000000003fcc81f48a1417e03ba4b722_39cea0f0.png"
              alt="VISBUY"
              className="w-10 h-10 rounded-full shadow-xs object-cover border border-slate-100 group-hover:scale-105 transition-transform"
            />
            <div className="leading-tight">
              <span className="text-xl font-extrabold text-[#0047FF] tracking-tight font-display">VISBUY</span>
              <span className="block text-[10px] tracking-widest text-slate-500 font-semibold uppercase">SHOP SMART</span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => {
              setActiveView('marketplace');
              setSelectedCategory('All Categories');
            }}
            className={`whitespace-nowrap transition-colors ${
              activeView === 'marketplace' ? 'text-[#0047FF] font-bold' : 'hover:text-[#0047FF]'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveView('osusu-hub')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeView === 'osusu-hub' ? 'text-[#0047FF] font-bold' : 'hover:text-[#0047FF]'
            }`}
          >
            <Users2 className="w-4 h-4 text-[#0047FF]" />
            <span>Osusu Groups</span>
          </button>
          <button
            onClick={() => setActiveView('save-to-buy')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeView === 'save-to-buy' ? 'text-[#0047FF] font-bold' : 'hover:text-[#0047FF]'
            }`}
          >
            <PiggyBank className="w-4 h-4 text-emerald-600" />
            <span>Save to Buy</span>
          </button>
          <button
            onClick={() => setActiveView('rent-savings')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeView === 'rent-savings' ? 'text-[#0047FF] font-bold' : 'hover:text-[#0047FF]'
            }`}
          >
            <Home className="w-4 h-4 text-indigo-600" />
            <span>Rent Savings</span>
          </button>
          <button
            onClick={() => setActiveView('support')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeView === 'support' ? 'text-[#0047FF] font-bold' : 'hover:text-[#0047FF]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Support</span>
          </button>
        </nav>

        {/* Search Bar (Center/Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search phones, electronics, fashion, appliances..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeView !== 'marketplace') setActiveView('marketplace');
            }}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-[#0047FF] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0047FF]/15 transition-all"
          />
        </div>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Wishlist */}
          <button
            onClick={() => setActiveView('customer-dashboard')}
            className="relative p-2 text-slate-600 hover:text-[#0047FF] rounded-xl hover:bg-slate-100 transition-colors hidden sm:block"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 hover:text-[#0047FF] rounded-xl hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0047FF] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900 font-display">Notifications</h4>
                  <span className="text-xs text-slate-500">{unreadNotifs} new</span>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-2.5 rounded-xl text-left cursor-pointer transition-colors border ${
                        n.read ? 'bg-slate-50 border-transparent' : 'bg-blue-50/50 border-blue-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setActiveView('cart')}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-slate-900 font-semibold text-xs transition-colors"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-[#0047FF]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0047FF] text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden xs:inline">Cart</span>
          </button>

          {/* Customer Dashboard Button */}
          <button
            onClick={() => setActiveView('customer-dashboard')}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'customer-dashboard'
                ? 'bg-[#0047FF] text-white shadow-xs'
                : 'bg-blue-50 text-[#0047FF] hover:bg-blue-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">My Account</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search (visible only on mobile) */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products across Africa..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeView !== 'marketplace') setActiveView('marketplace');
            }}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:bg-white focus:border-[#0047FF] focus:outline-hidden text-slate-900"
          />
        </div>
      </div>

      {/* Categories Horizontal Bar (Marketplace View) */}
      {activeView === 'marketplace' && (
        <div className="border-t border-slate-100 bg-slate-50/70 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#0047FF] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveView('marketplace');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 text-[#0047FF]" />
              <span>Marketplace</span>
            </button>
            <button
              onClick={() => {
                setActiveView('osusu-hub');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 flex items-center gap-2"
            >
              <Users2 className="w-4 h-4 text-[#0047FF]" />
              <span>Osusu Groups</span>
            </button>
            <button
              onClick={() => {
                setActiveView('save-to-buy');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 flex items-center gap-2"
            >
              <PiggyBank className="w-4 h-4 text-emerald-600" />
              <span>Save to Buy</span>
            </button>
            <button
              onClick={() => {
                setActiveView('rent-savings');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 text-left bg-slate-50 rounded-xl text-sm font-semibold text-slate-800 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-indigo-600" />
              <span>Rent Savings</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <button
              onClick={() => {
                setIsCountryModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 font-medium"
            >
              <span>{currentCountry.flag}</span>
              <span>{currentCountry.name} ({currentCountry.currencyCode})</span>
            </button>
            <button
              onClick={() => {
                setActiveView('support');
                setIsMobileMenuOpen(false);
              }}
              className="text-[#0047FF] font-semibold"
            >
              Help & Support
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
