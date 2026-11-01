import React from 'react';
import { DaySchedule, DietaryProfile, MealOption } from '../types';
import { MealCardVisual } from './MealCardVisual';
import { X } from 'lucide-react';

interface SwapModalProps {
  day: DaySchedule;
  dietaryProfile: DietaryProfile;
  slotType: 'lunch' | 'dinner';
  isOpen: boolean;
  onClose: () => void;
  onConfirmSwap: (newOptionId: string) => void;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  day,
  dietaryProfile,
  slotType,
  isOpen,
  onClose,
  onConfirmSwap,
}) => {
  if (!isOpen) return null;

  const currentSelection = slotType === 'lunch' ? day.lunch : day.dinner;
  const currentOption = day.availableOptions.find(o => o.id === currentSelection.selectedOptionId);

  const checkBlacklistWarning = (option: MealOption): string | undefined => {
    const matchedBlacklist = dietaryProfile.blacklistedIngredients.filter(b =>
      option.ingredients.some(ing => ing.toLowerCase().includes(b.split(' ')[0].toLowerCase()))
    );

    const matchedAllergens = dietaryProfile.blacklistedAllergens.filter(a =>
      option.allergens.some(all => all.toLowerCase().includes(a.toLowerCase()))
    );

    const warnings = [...matchedBlacklist, ...matchedAllergens];
    if (warnings.length > 0) {
      return `Contains: ${warnings.join(', ')}`;
    }
    return undefined;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-100">
      <div className="relative bg-white rounded-xl max-w-5xl w-full border border-stone-200 shadow-xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div>
            <div className="text-xs text-stone-500">
              <span>{day.dayOfWeek}, {day.displayDate}</span>
              <span aria-hidden="true"> · </span>
              <span className="capitalize">{slotType}</span>
              <span aria-hidden="true"> · </span>
              <span>₹0 Swap Fee</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              Select Meal Archetype
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Archetypes Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-stone-50/40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {day.availableOptions.map((opt) => {
              const isSelected = opt.id === currentSelection.selectedOptionId;
              const warning = checkBlacklistWarning(opt);

              return (
                <MealCardVisual
                  key={opt.id}
                  option={opt}
                  isSelected={isSelected}
                  blacklistedWarning={warning}
                  onSelect={() => {
                    onConfirmSwap(opt.id);
                    onClose();
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <div>
            <span>Active choice: </span>
            <span className="font-semibold text-stone-900">{currentOption?.name}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 font-medium text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
