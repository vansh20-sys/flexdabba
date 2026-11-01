import React from 'react';
import { X, Clock, ShieldCheck, Wallet, ArrowRightLeft, Users, Check } from 'lucide-react';

interface MealRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSwap: () => void;
}

export const MealRulesModal: React.FC<MealRulesModalProps> = ({
  isOpen,
  onClose,
  onOpenSwap,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-100">
      <div className="relative bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              FlexDabba Subscription Guidelines
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              How Meal Customization & Swaps Work
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules Breakdown */}
        <div className="p-6 space-y-4 text-xs">
          <p className="text-stone-600 leading-relaxed">
            Our daily tiffin service keeps costs at an affordable subscription rate (₹115/meal) while giving you 100% control over what you eat:
          </p>

          <div className="space-y-3">
            {/* Rule 1 */}
            <div className="p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/40 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 text-xs block">
                  1. Zero-Fee Swaps Across 4 Daily Archetypes
                </span>
                <p className="text-stone-600 leading-normal mt-0.5">
                  Every day, choose between <strong>Classic Homestyle</strong>, <strong>Fit & High-Protein (30g+ protein)</strong>, <strong>Regional Specialties</strong>, or <strong>Khichdi Rescue</strong> with ₹0 extra charges.
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/40 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 text-xs block">
                  2. Daily 8:00 PM Cut-Off Window
                </span>
                <p className="text-stone-600 leading-normal mt-0.5">
                  Swaps and pauses lock at <strong>8:00 PM previous night</strong>. This allows cloud kitchens to purchase exact wholesale vegetables at 5:00 AM, guaranteeing zero food waste and hot fresh cooking.
                </p>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/40 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 text-xs block">
                  3. Automated Taste & Dislike Blacklist Guard
                </span>
                <p className="text-stone-600 leading-normal mt-0.5">
                  If you hate Karela, Tindora, or Baingan, mark them once in your Taste Guard. Our engine automatically pre-swaps your meal when those ingredients appear on the chef's weekly schedule.
                </p>
              </div>
            </div>

            {/* Rule 4 */}
            <div className="p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/40 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-800 shrink-0 mt-0.5">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 text-xs block">
                  4. Zero-Waste Pause & Wallet Credits
                </span>
                <p className="text-stone-600 leading-normal mt-0.5">
                  Traveling or going for a team lunch? 1-click pause returns ₹115 directly to your Flex Wallet or pushes your subscription end-date forward by 1 day.
                </p>
              </div>
            </div>

            {/* Rule 5 */}
            <div className="p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/40 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-800 shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-stone-900 text-xs block">
                  5. Morning Emergency? Transfer to a Colleague
                </span>
                <p className="text-stone-600 leading-normal mt-0.5">
                  If an unscheduled meeting is called after 8:00 PM, generate an instant pickup QR to pass today’s warm lunch to any colleague in your tech park tower.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 text-stone-600 hover:bg-stone-200 rounded-xl font-medium transition-colors"
          >
            Got It
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenSwap();
            }}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Browse Today's Archetype Swaps</span>
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
