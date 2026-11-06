import React, { useState, useMemo } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { ALL_54_AFRICAN_COUNTRIES } from '../data/africanCountries';
import { Search, Globe, Check, X, ShieldCheck } from 'lucide-react';

export const CountryModal: React.FC = () => {
  const { currentCountry, setCountryByCode, isCountryModalOpen, setIsCountryModalOpen } = useVisbuy();
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'West Africa', 'East Africa', 'Southern Africa', 'North Africa', 'Central Africa'];

  const filteredCountries = useMemo(() => {
    return ALL_54_AFRICAN_COUNTRIES.filter((country) => {
      const matchesSearch =
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.currencyCode.toLowerCase().includes(search.toLowerCase()) ||
        country.code.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion]);

  if (!isCountryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0047FF]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">Select African Country & Currency</h2>
              <p className="text-xs text-slate-500">
                All 54 African countries supported with live currency conversion & local payment methods
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCountryModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Region Filter */}
        <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by country, currency (e.g. Kenya, KES, Naira, Ghana)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-[#0047FF] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Countries List */}
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredCountries.map((c) => {
            const isSelected = c.code === currentCountry.code;
            return (
              <button
                key={c.code}
                onClick={() => {
                  setCountryByCode(c.code);
                  setIsCountryModalOpen(false);
                }}
                className={`text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-[#0047FF] bg-blue-50/50 ring-1 ring-[#0047FF]'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{c.flag}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-slate-900 truncate">{c.name}</span>
                      <span className="text-xs text-slate-400 font-mono">({c.code})</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <span className="font-semibold text-slate-700">{c.currencyCode}</span>
                      <span className="text-slate-400">·</span>
                      <span>{c.currencySymbol}</span>
                      <span className="text-slate-400">·</span>
                      <span className="truncate">{c.region}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 truncate">
                      Gateways: {c.supportedGateways.slice(0, 2).join(', ')}
                      {c.supportedGateways.length > 2 ? ` +${c.supportedGateways.length - 2}` : ''}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Exchange rates calibrated to central bank & interbank fx channels</span>
          </div>
          <span className="font-mono text-slate-400">{filteredCountries.length} countries available</span>
        </div>
      </div>
    </div>
  );
};
