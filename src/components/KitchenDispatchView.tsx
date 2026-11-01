import React, { useState } from 'react';
import { MOCK_KITCHEN_DATA } from '../data/mockData';
import { Clock } from 'lucide-react';

export const KitchenDispatchView: React.FC = () => {
  const [selectedArchetypeFilter, setSelectedArchetypeFilter] = useState<string>('all');
  const [isLocked, setIsLocked] = useState(false);
  const data = MOCK_KITCHEN_DATA;

  const filteredLabels = selectedArchetypeFilter === 'all'
    ? data.sampleLabels
    : data.sampleLabels.filter(l => l.mealArchetype.toLowerCase().includes(selectedArchetypeFilter.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Ops Header */}
      <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-stone-900">
              Kitchen Consolidated Production Order
            </h2>
            <p className="text-xs text-stone-500 max-w-2xl leading-relaxed">
              How FlexDabba preserves economics: subscriber selections aggregate into 4 predictable bulk cauldrons prepared between 6:00 AM and 11:30 AM.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                isLocked
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isLocked ? '8:00 PM Procurement Locked' : 'Simulate 8:00 PM Lock'}</span>
            </button>
          </div>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-stone-400 block">Total Tiffins Scheduled:</span>
            <span className="text-2xl font-bold text-stone-900 tabular-nums">
              {data.totalTiffins} Units
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">Cut-Off Status:</span>
            <span className="text-sm font-semibold text-stone-900 mt-1 block">
              {isLocked ? 'Locked for Prep' : 'Open for Swaps'}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">Delivery Cluster:</span>
            <span className="text-sm font-semibold text-stone-900 mt-1 block">DLF Cyber City & Sector 44</span>
          </div>
          <div>
            <span className="text-stone-400 block">Food Waste Risk:</span>
            <span className="text-sm font-semibold text-stone-900 mt-1 block">0% Pre-portioned</span>
          </div>
        </div>
      </div>

      {/* 4 Batch Cauldrons Breakdown */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-stone-900">
              Morning Batch Cauldrons
            </h3>
            <p className="text-xs text-stone-500">
              Kitchen prep staff cook only these 4 bulk line items:
            </p>
          </div>
          <span className="text-xs text-stone-500 tabular-nums">
            Total: {data.totalTiffins} Tiffins
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Classic */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-900">Classic Homestyle</span>
              <span className="text-xs font-bold text-stone-900 tabular-nums">{data.breakdown.classic.percentage}%</span>
            </div>
            <div className="text-xl font-bold text-stone-900 tabular-nums">
              {data.breakdown.classic.count} <span className="text-xs font-normal text-stone-500">boxes</span>
            </div>
            <p className="text-xs text-stone-500 line-clamp-1">
              {data.breakdown.classic.dishSummary}
            </p>
          </div>

          {/* Fit & High-Protein */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-900">Fit & High-Protein</span>
              <span className="text-xs font-bold text-stone-900 tabular-nums">{data.breakdown.fitProtein.percentage}%</span>
            </div>
            <div className="text-xl font-bold text-stone-900 tabular-nums">
              {data.breakdown.fitProtein.count} <span className="text-xs font-normal text-stone-500">boxes</span>
            </div>
            <p className="text-xs text-stone-500 line-clamp-1">
              {data.breakdown.fitProtein.dishSummary}
            </p>
          </div>

          {/* Regional Special */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-900">Regional Special</span>
              <span className="text-xs font-bold text-stone-900 tabular-nums">{data.breakdown.regional.percentage}%</span>
            </div>
            <div className="text-xl font-bold text-stone-900 tabular-nums">
              {data.breakdown.regional.count} <span className="text-xs font-normal text-stone-500">boxes</span>
            </div>
            <p className="text-xs text-stone-500 line-clamp-1">
              {data.breakdown.regional.dishSummary}
            </p>
          </div>

          {/* Khichdi Rescue */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-900">Khichdi Rescue</span>
              <span className="text-xs font-bold text-stone-900 tabular-nums">{data.breakdown.khichdiRescue.percentage}%</span>
            </div>
            <div className="text-xl font-bold text-stone-900 tabular-nums">
              {data.breakdown.khichdiRescue.count} <span className="text-xs font-normal text-stone-500">boxes</span>
            </div>
            <p className="text-xs text-stone-500 line-clamp-1">
              {data.breakdown.khichdiRescue.dishSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Dispatch Packaging Labels Simulation */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-stone-900">
              Automated Box Dispatch Labels
            </h3>
            <p className="text-xs text-stone-500">
              Generated at 8:00 PM lock, routing tiffins to subscriber desk pods.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedArchetypeFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedArchetypeFilter === 'all' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedArchetypeFilter('protein')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedArchetypeFilter === 'protein' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Fit Protein
            </button>
            <button
              onClick={() => setSelectedArchetypeFilter('regional')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedArchetypeFilter === 'regional' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Regional
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {filteredLabels.map((lbl) => (
            <div
              key={lbl.id}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-xs space-y-3 font-mono"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-bold text-stone-900">{lbl.id}</span>
                <span className="text-[11px] text-stone-500">{lbl.qrCodeMock}</span>
              </div>

              <div className="space-y-0.5 font-sans">
                <span className="text-sm font-bold text-stone-900 block">
                  {lbl.customerName}
                </span>
                <span className="text-stone-600 block">{lbl.company}</span>
                <span className="text-stone-500 text-[11px] block">{lbl.deliveryAddress}</span>
              </div>

              <div className="pt-2 border-t border-stone-200 space-y-0.5 font-sans text-[11px]">
                <div className="font-semibold text-stone-900">
                  {lbl.mealArchetype}
                </div>
                <div className="text-stone-500">
                  {lbl.badge}
                </div>
                {lbl.addons.length > 0 && (
                  <div className="text-stone-700 font-medium">
                    Add-ons: {lbl.addons.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
