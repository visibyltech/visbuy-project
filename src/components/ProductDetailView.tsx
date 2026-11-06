import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { SAMPLE_REVIEWS } from '../data/products';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  PiggyBank,
  Users2,
  Zap,
  CheckCircle2,
  Lock,
  ChevronRight,
  Info,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    setActiveView,
    formatPrice,
    toLocalAmount,
    currentCountry,
    addToCart,
    openPaymentModal,
    createSaveToBuyPlan,
    osusuGroups,
    joinOsusuGroup,
    createOsusuGroup,
  } = useVisbuy();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">Product not found.</p>
        <button
          onClick={() => setActiveView('marketplace')}
          className="mt-4 px-4 py-2 bg-[#0047FF] text-white rounded-xl text-sm font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(0);
  const [selectedPaymentTab, setSelectedPaymentTab] = useState<'payNow' | 'bnpl' | 'saveToBuy' | 'osusu'>('payNow');

  // BNPL installment states
  const [bnplMonths, setBnplMonths] = useState<3 | 4>(3);
  const bnplDownPaymentUSD = selectedProduct.basePriceUSD / (bnplMonths + 1);
  const bnplMonthlyUSD = (selectedProduct.basePriceUSD - bnplDownPaymentUSD) / bnplMonths;

  // Save to Buy states
  const [saveDepositPercent, setSaveDepositPercent] = useState<number>(30);
  const [saveFrequency, setSaveFrequency] = useState<'weekly' | 'monthly'>('monthly');
  const saveInitialDepositUSD = (selectedProduct.basePriceUSD * saveDepositPercent) / 100;
  const saveRemainingUSD = selectedProduct.basePriceUSD - saveInitialDepositUSD;
  const saveInstallmentsCount = saveFrequency === 'weekly' ? 8 : 3;
  const savePerInstallmentUSD = saveRemainingUSD / saveInstallmentsCount;

  // Osusu states
  const productOsusuGroups = osusuGroups.filter((g) => g.productId === selectedProduct.id);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-8">
      {/* Breadcrumb & Back Button */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => setActiveView('marketplace')}
          className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#0047FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <span>Home</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span>{selectedProduct.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 font-medium truncate max-w-xs">{selectedProduct.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
            <img
              src={selectedProduct.images[activeImage] || selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {selectedProduct.discountPercent && (
              <div className="absolute top-4 left-4 bg-[#0047FF] text-white text-xs font-bold px-3 py-1 rounded-lg">
                Save {selectedProduct.discountPercent}% Today
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {selectedProduct.images.length > 1 && (
            <div className="flex items-center gap-3">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-[#0047FF] ring-2 ring-[#0047FF]/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#0047FF] mx-auto" />
              <div className="text-xs font-bold text-slate-800">100% Genuine</div>
              <p className="text-[10px] text-slate-500">Official Brand Warranty</p>
            </div>
            <div className="space-y-1">
              <Truck className="w-5 h-5 text-[#0047FF] mx-auto" />
              <div className="text-xs font-bold text-slate-800">{currentCountry.standardDeliveryDays}</div>
              <p className="text-[10px] text-slate-500">Fast Express in {currentCountry.name}</p>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-5 h-5 text-[#0047FF] mx-auto" />
              <div className="text-xs font-bold text-slate-800">7-Day Return</div>
              <p className="text-[10px] text-slate-500">Easy return policy</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold text-[#0047FF] uppercase tracking-wider">{selectedProduct.brand}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                In Stock ({selectedProduct.stockCount} units available)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-tight">
              {selectedProduct.name}
            </h1>

            {/* Ratings row */}
            <div className="mt-2.5 flex items-center gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900 font-mono text-sm">{selectedProduct.rating}</span>
              </div>
              <span className="text-slate-300">·</span>
              <span>{selectedProduct.ratingCount} verified ratings</span>
              <span className="text-slate-300">·</span>
              <span className="text-blue-600">Free delivery eligible</span>
            </div>

            {/* Price display */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#0047FF] font-mono tabular-nums">
                {formatPrice(selectedProduct.basePriceUSD)}
              </span>
              {selectedProduct.originalPriceUSD && (
                <span className="text-base text-slate-400 line-through font-mono tabular-nums">
                  {formatPrice(selectedProduct.originalPriceUSD)}
                </span>
              )}
              <span className="text-xs text-slate-500 font-mono">
                (${selectedProduct.basePriceUSD.toFixed(2)} USD)
              </span>
            </div>
          </div>

          {/* 4 PAYMENT TABS MODULE */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Your Payment Option
              </h2>
              <span className="text-[11px] text-[#0047FF] font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Escrow Protected
              </span>
            </div>

            {/* Tabs Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-200/70 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedPaymentTab('payNow')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  selectedPaymentTab === 'payNow'
                    ? 'bg-white text-[#0047FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Pay Now</span>
              </button>

              <button
                type="button"
                disabled={!selectedProduct.paymentOptions.bnpl}
                onClick={() => setSelectedPaymentTab('bnpl')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  selectedPaymentTab === 'bnpl'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : selectedProduct.paymentOptions.bnpl
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>BNPL</span>
              </button>

              <button
                type="button"
                disabled={!selectedProduct.paymentOptions.saveToBuy}
                onClick={() => setSelectedPaymentTab('saveToBuy')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  selectedPaymentTab === 'saveToBuy'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : selectedProduct.paymentOptions.saveToBuy
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
                <span>Save to Buy</span>
              </button>

              <button
                type="button"
                disabled={!selectedProduct.paymentOptions.osusu}
                onClick={() => setSelectedPaymentTab('osusu')}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                  selectedPaymentTab === 'osusu'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : selectedProduct.paymentOptions.osusu
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 opacity-50 cursor-not-allowed'
                }`}
              >
                <Users2 className="w-3.5 h-3.5 text-[#0047FF]" />
                <span>Osusu</span>
              </button>
            </div>

            {/* TAB CONTENT 1: PAY NOW */}
            {selectedPaymentTab === 'payNow' && (
              <div className="space-y-4 pt-1">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Immediate Settlement:</span>
                    <strong className="text-slate-900 font-mono">{formatPrice(selectedProduct.basePriceUSD)}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>VISBUY Rewards Earned:</span>
                    <strong className="font-mono">+ {formatPrice((selectedProduct.basePriceUSD * 2.5) / 100)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Delivery:</span>
                    <span>{currentCountry.standardDeliveryDays} to your address</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, 'payNow');
                      setActiveView('cart');
                    }}
                    className="flex-1 py-3 px-4 bg-[#0047FF] hover:bg-[#0036cc] active:scale-[0.99] text-white font-semibold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                  >
                    Pay Now ({formatPrice(selectedProduct.basePriceUSD)})
                  </button>
                  <button
                    onClick={() => addToCart(selectedProduct, 'payNow')}
                    className="py-3 px-4 bg-slate-200 hover:bg-slate-300 active:scale-[0.99] text-slate-800 font-semibold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: BNPL */}
            {selectedPaymentTab === 'bnpl' && (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Repayment Tenure:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setBnplMonths(3)}
                      className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors ${
                        bnplMonths === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      3 Months
                    </button>
                    <button
                      onClick={() => setBnplMonths(4)}
                      className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors ${
                        bnplMonths === 4 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      4 Months
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payable Today (Down Payment):</span>
                    <strong className="text-indigo-700 font-mono font-bold">{formatPrice(bnplDownPaymentUSD)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subsequent Monthly Installments:</span>
                    <strong className="text-slate-900 font-mono font-bold">
                      {formatPrice(bnplMonthlyUSD)} × {bnplMonths} mos
                    </strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>Credit Check:</span>
                    <span className="text-emerald-700 font-semibold">Instant Approval Pre-Qualified</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    openPaymentModal(
                      `BNPL Initial Down Payment: ${selectedProduct.name}`,
                      bnplDownPaymentUSD,
                      `BNPL Down Payment (${formatPrice(bnplDownPaymentUSD)})`,
                      () => {
                        addToCart(selectedProduct, 'bnpl', { bnplMonths });
                        setActiveView('customer-dashboard');
                      }
                    );
                  }}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  Pay Down Payment ({formatPrice(bnplDownPaymentUSD)}) & Start BNPL
                </button>
              </div>
            )}

            {/* TAB CONTENT 3: SAVE TO BUY */}
            {selectedPaymentTab === 'saveToBuy' && (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Initial Deposit:</span>
                  <div className="flex gap-1.5">
                    {[30, 40, 50].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setSaveDepositPercent(pct)}
                        className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors ${
                          saveDepositPercent === pct ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Savings Frequency:</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setSaveFrequency('weekly')}
                      className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors ${
                        saveFrequency === 'weekly' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setSaveFrequency('monthly')}
                      className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors ${
                        saveFrequency === 'monthly' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Deposit Due Today ({saveDepositPercent}%):</span>
                    <strong className="text-emerald-700 font-mono font-bold">
                      {formatPrice(saveInitialDepositUSD)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Target Balance:</span>
                    <span className="font-mono text-slate-900">{formatPrice(saveRemainingUSD)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Target Installment:</span>
                    <strong className="font-mono text-slate-900">
                      {formatPrice(savePerInstallmentUSD)} / {saveFrequency === 'weekly' ? 'week' : 'month'}
                    </strong>
                  </div>
                  <div className="pt-1.5 border-t border-slate-100 text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Price locked against inflation. Delivered immediately upon 100% completion.</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    openPaymentModal(
                      `Save to Buy Deposit: ${selectedProduct.name}`,
                      saveInitialDepositUSD,
                      `Save to Buy Deposit (${saveDepositPercent}%)`,
                      () => {
                        createSaveToBuyPlan(selectedProduct, saveInitialDepositUSD, saveFrequency);
                        setActiveView('save-to-buy');
                      }
                    );
                  }}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                >
                  Deposit {formatPrice(saveInitialDepositUSD)} & Lock Product
                </button>
              </div>
            )}

            {/* TAB CONTENT 4: BUY WITH OSUSU */}
            {selectedPaymentTab === 'osusu' && (
              <div className="space-y-4 pt-1">
                <div className="text-xs text-slate-600 leading-relaxed">
                  Join a verified circle of buyers. Members take turns receiving the product brand-new each cycle!
                </div>

                {productOsusuGroups.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800">Available Circles:</div>
                    {productOsusuGroups.map((group) => {
                      const spacesLeft = group.maxMembers - group.members.length;
                      return (
                        <div key={group.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-900">{group.title}</span>
                            <span className="text-blue-700 font-bold font-mono">
                              {formatPrice(group.contributionPerCycleUSD)}/cycle
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Status: {group.status}</span>
                            <span className="font-semibold text-emerald-700">{spacesLeft} space(s) available</span>
                          </div>

                          {/* Member Positions Selection */}
                          <div className="pt-2 border-t border-slate-100">
                            <div className="text-[11px] text-slate-600 mb-1.5 font-medium">Select Allocation Slot:</div>
                            <div className="flex items-center gap-2">
                              {Array.from({ length: group.maxMembers }).map((_, idx) => {
                                const pos = idx + 1;
                                const isTaken = group.members.some((m) => m.allocationPosition === pos);
                                const isSelected = selectedSlot === pos;
                                return (
                                  <button
                                    key={pos}
                                    disabled={isTaken}
                                    onClick={() => setSelectedSlot(pos)}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                                      isTaken
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                                        : isSelected
                                        ? 'bg-[#0047FF] text-white shadow-xs'
                                        : 'bg-blue-50 text-[#0047FF] hover:bg-blue-100'
                                    }`}
                                  >
                                    #{pos}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            disabled={!selectedSlot}
                            onClick={() => {
                              if (selectedSlot) {
                                openPaymentModal(
                                  `Osusu Initial Contribution: ${group.title}`,
                                  group.contributionPerCycleUSD,
                                  `Osusu Round 1 Contribution (Slot #${selectedSlot})`,
                                  () => {
                                    joinOsusuGroup(group.id, selectedSlot);
                                    setActiveView('osusu-hub');
                                  }
                                );
                              }
                            }}
                            className="w-full mt-2 py-2.5 px-3 bg-[#0047FF] hover:bg-[#0036cc] active:scale-[0.99] text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
                          >
                            {selectedSlot
                              ? `Confirm Slot #${selectedSlot} & Pay ${formatPrice(group.contributionPerCycleUSD)}`
                              : 'Select an Available Slot Above'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-xl border border-dashed border-slate-300 text-center space-y-2">
                    <p className="text-xs text-slate-600">No active group currently open for this product.</p>
                    <button
                      onClick={() => {
                        createOsusuGroup({ productId: selectedProduct.id, title: `${selectedProduct.name} Circle` });
                        setActiveView('osusu-hub');
                      }}
                      className="px-4 py-2 bg-[#0047FF] text-white text-xs font-semibold rounded-xl hover:bg-[#0036cc] transition-colors"
                    >
                      Start a New Osusu Circle
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display mb-1.5">Product Overview</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedProduct.description}</p>
          </div>
        </div>
      </div>

      {/* Specifications & Verified Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-slate-200">
        {/* Specifications Table */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 font-display">Technical Specifications</h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {Object.entries(selectedProduct.specifications).map(([key, val]) => (
              <div key={key} className="px-5 py-3 flex flex-col sm:flex-row sm:justify-between text-xs">
                <span className="font-semibold text-slate-500 w-1/3">{key}</span>
                <span className="text-slate-900 font-medium sm:w-2/3 mt-0.5 sm:mt-0">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-display">Customer Feedback</h3>
            <span className="text-xs text-slate-500">{SAMPLE_REVIEWS.length} recent reviews</span>
          </div>

          <div className="space-y-3">
            {SAMPLE_REVIEWS.map((rev) => (
              <div key={rev.id} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{rev.author}</span>
                    <span className="text-slate-400">({rev.country})</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                {rev.verifiedPurchase && (
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified VISBUY Purchase
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
