import React, { useState } from 'react';
import { SubscriptionInfo } from '../types';
import { X, Check, Sparkles, ShieldCheck, MapPin, CreditCard, Building2, Clock } from 'lucide-react';

interface SubscribeModalProps {
  subscription: SubscriptionInfo;
  isOpen: boolean;
  onClose: () => void;
  onSaveSubscription: (newSub: SubscriptionInfo) => void;
}

const PLANS = [
  {
    id: 'lunch_22',
    name: 'Universal Office Lunch Pass (30-Day)',
    meals: 22,
    rate: 115,
    total: 2530,
    tag: 'Most Popular',
    desc: 'Switch between ANY Dabbawala in your cluster for any number of days. 100% pause rollover.',
  },
  {
    id: 'flexi_15',
    name: 'Flexi 15 (Hybrid Multi-Dabbawala)',
    meals: 15,
    rate: 120,
    total: 1800,
    tag: 'Hybrid 3-Days/Wk',
    desc: '15 meal tokens valid across all Dabbawala partners for 45 days. Use on any day.',
  },
  {
    id: 'dual_44',
    name: 'Dual Fuel Pro (Lunch + Dinner 30-Day)',
    meals: 44,
    rate: 110,
    total: 4840,
    tag: 'Best Value',
    desc: 'Daily Lunch at desk + warm dinner at home. Switch provider for lunch or dinner independently.',
  },
];

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  subscription,
  isOpen,
  onClose,
  onSaveSubscription,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState('lunch_22');
  const [address, setAddress] = useState(subscription.deliveryAddress);
  const [desk, setDesk] = useState(subscription.officeDeskInfo);
  const [slot, setSlot] = useState(subscription.preferredSlot);
  const [useWalletCredits, setUseWalletCredits] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[0];
  const walletDiscount = useWalletCredits ? Math.min(subscription.walletBalance, currentPlan.total) : 0;
  const finalPrice = currentPlan.total - walletDiscount;

  const handleCheckout = () => {
    onSaveSubscription({
      ...subscription,
      planName: `${currentPlan.name} (Monthly)`,
      totalMeals: currentPlan.meals,
      mealsRemaining: currentPlan.meals,
      costPerMeal: currentPlan.rate,
      deliveryAddress: address,
      officeDeskInfo: desk,
      preferredSlot: slot,
      walletBalance: subscription.walletBalance - walletDiscount,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-100">
      <div className="relative bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              FlexDabba Subscriptions
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              Choose Your Flexible Tiffin Plan
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">Subscription Confirmed!</h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              Your {currentPlan.name} is now active. Your first hot dabba will arrive at <strong>{desk}</strong> tomorrow.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
            {/* Plan Selector */}
            <div className="space-y-2.5">
              <span className="font-bold text-stone-900 block">1. Select Plan Tier</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PLANS.map(plan => {
                  const isSelected = plan.id === selectedPlanId;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                          isSelected ? 'bg-amber-200 text-amber-900' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {plan.tag}
                        </span>
                        <h4 className="font-bold text-stone-900 text-xs mt-1">{plan.name}</h4>
                        <p className="text-[11px] text-stone-500 leading-tight">{plan.desc}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-baseline justify-between">
                        <span className="font-extrabold text-stone-900 text-sm tabular-nums">₹{plan.total}</span>
                        <span className="text-[10px] text-stone-500">₹{plan.rate}/meal</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <span className="font-bold text-stone-900 block">2. Delivery Location (Tech Park / Office)</span>
              
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Office Building & Complex:
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Floor, Bay & Desk Number:
                  </label>
                  <input
                    type="text"
                    value={desk}
                    onChange={(e) => setDesk(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Lunch Delivery Slot:
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white"
                  >
                    <option value="12:15 PM - 12:45 PM">12:15 PM - 12:45 PM</option>
                    <option value="12:45 PM - 1:15 PM">12:45 PM - 1:15 PM (Standard)</option>
                    <option value="1:15 PM - 1:45 PM">1:15 PM - 1:45 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Wallet Deductions & Summary */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/90 space-y-2.5">
              <span className="font-bold text-stone-900 block">3. Invoice Settlement</span>

              <div className="flex justify-between text-stone-600">
                <span>{currentPlan.name} ({currentPlan.meals} Meals):</span>
                <span className="font-semibold text-stone-900 tabular-nums">₹{currentPlan.total}</span>
              </div>

              {subscription.walletBalance > 0 && (
                <label className="flex items-center justify-between cursor-pointer py-1 text-emerald-800">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={useWalletCredits}
                      onChange={(e) => setUseWalletCredits(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Apply Flex Wallet Balance (₹{subscription.walletBalance} available):</span>
                  </div>
                  <span className="font-bold tabular-nums text-emerald-700">-₹{walletDiscount}</span>
                </label>
              )}

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-stone-900">
                <span className="font-extrabold text-sm">Total Due Today:</span>
                <span className="font-extrabold text-lg tabular-nums text-stone-950">₹{finalPrice}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Confirm & Activate Subscription</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
