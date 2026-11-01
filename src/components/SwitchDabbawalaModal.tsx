import React, { useState } from 'react';
import { DabbawalaPartner, DaySchedule } from '../types';
import { MOCK_DABBAWALA_PARTNERS } from '../data/mockData';
import { 
  X, 
  ArrowLeftRight, 
  Check, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  CalendarDays 
} from 'lucide-react';

interface SwitchDabbawalaModalProps {
  day: DaySchedule;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSwitch: (partner: DabbawalaPartner, scope: 'single_day' | 'three_days' | 'all_remaining') => void;
}

export const SwitchDabbawalaModal: React.FC<SwitchDabbawalaModalProps> = ({
  day,
  isOpen,
  onClose,
  onConfirmSwitch,
}) => {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(
    day.lunch.assignedDabbawalaId || MOCK_DABBAWALA_PARTNERS[0].id
  );
  const [switchScope, setSwitchScope] = useState<'single_day' | 'three_days' | 'all_remaining'>('single_day');
  const [successToast, setSuccessToast] = useState('');

  if (!isOpen) return null;

  const currentAssignedName = day.lunch.assignedDabbawalaName || 'Annapurna Dabbawala Circle #14';

  const handleSelect = (partner: DabbawalaPartner) => {
    if (partner.isFull) return; // Cannot switch to a full dabbawala

    setSelectedPartnerId(partner.id);
    setSuccessToast(`Switched to ${partner.name}!`);

    setTimeout(() => {
      onConfirmSwitch(partner, switchScope);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-start justify-between bg-stone-50/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Universal 30-Day Subscription Pass
              </span>
              <span className="text-stone-400 text-xs">·</span>
              <span className="text-xs font-semibold text-stone-600">{day.dayOfWeek}, {day.displayDate}</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight text-stone-900">
              Switch Dabbawala Provider For Your Meals
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
              You are not locked into one tiffin provider! In your 30-day plan, <strong className="text-stone-900">switch to ANY verified Dabbawala for any number of days</strong> at ₹0 extra fee.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Provider & Switch Scope Picker */}
        <div className="p-6 border-b border-stone-100 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs">
            <div>
              <span className="text-stone-500 text-[11px] font-semibold block">Currently Delivering on this Day:</span>
              <strong className="text-sm font-bold text-amber-950 block">{currentAssignedName}</strong>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs self-start sm:self-auto">
              ₹0 Switch Fee
            </span>
          </div>

          {/* Scope Selector: Single day vs multi days */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
              <span>Apply Dabbawala Switch For:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSwitchScope('single_day')}
                className={`p-2.5 rounded-xl border font-bold transition-all text-left cursor-pointer ${
                  switchScope === 'single_day'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="block font-bold">Just this Day</span>
                <span className="text-[10px] font-normal opacity-80">{day.dayOfWeek} only</span>
              </button>

              <button
                type="button"
                onClick={() => setSwitchScope('three_days')}
                className={`p-2.5 rounded-xl border font-bold transition-all text-left cursor-pointer ${
                  switchScope === 'three_days'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="block font-bold">Next 3 Workdays</span>
                <span className="text-[10px] font-normal opacity-80">3-Day Trial Cycle</span>
              </button>

              <button
                type="button"
                onClick={() => setSwitchScope('all_remaining')}
                className={`p-2.5 rounded-xl border font-bold transition-all text-left cursor-pointer ${
                  switchScope === 'all_remaining'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="block font-bold">All Remaining Days</span>
                <span className="text-[10px] font-normal opacity-80">Until 30-day renewal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Alert if selected */}
        {successToast && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Dabbawala Providers List */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-3">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
            Select an Available Dabbawala in Your Cluster:
          </span>

          {MOCK_DABBAWALA_PARTNERS.map((partner) => {
            const isCurrent = partner.id === day.lunch.assignedDabbawalaId;

            return (
              <div
                key={partner.id}
                className={`p-4 rounded-2xl border transition-all ${
                  partner.isFull
                    ? 'bg-stone-50/60 border-stone-200 opacity-75'
                    : isCurrent
                    ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                        {partner.city}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-stone-800">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{partner.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium">
                        FSSAI: {partner.fssaiNumber}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900">{partner.name}</h4>
                    <p className="text-xs text-stone-600">{partner.cuisineTag}</p>

                    <div className="flex flex-wrap gap-1 pt-1 text-[10px] text-stone-500">
                      <span className="font-semibold text-stone-700">Specialties:</span>
                      {partner.menuSpecialties.slice(0, 3).join(', ')}
                    </div>
                  </div>

                  {/* Slot Status & Switch Action */}
                  <div className="shrink-0 flex flex-col items-start sm:items-end gap-2">
                    {partner.isFull ? (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                          <Lock className="w-3 h-3 text-rose-600" />
                          <span>Full This Month</span>
                        </span>
                        <span className="text-[10px] text-stone-400 block mt-0.5">
                          Capacity reached (No orders)
                        </span>
                      </div>
                    ) : isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-200">
                        <Check className="w-3.5 h-3.5 text-amber-700" />
                        <span>Active for this Day</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSelect(partner)}
                        className="py-2 px-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
                        <span>Switch to this Dabbawala</span>
                      </button>
                    )}

                    {!partner.isFull && (
                      <span className="text-[10px] font-semibold text-emerald-700 tabular-nums">
                        {partner.slotsRemaining} slots remaining
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 text-center text-[11px] text-stone-500">
          Switching your Dabbawala updates daily dispatch routes automatically without interrupting your billing or wallet balance.
        </div>
      </div>
    </div>
  );
};
