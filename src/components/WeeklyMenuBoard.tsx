import React, { useState } from 'react';
import { AddOnItem, DabbawalaPartner, DaySchedule, DietaryProfile } from '../types';
import { MealCardVisual } from './MealCardVisual';
import { SwapModal } from './SwapModal';
import { PauseSkipModal } from './PauseSkipModal';
import { AddOnSelectorModal } from './AddOnSelectorModal';
import { MealRulesModal } from './MealRulesModal';
import { SwitchDabbawalaModal } from './SwitchDabbawalaModal';
import { 
  ArrowLeftRight, 
  PauseCircle, 
  PlayCircle, 
  Plus, 
  Clock, 
  CheckCircle2,
  Sparkles,
  Utensils,
  HelpCircle,
  Sliders
} from 'lucide-react';

interface WeeklyMenuBoardProps {
  schedule: DaySchedule[];
  dietaryProfile: DietaryProfile;
  costPerMeal: number;
  walletBalance: number;
  onUpdateDaySchedule: (updatedDay: DaySchedule) => void;
  onCreditWallet: (amount: number, reason: string) => void;
  onOpenDietaryProfile: () => void;
}

export const WeeklyMenuBoard: React.FC<WeeklyMenuBoardProps> = ({
  schedule,
  dietaryProfile,
  costPerMeal,
  walletBalance,
  onUpdateDaySchedule,
  onCreditWallet,
  onOpenDietaryProfile,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [activeSlot, setActiveSlot] = useState<'lunch' | 'dinner'>('lunch');

  // Modals state
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isSwitchDabbawalaOpen, setIsSwitchDabbawalaOpen] = useState(false);

  const currentDay = schedule[selectedDayIndex] || schedule[0];
  const currentSlotSelection = activeSlot === 'lunch' ? currentDay.lunch : currentDay.dinner;
  const currentOption = currentDay.availableOptions.find(o => o.id === currentSlotSelection.selectedOptionId) 
    || currentDay.availableOptions[0];

  const isPaused = currentSlotSelection.status === 'paused';

  // Handle Switching Dabbawala Provider Across Days in 30-Day Plan
  const handleConfirmSwitchDabbawala = (partner: DabbawalaPartner, scope: 'single_day' | 'three_days' | 'all_remaining') => {
    if (scope === 'single_day') {
      const updatedDay = {
        ...currentDay,
        lunch: {
          ...currentDay.lunch,
          assignedDabbawalaId: partner.id,
          assignedDabbawalaName: partner.name,
          assignedDabbawalaCircle: partner.dabbawalaCircle,
        },
      };
      onUpdateDaySchedule(updatedDay);
    } else {
      const daysCount = scope === 'three_days' ? 3 : schedule.length;
      for (let i = 0; i < daysCount; i++) {
        const targetIndex = (selectedDayIndex + i) % schedule.length;
        const targetDay = schedule[targetIndex];
        onUpdateDaySchedule({
          ...targetDay,
          lunch: {
            ...targetDay.lunch,
            assignedDabbawalaId: partner.id,
            assignedDabbawalaName: partner.name,
            assignedDabbawalaCircle: partner.dabbawalaCircle,
          },
        });
      }
    }
  };

  // Handle Archetype Swap
  const handleSwapOption = (newOptionId: string) => {
    const updated = { ...currentDay };
    if (activeSlot === 'lunch') {
      updated.lunch = {
        ...updated.lunch,
        selectedOptionId: newOptionId,
        wasAutoSwapped: false,
      };
    } else {
      updated.dinner = {
        ...updated.dinner,
        selectedOptionId: newOptionId,
        wasAutoSwapped: false,
      };
    }
    onUpdateDaySchedule(updated);
  };

  // Handle Pause
  const handleConfirmPause = (pauseType: 'wallet_credit' | 'extend_plan') => {
    const updated = { ...currentDay };
    if (activeSlot === 'lunch') {
      updated.lunch = {
        ...updated.lunch,
        status: 'paused',
        pauseType,
      };
    } else {
      updated.dinner = {
        ...updated.dinner,
        status: 'paused',
        pauseType,
      };
    }

    if (pauseType === 'wallet_credit') {
      onCreditWallet(costPerMeal, `1-Click Pause: ${currentDay.dayOfWeek} ${activeSlot.toUpperCase()}`);
    }

    onUpdateDaySchedule(updated);
  };

  // Handle Unpause
  const handleUnpause = () => {
    const updated = { ...currentDay };
    if (activeSlot === 'lunch') {
      updated.lunch = {
        ...updated.lunch,
        status: 'scheduled',
      };
    } else {
      updated.dinner = {
        ...updated.dinner,
        status: 'scheduled',
      };
    }
    onUpdateDaySchedule(updated);
  };

  // Handle Add-ons
  const handleSaveAddOns = (addOns: { item: AddOnItem; quantity: number }[]) => {
    const updated = { ...currentDay };
    if (activeSlot === 'lunch') {
      updated.lunch = { ...updated.lunch, addOns };
    } else {
      updated.dinner = { ...updated.dinner, addOns };
    }
    onUpdateDaySchedule(updated);
  };

  return (
    <div className="space-y-6">
      {/* 7-Day Clean Date Bar with Warm Highlights */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-2 shadow-xs">
        <div className="grid grid-cols-7 gap-1.5">
          {schedule.map((day, idx) => {
            const isSelected = idx === selectedDayIndex;
            const slotData = activeSlot === 'lunch' ? day.lunch : day.dinner;
            const dayPaused = slotData.status === 'paused';
            const wasSwapped = slotData.wasAutoSwapped;

            return (
              <button
                key={day.dateStr}
                onClick={() => setSelectedDayIndex(idx)}
                className={`flex flex-col items-center justify-between py-2.5 px-1 rounded-xl transition-all text-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-white shadow-sm ring-2 ring-amber-500/30'
                    : 'text-stone-700 hover:bg-amber-50/50'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-amber-400' : 'text-stone-400'
                }`}>
                  {day.dayOfWeek.slice(0, 3)}
                </span>
                
                <span className="text-base font-extrabold tabular-nums my-0.5">
                  {day.displayDate.split(' ')[1]}
                </span>

                <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? dayPaused ? 'bg-amber-400/20 text-amber-300' : wasSwapped ? 'bg-emerald-400/20 text-emerald-300' : 'text-stone-300'
                    : dayPaused ? 'bg-amber-100 text-amber-800' : wasSwapped ? 'bg-emerald-100 text-emerald-800' : 'text-stone-400'
                }`}>
                  {dayPaused ? 'Paused' : wasSwapped ? 'Protected' : 'Active'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Day Workspace */}
      <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs">
        {/* Workspace Top Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <span>{currentDay.dayOfWeek}, {currentDay.displayDate}</span>
              <span aria-hidden="true">·</span>
              <span>Delivery Slot: {currentSlotSelection.deliverySlot}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 mt-1">
              {currentDay.isToday ? "Today's Fresh Dispatch" : `Scheduled Menu for ${currentDay.dayOfWeek}`}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRulesModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs text-amber-900 font-bold bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Meal Rules & Policy</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Cut-off: 8:00 PM Tonight</span>
            </div>

            {/* Segmented Control */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold border border-stone-200/70">
              <button
                onClick={() => setActiveSlot('lunch')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeSlot === 'lunch'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Lunch
              </button>
              <button
                onClick={() => setActiveSlot('dinner')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeSlot === 'dinner'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Dinner
              </button>
            </div>
          </div>
        </div>

        {/* Delivering Dabbawala Provider Strip with 30-Day Switch Button */}
        <div className="px-5 sm:px-6 py-3 bg-stone-50/80 border-b border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-stone-500 font-medium">Delivering Dabbawala:</span>
            <strong className="text-stone-900 font-bold">
              {currentSlotSelection.assignedDabbawalaName || 'Annapurna Dabbawala Circle #14'}
            </strong>
            <span className="hidden md:inline text-stone-400 font-normal">
              · Universal 30-Day Pass (₹0 Switch Fee)
            </span>
          </div>

          <button
            onClick={() => setIsSwitchDabbawalaOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-lg border border-stone-200 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto text-[11px]"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-amber-600" />
            <span>Switch Dabbawala for this Day</span>
          </button>
        </div>

        {/* Auto-Swap Banner Notice if active on this day */}
        {currentSlotSelection.wasAutoSwapped && (
          <div className="px-6 py-3.5 bg-emerald-50 border-b border-emerald-200/80 text-xs text-emerald-950 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-900">Taste Blacklist Guard: </span>
                <span className="text-emerald-800">{currentSlotSelection.autoSwapReason}</span>
              </div>
            </div>

            <button
              onClick={onOpenDietaryProfile}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline whitespace-nowrap shrink-0"
            >
              Adjust Blacklist
            </button>
          </div>
        )}

        {/* Paused State Banner if day is paused */}
        {isPaused && (
          <div className="px-6 py-3.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-amber-900">Meal Delivery Paused. </span>
              <span className="text-amber-800">
                Safeguarded as {currentSlotSelection.pauseType === 'wallet_credit' ? `₹${costPerMeal} Flex Wallet credit` : 'a 1-day subscription extension'}.
              </span>
            </div>

            <button
              onClick={handleUnpause}
              className="text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 px-3 py-1 rounded-lg transition-colors shadow-2xs self-start sm:self-auto"
            >
              Resume Delivery
            </button>
          </div>
        )}

        {/* Selected Meal Detailed Showcase */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Selected Meal Visual Platter */}
            <div className="lg:col-span-7">
              <MealCardVisual
                option={currentOption}
                isSelected={true}
                showActions={false}
              />
            </div>

            {/* Right 5 Columns: Customization & Actions Control Deck */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Subscription Parity
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
                      ₹{costPerMeal}
                    </span>
                    <span className="text-xs font-medium text-stone-500">
                      / meal in plan · <strong>₹0 swap charge</strong>
                    </span>
                  </div>
                </div>

                {/* Add-ons summary box */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-amber-600" />
                      <span>Customized Extras:</span>
                    </span>
                    <button
                      onClick={() => setIsAddOnModalOpen(true)}
                      className="text-amber-700 hover:text-amber-900 font-bold"
                    >
                      {currentSlotSelection.addOns.length > 0 ? 'Edit Extras' : '+ Add Extras'}
                    </button>
                  </div>

                  {currentSlotSelection.addOns.length > 0 ? (
                    <ul className="space-y-1.5 text-stone-700">
                      {currentSlotSelection.addOns.map((add, i) => (
                        <li key={i} className="flex items-center justify-between font-medium">
                          <span>{add.quantity}x {add.item.name}</span>
                          <span className="font-bold tabular-nums text-stone-900">
                            +₹{add.item.price * add.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-stone-400">
                      No add-ons selected (Chaas, extra phulkas, sprouts, desi ghee available).
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Free archetype switching up to 8:00 PM tonight.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>100% whole grain phulkas, cold-pressed oils, zero additives.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Insulated food grade container with tamper-proof seal.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsSwapModalOpen(true)}
                    className="w-full py-3 px-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <ArrowLeftRight className="w-4 h-4 text-amber-400" />
                    <span>Swap Archetype (4 Options)</span>
                  </button>

                  <button
                    onClick={() => setIsRulesModalOpen(true)}
                    className="w-full py-3 px-3.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Sliders className="w-4 h-4 text-amber-700" />
                    <span>Customize Rules & Policy</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setIsAddOnModalOpen(true)}
                    className="py-2.5 px-3 bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-700" />
                    <span>Add Extras</span>
                  </button>

                  <button
                    onClick={() => setIsPauseModalOpen(true)}
                    className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isPaused ? (
                      <>
                        <PlayCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Resume Meal</span>
                      </>
                    ) : (
                      <>
                        <PauseCircle className="w-3.5 h-3.5 text-stone-600" />
                        <span>Skip / Pause</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Direct Alternative Archetypes Preview */}
        <div className="p-6 bg-stone-50/60 border-t border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Other Daily Archetypes Available Tomorrow
              </h3>
              <p className="text-xs text-stone-500">
                Click any option to immediately switch your delivery for this day.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              ₹0 extra fee
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentDay.availableOptions
              .filter(o => o.id !== currentOption.id)
              .map(alt => (
                <div
                  key={alt.id}
                  className="bg-white p-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-800 uppercase tracking-wide text-[10px]">
                        {alt.archetype.replace('_', ' ')}
                      </span>
                      <span className="tabular-nums font-semibold text-stone-700">
                        {alt.calories} kcal · {alt.protein}g P
                      </span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">{alt.name}</h4>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{alt.description}</p>
                  </div>

                  <button
                    onClick={() => handleSwapOption(alt.id)}
                    className="w-full py-2 px-3 text-xs font-bold text-stone-900 bg-amber-50 hover:bg-amber-400 border border-amber-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Switch to this archetype</span>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SwapModal
        day={currentDay}
        dietaryProfile={dietaryProfile}
        slotType={activeSlot}
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        onConfirmSwap={handleSwapOption}
      />

      <PauseSkipModal
        day={currentDay}
        slotType={activeSlot}
        isOpen={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
        onConfirmPause={handleConfirmPause}
        onUnpause={handleUnpause}
        costPerMeal={costPerMeal}
      />

      <AddOnSelectorModal
        day={currentDay}
        slotType={activeSlot}
        isOpen={isAddOnModalOpen}
        onClose={() => setIsAddOnModalOpen(false)}
        onSaveAddOns={handleSaveAddOns}
        walletBalance={walletBalance}
      />

      <MealRulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        onOpenSwap={() => {
          setIsRulesModalOpen(false);
          setIsSwapModalOpen(true);
        }}
      />

      <SwitchDabbawalaModal
        day={currentDay}
        isOpen={isSwitchDabbawalaOpen}
        onClose={() => setIsSwitchDabbawalaOpen(false)}
        onConfirmSwitch={handleConfirmSwitchDabbawala}
      />
    </div>
  );
};
