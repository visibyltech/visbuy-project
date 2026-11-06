import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import {
  Home,
  ShieldCheck,
  Calendar,
  Plus,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Building,
  DollarSign,
  ArrowRight,
  Bell,
  Sparkles,
} from 'lucide-react';

export const RentSavingsView: React.FC = () => {
  const {
    rentSavingsTargets,
    currentCountry,
    formatPrice,
    toLocalAmount,
    openPaymentModal,
    depositRentSavings,
    createRentSavingsTarget,
  } = useVisbuy();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetTitle, setTargetTitle] = useState('2-Bedroom Apartment (Lagos / Nairobi)');
  const [city, setCity] = useState(currentCountry.majorCities[0] || 'Lagos');
  const [targetAmountLocal, setTargetAmountLocal] = useState(3000000); // e.g. ₦3,000,000
  const [durationMonths, setDurationMonths] = useState(12);
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('monthly');

  const handleCreateTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const targetUSD = targetAmountLocal / currentCountry.exchangeRateToUSD;
    const initialDepositUSD = targetUSD * 0.1; // 10% kickoff deposit

    openPaymentModal(
      `Rent Savings Kickoff Deposit: ${targetTitle}`,
      initialDepositUSD,
      `Initial Rent Target Deposit (${formatPrice(initialDepositUSD)})`,
      () => {
        createRentSavingsTarget({
          title: targetTitle,
          city,
          countryCode: currentCountry.code,
          targetAmountUSD: targetUSD,
          savedAmountUSD: initialDepositUSD,
          frequency,
          targetDate: 'Nov 30, 2027',
        });
        setIsModalOpen(false);
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-[#0047FF] rounded-3xl text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none">
          <img
            src="/src/assets/images/rent_savings_home_1793992278571.jpg"
            alt="African Modern Homes"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-indigo-100">
            <Home className="w-3.5 h-3.5 text-indigo-200" />
            <span>Targeted Urban Rent Savings Protection</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-balance">
            Never Stress Over Annual Rent Again.
          </h1>

          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
            In cities like Lagos, Nairobi, and Accra, paying 1 or 2 years rent upfront can derail personal finances.
            VISBUY Rent Savings lets you save periodically in an inflation-hedged vault with automated reminders and high-yield bonus credits.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 bg-white text-indigo-900 rounded-xl text-xs font-bold transition-all shadow-md hover:bg-indigo-50 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Rent Savings Target</span>
            </button>
          </div>
        </div>
      </div>

      {/* Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">Custom Due Dates</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Align your contributions with your payday. Save weekly, bi-weekly, or monthly with automated SMS & WhatsApp reminders.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">Target Bonus Rewards</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Earn VISBUY reward points on every milestone reached. Redeem towards home appliances or request cash disbursement.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0047FF] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-display">Direct Landlord Escrow</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            When rent is due, disburse directly to your landlord's bank account or receive payout with zero delays.
          </p>
        </div>
      </div>

      {/* Active Targets */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Active Rent Savings Targets</h2>
            <p className="text-xs text-slate-500">Track your progress and make contributions</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#0047FF] hover:bg-[#0036cc] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Target</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rentSavingsTargets.map((target) => {
            const progressPercent = Math.min(100, Math.round((target.savedAmountUSD / target.targetAmountUSD) * 100));
            const remainingUSD = Math.max(0, target.targetAmountUSD - target.savedAmountUSD);

            return (
              <div
                key={target.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {target.city} · {target.frequency.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 font-display mt-1">{target.title}</h3>
                      <p className="text-xs text-slate-500">Maturity Date: {target.targetDate}</p>
                    </div>
                    <span className="text-xs font-bold font-mono bg-blue-50 text-[#0047FF] px-2.5 py-1 rounded-lg">
                      {progressPercent}%
                    </span>
                  </div>

                  {/* Progress Ring / Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Saved:</span>
                      <strong className="text-slate-900 font-mono font-bold">
                        {formatPrice(target.savedAmountUSD)} / {formatPrice(target.targetAmountUSD)}
                      </strong>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-[#0047FF] rounded-full transition-all duration-700"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Auto-Save Active</span>
                      <span>Remaining: {formatPrice(remainingUSD)}</span>
                    </div>
                  </div>

                  {/* Deposit history */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-800">Recent Contributions:</div>
                    <div className="max-h-32 overflow-y-auto space-y-1.5">
                      {target.history.slice(0, 4).map((h) => (
                        <div
                          key={h.id}
                          className="px-3 py-2 bg-slate-50 rounded-xl text-xs flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-slate-600">{h.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 text-[11px] truncate max-w-[120px]">{h.method}</span>
                            <span className="font-bold text-slate-900 font-mono">{formatPrice(h.amountUSD)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Bell className="w-3.5 h-3.5 text-blue-500" />
                    <span>Next deduction in 5 days</span>
                  </div>

                  <button
                    onClick={() => {
                      const depositAmountUSD = Math.min(remainingUSD, 250);
                      openPaymentModal(
                        `Rent Savings Contribution: ${target.title}`,
                        depositAmountUSD,
                        `Rent Vault Deposit (${formatPrice(depositAmountUSD)})`,
                        () => depositRentSavings(target.id, depositAmountUSD)
                      );
                    }}
                    className="py-2 px-4 bg-[#0047FF] hover:bg-[#0036cc] text-white rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    Deposit Savings
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE TARGET MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">Create Rent Savings Target</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTarget} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Name</label>
                <input
                  type="text"
                  value={targetTitle}
                  onChange={(e) => setTargetTitle(e.target.value)}
                  placeholder="e.g. 2-Bed Lekki Rent, Nairobi Kilimani Apartment"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Target Amount ({currentCountry.currencyCode})
                  </label>
                  <input
                    type="number"
                    value={targetAmountLocal}
                    onChange={(e) => setTargetAmountLocal(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Savings Duration</label>
                  <select
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value={6}>6 Months Target</option>
                    <option value={12}>12 Months (Annual Rent)</option>
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
                    <option value="biweekly">Bi-weekly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 space-y-1">
                <div>A 10% kickoff deposit initiates your high-yield rent vault immediately.</div>
                <div>Your funds are held in licensed trustee accounts with automated reminders.</div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0047FF] hover:bg-[#0036cc] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Authorize Kickoff Deposit & Activate Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
