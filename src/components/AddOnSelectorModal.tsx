import React, { useState } from 'react';
import { AddOnItem, DaySchedule } from '../types';
import { ADD_ON_CATALOG } from '../data/mockData';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';

interface AddOnSelectorModalProps {
  day: DaySchedule;
  slotType: 'lunch' | 'dinner';
  isOpen: boolean;
  onClose: () => void;
  onSaveAddOns: (addOns: { item: AddOnItem; quantity: number }[]) => void;
  walletBalance: number;
}

export const AddOnSelectorModal: React.FC<AddOnSelectorModalProps> = ({
  day,
  slotType,
  isOpen,
  onClose,
  onSaveAddOns,
  walletBalance,
}) => {
  const currentSelection = slotType === 'lunch' ? day.lunch : day.dinner;
  
  // Local state map of quantity
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    currentSelection.addOns.forEach(a => {
      map[a.item.id] = a.quantity;
    });
    return map;
  });

  if (!isOpen) return null;

  const updateQuantity = (itemId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  const totalCost = Object.entries(quantities).reduce((sum, [itemId, qty]) => {
    const item = ADD_ON_CATALOG.find(i => i.id === itemId);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleSave = () => {
    const result = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, qty]) => {
        const item = ADD_ON_CATALOG.find(i => i.id === itemId)!;
        return { item, quantity: qty };
      });
    onSaveAddOns(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              {day.dayOfWeek}, {day.displayDate} · Add-Ons
            </span>
            <h3 className="text-lg font-bold text-stone-900">
              Customize Your Tiffin Extras
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of items */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {ADD_ON_CATALOG.map((item) => {
            const count = quantities[item.id] || 0;

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                  count > 0 ? 'border-amber-500 bg-amber-50/20' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-stone-900">{item.name}</span>
                    <span className="text-xs text-stone-400 font-mono">({item.unit})</span>
                  </div>
                  <p className="text-xs text-stone-500 leading-normal">{item.description}</p>
                  <p className="text-xs font-bold text-stone-900 tabular-nums pt-1">
                    ₹{item.price}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 bg-stone-100 p-1 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={count === 0}
                    className="p-1.5 rounded-md text-stone-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-stone-900 tabular-nums">
                    {count}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 rounded-md text-stone-900 hover:bg-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Total Extras:</span>
              <span className="font-bold text-base text-stone-900 tabular-nums">₹{totalCost}</span>
            </div>
            {walletBalance >= totalCost && totalCost > 0 ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Covered 100% by your ₹{walletBalance} Wallet Balance
              </span>
            ) : totalCost > 0 ? (
              <span className="text-stone-500">Will be billed on weekly settlement</span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-stone-600 hover:bg-stone-200 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply to Meal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
