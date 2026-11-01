import React, { useState } from 'react';
import { SubscriptionInfo, WalletTransaction } from '../types';
import { Check, Wallet, PiggyBank, ArrowDownLeft, Sparkles, TrendingUp } from 'lucide-react';

interface WalletAndEconomicsViewProps {
  subscription: SubscriptionInfo;
  transactions: WalletTransaction[];
  onAddCredit: (amount: number, reason: string) => void;
}

export const WalletAndEconomicsView: React.FC<WalletAndEconomicsViewProps> = ({
  subscription,
  transactions,
}) => {
  const [skipSlider, setSkipSlider] = useState(4);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  const traditionalTiffinMealCost = 110;
  const traditionalWastedMoney = skipSlider * traditionalTiffinMealCost;
  const flexDabbaMealCost = subscription.costPerMeal;

  const handleSimulateRedeem = (item: string) => {
    setRedeemSuccess(`Applied ₹${subscription.walletBalance} credit towards ${item}!`);
    setTimeout(() => setRedeemSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Hero Card */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 rounded-2xl p-6 sm:p-7 text-white shadow-md border border-stone-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wide uppercase">
              <Wallet className="w-4 h-4 text-amber-400" />
              <span>Zero-Waste Flex Wallet</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400 font-medium">100% Retained Meal Equity</span>
            </div>
            
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold tabular-nums tracking-tight text-white">
                ₹{subscription.walletBalance}
              </span>
              <span className="text-xs text-amber-200/80 font-medium">
                accrued from paused & skipped days
              </span>
            </div>

            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              In traditional services, skipped days forfeit your money. In FlexDabba, every paused lunch automatically returns ₹{subscription.costPerMeal} directly to your wallet or extends your renewal date.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleSimulateRedeem('Next Month Subscription')}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-xs"
            >
              Apply ₹{subscription.walletBalance} to Renewal
            </button>
            <button
              onClick={() => handleSimulateRedeem('Weekend Gourmet Treats')}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs rounded-xl transition-all border border-stone-700"
            >
              Spend on Sides & Extras
            </button>
          </div>
        </div>

        {redeemSuccess && (
          <div className="mt-4 p-2.5 bg-amber-500/20 border border-amber-400/40 rounded-xl text-xs text-amber-200 font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{redeemSuccess}</span>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Transparent Mathematical Model</span>
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            How The Economics Compare (22 Workdays)
          </h3>
          <p className="text-xs text-stone-500">
            Comparing monthly budgets across traditional dabbas, commercial food delivery apps, and FlexDabba.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-700">
                <th className="py-3 px-4 font-bold">Service Model</th>
                <th className="py-3 px-4 font-bold">Cost / Meal</th>
                <th className="py-3 px-4 font-bold">Monthly Bill</th>
                <th className="py-3 px-4 font-bold">Menu Selection</th>
                <th className="py-3 px-4 font-bold">Skipped Meal Money Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr className="hover:bg-stone-50/50">
                <td className="py-3.5 px-4 font-semibold text-stone-900">Traditional Tiffin</td>
                <td className="py-3.5 px-4 tabular-nums">₹110</td>
                <td className="py-3.5 px-4 tabular-nums font-semibold">₹2,420</td>
                <td className="py-3.5 px-4 text-stone-500">0 choice · Endure disliked dishes 2x/wk</td>
                <td className="py-3.5 px-4 tabular-nums text-red-600 font-bold">100% Wasted (~₹440 lost)</td>
              </tr>
              <tr className="hover:bg-stone-50/50">
                <td className="py-3.5 px-4 font-semibold text-stone-900">Food Delivery Apps</td>
                <td className="py-3.5 px-4 tabular-nums">₹280+</td>
                <td className="py-3.5 px-4 tabular-nums font-semibold">₹6,160+</td>
                <td className="py-3.5 px-4 text-stone-500">Full choice · High oil/salt restaurants</td>
                <td className="py-3.5 px-4">Pay as you go (2.5x higher cost)</td>
              </tr>
              <tr className="bg-amber-50/50 font-medium border-2 border-amber-300">
                <td className="py-3.5 px-4 font-extrabold text-stone-950 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-600 stroke-[3]" />
                  <span>FlexDabba</span>
                </td>
                <td className="py-3.5 px-4 tabular-nums font-extrabold text-stone-950">₹115</td>
                <td className="py-3.5 px-4 tabular-nums font-extrabold text-stone-950">₹2,530</td>
                <td className="py-3.5 px-4 font-bold text-amber-900">4 Daily Archetypes + Blacklist Guard</td>
                <td className="py-3.5 px-4 tabular-nums font-extrabold text-emerald-700">₹0 Wasted (100% credited)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulator & Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="space-y-0.5">
            <h4 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-amber-600" />
              <span>Interactive Monthly Waste Simulator</span>
            </h4>
            <p className="text-xs text-stone-500">
              Slide to see how much money traditional tiffins forfeit vs FlexDabba recovers.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-stone-800 font-semibold">
              <span>Meals Skipped Per Month (Meetings, Travel, Team Outings):</span>
              <span className="font-extrabold tabular-nums text-base text-amber-800">{skipSlider} Days</span>
            </div>

            <input
              type="range"
              min="0"
              max="10"
              value={skipSlider}
              onChange={(e) => setSkipSlider(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-600 font-medium">
              <span>Traditional Tiffin Money Forfeited:</span>
              <span className="font-bold text-red-600 tabular-nums">-₹{traditionalWastedMoney}/mo</span>
            </div>
            <div className="flex items-center justify-between text-stone-900 font-bold">
              <span>FlexDabba Wallet Protected:</span>
              <span className="font-extrabold text-emerald-700 tabular-nums text-sm">+₹{skipSlider * flexDabbaMealCost}/mo</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-stone-800 font-bold">
              <span>Annual Waste Prevented:</span>
              <span className="font-extrabold tabular-nums text-stone-950 text-base">₹{(skipSlider * flexDabbaMealCost) * 12} / yr</span>
            </div>
          </div>
        </div>

        {/* Ledger */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
              <span>Wallet Activity Ledger</span>
            </h4>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Audit Verified
            </span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-56">
            {transactions.map(tx => (
              <div
                key={tx.id}
                className="p-3 rounded-xl border border-stone-200/70 bg-stone-50/50 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-semibold text-stone-900 block">{tx.description}</span>
                  <span className="text-stone-400 text-[11px]">{tx.date} · {tx.reference}</span>
                </div>
                <span className="font-bold text-emerald-700 tabular-nums text-sm">
                  +₹{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
