import React, { useEffect, useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, Users2, PiggyBank, Clock, CreditCard, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const productImage = (id: string) => {
  const product = PRODUCTS.find(p => p.id === id);
  return product?.images.find(src => src.startsWith('http')) || product?.images[0] || '';
};

const slides = [
  {
    eyebrow: 'SHOP TOGETHER · WIN TOGETHER',
    title: 'Big things are better together.',
    description: 'Join an Osusu circle, contribute as a group and take home the electronics you want.',
    cta: 'Explore Osusu',
    image: productImage('prod-iphone-16-pro'),
    imageTwo: productImage('prod-samsung-s25-ultra'),
    tone: 'from-[#081c49] via-[#123b91] to-[#0757ee]',
    action: 'osusu-hub' as const,
    tag: 'OSUSU GROUP BUYING',
  },
  {
    eyebrow: 'FLEXIBLE PAYMENTS · MORE POSSIBILITIES',
    title: 'Get it now. Pay over time.',
    description: 'Spread eligible purchases into manageable instalments with Buy Now, Pay Later.',
    cta: 'Shop with BNPL',
    image: productImage('prod-macbook-pro-m4'),
    imageTwo: productImage('prod-sony-wh1000xm5'),
    tone: 'from-[#101b38] via-[#34246e] to-[#7045c7]',
    action: 'marketplace' as const,
    tag: 'BUY NOW · PAY LATER',
  },
  {
    eyebrow: 'START SMALL · OWN IT SOON',
    title: 'Your next big buy starts with 30%.',
    description: 'Start a Save to Buy plan with an initial deposit and complete payment at your pace.',
    cta: 'Start saving',
    image: productImage('prod-lg-inverter-refrigerator'),
    imageTwo: productImage('prod-hisense-65-qled'),
    tone: 'from-[#073d3a] via-[#087c73] to-[#16a394]',
    action: 'save-to-buy' as const,
    tag: 'SAVE TO BUY',
  },
  {
    eyebrow: 'GREAT FINDS · SMART PRICES',
    title: 'The tech you love. Prices you’ll love more.',
    description: 'Discover phones, laptops, home electronics and limited-time deals in one place.',
    cta: 'Shop all deals',
    image: productImage('prod-samsung-s25-ultra'),
    imageTwo: productImage('prod-starlink-standard-kit'),
    tone: 'from-[#7b260d] via-[#d64a13] to-[#f28a24]',
    action: 'marketplace' as const,
    tag: 'PAY NOW · SAVE MORE',
  },
];

export const HeroBanner: React.FC = () => {
  const { setActiveView, currentCountry } = useVisbuy();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide(current => (current + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];
  const benefits = [
    { label: 'Secure payments', icon: ShieldCheck },
    { label: 'Delivery across Africa', icon: Truck },
    { label: 'Flexible ways to pay', icon: Sparkles },
  ];

  return (
    <section className="bg-[#f4f6fa]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-5 pb-3">
        <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-slate-600 mb-2.5">
          <span className="font-semibold">{currentCountry.flag} Shopping in {currentCountry.name}</span>
          <span className="font-bold text-[#0757ee]">{currentCountry.currencyCode} · Flexible payments available</span>
        </div>

        <div className={'relative min-h-[190px] sm:min-h-[310px] lg:min-h-[360px] overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r ' + slide.tone + ' shadow-[0_12px_35px_rgba(8,32,78,0.16)] transition-colors duration-700'}>
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 75% 30%, white 0, transparent 35%)' }} />
          <div className="absolute right-[-6%] top-[-18%] w-[58%] h-[135%] rounded-full border border-white/15" />
          <div className="absolute right-[5%] top-[10%] w-[42%] h-[80%] rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 min-h-[190px] sm:min-h-[310px] lg:min-h-[360px] flex items-center px-5 py-5 sm:px-10 lg:px-14">
            <div className="w-[62%] sm:w-[55%] max-w-[620px] text-white">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[8px] sm:text-[10px] font-extrabold tracking-[0.13em]">{slide.tag}</span>
              <p className="mt-3 text-[9px] sm:text-xs font-bold tracking-[0.16em] text-white/75 uppercase">{slide.eyebrow}</p>
              <h1 className="mt-2 text-[22px] leading-[1.08] sm:text-4xl lg:text-5xl font-black tracking-tight">{slide.title}</h1>
              <p className="mt-2 sm:mt-3 max-w-lg text-[10px] leading-relaxed sm:text-sm text-white/85">{slide.description}</p>
              <button onClick={() => setActiveView(slide.action)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 sm:px-5 sm:py-3 text-[10px] sm:text-xs font-extrabold text-slate-900 shadow-lg hover:bg-blue-50">
                {slide.cta}<ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-[43%] sm:w-[45%] flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute right-[26%] top-[15%] w-[48%] h-[68%] rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-4 shadow-2xl rotate-[-8deg]">
                  <img src={slide.image} alt="Featured electronics" className="w-full h-full object-contain" />
                </div>
                <div className="absolute right-[3%] bottom-[9%] w-[43%] h-[48%] rounded-xl sm:rounded-2xl bg-white p-1.5 sm:p-3 shadow-2xl rotate-[8deg]">
                  <img src={slide.imageTwo} alt="More featured electronics" className="w-full h-full object-contain" />
                </div>
                <div className="absolute right-[10%] top-[7%] w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white"><Sparkles className="w-4 h-4 sm:w-7 sm:h-7"/></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-3" aria-label="Promotional slides">
          {slides.map((item, index) => <button key={item.tag} aria-label={'Show ' + item.tag} onClick={() => setActiveSlide(index)} className={'h-2 rounded-full transition-all ' + (index === activeSlide ? 'w-7 bg-[#0757ee]' : 'w-2 bg-slate-300 hover:bg-slate-500')} />)}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-5">
          {benefits.map(({label, icon: Icon}) => <div key={label} className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-slate-200 bg-white px-1.5 py-2.5 sm:py-3 text-center text-[9px] sm:text-xs font-bold text-slate-700"><Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0757ee] shrink-0"/>{label}</div>)}
        </div>
      </div>
    </section>
  );
};
