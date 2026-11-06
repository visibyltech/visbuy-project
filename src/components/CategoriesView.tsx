import React, { useMemo, useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { ChevronRight } from 'lucide-react';

type Group = { label: string; categories: string[] };
const GROUPS: Group[] = [
  { label: 'Phones & Tablets', categories: ['Phones & Tablets'] },
  { label: 'Computing', categories: ['Computers & Laptops'] },
  { label: 'Electronics', categories: ['Electronics & Audio'] },
  { label: 'Appliances', categories: ['Home Appliances'] },
  { label: 'Home & Office', categories: ['Furniture'] },
  { label: 'Fashion & Lifestyle', categories: ['Fashion & Shoes', 'Beauty & Care', 'Baby Products', 'Sports & Fitness'] },
];
const SIDE_ITEMS = [
  { label: 'Home & Office', group: 'Home & Office' },
  { label: 'Phones & Tablets', group: 'Phones & Tablets' },
  { label: 'Fashion', group: 'Fashion & Lifestyle' },
  { label: 'Health & Beauty', group: 'Fashion & Lifestyle' },
  { label: 'Electronics', group: 'Electronics' },
  { label: 'Computing', group: 'Computing' },
  { label: 'Appliances', group: 'Appliances' },
  { label: 'Baby Products', group: 'Fashion & Lifestyle' },
  { label: 'Sports & Fitness', group: 'Fashion & Lifestyle' },
];

export const CategoriesView: React.FC = () => {
  const { setActiveView, setSelectedCategory, setSearchQuery } = useVisbuy();
  const [activeSide, setActiveSide] = useState('Home & Office');
  const [showAllGroups, setShowAllGroups] = useState(true);

  const availableGroups = useMemo(() => GROUPS.map(group => ({
    ...group,
    categories: group.categories.filter(category =>
      PRODUCT_CATEGORIES.includes(category as any) && PRODUCTS.some(product => product.category === category)
    ),
  })).filter(group => group.categories.length > 0), []);

  const visibleGroups = showAllGroups
    ? availableGroups
    : availableGroups.filter(group => group.label === activeSide || SIDE_ITEMS.find(item => item.label === activeSide)?.group === group.label);

  const openCategory = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setActiveView('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryImage = (category: string) => {
    const product = PRODUCTS.find(item => item.category === category && item.images.length);
    return product?.images.find(src => src.startsWith('http')) || product?.images[0] || '';
  };

  return (
    <main className="min-h-[calc(100vh-125px)] bg-[#f1f1f1] pb-4">
      <div className="flex min-h-[calc(100vh-125px)]">
        <aside className="w-[112px] sm:w-[150px] shrink-0 bg-white border-r border-slate-200">
          <div className="sticky top-[67px]">
            {SIDE_ITEMS.map(item => {
              const selected = activeSide === item.label;
              return <button key={item.label} onClick={() => { setActiveSide(item.label); setShowAllGroups(false); }} className={'w-full min-h-[76px] sm:min-h-[86px] px-2 py-3 flex items-center justify-center text-center border-b border-slate-200 text-[11px] sm:text-sm leading-snug transition-colors ' + (selected ? 'bg-[#f1f1f1] border-l-[5px] border-l-[#f28a24] text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50')}>
                {item.label}
              </button>;
            })}
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-3 sm:px-5 py-3 sm:py-5 space-y-3 sm:space-y-4">
          <button onClick={() => { setShowAllGroups(true); setActiveSide('Home & Office'); }} className="w-full h-[66px] sm:h-[78px] rounded-lg bg-white px-4 sm:px-6 flex items-center justify-between text-sm sm:text-base text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="font-semibold">All Products</span><ChevronRight className="w-5 h-5"/>
          </button>

          {visibleGroups.map(group => (
            <section key={group.label} className="rounded-lg bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="h-[52px] sm:h-[60px] px-4 sm:px-6 flex items-center justify-between border-b border-slate-200">
                <h2 className="text-sm sm:text-base font-semibold text-slate-800">{group.label}</h2>
                <button onClick={() => openCategory(group.categories[0])} className="text-[#e98a20] font-bold text-xs sm:text-sm">See All</button>
              </div>
              <div className="p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {group.categories.map(category => (
                  <button key={category} onClick={() => openCategory(category)} className="min-w-0 flex flex-col items-center text-center group">
                    <span className="w-full max-w-[118px] aspect-square rounded-md bg-[#f2f2f2] flex items-center justify-center overflow-hidden p-2 group-hover:ring-2 group-hover:ring-orange-200">
                      <img src={getCategoryImage(category)} alt={category} loading="lazy" className="w-full h-full object-contain"/>
                    </span>
                    <span className="mt-2 text-[10px] sm:text-xs text-slate-600 leading-tight">{category}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}

          {!visibleGroups.length && <div className="rounded-lg bg-white p-6 text-center text-sm text-slate-500">No categories are available in this section yet.</div>}
        </section>
      </div>
    </main>
  );
};
