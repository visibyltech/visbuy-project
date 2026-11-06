import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCTS } from '../data/products';
import {
  PiggyBank,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingDown,
  Clock,
  Sparkles,
  PackageCheck,
  DollarSign,
  Plus,
} from 'lucide-react';

export const SaveToBuyView: React.FC = () => {
  const {
    saveToBuyPlans,
    formatPrice,
    currentCountry,
    openPaymentModal,
    makeSaveDeposit,
    openProductDetail,
    createSaveToBuyPlan,
  } = useVisbuy();

  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[3].id); // refrigerator or TV
  const [depositPct, setDepositPct] = useState(30);
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('monthly');

  const handleStartPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
    const initialDepositUSD = (product.basePriceUSD * depositPct) / 100;
    openPaymentModal(
      `Save to Buy Initial Deposit: ${product.name}`,
      initialDepositUSD,
      `Save to Buy ${depositPct}% Initial Deposit`,
      () => {
        createSaveToBuyPlan(product, initialDepositUSD, frequency);
        setIsNewPlanModalOpen(false);
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-700 rounded-3xl text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-emerald-100">
            <PiggyBank className="w-3.5 h-3.5 text-emerald-200" />
            <span>Targeted E-Commerce Layaway & Inflation Shield</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-balance">
            Save to Buy: Lock Today’s Price with 30% Deposit.
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
            Protect your dream appliances and tech against inflation and currency devaluation.
            Start with as low as 30% down payment, contribute at your own pace, and receive verified brand-new doorstep delivery upon final payment.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setIsNewPlanModalOpen(true)}
              className="px-5 py-3 bg-white text-emerald-900 rounded-xl text-xs font-bold transition-all shadow-md hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Start a New Save to Buy Target</span>
            </button>
          </div>
        </div>
      </div>

      {/* How it Works 3 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">Deposit 30% to Lock</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your item is physically reserved in the VISBUY warehouse at today's locked price. No price hikes, no matter how much the currency fluctuates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0047FF] flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">Contribute Flexibly</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pay weekly or monthly via Card, Bank Transfer, or Mobile Money (M-Pesa, MTN MoMo, Wave). View real-time ledger progress anytime.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">100% Paid & Dispatched</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The instant your final installment clears, your order is automatically verified and dispatched for priority doorstep delivery with tracking.
          </p>
        </div>
      </div>

      {/* Active Save to Buy Vaults */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Your Active Save to Buy Vaults</h2>
            <p className="text-xs text-slate-500">Live progress tracking and installment top-ups</p>
          </div>
          <button
            onClick={() => setIsNewPlanModalOpen(true)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Target</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {saveToBuyPlans.map((plan) => {
            const progressPercent = Math.min(100, Math.round((plan.totalDepositedUSD / plan.totalAmountUSD) * 100));
            const remainingUSD = Math.max(0, plan.totalAmountUSD - plan.totalDepositedUSD);
            const isCompleted = plan.totalDepositedUSD >= plan.totalAmountUSD;

            return (
              <div
                key={plan.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <img
                      src={plan.productImage}
                      alt={plan.productName}
                      className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {plan.frequency.toUpperCase()} SAVINGS
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-bold bg-blue-100 text-[#0047FF] px-2 py-0.5 rounded">
                            Fully Paid 🎉
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 font-display mt-1">{plan.productName}</h3>
                      <p className="text-xs text-slate-500">Target: {formatPrice(plan.totalAmountUSD)}</p>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Accumulated Savings:</span>
                      <strong className="text-emerald-700 font-mono font-bold">
                        {progressPercent}% ({formatPrice(plan.totalDepositedUSD)})
                      </strong>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-700"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Initial 30% Deposit Paid</span>
                      <span>Remaining: {formatPrice(remainingUSD)}</span>
                    </div>
                  </div>

                  {/* Deposits History */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800">Verified Deposits:</div>
                    <div className="max-h-32 overflow-y-auto space-y-1.5">
                      {plan.deposits.map((dep) => (
                        <div
                          key={dep.id}
                          className="px-3 py-2 bg-slate-50 rounded-xl text-xs flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-slate-600">{dep.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono text-[11px]">{dep.paymentRef}</span>
                            <span className="font-bold text-slate-900 font-mono">{formatPrice(dep.amountUSD)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Next contribution due: <strong className="text-slate-800">{plan.nextDepositDue}</strong>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <PackageCheck className="w-4 h-4" />
                      <span>Ready for Dispatch</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const depositAmountUSD = Math.min(remainingUSD, plan.totalAmountUSD * 0.2);
                        openPaymentModal(
                          `Save to Buy Deposit: ${plan.productName}`,
                          depositAmountUSD,
                          `Save to Buy Installment Deposit (${formatPrice(depositAmountUSD)})`,
                          () => makeSaveDeposit(plan.id, depositAmountUSD)
                        );
                      }}
                      className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
                    >
                      Deposit Next Installment
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NEW SAVE TO BUY PLAN MODAL */}
      {isNewPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">Start a New Save to Buy Plan</h3>
              <button
                onClick={() => setIsNewPlanModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleStartPlan} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Select Product</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  {PRODUCTS.filter((p) => p.paymentOptions.saveToBuy).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({formatPrice(p.basePriceUSD)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Initial Deposit %</label>
                  <select
                    value={depositPct}
                    onChange={(e) => setDepositPct(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value={30}>30% Minimum (Recommended)</option>
                    <option value={40}>40%</option>
                    <option value={50}>50% Half Down</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 space-y-1">
                <div>Once initial deposit is confirmed, product inventory is locked and reserved for you.</div>
                <div>No cancellation penalty. Automated reminder notifications sent before installment dates.</div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Proceed to Deposit & Lock Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
