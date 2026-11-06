import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { OsusuGroup } from '../types/visbuy';
import { PRODUCTS } from '../data/products';
import {
  Users2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ChevronRight,
  CreditCard,
  Share2,
} from 'lucide-react';

export const OsusuHubView: React.FC = () => {
  const {
    osusuGroups,
    currentCountry,
    formatPrice,
    openPaymentModal,
    makeOsusuContribution,
    createOsusuGroup,
    joinOsusuGroup,
    addNotification,
    openProductDetail,
  } = useVisbuy();

  const [activeTab, setActiveTab] = useState<'browse' | 'dashboard'>('browse');
  const [selectedGroupId, setSelectedGroupId] = useState<string>(osusuGroups[0]?.id || '');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New group form
  const [newProductId, setNewProductId] = useState(PRODUCTS[0].id);
  const [newGroupSize, setNewGroupSize] = useState<4 | 6>(4);
  const [newFrequency, setNewFrequency] = useState<'weekly' | 'monthly'>('monthly');

  const selectedGroup = osusuGroups.find((g) => g.id === selectedGroupId) || osusuGroups[0];

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    const product = PRODUCTS.find((p) => p.id === newProductId) || PRODUCTS[0];
    const created = createOsusuGroup({
      productId: product.id,
      title: `${product.brand} ${product.name.slice(0, 22)} Circle`,
      maxMembers: newGroupSize,
      frequency: newFrequency,
    });
    setIsCreateModalOpen(false);
    setSelectedGroupId(created.id);
    setActiveTab('dashboard');
  };

  const handleSimulateAlerts = (group: OsusuGroup) => {
    addNotification(
      'WhatsApp & Email Reminders Dispatched',
      `Payment links sent to all ${group.members.length} members of "${group.title}". Cycle #${group.currentCycle} due date verified.`,
      'osusu'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0030B8] to-[#0047FF] rounded-3xl text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-15 pointer-events-none">
          <img
            src="/src/assets/images/osusu_group_trust_1793992278732.jpg"
            alt="Osusu Community"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-blue-100">
            <Users2 className="w-3.5 h-3.5 text-blue-200" />
            <span>Digital Osusu & Rotating Group Savings</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-balance">
            Own High-Value Products Together with Osusu.
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            The centuries-old African communal practice (Ajo, Esusu, Chama, Tontine) modernized with bank-grade escrows,
            automated rotation tracking, verified delivery, and dispute protection.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-white text-[#0047FF] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Browse Open Circles
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-[#0047FF] shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Active Group Dashboard
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Circle</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: BROWSE OPEN CIRCLES */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Active Osusu Circles in {currentCountry.name} & Africa</h2>
              <p className="text-xs text-slate-500">Pick an open circle, choose an allocation position, and contribute comfortably.</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-[#0047FF] hover:bg-[#0036cc] text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 self-start"
            >
              <Plus className="w-4 h-4" />
              <span>Start Circle for Any Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {osusuGroups.map((group) => {
              const spacesLeft = group.maxMembers - group.members.length;
              const product = PRODUCTS.find((p) => p.id === group.productId);
              return (
                <div
                  key={group.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={group.productImage}
                        alt={group.productName}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                          {group.frequency.toUpperCase()} CIRCLE
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 truncate font-display">{group.title}</h3>
                        <p className="text-xs text-slate-500 truncate">{group.productName}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-slate-400 text-[11px]">Contribution</div>
                        <div className="font-bold text-[#0047FF] font-mono text-sm">
                          {formatPrice(group.contributionPerCycleUSD)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[11px]">Spaces Left</div>
                        <div className="font-bold text-slate-900">
                          {spacesLeft > 0 ? `${spacesLeft} open` : 'Circle Full (Active)'}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[11px]">Total Members</div>
                        <div className="font-semibold text-slate-700">{group.maxMembers} participants</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-[11px]">Commences</div>
                        <div className="font-semibold text-slate-700">{group.commencementDate}</div>
                      </div>
                    </div>

                    {/* Member Slots Preview */}
                    <div>
                      <div className="text-[11px] font-semibold text-slate-600 mb-1.5">Allocation Order Status:</div>
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: group.maxMembers }).map((_, idx) => {
                          const pos = idx + 1;
                          const member = group.members.find((m) => m.allocationPosition === pos);
                          return (
                            <div
                              key={pos}
                              className={`flex-1 py-1 rounded text-center text-[10px] font-mono font-bold border ${
                                member
                                  ? 'bg-blue-50 border-blue-200 text-[#0047FF]'
                                  : 'bg-slate-50 border-slate-200 text-slate-400'
                              }`}
                            >
                              #{pos} {member ? '✓' : 'open'}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedGroupId(group.id);
                        setActiveTab('dashboard');
                      }}
                      className="flex-1 py-2 px-3 bg-[#0047FF] hover:bg-[#0036cc] text-white rounded-xl text-xs font-semibold transition-all text-center cursor-pointer"
                    >
                      Open Dashboard
                    </button>
                    {product && (
                      <button
                        onClick={() => openProductDetail(product)}
                        className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                      >
                        Product
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: DEDICATED CIRCLE DASHBOARD */}
      {activeTab === 'dashboard' && selectedGroup && (
        <div className="space-y-6">
          {/* Circle Selector Header */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedGroup.productImage}
                alt={selectedGroup.productName}
                className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 font-display">{selectedGroup.title}</h2>
                  <span className="text-xs bg-blue-100 text-[#0047FF] font-semibold px-2 py-0.5 rounded font-mono">
                    Cycle {selectedGroup.currentCycle}/{selectedGroup.totalCycles}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{selectedGroup.productName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                {osusuGroups.map((g) => (
                  <option key={g.id} value={g.id}>
                    Switch Circle: {g.title}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSimulateAlerts(selectedGroup)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                title="Send WhatsApp & Email Reminders"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Dispatch Reminders</span>
              </button>
            </div>
          </div>

          {/* Group Progress & Rotation Allocation Order */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Members Roster & Payment Statuses */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">Participant Roster & Rotation Timeline</h3>
                  <p className="text-xs text-slate-500">Each member receives product delivery during their designated cycle.</p>
                </div>
                <span className="text-xs font-bold text-[#0047FF] font-mono">
                  {selectedGroup.members.length} / {selectedGroup.maxMembers} Joined
                </span>
              </div>

              {/* Members List Cards */}
              <div className="space-y-3">
                {selectedGroup.members.map((member) => {
                  const isCurrentCycleWinner = member.allocationPosition === selectedGroup.currentCycle;
                  return (
                    <div
                      key={member.userId}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCurrentCycleWinner
                          ? 'border-[#0047FF] bg-blue-50/40 ring-1 ring-[#0047FF]/30'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{member.name}</span>
                            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              Slot #{member.allocationPosition}
                            </span>
                            {isCurrentCycleWinner && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase">
                                Cycle {selectedGroup.currentCycle} Recipient 🎉
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>Country: {member.countryCode}</span>
                            <span>·</span>
                            <span>Delivery Status: {member.deliveryStatus}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                            member.paymentStatus === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : member.paymentStatus === 'PENDING'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {member.paymentStatus}
                        </span>

                        {member.userId === 'current-user' && member.paymentStatus !== 'PAID' && (
                          <button
                            onClick={() => {
                              openPaymentModal(
                                `Cycle ${selectedGroup.currentCycle} Osusu Payment`,
                                selectedGroup.contributionPerCycleUSD,
                                `Osusu Cycle ${selectedGroup.currentCycle} Contribution`,
                                () => makeOsusuContribution(selectedGroup.id, 'current-user')
                              );
                            }}
                            className="py-1.5 px-3 bg-[#0047FF] hover:bg-[#0036cc] text-white rounded-lg text-xs font-semibold transition-colors"
                          >
                            Pay Contribution
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Open spots notice */}
              {selectedGroup.members.length < selectedGroup.maxMembers && (
                <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between">
                  <div className="text-xs text-slate-600">
                    <strong>{selectedGroup.maxMembers - selectedGroup.members.length} spot(s) remaining</strong> to start cycle #1 dispatch!
                  </div>
                  <button
                    onClick={() => {
                      const nextPos = selectedGroup.members.length + 1;
                      openPaymentModal(
                        `Join ${selectedGroup.title}`,
                        selectedGroup.contributionPerCycleUSD,
                        `Osusu Slot #${nextPos} Contribution`,
                        () => joinOsusuGroup(selectedGroup.id, nextPos)
                      );
                    }}
                    className="py-1.5 px-3 bg-[#0047FF] text-white rounded-lg text-xs font-semibold hover:bg-[#0036cc] transition-colors"
                  >
                    Join Available Slot
                  </button>
                </div>
              )}
            </div>

            {/* Right: Group Ledger & Governance Rules */}
            <div className="lg:col-span-4 space-y-4">
              {/* Financial Ledger Summary */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-display">Escrow Ledger Summary</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cycle Contribution:</span>
                    <strong className="text-slate-900 font-mono">
                      {formatPrice(selectedGroup.contributionPerCycleUSD)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Group Pool:</span>
                    <strong className="text-slate-900 font-mono">
                      {formatPrice(selectedGroup.totalPriceUSD)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Commencement Date:</span>
                    <span className="text-slate-700 font-medium">{selectedGroup.commencementDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dispute Status:</span>
                    <span className="text-emerald-700 font-semibold">Zero Active Disputes</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      openPaymentModal(
                        `Osusu Cycle Contribution: ${selectedGroup.title}`,
                        selectedGroup.contributionPerCycleUSD,
                        `Cycle #${selectedGroup.currentCycle} Contribution`,
                        () => makeOsusuContribution(selectedGroup.id, 'current-user')
                      );
                    }}
                    className="w-full py-2.5 px-3 bg-[#0047FF] hover:bg-[#0036cc] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay My Cycle Contribution ({formatPrice(selectedGroup.contributionPerCycleUSD)})</span>
                  </button>
                </div>
              </div>

              {/* Osusu Policy Rules */}
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#0047FF]" />
                  <span>VISBUY Osusu Guarantee & Rules</span>
                </div>
                <ul className="space-y-1.5 text-[11px] leading-relaxed list-disc pl-4 text-slate-600">
                  <li><strong>Rotating Allocation:</strong> Slot #1 receives delivery in Month 1, Slot #2 in Month 2, etc.</li>
                  <li><strong>Missed Payments:</strong> 3-day grace period before automatic replacement from waitlist.</li>
                  <li><strong>Escrow Guarantee:</strong> Products are pre-reserved in VISBUY inventory before cycle 1 starts.</li>
                  <li><strong>Dispute Resolution:</strong> Visibyl Technologies acts as licensed escrow arbiter.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW CIRCLE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-display">Create a New Osusu Circle</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Select Product</label>
                <select
                  value={newProductId}
                  onChange={(e) => setNewProductId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  {PRODUCTS.filter((p) => p.paymentOptions.osusu).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({formatPrice(p.basePriceUSD)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Circle Size</label>
                  <select
                    value={newGroupSize}
                    onChange={(e) => setNewGroupSize(Number(e.target.value) as 4 | 6)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value={4}>4 Members (4 Cycles)</option>
                    <option value={6}>6 Members (6 Cycles)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Contribution Frequency</label>
                  <select
                    value={newFrequency}
                    onChange={(e) => setNewFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 space-y-1">
                <div>You will automatically be allocated <strong>Slot #1</strong> as the group initiator.</div>
                <div>The group will be listed for verified participants in {currentCountry.name} and across Africa.</div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0047FF] hover:bg-[#0036cc] text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Launch Osusu Circle
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
