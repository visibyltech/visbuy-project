import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { PRODUCTS, Product } from '../data/products';
import { ALL_54_AFRICAN_COUNTRIES } from '../data/africanCountries';
import {
  Shield,
  TrendingUp,
  Package,
  Users2,
  DollarSign,
  Globe,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Truck,
  Plus,
  Edit,
  Eye,
  Check,
  X,
  Sparkles,
  Search,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    formatPrice,
    orders,
    updateOrderStatus,
    osusuGroups,
    rentSavingsTargets,
    saveToBuyPlans,
    rewardsWallet,
    currentCountry,
    addNotification,
  } = useVisbuy();

  const [adminRole, setAdminRole] = useState<'Super Admin' | 'Finance Controller' | 'Logistics Director'>('Super Admin');
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'osusu' | 'countries' | 'logs'>('analytics');

  // Product management state
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // System audit logs
  const [auditLogs, setAuditLogs] = useState([
    { id: 'log-1', time: '10 mins ago', user: 'Admin (System)', action: 'Exchange rate auto-synced for 54 African central banks', status: 'SUCCESS' },
    { id: 'log-2', time: '25 mins ago', user: 'Logistics Officer (Ikeja)', action: 'Dispatched order VB-98240-NG to courier transit hub', status: 'SUCCESS' },
    { id: 'log-3', time: '1 hour ago', user: 'Finance Arbiter', action: 'Approved Osusu cycle #2 payout for iPhone 16 Pro Max circle', status: 'SUCCESS' },
    { id: 'log-4', time: '3 hours ago', user: 'Risk & Fraud Engine', action: 'Verified customer phone number KYC tier 2 elevation', status: 'VERIFIED' },
  ]);

  // Order status advance handler
  const handleAdvanceStatus = (orderId: string, currentStatus: string) => {
    let nextStatus: any = 'DELIVERED';
    if (currentStatus === 'ORDER_CONFIRMED') nextStatus = 'PROCESSING';
    else if (currentStatus === 'PROCESSING') nextStatus = 'DISPATCHED';
    else if (currentStatus === 'DISPATCHED') nextStatus = 'IN_TRANSIT';
    else if (currentStatus === 'IN_TRANSIT') nextStatus = 'OUT_FOR_DELIVERY';
    else if (currentStatus === 'OUT_FOR_DELIVERY') nextStatus = 'DELIVERED';

    updateOrderStatus(orderId, nextStatus);
    addNotification('Order Status Updated', `Order ${orderId} transitioned to ${nextStatus}`, 'order');
  };

  const totalGMV_USD = 84250;
  const activeOsusuVolumeUSD = osusuGroups.reduce((sum, g) => sum + g.totalPriceUSD, 0);
  const lockedRentSavingsUSD = rentSavingsTargets.reduce((sum, t) => sum + t.savedAmountUSD, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-[#0A1931] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#0047FF]" />
            <span className="text-xs font-bold text-blue-300 tracking-wider uppercase font-mono">
              VISBUY Core Administration Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Pan-African Operations & Governance
          </h1>
          <p className="text-xs text-slate-300">
            Multi-vendor architecture, 54-country financial ledgers, Osusu escrows, and carrier dispatching.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/10 text-xs">
          <span className="text-slate-400 px-2 font-medium">Role:</span>
          {(['Super Admin', 'Finance Controller', 'Logistics Director'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setAdminRole(role)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                adminRole === role ? 'bg-[#0047FF] text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Gross Merchandise Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {formatPrice(totalGMV_USD)}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-semibold">+24.8% vs last month</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Active Osusu Group Pools</span>
            <Users2 className="w-4 h-4 text-[#0047FF]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {formatPrice(activeOsusuVolumeUSD)}
          </div>
          <div className="text-[11px] text-blue-700 mt-1 font-semibold">{osusuGroups.length} active circles</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Locked Rent Savings Vaults</span>
            <DollarSign className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {formatPrice(lockedRentSavingsUSD)}
          </div>
          <div className="text-[11px] text-indigo-700 mt-1 font-semibold">{rentSavingsTargets.length} active vaults</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Pan-African Coverage</span>
            <Globe className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">54 / 54</div>
          <div className="text-[11px] text-slate-500 mt-1">All African nations active</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'analytics' ? 'bg-[#0047FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Analytics & Revenue Breakdown
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'orders' ? 'bg-[#0047FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Orders Fulfillment Pipeline ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'products' ? 'bg-[#0047FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Product & Stock Inventory ({productList.length})
        </button>

        <button
          onClick={() => setActiveTab('osusu')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'osusu' ? 'bg-[#0047FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Osusu Supervision ({osusuGroups.length})
        </button>

        <button
          onClick={() => setActiveTab('countries')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'countries' ? 'bg-[#0047FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          54 African Countries & Exchange Rates
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'logs' ? 'bg-[#0047FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {/* TAB 1: ANALYTICS & REGIONAL GMV */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Regional breakdown table */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">Regional GMV Breakdown</h3>
              <div className="space-y-3 text-xs">
                {[
                  { region: 'West Africa (Nigeria, Ghana, Senegal, Côte d’Ivoire)', share: '46%', gmvUSD: 38755 },
                  { region: 'East Africa (Kenya, Rwanda, Tanzania, Uganda)', share: '28%', gmvUSD: 23590 },
                  { region: 'Southern Africa (South Africa, Botswana, Namibia)', share: '14%', gmvUSD: 11795 },
                  { region: 'North Africa (Egypt, Morocco, Tunisia)', share: '8%', gmvUSD: 6740 },
                  { region: 'Central Africa (Cameroon, DR Congo, Gabon)', share: '4%', gmvUSD: 3370 },
                ].map((r) => (
                  <div key={r.region} className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{r.region}</span>
                      <span className="font-mono">{formatPrice(r.gmvUSD)} ({r.share})</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0047FF]" style={{ width: r.share }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method distribution */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-display">Payment Mode Adoption</h3>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span>Pay Now (Card / Transfers):</span>
                  <strong className="text-slate-900 font-mono">42% of volume</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span>Buy with Osusu (Group Purchasing):</span>
                  <strong className="text-blue-700 font-mono">26% of volume</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span>Save to Buy (30% Deposit Layaway):</span>
                  <strong className="text-emerald-700 font-mono">19% of volume</strong>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span>Buy Now, Pay Later (BNPL Installments):</span>
                  <strong className="text-indigo-700 font-mono">13% of volume</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS FULFILLMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">Order Logistics Pipeline</h2>
            <span className="text-xs text-slate-500">Advance parcel milestones with live carrier sync</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {orders.map((order) => (
              <div key={order.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-mono">{order.orderNumber}</span>
                    <span className="text-slate-400">· {order.customer.name} ({order.customer.countryCode})</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold font-mono">
                      {formatPrice(order.totalUSD)}
                    </span>
                  </div>
                  <div className="text-slate-500">
                    Address: {order.customer.streetAddress}, {order.customer.city} · Tracking: {order.trackingNumber}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Method: {order.paymentMethod} · Items: {order.items.length} product(s)
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold bg-blue-100 text-[#0047FF] px-2.5 py-1 rounded-lg uppercase">
                    {order.deliveryStatus}
                  </span>

                  {order.deliveryStatus !== 'DELIVERED' && (
                    <button
                      onClick={() => handleAdvanceStatus(order.id, order.deliveryStatus)}
                      className="py-1.5 px-3 bg-[#0047FF] hover:bg-[#0036cc] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Advance Milestone</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCT INVENTORY */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">Product Catalog & Stock Management</h2>
            <span className="text-xs text-slate-500">{productList.length} products published</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {productList.map((prod) => (
              <div key={prod.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={prod.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{prod.name}</div>
                    <div className="text-slate-500">{prod.category} · Brand: {prod.brand}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="font-bold font-mono text-slate-900">{formatPrice(prod.basePriceUSD)}</div>
                    <span className="text-[11px] text-slate-500">Stock: {prod.stockCount} units</span>
                  </div>

                  <button
                    onClick={() => {
                      const newStock = prod.stockCount + 10;
                      setProductList((prev) =>
                        prev.map((p) => (p.id === prod.id ? { ...p, stockCount: newStock } : p))
                      );
                      addNotification('Stock Restocked', `Added 10 units to ${prod.name}`, 'order');
                    }}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                    title="Restock +10"
                  >
                    +10 Stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: OSUSU SUPERVISION */}
      {activeTab === 'osusu' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">Osusu Circles Oversight</h2>
            <span className="text-xs text-slate-500">Monitor rotation compliance & replacement rules</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {osusuGroups.map((g) => (
              <div key={g.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">{g.title}</h4>
                    <p className="text-xs text-slate-500">{g.productName}</p>
                  </div>
                  <span className="text-xs font-bold text-[#0047FF] bg-blue-50 px-2 py-0.5 rounded font-mono">
                    Cycle {g.currentCycle}/{g.totalCycles}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex justify-between">
                  <span>Pool: {formatPrice(g.totalPriceUSD)}</span>
                  <span>Members: {g.members.length}/{g.maxMembers}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-semibold">Zero Active Disputes</span>
                  <button
                    onClick={() => addNotification('Audit Check', `Verified ledger for ${g.title}`, 'osusu')}
                    className="text-xs font-semibold text-[#0047FF] hover:underline"
                  >
                    Audit Ledger
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: 54 AFRICAN COUNTRIES & FX */}
      {activeTab === 'countries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display">54 African Countries Database</h2>
            <span className="text-xs text-slate-500">Live interbank exchange rates and local payment routing</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {ALL_54_AFRICAN_COUNTRIES.map((c) => (
              <div key={c.code} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{c.flag}</span>
                  <div>
                    <div className="font-bold text-slate-900">{c.name} ({c.code})</div>
                    <div className="text-slate-500 text-[11px]">
                      {c.region} · Dial: {c.phonePrefix} · Tax: {c.taxRatePercent}%
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold font-mono text-slate-900">
                    1 USD = {c.exchangeRateToUSD} {c.currencyCode} ({c.currencySymbol})
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Gateways: {c.supportedGateways.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-display">System Audit Logs</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{log.action}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">By {log.user} · {log.time}</div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold rounded">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
