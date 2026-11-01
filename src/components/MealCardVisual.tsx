import React from 'react';
import { MealOption } from '../types';
import { AlertCircle, Check, Flame, Dumbbell, Compass, HeartPulse, Sparkles } from 'lucide-react';

interface MealCardVisualProps {
  option: MealOption;
  isSelected?: boolean;
  onSelect?: () => void;
  blacklistedWarning?: string;
  showActions?: boolean;
}

export const MealCardVisual: React.FC<MealCardVisualProps> = ({
  option,
  isSelected,
  onSelect,
  blacklistedWarning,
  showActions = true,
}) => {
  const getTheme = () => {
    switch (option.archetype) {
      case 'classic':
        return {
          label: 'Classic Homestyle',
          icon: <Flame className="w-3.5 h-3.5 text-amber-700" />,
          accentBg: 'bg-amber-500',
          lightBg: 'bg-amber-50/70',
          badgeText: 'text-amber-800',
          badgeBorder: 'border-amber-200',
          headerBg: 'bg-gradient-to-br from-amber-50 via-orange-50/50 to-stone-50',
          katoriColors: ['#d97706', '#f59e0b', '#d4a373', '#eab308'],
          ringColor: 'ring-amber-500',
        };
      case 'fit_protein':
        return {
          label: 'Fit & High-Protein',
          icon: <Dumbbell className="w-3.5 h-3.5 text-emerald-700" />,
          accentBg: 'bg-emerald-600',
          lightBg: 'bg-emerald-50/70',
          badgeText: 'text-emerald-800',
          badgeBorder: 'border-emerald-200',
          headerBg: 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-stone-50',
          katoriColors: ['#059669', '#10b981', '#34d399', '#6ee7b7'],
          ringColor: 'ring-emerald-600',
        };
      case 'regional':
        return {
          label: 'Regional Specialty',
          icon: <Compass className="w-3.5 h-3.5 text-orange-700" />,
          accentBg: 'bg-orange-600',
          lightBg: 'bg-orange-50/70',
          badgeText: 'text-orange-800',
          badgeBorder: 'border-orange-200',
          headerBg: 'bg-gradient-to-br from-orange-50 via-amber-50/50 to-stone-50',
          katoriColors: ['#ea580c', '#f97316', '#fb923c', '#fdba74'],
          ringColor: 'ring-orange-600',
        };
      case 'khichdi_rescue':
        return {
          label: 'Khichdi Rescue',
          icon: <HeartPulse className="w-3.5 h-3.5 text-sky-700" />,
          accentBg: 'bg-sky-600',
          lightBg: 'bg-sky-50/70',
          badgeText: 'text-sky-800',
          badgeBorder: 'border-sky-200',
          headerBg: 'bg-gradient-to-br from-sky-50 via-blue-50/50 to-stone-50',
          katoriColors: ['#0284c7', '#38bdf8', '#7dd3fc', '#bae6fd'],
          ringColor: 'ring-sky-600',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      className={`rounded-2xl border bg-white transition-all duration-200 overflow-hidden flex flex-col hover:shadow-lg ${
        isSelected
          ? 'border-stone-900 ring-2 ring-stone-900/10 shadow-md'
          : 'border-stone-200/90 hover:border-stone-300'
      } ${blacklistedWarning ? 'border-red-200 bg-red-50/10' : ''}`}
    >
      {/* Visual Platter Showcase Header */}
      <div className={`p-5 border-b border-stone-100 ${theme.headerBg} relative overflow-hidden`}>
        {/* Background culinary geometry */}
        <div className="flex items-center justify-between text-xs mb-3">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${theme.lightBg} ${theme.badgeText} border ${theme.badgeBorder}`}>
            {theme.icon}
            <span>{theme.label}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/90 text-stone-800 shadow-xs tabular-nums border border-stone-200">
              {option.protein}g protein
            </span>
            {isSelected && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-stone-900 bg-amber-400 px-2 py-0.5 rounded-full shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Selected</span>
              </span>
            )}
          </div>
        </div>

        {/* Stylized Artisanal Tiffin Thali Illustration */}
        <div className="my-2 p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            {/* Katori 1: Main Sabzi */}
            <div className="flex-1 text-center">
              <div className="w-11 h-11 mx-auto rounded-full bg-amber-100 border-2 border-amber-300/80 flex items-center justify-center shadow-inner relative group">
                <span className="text-base select-none">🥘</span>
              </div>
              <span className="text-[10px] font-semibold text-stone-700 block mt-1 truncate">
                {option.dishes[0]?.split(' ')[0] || 'Subzi'}
              </span>
            </div>

            {/* Katori 2: Dal */}
            <div className="flex-1 text-center">
              <div className="w-11 h-11 mx-auto rounded-full bg-yellow-100 border-2 border-yellow-300/80 flex items-center justify-center shadow-inner">
                <span className="text-base select-none">🍲</span>
              </div>
              <span className="text-[10px] font-semibold text-stone-700 block mt-1 truncate">
                {option.dishes[1]?.split(' ')[0] || 'Dal'}
              </span>
            </div>

            {/* Katori 3: Roti */}
            <div className="flex-1 text-center">
              <div className="w-11 h-11 mx-auto rounded-full bg-orange-100 border-2 border-orange-300/80 flex items-center justify-center shadow-inner">
                <span className="text-base select-none">🫓</span>
              </div>
              <span className="text-[10px] font-semibold text-stone-700 block mt-1 truncate">
                Phulkas
              </span>
            </div>

            {/* Katori 4: Rice/Salad */}
            <div className="flex-1 text-center">
              <div className="w-11 h-11 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-300/80 flex items-center justify-center shadow-inner">
                <span className="text-base select-none">🍚</span>
              </div>
              <span className="text-[10px] font-semibold text-stone-700 block mt-1 truncate">
                Basmati & Salad
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-stone-900 tracking-tight mt-3">
          {option.name}
        </h3>
        <p className="text-xs text-stone-600 mt-0.5 line-clamp-2 leading-relaxed">
          {option.tagline}
        </p>
      </div>

      {/* Body: Items & Ingredients */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {blacklistedWarning && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Blacklist Warning</span>
              <span className="text-red-700">{blacklistedWarning}</span>
            </div>
          </div>
        )}

        {/* Tiffin Compartments List */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
            Today's Fresh Prep (4 Tiers)
          </span>
          <ul className="space-y-1.5 text-xs text-stone-700">
            {option.dishes.map((dish, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span className="font-medium text-stone-800">{dish}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Macro Pill Ribbon */}
        <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
          <div className="flex items-center justify-between text-stone-600 tabular-nums font-medium bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
            <span><strong className="text-stone-900 font-bold">{option.calories}</strong> kcal</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span><strong className="text-emerald-700 font-bold">{option.protein}g</strong> protein</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span><strong className="text-stone-900">{option.carbs}g</strong> carbs</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span><strong className="text-stone-900">{option.fiber}g</strong> fiber</span>
          </div>

          <div className="text-[11px] text-stone-400 flex items-center gap-1.5 flex-wrap px-1">
            <span>Allergens:</span>
            <span className="text-stone-600 font-medium">
              {option.allergens.length > 0 ? option.allergens.join(', ') : 'None listed'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        {showActions && onSelect && (
          <button
            onClick={onSelect}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs ${
              isSelected
                ? 'bg-stone-100 text-stone-500 cursor-default'
                : 'bg-stone-900 hover:bg-stone-800 text-white hover:shadow-md'
            }`}
          >
            {isSelected ? 'Delivering this option' : 'Swap to this archetype (₹0 fee)'}
          </button>
        )}
      </div>
    </div>
  );
};
