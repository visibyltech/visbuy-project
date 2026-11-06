import React, { useState } from 'react';
import type { PaymentMode } from '../types/visbuy';
import { useVisbuy } from '../context/VisbuyContext';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  MapPin,
  CreditCard,
  Building2,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartTotalUSD,
    currentCountry,
    formatPrice,
    toLocalAmount,
    rewardsWallet,
    redeemRewardsDiscount,
    placeOrder,
    openPaymentModal,
    createSaveToBuyPlan,
    createBnplPlan,
    setActiveView,
  } = useVisbuy();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<PaymentMode>(cart[0]?.selectedPaymentMode || 'payNow');
  const [bnplMonths, setBnplMonths] = useState<3 | 4>(3);

  // Address form
  const [customerName, setCustomerName] = useState('Oluwaseun Adebayo');
  const [customerEmail, setCustomerEmail] = useState('seun.adebayo@example.com');
  const [customerPhone, setCustomerPhone] = useState('803 123 4567');
  const [stateRegion, setStateRegion] = useState(currentCountry.majorCities[0] || 'Lagos State');
  const [city, setCity] = useState(currentCountry.majorCities[0] || 'Ikeja');
  const [streetAddress, setStreetAddress] = useState('14 Allen Avenue');
  const [landmark, setLandmark] = useState('Beside Mega Plaza Mall');

  // Delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<'DOORSTEP_EXPRESS' | 'HUB_PICKUP'>('DOORSTEP_EXPRESS');

  // Payment gateway
  const [paymentGateway, setPaymentGateway] = useState<string>(currentCountry.supportedGateways[0] || 'Paystack');

  // Apply rewards credit checkbox
  const [applyRewards, setApplyRewards] = useState(false);
  const maxRewardsDiscountUSD = Math.min(rewardsWallet.equivalentUSD, cartTotalUSD * 0.15); // max 15% discount from rewards

  const shippingCostUSD = deliveryMethod === 'DOORSTEP_EXPRESS' ? currentCountry.baseShippingUSD : 0;
  const taxUSD = (cartTotalUSD * currentCountry.taxRatePercent) / 100;
  const rewardsDiscountUSD = applyRewards ? maxRewardsDiscountUSD : 0;
  const totalPayableUSD = cartTotalUSD + shippingCostUSD + taxUSD - rewardsDiscountUSD;

  const handleCompleteOrder = () => {
    if (selectedPaymentMode === 'osusu') {
      setActiveView('osusu-hub');
      return;
    }

    const modeDeposit = selectedPaymentMode === 'saveToBuy'
      ? totalPayableUSD * 0.30
      : selectedPaymentMode === 'bnpl'
        ? totalPayableUSD / (bnplMonths + 1)
        : totalPayableUSD;

    const modeLabel = selectedPaymentMode === 'payNow'
      ? 'Pay Now'
      : selectedPaymentMode === 'bnpl'
        ? `Buy Now, Pay Later · ${bnplMonths} months`
        : 'Save to Buy · 30% initial deposit';

    openPaymentModal(
      `${modeLabel}: ${cart.length} Item(s)`,
      modeDeposit,
      `VISBUY Checkout · ${modeLabel} via ${paymentGateway}`,
      () => {
        if (applyRewards && rewardsDiscountUSD > 0) redeemRewardsDiscount(rewardsDiscountUSD);

        if (selectedPaymentMode === 'saveToBuy') {
          cart.forEach((item) => {
            const planProduct = { ...item.product, basePriceUSD: item.product.basePriceUSD * item.quantity };
            createSaveToBuyPlan(planProduct, planProduct.basePriceUSD * 0.30, 'monthly');
          });
        }

        if (selectedPaymentMode === 'bnpl') {
          cart.forEach((item) => {
            const itemTotal = item.product.basePriceUSD * item.quantity;
            createBnplPlan(item.product, itemTotal, itemTotal / (bnplMonths + 1), bnplMonths);
          });
        }

        placeOrder({
          customer: {
            name: customerName,
            email: customerEmail,
            phone: `${currentCountry.phonePrefix} ${customerPhone}`,
            countryCode: currentCountry.code,
            stateOrRegion: stateRegion,
            city,
            streetAddress,
            nearestLandmark: landmark,
          },
          items: cart.map((item) => ({ ...item, selectedPaymentMode })),
          subtotalUSD: cartTotalUSD,
          shippingCostUSD,
          taxUSD,
          rewardsDiscountUSD,
          totalUSD: totalPayableUSD,
          paymentMethod: `${modeLabel} · ${paymentGateway}`,
          paymentStatus: selectedPaymentMode === 'payNow' ? 'PAID' : selectedPaymentMode === 'bnpl' ? 'PARTIALLY_PAID' : 'SAVINGS_ESCROW',
          deliveryMethod,
        });
        setActiveView('order-success');
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Checkout steps header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Secure Checkout</h1>
          <p className="text-xs text-slate-500">
            Adaptive Delivery & Payment for {currentCountry.name} ({currentCountry.currencyCode})
          </p>
        </div>
        <button
          onClick={() => setActiveView('cart')}
          className="text-xs font-semibold text-slate-600 hover:text-[#0047FF] flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Multi-Step Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: DELIVERY ADDRESS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0047FF] text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Customer & Delivery Address ({currentCountry.name} {currentCountry.flag})
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Address (for Receipt & Updates)</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Phone Number ({currentCountry.phonePrefix})
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-mono text-xs flex items-center">
                    {currentCountry.phonePrefix}
                  </span>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">State / Province / County</label>
                <input
                  type="text"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">City / Town</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Nearest Landmark / Popular Bus Stop</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Total Filling Station"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: DELIVERY METHOD */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0047FF] text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">Delivery Option</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                onClick={() => setDeliveryMethod('DOORSTEP_EXPRESS')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryMethod === 'DOORSTEP_EXPRESS'
                    ? 'border-[#0047FF] bg-blue-50/50 ring-1 ring-[#0047FF]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Truck className="w-5 h-5 text-[#0047FF] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">VISBUY Doorstep Express</div>
                  <div className="text-slate-500 mt-0.5">
                    Direct to your door in {currentCountry.standardDeliveryDays}
                  </div>
                  <div className="text-[#0047FF] font-bold font-mono mt-1">
                    {formatPrice(currentCountry.baseShippingUSD)}
                  </div>
                </div>
              </label>

              <label
                onClick={() => setDeliveryMethod('HUB_PICKUP')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  deliveryMethod === 'HUB_PICKUP'
                    ? 'border-[#0047FF] bg-blue-50/50 ring-1 ring-[#0047FF]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Certified Station Pickup</div>
                  <div className="text-slate-500 mt-0.5">Pick up at VISBUY Hub ({city})</div>
                  <div className="text-emerald-700 font-bold font-mono mt-1">FREE</div>
                </div>
              </label>
            </div>
          </div>

          {/* PAYMENT PLAN: choose how to pay for this order */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0047FF] text-white flex items-center justify-center font-bold text-xs">3</div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">Choose how you want to pay</h3>
                <p className="text-xs text-slate-500 mt-0.5">Select the payment option that works best for you.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                { id: 'payNow', title: 'Pay Now', desc: 'Pay the full amount at checkout.', icon: '💳' },
                { id: 'bnpl', title: 'Buy Now, Pay Later', desc: 'Split payment into monthly instalments.', icon: '🗓️' },
                { id: 'saveToBuy', title: 'Save to Buy', desc: 'Start with a minimum 30% deposit.', icon: '🐷' },
                { id: 'osusu', title: 'Join an Osusu Group', desc: 'Purchase together and take turns.', icon: '🤝' },
              ] as {id: PaymentMode; title: string; desc: string; icon: string}[]).map(option => {
                const eligible = cart.length > 0 && cart.every(item => item.product.paymentOptions[option.id]);
                const selected = selectedPaymentMode === option.id;
                return <button key={option.id} type="button" disabled={!eligible} onClick={() => setSelectedPaymentMode(option.id)} className={`rounded-xl border p-4 text-left transition-all ${selected ? 'border-[#0757ee] bg-blue-50 ring-1 ring-[#0757ee]' : 'border-slate-200 bg-white'} ${!eligible ? 'opacity-40 cursor-not-allowed' : 'hover:border-blue-300'}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-900">{option.title}</span>
                      <span className="block text-xs text-slate-500 mt-1">{option.desc}</span>
                      {!eligible && <span className="block text-[10px] text-slate-400 mt-1">Not available for every item in this cart</span>}
                    </span>
                    <span className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 ${selected ? 'border-[#0757ee] bg-[#0757ee] shadow-[inset_0_0_0_3px_white]' : 'border-slate-300'}`}/>
                  </div>
                </button>;
              })}
            </div>
            {selectedPaymentMode === 'bnpl' && <div className="rounded-xl bg-indigo-50 p-3 flex items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-indigo-900">Choose instalment duration</span>
              <div className="flex gap-2">
                {[3,4].map(months => <button key={months} type="button" onClick={() => setBnplMonths(months as 3 | 4)} className={`px-3 py-2 rounded-lg font-bold ${bnplMonths === months ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700'}`}>{months} months</button>)}
              </div>
            </div>}
            {selectedPaymentMode === 'saveToBuy' && <p className="text-xs text-emerald-800 bg-emerald-50 rounded-lg p-3">Your initial deposit will be at least 30%. The product is delivered or collected only after the full balance has been completed.</p>}
            {selectedPaymentMode === 'osusu' && <p className="text-xs text-blue-800 bg-blue-50 rounded-lg p-3">Continue to Osusu to select an available group and contribution slot for your product.</p>}
          </div>

          {/* STEP 4: PAYMENT GATEWAY */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0047FF] text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Local Payment Method in {currentCountry.name}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {currentCountry.supportedGateways.map((gw) => (
                <button
                  key={gw}
                  type="button"
                  onClick={() => setPaymentGateway(gw)}
                  className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                    paymentGateway === gw
                      ? 'border-[#0047FF] bg-blue-50/60 text-[#0047FF] ring-1 ring-[#0047FF]'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs truncate">{gw}</div>
                </button>
              ))}
            </div>

            {/* VISBUY Rewards credit redemption */}
            {rewardsWallet.equivalentUSD > 0 && (
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="apply-rewards"
                    checked={applyRewards}
                    onChange={(e) => setApplyRewards(e.target.checked)}
                    className="w-4 h-4 text-[#0047FF] rounded focus:ring-[#0047FF]"
                  />
                  <label htmlFor="apply-rewards" className="text-slate-800 font-medium cursor-pointer">
                    Apply VISBUY Rewards Credit (Balance: {formatPrice(rewardsWallet.equivalentUSD)})
                  </label>
                </div>
                {applyRewards && (
                  <span className="font-bold text-emerald-700 font-mono">
                    - {formatPrice(maxRewardsDiscountUSD)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Checkout Breakdown Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs sticky top-24">
            <h3 className="text-base font-bold text-slate-900 font-display">Order Summary</h3>

            {/* Itemized Mini List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs py-1">
                  <div className="truncate max-w-[180px]">
                    <span className="font-semibold text-slate-800">{item.quantity}x </span>
                    <span className="text-slate-600">{item.product.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    {formatPrice(item.product.basePriceUSD * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-slate-900">{formatPrice(cartTotalUSD)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping ({deliveryMethod === 'HUB_PICKUP' ? 'Hub Pickup' : 'Express Doorstep'}):</span>
                <span className="font-mono text-slate-900">{formatPrice(shippingCostUSD)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT ({currentCountry.taxRatePercent}%):</span>
                <span className="font-mono text-slate-900">{formatPrice(taxUSD)}</span>
              </div>
              {applyRewards && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Rewards Discount Applied:</span>
                  <span className="font-mono">- {formatPrice(rewardsDiscountUSD)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between text-base">
                <span className="font-bold text-slate-900">Total Payable:</span>
                <strong className="font-extrabold text-[#0047FF] font-mono text-lg">
                  {formatPrice(totalPayableUSD)}
                </strong>
              </div>
            </div>

            <button
              onClick={handleCompleteOrder}
              className="w-full py-3.5 px-4 bg-[#0047FF] hover:bg-[#0036cc] active:scale-[0.99] text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{selectedPaymentMode === 'osusu' ? 'Continue to Osusu Groups' : selectedPaymentMode === 'saveToBuy' ? `Pay 30% Deposit · ${formatPrice(totalPayableUSD * 0.30)}` : selectedPaymentMode === 'bnpl' ? `Pay Initial Instalment · ${formatPrice(totalPayableUSD / (bnplMonths + 1))}` : `Pay ${formatPrice(totalPayableUSD)}`}</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Payment Webhook Simulation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
