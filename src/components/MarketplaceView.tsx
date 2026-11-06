import React, { useState, useMemo } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { HeroBanner } from './HeroBanner';
import { Clock, PiggyBank, Users2, Search, ChevronRight } from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useVisbuy();
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'bnpl' | 'saveToBuy' | 'osusu'>('all');

  const filteredProducts = useMemo(() => PRODUCTS.filter((p) => {
    const matchesSearch = searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All Categories' || p.category === selectedCategory;
    const matchesPayment = paymentFilter === 'all' || (paymentFilter === 'bnpl' && p.paymentOptions.bnpl) || (paymentFilter === 'saveToBuy' && p.paymentOptions.saveToBuy) || (paymentFilter === 'osusu' && p.paymentOptions.osusu);
    return matchesSearch && matchesCat && matchesPayment;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePriceUSD - b.basePriceUSD;
    if (sortBy === 'price-desc') return b.basePriceUSD - a.basePriceUSD;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  }), [searchQuery, selectedCategory, paymentFilter, sortBy]);

  const categoryTiles = [
    { name: 'Phones & Tablets', icon: '📱', tone: 'bg-blue-50' },
    { name: 'Computers & Laptops', icon: '💻', tone: 'bg-indigo-50' },
    { name: 'Electronics & Audio', icon: '🎧', tone: 'bg-sky-50' },
    { name: 'Home Appliances', icon: '🏠', tone: 'bg-cyan-50' },
    { name: 'Fashion & Shoes', icon: '👟', tone: 'bg-violet-50' },
    { name: 'Beauty & Care', icon: '✨', tone: 'bg-pink-50' },
    { name: 'Furniture', icon: '🛋️', tone: 'bg-slate-100' },
    { name: 'Groceries', icon: '🛒', tone: 'bg-emerald-50' },
  ];

  const ProductSection = ({ title, products, badge }: { title: string; products: Product[]; badge?: string }) => (
    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-3 sm:px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {badge && <span className="rounded bg-[#0047FF] text-white text-[9px] sm:text-[10px] font-bold px-2 py-1">{badge}</span>}
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">{title}</h2>
        </div>
        <button onClick={() => { setSelectedCategory('All Categories'); document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[11px] sm:text-xs font-bold text-[#0047FF] whitespace-nowrap flex items-center gap-1">See all <ChevronRight className="w-3.5 h-3.5" /></button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-2 sm:p-3">
        {products.slice(0, 5).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );

  const isBrowsing = searchQuery !== '' || selectedCategory !== 'All Categories' || paymentFilter !== 'all';

  return (
    <div className="bg-[#f5f7fb]">
      {!isBrowsing && <HeroBanner />}
      {!isBrowsing && (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 space-y-3">
          <section className="bg-white rounded-xl border border-slate-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-extrabold text-slate-900">Shop by category</h2>
              <span className="text-[10px] text-slate-400">Explore VISBUY</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {categoryTiles.map((tile) => (
                <button key={tile.name} onClick={() => setSelectedCategory(tile.name)} className="min-w-0 flex flex-col items-center gap-1.5 rounded-lg p-2 hover:bg-blue-50">
                  <span className={'w-11 h-11 sm:w-14 sm:h-14 rounded-full ' + tile.tone + ' flex items-center justify-center text-xl sm:text-2xl'}>{tile.icon}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-700 text-center leading-tight">{tile.name}</span>
                </button>
              ))}
            </div>
          </section>
          <ProductSection title="Flash deals" badge="HOT DEALS" products={PRODUCTS.filter(p => (p.discountPercent || 0) >= 8).sort((a,b) => (b.discountPercent || 0) - (a.discountPercent || 0))} />
          <ProductSection title="Recommended for you" products={PRODUCTS.filter(p => p.isFeatured || p.isPopular)} />
        </div>
      )}

      <section id="marketplace-products" className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-5 space-y-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Payment options</span>
            {[
              { key: 'all', label: 'All products', icon: null },
              { key: 'bnpl', label: 'BNPL', icon: Clock },
              { key: 'saveToBuy', label: 'Save to Buy', icon: PiggyBank },
              { key: 'osusu', label: 'Osusu', icon: Users2 },
            ].map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setPaymentFilter(key as typeof paymentFilter)} className={'px-3 py-1.5 rounded-full whitespace-nowrap text-[11px] font-semibold flex items-center gap-1.5 ' + (paymentFilter === key ? 'bg-[#0A1931] text-white' : 'bg-slate-100 text-slate-600')}>
                {Icon && <Icon className="w-3 h-3" />}{label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <span className="text-[11px] text-slate-500">{filteredProducts.length} products</span>
            <label className="flex items-center gap-2 text-[11px] text-slate-500">Sort
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold">
                <option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Top Rated</option>
              </select>
            </label>
          </div>
        </div>

        <div id="all-products" className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-3 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900">{isBrowsing ? 'Search results' : 'All products'}</h2>
            <span className="text-[10px] text-slate-400">Shop smart. Pay your way.</span>
          </div>
          {filteredProducts.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-2 sm:p-3">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="p-10 text-center space-y-3"><Search className="w-9 h-9 text-slate-300 mx-auto" /><h3 className="font-bold text-slate-900">No matching products</h3><p className="text-xs text-slate-500">Try another search or category.</p><button onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); setPaymentFilter('all'); }} className="px-4 py-2 rounded-lg bg-[#0047FF] text-white text-xs font-bold">Clear filters</button></div>
          )}
        </div>
      </section>
    </div>
  );
};
