import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import {
  User,
  Package,
  Clock,
  PiggyBank,
  Users2,
  Home,
  Sparkles,
  MapPin,
  Bell,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Truck,
  ExternalLink,
} from 'lucide-react';

export const CustomerDashboardView: React.FC = () => {
  const {
    currentCountry,
    formatPrice,
    orders,
    osusuGroups,
    saveToBuyPlans,
    bnplPlans,
    rentSavingsTargets,
    rewardsWallet,
    requestRewardsWithdrawal,
    payBnplInstallment,
    notifications,
    setIsCountryModalOpen,
    setActiveView,
    openPaymentModal,
  } = useVisbuy();

  const [activeTab, setActiveTab] = useState<
    'orders' | 'osusu' | 'save' | 'bnpl' | 'rent' | 'rewards' | 'addresses'
  >('orders');

  // Withdrawal modal state
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmountLocal, setWithdrawAmountLocal] = useState(5000); // e.g. ₦5,000
  const [bankAccount, setBankAccount] = useState('0123456789 (Access Bank)');
  const [withdrawFeedback, setWithdrawFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    const amountUSD = withdrawAmountLocal / currentCountry.exchangeRateToUSD;
    const res = requestRewardsWithdrawal(amountUSD, bankAccount);
    setWithdrawFeedback(res);
    if (res.success) {
      setTimeout(() => {
        setIsWithdrawModalOpen(false);
        setWithdrawFeedback(null);
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Account Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-[#0047FF] flex items-center justify-center font-bold text-2xl font-display shrink-0">
            OA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                Oluwaseun Adebayo
              </h1>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Tier 2 Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              seun.adebayo@example.com · +234 803 123 4567 · Country: {currentCountry.name} {currentCountry.flag}
            </p>
          </div>
        </div>

        {/* Quick Balance Cards */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>VISBUY Rewards</span>
            </div>
            <div className="text-lg font-extrabold text-[#0047FF] font-mono mt-0.5">
              {formatPrice(rewardsWallet.equivalentUSD)}
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
              <span>Save & Rent Vaults</span>
            </div>
            <div className="text-lg font-extrabold text-emerald-800 font-mono mt-0.5">
              {formatPrice(
                rentSavingsTargets.reduce((s, t) => s + t.savedAmountUSD, 0) +
                  saveToBuyPlans.reduce((s, p) => s + p.totalDepositedUSD, 0)
              )}
            </div>
          </div>

          <button
            onClick={() => setIsCountryModalOpen(true)}
            className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-left transition-colors cursor-pointer"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Country Preference</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1">
              <span>{currentCountry.flag}</span>
              <span>{currentCountry.currencyCode}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'bg-[#0047FF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders & Tracking ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('osusu')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'osusu'
              ? 'bg-[#0047FF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>My Osusu Circles</span>
        </button>

        <button
          onClick={() => setActiveTab('save')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'save'
              ? 'bg-[#0047FF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <PiggyBank className="w-4 h-4" />
          <span>Save to Buy ({saveToBuyPlans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bnpl')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'bnpl'
              ? 'bg-[#0047FF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>BNPL Installments ({bnplPlans.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rent')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'rent'
              ? 'bg-[#0047FF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Rent Savings ({rentSavingsTargets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'rewards'
              ? 'bg-[#0047FF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Rewards Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'addresses'
              ? 'bg-[#0047FF] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Addresses & Settings</span>
        </button>
      </div>

      {/* TAB 1: ORDERS & TRACKING */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">Orders & Live Logistics</h2>
            <button
              onClick={() => setActiveView('marketplace')}
              className="text-xs font-semibold text-[#0047FF] hover:underline"
            >
              Shop More Items
            </button>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 font-mono text-sm">{order.orderNumber}</span>
                      <span className="text-xs text-slate-400">· Placed on {order.date}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Tracking: <strong className="font-mono text-[#0047FF]">{order.trackingNumber}</strong> · Expected: {order.estimatedDeliveryDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0047FF] px-2.5 py-1 rounded-lg">
                      {order.deliveryStatus.replace('_', ' ')}
                    </span>
                    <span className="font-extrabold text-slate-900 font-mono text-base">
                      {formatPrice(order.totalUSD)}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{item.product.name}</div>
                            <div className="text-slate-500">
                              Qty: {item.quantity} · Payment Mode: {item.selectedPaymentMode}
                            </div>
                          </div>
                        </div>
                        <span className="font-bold font-mono text-slate-900">
                          {formatPrice(item.product.basePriceUSD * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Timeline Tracker */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="text-xs font-bold text-slate-800">Carrier Milestone Status:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      {order.timeline.map((t, i) => (
                        <div
                          key={i}
                          className={`p-2.5 rounded-xl border ${
                            t.isDone
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="font-bold flex items-center gap-1">
                            {t.isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <span>{i + 1}.</span>}
                            <span>{t.title}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{t.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MY OSUSU CIRCLES */}
      {activeTab === 'osusu' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">My Osusu Memberships</h2>
            <button
              onClick={() => setActiveView('osusu-hub')}
              className="px-4 py-2 bg-[#0047FF] text-white rounded-xl text-xs font-semibold hover:bg-[#0036cc] transition-colors"
            >
              Browse All Circles
            </button>
          </div>

          <div className="space-y-4">
            {osusuGroups
              .filter((g) => g.members.some((m) => m.userId === 'current-user'))
              .map((group) => {
                const myMember = group.members.find((m) => m.userId === 'current-user');
                return (
                  <div key={group.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={group.productImage}
                          alt={group.productName}
                          className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 font-display">{group.title}</h3>
                            <span className="text-xs bg-blue-100 text-[#0047FF] font-semibold px-2 py-0.5 rounded font-mono">
                              My Slot: #{myMember?.allocationPosition}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{group.productName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          Status: {group.status}
                        </span>
                        <button
                          onClick={() => setActiveView('osusu-hub')}
                          className="px-3 py-1.5 bg-[#0047FF] text-white rounded-lg text-xs font-semibold hover:bg-[#0036cc] transition-colors"
                        >
                          View Group
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 3: SAVE TO BUY VAULTS */}
      {activeTab === 'save' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">Save to Buy Target Vaults</h2>
            <button
              onClick={() => setActiveView('save-to-buy')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              Open Save to Buy Hub
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {saveToBuyPlans.map((plan) => {
              const pct = Math.round((plan.totalDepositedUSD / plan.totalAmountUSD) * 100);
              return (
                <div key={plan.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={plan.productImage}
                      alt={plan.productName}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs font-display">{plan.productName}</h4>
                      <p className="text-xs text-slate-500">
                        Saved: {formatPrice(plan.totalDepositedUSD)} / {formatPrice(plan.totalAmountUSD)}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 pt-1">
                    <span>{pct}% Completed</span>
                    <button
                      onClick={() => setActiveView('save-to-buy')}
                      className="text-[#0047FF] font-semibold hover:underline"
                    >
                      Make Deposit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: BNPL INSTALLMENTS */}
      {activeTab === 'bnpl' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">Active Buy Now, Pay Later Plans</h2>
          </div>

          <div className="space-y-4">
            {bnplPlans.map((plan) => (
              <div key={plan.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      Order: {plan.orderId}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 font-display mt-1">{plan.productName}</h3>
                    <p className="text-xs text-slate-500">
                      Total: {formatPrice(plan.totalAmountUSD)} · Remaining: {formatPrice(plan.remainingAmountUSD)}
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-lg">
                    {plan.status}
                  </span>
                </div>

                {/* Installments table */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-800">Repayment Schedule:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {plan.installments.map((inst) => (
                      <div
                        key={inst.id}
                        className={`p-3 rounded-xl border text-xs flex flex-col justify-between space-y-2 ${
                          inst.status === 'PAID'
                            ? 'bg-emerald-50 border-emerald-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">Installment #{inst.number}</span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                              inst.status === 'PAID' ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {inst.status}
                          </span>
                        </div>
                        <div className="font-extrabold text-slate-900 font-mono">{formatPrice(inst.amountUSD)}</div>
                        <div className="text-[10px] text-slate-400">Due: {inst.dueDate}</div>

                        {inst.status !== 'PAID' && (
                          <button
                            onClick={() => {
                              openPaymentModal(
                                `BNPL Installment #${inst.number}`,
                                inst.amountUSD,
                                `Installment #${inst.number} Repayment`,
                                () => payBnplInstallment(plan.id, inst.id)
                              );
                            }}
                            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors mt-1"
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: RENT SAVINGS */}
      {activeTab === 'rent' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">Urban Rent Savings Vaults</h2>
            <button
              onClick={() => setActiveView('rent-savings')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
            >
              Open Rent Planner
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rentSavingsTargets.map((target) => (
              <div key={target.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">{target.title}</h4>
                    <p className="text-xs text-slate-500">
                      City: {target.city} · Frequency: {target.frequency}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-indigo-700">
                    {formatPrice(target.savedAmountUSD)}
                  </span>
                </div>
                <div className="text-xs text-slate-600">Target Goal: {formatPrice(target.targetAmountUSD)}</div>
                <button
                  onClick={() => setActiveView('rent-savings')}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
                >
                  Manage Vault & Top Up
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: REWARDS WALLET */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 via-[#0047FF] to-indigo-800 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                VISBUY Closed-Loop Loyalty Wallet
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono">
                {formatPrice(rewardsWallet.equivalentUSD)}
              </div>
              <p className="text-xs text-blue-100">
                Lifetime Cashback Earned: <strong className="font-mono">{formatPrice(rewardsWallet.lifetimeEarnedUSD)}</strong> · Earned only on completed verified transactions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="px-5 py-3 bg-white text-[#0047FF] hover:bg-blue-50 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Request Cash Withdrawal</span>
              </button>
            </div>
          </div>

          {/* Reward Transactions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Rewards History & Ledgers</h3>
            <div className="divide-y divide-slate-100">
              {rewardsWallet.transactions.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                        tx.type === 'EARNED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : tx.type === 'REDEEMED'
                          ? 'bg-blue-100 text-[#0047FF]'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {tx.type === 'EARNED' ? '+' : '-'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{tx.description}</div>
                      <div className="text-slate-400 text-[11px]">{tx.date}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-mono font-bold ${
                        tx.type === 'EARNED' ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {tx.type === 'EARNED' ? '+' : '-'} {formatPrice(tx.amountUSD)}
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: ADDRESSES & SETTINGS */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Saved Delivery Addresses</h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Default Address (Nigeria · 🇳🇬)</span>
                <span className="text-[#0047FF]">Default</span>
              </div>
              <p className="text-slate-600">
                Oluwaseun Adebayo <br />
                14 Allen Avenue, Ikeja, Lagos State, Nigeria <br />
                Phone: +234 803 123 4567
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Pan-African Localization Settings</h3>
            <p className="text-xs text-slate-500">
              Change your active country, currency symbol, and payment gateway profiles.
            </p>
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="px-4 py-2.5 bg-[#0047FF] text-white rounded-xl text-xs font-semibold hover:bg-[#0036cc] transition-colors"
            >
              Switch Active African Country & Currency ({currentCountry.name} - {currentCountry.currencyCode})
            </button>
          </div>
        </div>
      )}

      {/* WITHDRAWAL REQUEST MODAL */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">Request Rewards Cash Withdrawal</h3>
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {withdrawFeedback ? (
              <div
                className={`p-4 rounded-xl text-xs font-medium ${
                  withdrawFeedback.success ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}
              >
                {withdrawFeedback.message}
              </div>
            ) : (
              <form onSubmit={handleWithdrawal} className="space-y-4 text-xs">
                <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 space-y-1">
                  <div>Minimum withdrawal threshold: <strong>₦1,000</strong> (or local equivalent).</div>
                  <div>Subject to regulatory KYC approval & anti-fraud verification.</div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Withdrawal Amount ({currentCountry.currencyCode})
                  </label>
                  <input
                    type="number"
                    value={withdrawAmountLocal}
                    onChange={(e) => setWithdrawAmountLocal(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold"
                    required
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Available: {formatPrice(rewardsWallet.equivalentUSD)}
                  </span>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Local Bank Account or Mobile Money Number
                  </label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    placeholder="e.g. 0123456789 (Access Bank) or 0803... (MoMo)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0047FF] hover:bg-[#0036cc] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Submit Withdrawal Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
