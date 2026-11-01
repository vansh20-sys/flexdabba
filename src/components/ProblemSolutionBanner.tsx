import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProblemSolutionBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-stone-50 border-b border-amber-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          <span className="font-bold text-stone-900">Universal 30-Day Tiffin Pass:</span>
          <span className="hidden md:inline text-stone-600">
            Take 1 subscription, then switch to ANY verified Dabbawala in your cluster for any number of days at ₹0 extra fee!
          </span>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 shrink-0 self-start sm:self-auto transition-colors bg-white/70 px-3 py-1 rounded-full border border-amber-200 shadow-2xs"
        >
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>{isExpanded ? 'Hide Architecture' : 'Why This Works in Real Life'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-amber-200/50 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-stone-600">
            <div className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-100 space-y-1.5">
              <span className="font-bold text-amber-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Switch Any Dabbawala</span>
              </span>
              <p className="leading-relaxed text-stone-600">
                You are not locked into one vendor. From your 30-day plan, switch to any available Dabbawala in your cluster for any number of days.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-orange-50/40 border border-orange-100 space-y-1.5">
              <span className="font-bold text-orange-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                <span>8:00 PM Smart Cut-off</span>
              </span>
              <p className="leading-relaxed text-stone-600">
                Swaps and pauses lock 14 hours ahead. Kitchens procure raw wholesale ingredients in exact ratios, eliminating 35% of food wastage.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-1.5">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dislike Blacklist Guard</span>
              </span>
              <p className="leading-relaxed text-stone-600">
                Flag ingredients you hate (Karela, Baingan, Arbi). The algorithm auto-swaps you to an approved archetype before delivery.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-sky-50/40 border border-sky-100 space-y-1.5">
              <span className="font-bold text-sky-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                <span>0-Waste Wallet Rollover</span>
              </span>
              <p className="leading-relaxed text-stone-600">
                Paused meals return ₹115 to your wallet balance or push your subscription end date forward by 1 day. Zero wasted money.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
