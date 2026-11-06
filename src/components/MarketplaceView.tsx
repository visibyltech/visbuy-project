import React, { useMemo, useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCTS, PRODUCT_CATEGORIES, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { HeroBanner } from './HeroBanner';
import { ArrowRight, ChevronRight, Clock3, PiggyBank, Users2, Search, SlidersHorizontal, Zap, ShieldCheck, Truck } from 'lucide-react';

const ProductRail: React.FC<{ title: string; products: Product[]; subtitle?: string; dark?: boolean; badge?: string; onViewAll?: () => void }> = ({ title, products, subtitle, dark = false, badge, onViewAll }) => {
  if (!products.length) return null;
  return (
    <section className={'rounded-2xl overflow-hidden border ' + (dark ? 'bg-[#101a2d] border-[#101a2d] text-white' : 'bg-white border-slate-200 text-slate-900')}>
      <div className="px-3 sm:px-5 pt-3.5 sm:pt-5 pb-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">{badge && <span className="rounded bg-orange-500 text-white px-2 py-0.5 text-[9px] font-extrabold tracking-wide">{badge}</span>}<h2 className="text-base sm:text-xl font-extrabold truncate">{title}</h2></div>
          {subtitle && <p className={'mt-1 text-[10px] sm:text-xs ' + (dark ? 'text-slate-300' : 'text-slate-500')}>{subtitle}</p>}
        </div>
        <button onClick={onViewAll} className={'shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ' + (dark ? 'bg-white text-slate-900 hover:bg-blue-100' : 'bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700')} aria-label={'See all ' + title}><ArrowRight className="w-4 h-4"/></button>
      </div>
      <div className="flex gap-2.5 sm:gap-3 overflow-x-auto px-3 sm:px-5 pb-4 snap-x snap-mandatory">
        {products.slice(0, 10).map(product => <div key={product.id} className="w-[158px] sm:w-[205px] shrink-0 snap-start"><ProductCard product={product}/></div>)}
      </div>
    </section>
  );
};

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
    return (Number(b.isFeatured) - Number(a.isFeatured)) || (Number(b.isPopular) - Number(a.isPopular));
  }), [searchQuery, selectedCategory, paymentFilter, sortBy]);

  const categoryItems = PRODUCT_CATEGORIES.filter(category => category !== 'All Categories').map(category => ({
    name: category,
    image: PRODUCTS.find(product => product.category === category)?.images.find(src => src.startsWith('http')) || PRODUCTS.find(product => product.category === category)?.images[0],
    count: PRODUCTS.filter(product => product.category === category).length,
  })).filter(item => item.count > 0);

  const isBrowsing = searchQuery !== '' || selectedCategory !== 'All Categories' || paymentFilter !== 'all';
  const showAll = () => { setSelectedCategory('All Categories'); setPaymentFilter('all'); document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' }); };
  const showCategory = (category: string) => { setSelectedCategory(category); setPaymentFilter('all'); document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-[#f3f5f9] pb-20 md:pb-0">
      {!isBrowsing && <HeroBanner />}

      {!isBrowsing && <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2 sm:pt-4 space-y-3 sm:space-y-5">
        <section id="shop-categories" className="rounded-2xl bg-white border border-slate-200 p-3 sm:p-5">
          <div className="flex items-center justify-between mb-3"><div><h2 className="text-base sm:text-xl font-extrabold text-slate-900">Shop by category</h2><p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Find exactly what you need</p></div><button onClick={showAll} className="text-[10px] sm:text-xs font-bold text-[#0757ee]">View all</button></div>
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-8 gap-x-2 gap-y-3 sm:gap-4">
            {categoryItems.map(item => <button key={item.name} onClick={() => showCategory(item.name)} className="min-w-0 flex flex-col items-center text-center group">
              <span className="w-14 h-14 sm:w-[76px] sm:h-[76px] rounded-full bg-[#f1f4f9] border border-slate-100 p-2 flex items-center justify-center overflow-hidden group-hover:border-blue-300 group-hover:bg-blue-50 transition-colors"><img src={item.image} alt="" loading="lazy" className="w-full h-full object-contain"/></span>
              <span className="mt-1.5 text-[9px] sm:text-xs font-semibold text-slate-700 leading-tight">{item.name}</span>
            </button>)}
          </div>
        </section>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <button onClick={() => { setPaymentFilter('osusu'); document.getElementById('all-products')?.scrollIntoView({behavior:'smooth'}); }} className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0a285e] to-[#1768df] p-2.5 sm:p-4 text-left text-white min-h-[86px] sm:min-h-[110px]"><Users2 className="w-5 h-5 sm:w-6 sm:h-6 mb-2"/><span className="block text-[10px] sm:text-sm font-extrabold">Shop with Osusu</span><span className="hidden sm:block text-[10px] text-blue-100 mt-1">Together, within reach</span></button>
          <button onClick={() => { setPaymentFilter('bnpl'); document.getElementById('all-products')?.scrollIntoView({behavior:'smooth'}); }} className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#3b236f] to-[#8154cf] p-2.5 sm:p-4 text-left text-white min-h-[86px] sm:min-h-[110px]"><Clock3 className="w-5 h-5 sm:w-6 sm:h-6 mb-2"/><span className="block text-[10px] sm:text-sm font-extrabold">Buy now, pay later</span><span className="hidden sm:block text-[10px] text-purple-100 mt-1">Flexible instalments</span></button>
          <button onClick={() => setActiveView('save-to-buy')} className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#08756a] to-[#18aa91] p-2.5 sm:p-4 text-left text-white min-h-[86px] sm:min-h-[110px]"><PiggyBank className="w-5 h-5 sm:w-6 sm:h-6 mb-2"/><span className="block text-[10px] sm:text-sm font-extrabold">Save to Buy</span><span className="hidden sm:block text-[10px] text-emerald-50 mt-1">Start with 30%</span></button>
        </div>

        <ProductRail title="Flash deals" subtitle="Limited-time prices on popular picks" products={PRODUCTS.filter(p => (p.discountPercent || 0) >= 8).sort((a,b) => (b.discountPercent || 0) - (a.discountPercent || 0))} dark badge="HOT DEALS" onViewAll={showAll}/>
        <ProductRail title="Top sellers" subtitle="Customer favourites, all in one place" products={PRODUCTS.filter(p => p.isPopular).sort((a,b) => b.ratingCount-a.ratingCount)} onViewAll={showAll}/>
        <ProductRail title="Recommended for you" subtitle="A few good finds selected from our store" products={PRODUCTS.filter(p => p.isFeatured || p.isPopular).sort((a,b) => b.rating-a.rating)} onViewAll={showAll}/>

        {['Phones & Tablets','Computers & Laptops','Home Appliances','Electronics & Audio','Furniture','Fashion & Shoes','Beauty & Care'].map(category => <ProductRail key={category} title={category} products={PRODUCTS.filter(p => p.category === category)} subtitle={'Explore our ' + category.toLowerCase() + ' collection'} onViewAll={() => showCategory(category)}/>)}

        <section className="rounded-2xl bg-gradient-to-r from-[#09285c] to-[#0757ee] p-4 sm:p-7 text-white flex items-center justify-between gap-4">
          <div><span className="text-[9px] sm:text-xs font-bold tracking-[0.15em] text-blue-200">THE VISBUY PROMISE</span><h2 className="mt-1 text-base sm:text-2xl font-black">Shop confidently. Pay comfortably.</h2><p className="mt-1 text-[10px] sm:text-sm text-blue-100">Secure checkout, flexible payment options and convenient delivery.</p></div>
          <div className="hidden sm:flex gap-3"><ShieldCheck className="w-8 h-8"/><Truck className="w-8 h-8"/></div>
        </section>
      </div>}

      <section id="all-products" className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-3">
        <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2 mb-3"><div><h2 className="text-base sm:text-xl font-extrabold text-slate-900">{isBrowsing ? 'Shop results' : 'Explore all products'}</h2><p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{filteredProducts.length} products available</p></div><button onClick={() => {setSearchQuery('');setSelectedCategory('All Categories');setPaymentFilter('all');}} className="text-[10px] sm:text-xs font-bold text-[#0757ee]">Clear filters</button></div>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-100">
            {[{key:'all',label:'All items',icon:null},{key:'bnpl',label:'Buy now, pay later',icon:Clock3},{key:'saveToBuy',label:'Save to Buy',icon:PiggyBank},{key:'osusu',label:'Osusu',icon:Users2}].map(({key,label,icon:Icon}) => <button key={key} onClick={() => setPaymentFilter(key as typeof paymentFilter)} className={'shrink-0 px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 ' + (paymentFilter===key ? 'bg-[#0b2858] text-white' : 'bg-slate-100 text-slate-600')}>{Icon && <Icon className="w-3.5 h-3.5"/>}{label}</button>)}
          </div>
          <div className="flex items-center justify-between pt-3 gap-2"><span className="text-[10px] sm:text-xs text-slate-500">{selectedCategory === 'All Categories' ? 'All categories' : selectedCategory}</span><label className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500"><SlidersHorizontal className="w-3.5 h-3.5"/>Sort<select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-800 font-semibold"><option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Top Rated</option></select></label></div>
        </div>
        {filteredProducts.length ? <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">{filteredProducts.map(product => <ProductCard key={product.id} product={product}/>)}</div> : <div className="rounded-2xl bg-white p-10 text-center space-y-3"><Search className="w-9 h-9 text-slate-300 mx-auto"/><h3 className="font-bold text-slate-900">No matching products</h3><p className="text-xs text-slate-500">Try another search or category.</p><button onClick={() => {setSearchQuery('');setSelectedCategory('All Categories');setPaymentFilter('all');}} className="px-4 py-2 rounded-lg bg-[#0757ee] text-white text-xs font-bold">Clear filters</button></div>}
      </section>
    </div>
  );
};
