import React from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  Share2,
  Printer,
  Sparkles,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { lastPlacedOrder, setActiveView, formatPrice, currentCountry } = useVisbuy();

  if (!lastPlacedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-slate-600">No recent order found.</p>
        <button
          onClick={() => setActiveView('marketplace')}
          className="px-4 py-2 bg-[#0047FF] text-white rounded-xl text-xs font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const rewardsEarned = (lastPlacedOrder.subtotalUSD * 2.5) / 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
      {/* Top Success Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Order Verified & Confirmed!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you for choosing VISBUY. Your payment has been securely confirmed and your order is being prepared for dispatch.
        </p>
      </div>

      {/* Rewards Cashback Earned Card */}
      <div className="bg-gradient-to-r from-blue-900 to-[#0047FF] p-5 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md text-amber-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-200 font-semibold">VISBUY Loyalty Cashback</div>
            <div className="text-lg font-bold font-mono">
              + {formatPrice(rewardsEarned)} Credited to Your Rewards Wallet
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              Accumulate points to redeem on future purchases or withdraw after ₦1,000 threshold.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveView('customer-dashboard')}
          className="px-4 py-2 bg-white text-[#0047FF] rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors self-start sm:self-auto shrink-0"
        >
          View Wallet
        </button>
      </div>

      {/* Tracking Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs text-slate-400">Order Reference</span>
            <div className="text-lg font-bold text-slate-900 font-mono">{lastPlacedOrder.orderNumber}</div>
          </div>
          <div>
            <span className="text-xs text-slate-400">Logistics Tracking Number</span>
            <div className="text-sm font-bold text-[#0047FF] font-mono">{lastPlacedOrder.trackingNumber}</div>
          </div>
          <div>
            <span className="text-xs text-slate-400">Estimated Delivery</span>
            <div className="text-sm font-semibold text-slate-900">{lastPlacedOrder.estimatedDeliveryDate}</div>
          </div>
        </div>

        {/* Live Timeline */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-display">Live Delivery Milestone Tracker</h3>
          <div className="space-y-3">
            {lastPlacedOrder.timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    step.isDone ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {step.isDone ? '✓' : idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${step.isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.title}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{step.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{step.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Notice Simulation */}
        <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
          <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong>WhatsApp & SMS Updates Active:</strong> Live delivery dispatch alerts and PIN code for doorstep receipt have been scheduled to {lastPlacedOrder.customer.phone}.
          </div>
        </div>
      </div>

      {/* Itemized Order Receipt Details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-display">Order Receipt</h3>
          <button
            onClick={() => window.print()}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Customer & Shipping info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <div>
            <span className="font-semibold text-slate-800">Delivery Address:</span>
            <p className="mt-0.5">
              {lastPlacedOrder.customer.name} <br />
              {lastPlacedOrder.customer.streetAddress}, {lastPlacedOrder.customer.city} <br />
              {lastPlacedOrder.customer.stateOrRegion}, {lastPlacedOrder.customer.countryCode} <br />
              Phone: {lastPlacedOrder.customer.phone}
            </p>
          </div>
          <div>
            <span className="font-semibold text-slate-800">Payment Summary:</span>
            <p className="mt-0.5">
              Method: {lastPlacedOrder.paymentMethod} <br />
              Status: <span className="text-emerald-700 font-bold">VERIFIED & ESCROWED</span> <br />
              Delivery: {lastPlacedOrder.deliveryMethod === 'HUB_PICKUP' ? 'Hub Pickup' : 'Express Doorstep'}
            </p>
          </div>
        </div>

        {/* Ordered items */}
        <div className="divide-y divide-slate-100 pt-2">
          {lastPlacedOrder.items.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                />
                <div>
                  <div className="font-bold text-slate-900">{item.product.name}</div>
                  <div className="text-slate-500">
                    Qty: {item.quantity} · Mode: {item.selectedPaymentMode}
                  </div>
                </div>
              </div>
              <span className="font-mono font-bold text-slate-900">
                {formatPrice(item.product.basePriceUSD * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-mono">{formatPrice(lastPlacedOrder.subtotalUSD)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-mono">{formatPrice(lastPlacedOrder.shippingCostUSD)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT / Taxes:</span>
            <span className="font-mono">{formatPrice(lastPlacedOrder.taxUSD)}</span>
          </div>
          {lastPlacedOrder.rewardsDiscountUSD > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Rewards Discount:</span>
              <span className="font-mono">- {formatPrice(lastPlacedOrder.rewardsDiscountUSD)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
            <span>Total Paid:</span>
            <span className="font-mono text-[#0047FF] text-base">{formatPrice(lastPlacedOrder.totalUSD)}</span>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => setActiveView('customer-dashboard')}
          className="px-6 py-3 bg-[#0047FF] hover:bg-[#0036cc] text-white rounded-xl text-xs font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Track in Customer Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveView('marketplace')}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-all cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
