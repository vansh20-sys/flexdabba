import React, { useState } from 'react';
import { DietaryProfile, DaySchedule } from '../types';
import { COMMON_BLACKLIST_OPTIONS } from '../data/mockData';
import { Check, RefreshCw, ShieldAlert, Sparkles, X, Heart, Sliders } from 'lucide-react';

interface DietaryProfileViewProps {
  profile: DietaryProfile;
  schedule: DaySchedule[];
  onSaveProfile: (updatedProfile: DietaryProfile) => void;
  onRunSimulation: (profile: DietaryProfile) => void;
}

export const DietaryProfileView: React.FC<DietaryProfileViewProps> = ({
  profile,
  schedule,
  onSaveProfile,
  onRunSimulation,
}) => {
  const [localProfile, setLocalProfile] = useState<DietaryProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string[] | null>(null);

  const toggleBlacklist = (itemLabel: string) => {
    setLocalProfile(prev => {
      const exists = prev.blacklistedIngredients.includes(itemLabel);
      const updated = exists
        ? prev.blacklistedIngredients.filter(i => i !== itemLabel)
        : [...prev.blacklistedIngredients, itemLabel];
      return { ...prev, blacklistedIngredients: updated };
    });
  };

  const handleSave = () => {
    onSaveProfile(localProfile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSimulate = () => {
    const swapsDetected: string[] = [];
    
    schedule.forEach(day => {
      const classicOpt = day.availableOptions.find(o => o.archetype === 'classic');
      if (classicOpt) {
        const matches = localProfile.blacklistedIngredients.filter(b => 
          classicOpt.ingredients.some(ing => ing.toLowerCase().includes(b.split(' ')[0].toLowerCase()))
        );
        if (matches.length > 0) {
          swapsDetected.push(
            `${day.dayOfWeek}: Chef Classic has "${matches.join(', ')}" ➔ Protected: Auto-swapped to Fit & Protein Fuel.`
          );
        }
      }
    });

    if (swapsDetected.length === 0) {
      swapsDetected.push('Great news! No blacklisted items found in this week’s current chef schedule.');
    }

    setSimulationResult(swapsDetected);
    onRunSimulation(localProfile);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Automated Taste & Allergy Protection</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              Dietary Profile & Blacklist Guard
            </h2>
            <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
              Never get stuck with Karela, Tindora, or Baingan. Select ingredients you dislike, and our dispatcher automatically substitutes matching meals with your approved alternative archetype at ₹0 fee.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSimulate}
              className="px-3.5 py-2 text-xs font-semibold text-stone-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
              <span>Simulate Weekly Auto-Swap</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Preferences saved successfully! Your upcoming menu has been updated.</span>
          </div>
        )}

        {/* Live Simulation Drawer */}
        {simulationResult && (
          <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Weekly Auto-Swap Scan Result:</span>
            </div>
            <ul className="space-y-1 pl-4 list-disc text-stone-700 font-medium">
              {simulationResult.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Dislike Blacklist Selector */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <span>Disliked Vegetables & Ingredients</span>
            </h3>
            <p className="text-xs text-stone-500">
              Click any item to toggle it in your exclusion blacklist. We'll automatically swap dishes containing these items.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2.5">
                Commonly Disliked Indian Vegetables
              </span>
              <div className="flex flex-wrap gap-2">
                {COMMON_BLACKLIST_OPTIONS.filter(o => o.category === 'vegetable').map(item => {
                  const isBlacklisted = localProfile.blacklistedIngredients.includes(item.label);

                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleBlacklist(item.label)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border shadow-2xs ${
                        isBlacklisted
                          ? 'bg-red-50 text-red-700 border-red-300 ring-1 ring-red-400/30'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-400'
                      }`}
                    >
                      {isBlacklisted ? (
                        <X className="w-3.5 h-3.5 text-red-600 stroke-[3]" />
                      ) : (
                        <span className="text-stone-400 text-xs">+</span>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2.5">
                Allergens & Sensitivity Triggers
              </span>
              <div className="flex flex-wrap gap-2">
                {COMMON_BLACKLIST_OPTIONS.filter(o => o.category === 'allergen' || o.category === 'fungi').map(item => {
                  const isBlacklisted = localProfile.blacklistedIngredients.includes(item.label);

                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleBlacklist(item.label)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border shadow-2xs ${
                        isBlacklisted
                          ? 'bg-red-50 text-red-700 border-red-300 ring-1 ring-red-400/30'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-400'
                      }`}
                    >
                      {isBlacklisted ? (
                        <X className="w-3.5 h-3.5 text-red-600 stroke-[3]" />
                      ) : (
                        <span className="text-stone-400 text-xs">+</span>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Blacklist Summary */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <span className="font-bold text-stone-800 block mb-1.5">
              Active Blacklist ({localProfile.blacklistedIngredients.length} items flagged):
            </span>
            {localProfile.blacklistedIngredients.length > 0 ? (
              <div className="text-stone-700 flex flex-wrap gap-1.5 pt-1 font-medium">
                {localProfile.blacklistedIngredients.map((item, idx) => (
                  <span key={idx} className="bg-white border border-stone-200 px-2.5 py-1 rounded-lg text-stone-900 shadow-2xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-stone-400 italic">No exclusions active yet.</span>
            )}
          </div>
        </div>

        {/* Right 5 Columns: Lifestyle, Spice & Auto-Swap Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Dietary Lifestyle */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-600" />
              <span>Dietary Lifestyle</span>
            </h3>

            <div className="space-y-2">
              {[
                { id: 'pure_veg', label: 'Pure Vegetarian', desc: 'Prepared in dedicated vegetarian kitchens' },
                { id: 'high_protein', label: 'High Protein / Active Lifestyle', desc: 'Prioritizes paneer, tofu, soya, sprouts (28g+ protein)' },
                { id: 'vegan', label: '100% Plant-Based (Vegan)', desc: 'Zero dairy, ghee, butter, or curd' },
                { id: 'jain', label: 'Jain Friendly', desc: 'No root vegetables, onions, or garlic' },
                { id: 'diabetic_friendly', label: 'Diabetic & Low GI', desc: 'Whole millets (bajra, jowar), brown rice' },
              ].map(diet => (
                <label
                  key={diet.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    localProfile.dietType === diet.id
                      ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="dietType"
                    checked={localProfile.dietType === diet.id}
                    onChange={() => setLocalProfile({ ...localProfile, dietType: diet.id as any })}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">{diet.label}</span>
                    <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">{diet.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Spice Level */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Spice Sensitivity</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mild', label: 'Mild', icon: '🌱', desc: 'Zero burn' },
                { id: 'medium', label: 'Medium', icon: '🌶️', desc: 'Balanced' },
                { id: 'desi_spicy', label: 'Spicy', icon: '🔥', desc: 'Desi kick' },
              ].map(spice => (
                <button
                  key={spice.id}
                  type="button"
                  onClick={() => setLocalProfile({ ...localProfile, spiceLevel: spice.id as any })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    localProfile.spiceLevel === spice.id
                      ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-500 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50'
                  }`}
                >
                  <span className="text-base block mb-0.5">{spice.icon}</span>
                  <span className="text-xs font-bold block">{spice.label}</span>
                  <span className="text-[10px] block opacity-80 mt-0.5">{spice.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
