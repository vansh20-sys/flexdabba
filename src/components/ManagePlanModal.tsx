import React, { useState } from 'react';
import { SubscriptionInfo } from '../types';
import { X, Check } from 'lucide-react';

interface ManagePlanModalProps {
  subscription: SubscriptionInfo;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSubscription: (updated: SubscriptionInfo) => void;
}

export const ManagePlanModal: React.FC<ManagePlanModalProps> = ({
  subscription,
  isOpen,
  onClose,
  onUpdateSubscription,
}) => {
  const [deliveryAddress, setDeliveryAddress] = useState(subscription.deliveryAddress);
  const [officeDeskInfo, setOfficeDeskInfo] = useState(subscription.officeDeskInfo);
  const [preferredSlot, setPreferredSlot] = useState(subscription.preferredSlot);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateSubscription({
      ...subscription,
      deliveryAddress,
      officeDeskInfo,
      preferredSlot,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-100">
      <div className="relative bg-white rounded-xl max-w-lg w-full border border-stone-200 shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500">
              Subscription
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              {subscription.planName}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Plan Stats Overview */}
          <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 grid grid-cols-3 gap-3 text-center">
            <div>
              <span className="text-[11px] text-stone-500 block">Remaining</span>
              <span className="text-lg font-bold text-stone-900 tabular-nums">
                {subscription.mealsRemaining}
              </span>
              <span className="text-[10px] text-stone-400 block">of {subscription.totalMeals} meals</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 block">Rate / Meal</span>
              <span className="text-lg font-bold text-stone-900 tabular-nums">
                ₹{subscription.costPerMeal}
              </span>
              <span className="text-[10px] text-stone-400 block">economical batch</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-500 block">Valid Until</span>
              <span className="text-xs font-bold text-stone-900 mt-1 block">
                Nov 25
              </span>
              <span className="text-[10px] text-stone-500 block">rolls on pause</span>
            </div>
          </div>

          {/* Delivery Coordinates Form */}
          <div className="space-y-3 pt-1">
            <span className="text-xs font-semibold text-stone-900 block">
              Office Desk & Floor Dispatch
            </span>

            <div>
              <label className="text-xs text-stone-600 block mb-1">
                Office Building & Complex:
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="text-xs text-stone-600 block mb-1">
                Desk, Bay & Floor Number:
              </label>
              <input
                type="text"
                value={officeDeskInfo}
                onChange={(e) => setOfficeDeskInfo(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="text-xs text-stone-600 block mb-1">
                Lunch Delivery Window:
              </label>
              <select
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
              >
                <option value="12:15 PM - 12:45 PM">12:15 PM - 12:45 PM (Early Lunch)</option>
                <option value="12:45 PM - 1:15 PM">12:45 PM - 1:15 PM (Standard Peak)</option>
                <option value="1:15 PM - 1:45 PM">1:15 PM - 1:45 PM (Late Lunch)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-md transition-colors flex items-center gap-1.5"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Updated</span>
              </>
            ) : (
              <span>Save Location</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
