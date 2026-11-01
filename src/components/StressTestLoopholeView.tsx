import React, { useState } from 'react';
import { 
  AlertCircle, 
  Check, 
  Share2, 
  RefreshCw,
  ShieldAlert,
  Zap,
  TrendingDown,
  Users,
  QrCode
} from 'lucide-react';

interface LoopholeItem {
  id: string;
  category: string;
  title: string;
  severity: 'Critical' | 'High' | 'Moderate';
  realLifeSymptom: string;
  whyTraditionalServicesFail: string;
  theLoopholeBreakdown: string;
  operationalFix: string;
  systemSafeguardMetric: string;
}

const LOOPHOLES: LoopholeItem[] = [
  {
    id: 'morning_chaos',
    category: 'Customer Scheduling',
    title: 'The 8:00 PM Cut-off vs. 10:00 AM Morning Reality',
    severity: 'Critical',
    realLifeSymptom: 'Professionals do not know their schedule at 8 PM. A client lunch is called at 10:30 AM or employee wakes up sick.',
    whyTraditionalServicesFail: 'Rigid cut-offs deliver unwanted food to an empty desk. The customer pays ₹115, feels cheated, and cancels the entire subscription.',
    theLoopholeBreakdown: 'If you enforce 8 PM strictly, you alienate busy professionals. If you allow 11 AM cancellations, the cloud kitchen has already bought wholesale groceries and absorbs a complete loss.',
    operationalFix: 'Two-tier emergency response: (1) "Colleague Transfer QR" — 1-click transfer your lunch to any coworker in your building before 11:30 AM with zero loss. (2) "10 AM Half-Credit" — cancel before 10 AM to get 50% wallet credit (covers raw prep costs while refunding delivery).',
    systemSafeguardMetric: 'Eliminates 90%+ of morning cancellation disputes with zero kitchen write-offs.',
  },
  {
    id: 'paneer_stampede',
    category: 'Kitchen Unit Economics',
    title: 'The "Paneer Stampede" (Demand Skew & Margin Collapse)',
    severity: 'Critical',
    realLifeSymptom: 'On Thursday, 82% of subscribers pick Shahi Paneer, while only 10% pick Bhindi and 8% pick Khichdi.',
    whyTraditionalServicesFail: 'Traditional tiffins prevent this by forcing everyone to eat the cheapest subzi. Freeform customization causes raw material costs to fluctuate wildly from ₹32 to ₹68 per meal.',
    theLoopholeBreakdown: 'Cloud kitchens budget ₹38–₹42 in raw food cost. If 85% pick the expensive archetype, gross profit turns negative. Furthermore, kitchens lack the burner capacity to cook 250 portions of a single specialized curry.',
    operationalFix: 'Dynamic Archetype Quota Caps & Cost Parity Indexing. High-cost archetypes are capped at 45% of total cluster capacity (first-come, first-served). Archetypes are cross-balanced: Option A Paneer, Option B Tofu/Edamame, Option C Chana/Kadhi to keep ingredient variance under ₹6.',
    systemSafeguardMetric: 'Maintains 40% gross margin regardless of individual daily preference swings.',
  },
  {
    id: 'reception_graveyard',
    category: 'Last-Mile Logistics',
    title: 'Tech Park Security & Reception Sorting Failure',
    severity: 'High',
    realLifeSymptom: 'Tech parks prohibit delivery riders from going up to individual desks. 40 tiffins are dumped on a table at Ground Floor Security.',
    whyTraditionalServicesFail: 'Couriers dump bags and leave. Employees spend 15 minutes of their lunch break searching through identical bags. Customized meals get swapped by mistake.',
    theLoopholeBreakdown: 'If Box A looks like Box B, Priya accidentally grabs Aditya’s Fit Protein lunch, and Aditya is left with Priya’s Jain meal.',
    operationalFix: 'Tower-Runner Hubs & Large-Type Box Tags. One dedicated Tower Host with security clearance delivers directly to floor pantries. Large bold tags and QR verification ensure accurate handoff in under 30 seconds.',
    systemSafeguardMetric: 'Reduces meal pickup time to 45 seconds; eliminates incorrect meal handoffs.',
  },
  {
    id: 'steel_loss_trap',
    category: 'Asset Economics',
    title: 'Reusable Stainless Steel Loss & Washing Costs',
    severity: 'High',
    realLifeSymptom: 'Subscribers leave steel tiffins under desks for weeks or take them home. Monthly box loss rate reaches 20%.',
    whyTraditionalServicesFail: 'At ₹280 per box, replacing 20% lost inventory monthly wipes out subscription profit. Industrial washing of greasy steel containers also incurs heavy utility and labor costs.',
    theLoopholeBreakdown: 'Subscribers want zero plastic, but operational realities make manual container recovery expensive and prone to hygiene issues.',
    operationalFix: 'Hybrid Container Model: Default to certified 100% home-compostable sugarcane bagasse (zero return logistics). For members requesting stainless steel: require a ₹399 refundable deposit with RFID tracking; next lunch unlocks only when the prior container is returned.',
    systemSafeguardMetric: 'Zero container write-offs; zero sanitization liabilities.',
  },
  {
    id: 'same_base_fatigue',
    category: 'Culinary Monotony',
    title: 'The "Same Base Gravy" Monotony (The 60-Day Churn Cliff)',
    severity: 'Moderate',
    realLifeSymptom: 'By Week 6, the subscriber notices that all dishes share the exact same onion-tomato masala base paste.',
    whyTraditionalServicesFail: 'Cloud kitchens operate on master prep gravies made in large vats. Customers suffer taste fatigue and cancel subscriptions after 2 months.',
    theLoopholeBreakdown: 'Customizing ingredients doesn’t cure flavor monotony if every dish uses the same oil, base gravy, and spice mix.',
    operationalFix: 'Quarterly Kitchen Hub Rotation: FlexDabba aggregates certified regional kitchens. Every 4 weeks, subscribers can 1-click rotate their source kitchen (e.g. Punjabi Homestyle ➔ Kathiyawad Kitchen ➔ Chettinad) without changing billing or wallet credits.',
    systemSafeguardMetric: 'Extends subscriber retention from 2.8 months to 8+ months.',
  },
  {
    id: 'deferred_liability',
    category: 'Cash Flow Management',
    title: 'The "Deferred Wallet Liability" Cash Flow Trap',
    severity: 'Moderate',
    realLifeSymptom: 'If 30% of subscribers pause 4 days in a month, the company carries significant deferred credit obligations on its books.',
    whyTraditionalServicesFail: 'Startups spend upfront subscription cash, only to find revenues drop during mass credit redemption at month-end renewal.',
    theLoopholeBreakdown: 'Issuing 100% wallet refunds without controlling redemption velocity strains working capital.',
    operationalFix: 'Dynamic Credit Utilization Velocity: Credits can offset up to 35% of renewal fees, or be used at 100% value on high-margin extras (chaas, desi ghee, weekend feast thalis). Credits carry a 75-day rolling validity.',
    systemSafeguardMetric: 'Maintains healthy working capital and converts 40%+ of paused credits into add-on sales.',
  },
];

