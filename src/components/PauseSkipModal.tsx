import React, { useState } from 'react';
import { DaySchedule } from '../types';
import { X, CalendarPlus, Wallet, AlertCircle, Check } from 'lucide-react';

interface PauseSkipModalProps {
  day: DaySchedule;
  slotType: 'lunch' | 'dinner';
  isOpen: boolean;
  onClose: () => void;
  onConfirmPause: (pauseType: 'wallet_credit' | 'extend_plan') => void;
  onUnpause: () => void;
  costPerMeal: number;
}

export const PauseSkipModal: React.FC<PauseSkipModalProps> = ({
  day,
  slotType,
  isOpen,
  onClose,
  onConfirmPause,
  onUnpause,
  costPerMeal,
}) => {
  const [selectedType, setSelectedType] = useState<'wallet_credit' | 'extend_plan'>('wallet_credit');

  if (!isOpen) return null;

  const currentSelection = slotType === 'lunch' ? day.lunch : day.dinner;
  const isCurrentlyPaused = currentSelection.status === 'paused';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-100">
      <div className="relative bg-white rounded-xl max-w-lg w-full border border-stone-200 shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500">
              {day.dayOfWeek}, {day.displayDate} · {slotType.toUpperCase()}
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              {isCurrentlyPaused ? 'Resume Meal Delivery' : 'Pause Day & Protect Value'}
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
          {isCurrentlyPaused ? (
            <div className="space-y-4">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 space-y-1">
                <span className="font-semibold text-stone-900 block">Meal currently paused</span>
                <p>
                  Saved as {currentSelection.pauseType === 'wallet_credit' ? 'Wallet Credit' : 'Plan Extension'}.
                  You can resume it now before tonight's 8:00 PM kitchen cut-off.
                </p>
              </div>

              <button
                onClick={() => {
                  onUnpause();
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Resume This Delivery</span>
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-stone-500 leading-relaxed">
                Choose how you want your <strong className="text-stone-900">₹{costPerMeal}</strong> meal credit returned:
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedType('wallet_credit')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                    selectedType === 'wallet_credit'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="p-2 rounded bg-stone-100 text-stone-700 shrink-0 mt-0.5">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">Deposit to Flex Wallet (+₹{costPerMeal})</span>
                    <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">
                      Use anytime for extra sides, guest dabbas, or deduct from next renewal.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedType('extend_plan')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                    selectedType === 'extend_plan'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="p-2 rounded bg-stone-100 text-stone-700 shrink-0 mt-0.5">
                    <CalendarPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">Extend Plan Expiry (+1 Day)</span>
                    <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">
                      Pushes your subscription end-date forward so you never lose contracted meals.
                    </span>
                  </div>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-stone-100">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirmPause(selectedType);
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                >
                  Confirm Pause
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
