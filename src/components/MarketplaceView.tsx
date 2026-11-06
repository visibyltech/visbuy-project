import React, { useState, useMemo } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { HeroBanner } from './HeroBanner';
import {
  SlidersHorizontal,
  Zap,
  Clock,
  PiggyBank,
  Users2,
  Sparkles,
  Search,
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    currentCountry,
  } = useVisbuy();

  const [paymentFilter, setPaymentFilter] = useState<'all' | 'bnpl' | 'saveToBuy' | 'osusu'>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All Categories' || p.category === selectedCategory;

      const matchesPayment =
        paymentFilter === 'all' ||
        (paymentFilter === 'bnpl' && p.paymentOptions.bnpl) ||
        (paymentFilter === 'saveToBuy' && p.paymentOptions.saveToBuy) ||
        (paymentFilter === 'osusu' && p.paymentOptions.osusu);

      return matchesSearch && matchesCat && matchesPayment;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePriceUSD - b.basePriceUSD;
      if (sortBy === 'price-desc') return b.basePriceUSD - a.basePriceUSD;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, paymentFilter, sortBy]);

  return (
    <div className="space-y-3 sm:space-y-5">
      {/* Hero Banner only shown when not actively searching/filtering */}
      {searchQuery === '' && selectedCategory === 'All Categories' && <HeroBanner />}

      {/* Main Catalog Section */}
      <section id="marketplace-products" className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-5 space-y-3 sm:space-y-5">
        {/* Filter and Controls Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Payment Method Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-medium mr-1 text-[11px] uppercase tracking-wider shrink-0">
              Payment Filter:
            </span>

            <button
              onClick={() => setPaymentFilter('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                paymentFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              All Payment Modes
            </button>

            <button
              onClick={() => setPaymentFilter('bnpl')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
                paymentFilter === 'bnpl'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>BNPL Eligible</span>
            </button>

            <button
              onClick={() => setPaymentFilter('saveToBuy')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
                paymentFilter === 'saveToBuy'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <PiggyBank className="w-3.5 h-3.5" />
              <span>Save to Buy (30% Deposit)</span>
            </button>

            <button
              onClick={() => setPaymentFilter('osusu')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
                paymentFilter === 'osusu'
                  ? 'bg-[#0047FF] text-white shadow-xs'
                  : 'bg-blue-50 text-[#0047FF] hover:bg-blue-100'
              }`}
            >
              <Users2 className="w-3.5 h-3.5" />
              <span>Buy with Osusu</span>
            </button>
          </div>

          {/* Sort By selector & count */}
          <div className="flex items-center gap-3 shrink-0 text-xs">
            <span className="text-slate-500 font-mono">{filteredProducts.length} items found</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-hidden"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 font-display">No matching products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, selecting another category, or clearing the payment mode filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setPaymentFilter('all');
              }}
              className="px-4 py-2 bg-[#0047FF] text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