export const StressTestLoopholeView: React.FC = () => {
  const [selectedLoophole, setSelectedLoophole] = useState<string>(LOOPHOLES[0].id);
  const [transferFriendName, setTransferFriendName] = useState('Rahul Verma (Desk 4B-14)');
  const [isTransferred, setIsTransferred] = useState(false);

  // Demand Skew Simulator
  const [paneerChoicePercent, setPaneerChoicePercent] = useState(75);
  const paneerIngredientCost = 64;
  const standardOtherCost = 32;
  const simulatedAverageFoodCost = Math.round((paneerChoicePercent / 100) * paneerIngredientCost + ((100 - paneerChoicePercent) / 100) * standardOtherCost);
  const targetCost = 42;
  const marginThreat = simulatedAverageFoodCost > targetCost;

  const currentItem = LOOPHOLES.find(l => l.id === selectedLoophole) || LOOPHOLES[0];

  return (
    <div className="space-y-6">
      {/* Audit Header */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Operational Rigor & Vulnerability Defense</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
            Stress-Test & Loophole Audit
          </h2>
          <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
            The 6 critical failure modes where customizable tiffin operations collapse in real life, and the specific safeguards engineered to solve them.
          </p>
        </div>

        {/* 6 Tabs */}
        <div className="mt-5 pt-5 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {LOOPHOLES.map((lh, idx) => {
            const isSelected = lh.id === selectedLoophole;
            return (
              <button
                key={lh.id}
                onClick={() => setSelectedLoophole(lh.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-stone-900 text-white shadow-xs ring-2 ring-amber-500/20'
                    : 'bg-stone-50/70 border-stone-200 hover:border-amber-400 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-stone-400'}`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                    lh.severity === 'Critical' 
                      ? isSelected ? 'bg-red-500/30 text-red-300' : 'bg-red-100 text-red-800' 
                      : isSelected ? 'bg-amber-500/30 text-amber-300' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {lh.severity}
                  </span>
                </div>
                <span className="font-bold line-clamp-2 text-[11px] leading-tight">
                  {lh.title.split('(')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Loophole Breakdown */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-stone-100 gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <span>{currentItem.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-bold text-amber-800">Severity: {currentItem.severity}</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mt-1">
              {currentItem.title}
            </h3>
          </div>

          <div className="text-xs text-stone-700 bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-200">
            <span className="font-bold text-amber-950">System Safeguard: </span>
            <span className="font-medium text-stone-800">{currentItem.systemSafeguardMetric}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border border-red-200/80 bg-red-50/30 space-y-2 text-xs">
            <span className="font-bold text-red-950 block">The Customer Symptom</span>
            <p className="text-stone-800 leading-relaxed italic font-medium">
              "{currentItem.realLifeSymptom}"
            </p>
            <div className="pt-2 border-t border-red-100 text-stone-600 space-y-1">
              <span className="font-semibold text-stone-800">Why Services Fail:</span>
              <p className="leading-relaxed">{currentItem.whyTraditionalServicesFail}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/30 space-y-2 text-xs">
            <span className="font-bold text-amber-950 block">The Structural Dilemma</span>
            <p className="text-stone-800 leading-relaxed">
              {currentItem.theLoopholeBreakdown}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30 space-y-2 text-xs">
            <span className="font-bold text-emerald-950 block">The Operational Safeguard</span>
            <p className="text-stone-800 leading-relaxed font-medium">
              {currentItem.operationalFix}
            </p>
          </div>
        </div>

        {/* Live Interactive Simulations */}
        {currentItem.id === 'morning_chaos' && (
          <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/80 space-y-4 text-xs">
            <div className="space-y-0.5">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Test Protocol: 10:15 AM Impromptu Meeting Emergency Solver</span>
              </h4>
              <p className="text-stone-500">
                Simulate what happens when you get called into a meeting after the 8:00 PM cut-off.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Option A: 1-Click Colleague Transfer</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    0% Money Lost
                  </span>
                </div>
                <p className="text-stone-600 leading-normal">
                  Pass today's fresh lunch directly to a teammate in your tech park cluster.
                </p>
                <div>
                  <label className="text-stone-500 block mb-1 font-medium">Colleague Name & Desk:</label>
                  <input
                    type="text"
                    value={transferFriendName}
                    onChange={(e) => setTransferFriendName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <button
                  onClick={() => setIsTransferred(true)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isTransferred ? 'Transferred! QR Code Sent to Rahul' : 'Generate Desk Transfer QR'}</span>
                </button>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-amber-600" />
                    <span>Option B: 10 AM Half-Credit Cancellation</span>
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                    50% Value Preserved
                  </span>
                </div>
                <p className="text-stone-600 leading-normal">
                  Kitchen already cooked, but packaging and delivery labor are saved. Receive ₹58 in wallet credit.
                </p>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl tabular-nums text-stone-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Kitchen Prep Share:</span>
                    <span>₹57 (Groceries)</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-800">
                    <span>Emergency Credit to Wallet:</span>
                    <span>+₹58</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('₹58 emergency credit deposited into your Flex Wallet.')}
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs transition-colors shadow-xs"
                >
                  Confirm 10:00 AM Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {currentItem.id === 'paneer_stampede' && (
          <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/80 space-y-4 text-xs">
            <div className="space-y-0.5">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-amber-600" />
                <span>Live Simulator: Demand Skew Margin Impact</span>
              </h4>
              <p className="text-stone-500">
                Observe the impact on kitchen viability when too many subscribers choose the high-cost archetype.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-stone-800 font-semibold">
                <span>Subscribers Choosing High-Cost Paneer (Cost: ₹64) vs Standard (Cost: ₹32):</span>
                <span className="font-extrabold tabular-nums text-base text-stone-900">{paneerChoicePercent}%</span>
              </div>

              <input
                type="range"
                min="10"
                max="95"
                value={paneerChoicePercent}
                onChange={(e) => setPaneerChoicePercent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <div>
                  <span className="text-stone-400 block font-medium">Average Food Cost:</span>
                  <span className={`text-base font-bold tabular-nums ${marginThreat ? 'text-red-600' : 'text-emerald-700'}`}>
                    ₹{simulatedAverageFoodCost} / meal
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Budget Target Cap:</span>
                  <span className="text-base font-bold tabular-nums text-stone-900">
                    ₹{targetCost} / meal
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Cap Status:</span>
                  <span className={`text-xs font-bold mt-1 block ${marginThreat ? 'text-red-700' : 'text-emerald-700'}`}>
                    {marginThreat ? 'Dynamic Cap Active (45% max)' : 'Safe Distribution'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
