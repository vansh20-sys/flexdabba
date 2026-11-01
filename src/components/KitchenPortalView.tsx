import React, { useState, useMemo } from 'react';
import { 
  MOCK_DABBAWALA_PARTNERS, 
  MOCK_DELIVERY_CLUSTERS 
} from '../data/mockData';
import { 
  DabbawalaPartner, 
  DeliveryClusterRoute 
} from '../types';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Utensils, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Sparkles, 
  Star, 
  Truck, 
  Check, 
  Plus, 
  X, 
  Lock,
  Layers,
  HeartHandshake
} from 'lucide-react';

interface KitchenPortalViewProps {
  onOpenSubscribe?: () => void;
  onSelectDabbawala?: (partner: DabbawalaPartner) => void;
}

export const KitchenPortalView: React.FC<KitchenPortalViewProps> = ({
  onOpenSubscribe,
  onSelectDabbawala,
}) => {
  // Filters state
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'open' | 'full'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedMenuId, setExpandedMenuId] = useState<string | null>('DABBA-GGN-01');
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  
  // Waitlist feedback modal/state
  const [waitlistPartner, setWaitlistPartner] = useState<DabbawalaPartner | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistJoined, setWaitlistJoined] = useState(false);

  // Kitchen Partner Onboarding Modal
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardSuccess, setOnboardSuccess] = useState(false);
  const [newKitchenName, setNewKitchenName] = useState('');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newAreas, setNewAreas] = useState('');
  const [newCapacity, setNewCapacity] = useState('300');
  const [newCuisine, setNewCuisine] = useState('North Indian & Satvik');

  // Secondary dispatch view for operations staff
  const [showDispatchOps, setShowDispatchOps] = useState(false);
  const [routes, setRoutes] = useState<DeliveryClusterRoute[]>(MOCK_DELIVERY_CLUSTERS);

  // Filtered Dabbawala list
  const filteredPartners = useMemo(() => {
    return MOCK_DABBAWALA_PARTNERS.filter(partner => {
      // City filter
      if (selectedCity !== 'All' && partner.city !== selectedCity) {
        return false;
      }
      // Availability filter
      if (availabilityFilter === 'open' && partner.isFull) {
        return false;
      }
      if (availabilityFilter === 'full' && !partner.isFull) {
        return false;
      }
      // Search query (matches name, areas, towers, cuisine, or circle)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = partner.name.toLowerCase().includes(query);
        const matchesCircle = partner.dabbawalaCircle.toLowerCase().includes(query);
        const matchesCuisine = partner.cuisineTag.toLowerCase().includes(query);
        const matchesArea = partner.coveredAreas.some(a => a.toLowerCase().includes(query));
        const matchesTower = partner.coveredTowers.some(t => t.toLowerCase().includes(query));
        return matchesName || matchesCircle || matchesCuisine || matchesArea || matchesTower;
      }
      return true;
    });
  }, [selectedCity, availabilityFilter, searchQuery]);

  // Handle Waitlist Joining
  const handleJoinWaitlist = (partner: DabbawalaPartner) => {
    setWaitlistPartner(partner);
    setWaitlistJoined(false);
    setWaitlistEmail('');
  };

  const submitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistJoined(true);
    setTimeout(() => {
      setWaitlistPartner(null);
      setWaitlistJoined(false);
    }, 2200);
  };

  // Handle Kitchen Onboarding
  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardSuccess(true);
    setTimeout(() => {
      setIsOnboardingOpen(false);
      setOnboardSuccess(false);
      setNewKitchenName('');
      setNewAreas('');
    }, 2000);
  };

  const markRouteStatus = (routeId: string, status: 'packing' | 'in_transit' | 'delivered') => {
    setRoutes(prev => prev.map(r => r.id === routeId ? { ...r, status } : r));
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner: Certified Dabbawala & Cloud Kitchen Marketplace */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl p-6 sm:p-8 text-white shadow-md border border-stone-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Certified Dabbawala & Kitchen Network Directory</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-semibold">Strict Monthly Capacity Caps</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Available Dabbawalas & Delivery Coverage
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Find authentic, certified Dabbawala circles delivering hot homestyle meals to your office cluster. To maintain Six Sigma zero-delay standards, <strong className="text-amber-300">each provider caps subscriptions strictly at their kitchen capacity</strong>. If a Dabbawala is full for the month, orders are locked to prevent quality drops.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Register Cloud Kitchen / Mandal</span>
            </button>

            <button
              onClick={() => setShowDispatchOps(!showDispatchOps)}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                showDispatchOps
                  ? 'bg-amber-400 text-stone-950 font-extrabold'
                  : 'bg-stone-800/90 text-stone-300 hover:text-white border border-stone-700'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{showDispatchOps ? 'Back to Dabbawala Directory' : 'Cluster Dispatch Routes'}</span>
            </button>
          </div>
        </div>

        {/* Live Network Metrics Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-stone-800 text-xs">
          <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
            <span className="text-stone-400 text-[11px] block">Active Dabbawala Circles:</span>
            <span className="text-base font-bold text-white mt-0.5">6 Certified Hubs</span>
          </div>

          <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
            <span className="text-stone-400 text-[11px] block">Corporate Tech Parks Served:</span>
            <span className="text-base font-bold text-white mt-0.5">28+ Towers</span>
          </div>

          <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
            <span className="text-stone-400 text-[11px] block">Six Sigma Delivery Rate:</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5">99.8% On-Time</span>
          </div>

          <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
            <span className="text-stone-400 text-[11px] block">Monthly Slot Enforcement:</span>
            <span className="text-base font-bold text-amber-400 mt-0.5">Hard Cap Locked</span>
          </div>
        </div>
      </div>

      {/* Main Content: Dispatch View vs Dabbawala Directory */}
      {showDispatchOps ? (
        /* Ops Dispatch Route Management (For Logistics & Fleet) */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Live Dabbawala Dispatch Routes & Electric Fleet
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Cluster-based delivery runners mapped to specific office towers for frictionless desk drop-offs.
                </p>
              </div>
              <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 self-start sm:self-auto">
                4 Active Morning Clusters
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routes.map(route => (
                <div key={route.id} className="p-4 bg-stone-50/70 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                        {route.id} · {route.clusterArea}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 mt-0.5">{route.towerName}</h4>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      route.status === 'in_transit'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : route.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {route.status === 'in_transit' ? 'In Transit' : route.status === 'delivered' ? 'Delivered' : 'Packing'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded-lg border border-stone-200/80">
                      <span className="text-stone-400 block text-[10px]">Lead Runner</span>
                      <span className="font-semibold text-stone-800">{route.runnerName}</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200/80">
                      <span className="text-stone-400 block text-[10px]">Fleet Vehicle</span>
                      <span className="font-semibold text-stone-800">{route.vehicleType}</span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-600 bg-white p-2 rounded-lg border border-stone-200/80">
                    <span className="text-stone-400 block text-[10px]">Delivery Load & Floor Breakdown</span>
                    <span className="font-bold text-stone-900">{route.totalDabbas} Dabbas</span>
                    <span className="text-stone-500 ml-1">({route.floorBreakdown})</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Dispatch: {route.dispatchTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => markRouteStatus(route.id, 'packing')}
                        className={`text-[11px] px-2 py-1 rounded-md font-semibold ${route.status === 'packing' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'}`}
                      >
                        Pack
                      </button>
                      <button
                        onClick={() => markRouteStatus(route.id, 'in_transit')}
                        className={`text-[11px] px-2 py-1 rounded-md font-semibold ${route.status === 'in_transit' ? 'bg-amber-500 text-white' : 'text-stone-600 hover:bg-stone-200'}`}
                      >
                        Transit
                      </button>
                      <button
                        onClick={() => markRouteStatus(route.id, 'delivered')}
                        className={`text-[11px] px-2 py-1 rounded-md font-semibold ${route.status === 'delivered' ? 'bg-emerald-600 text-white' : 'text-stone-600 hover:bg-stone-200'}`}
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Customer-Facing Dabbawala Directory & Reach & Live Menus */
        <div className="space-y-6">
          {/* Search & Filter Controls */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Check your office tower, area, or tech park (e.g., Cyber City, BKC, Ecospace, Candor, Nariman Point)..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-900 placeholder:text-stone-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* City Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {['All', 'Mumbai', 'Gurugram', 'Bengaluru', 'Noida'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                      selectedCity === city
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                    }`}
                  >
                    {city === 'All' ? 'All Cities' : city}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter Segment */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-400 font-medium">Monthly Slot Status:</span>
                <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200/80">
                  <button
                    onClick={() => setAvailabilityFilter('all')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                      availabilityFilter === 'all'
                        ? 'bg-white text-stone-900 shadow-2xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    All Providers ({MOCK_DABBAWALA_PARTNERS.length})
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('open')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                      availabilityFilter === 'open'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Slots Available ({MOCK_DABBAWALA_PARTNERS.filter(p => !p.isFull).length})
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('full')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                      availabilityFilter === 'full'
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Full / Sold Out ({MOCK_DABBAWALA_PARTNERS.filter(p => p.isFull).length})
                  </button>
                </div>
              </div>

              <div className="text-stone-500 font-medium text-[11px]">
                Showing <strong className="text-stone-900 font-bold">{filteredPartners.length}</strong> verified Dabbawala networks
              </div>
            </div>
          </div>

          {/* Dabbawala Directory Grid */}
          <div className="space-y-6">
            {filteredPartners.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <h4 className="text-base font-bold text-stone-900">No Dabbawalas Match Your Current Filter</h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Try clearing your search query or switching to 'All Cities' to view available Dabbawala fleets across other business corridors.
                </p>
                <button
                  onClick={() => {
                    setSelectedCity('All');
                    setAvailabilityFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredPartners.map((partner) => {
                const isExpanded = expandedMenuId === partner.id;
                const capacityPercentage = Math.round((partner.activeSubscribers / partner.dailyCapacity) * 100);

                return (
                  <div
                    key={partner.id}
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                      selectedPartner === partner.id
                        ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                        : 'border-stone-200/90 hover:border-stone-300 shadow-xs hover:shadow-sm'
                    }`}
                  >
                    {/* Card Top: Identity & Capacity Status */}
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                        {/* Left: Dabbawala Details */}
                        <div className="space-y-2 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-md">
                              {partner.city} Hub
                            </span>
                            <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-md border border-stone-200">
                              FSSAI: {partner.fssaiNumber}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] font-bold text-stone-800 bg-stone-50 px-2.5 py-0.5 rounded-md border border-stone-200">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <span>{partner.rating.toFixed(1)}</span>
                              <span className="text-stone-400 font-normal">({partner.reviewsCount} reviews)</span>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                              {partner.name}
                            </h3>
                            <p className="text-xs text-amber-700 font-semibold mt-0.5">
                              {partner.dabbawalaCircle}
                            </p>
                          </div>

                          <p className="text-xs text-stone-600 leading-relaxed">
                            {partner.kitchenType} · <strong className="text-stone-900">{partner.cuisineTag}</strong>
                          </p>

                          {/* Trust Badges */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {partner.badges.map((badge, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-700 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full"
                              >
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                <span>{badge}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: Real-Time Monthly Capacity & Ordering Availability */}
                        <div className="lg:w-80 shrink-0 bg-stone-50/80 p-4 rounded-xl border border-stone-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                              Monthly Dabba Capacity
                            </span>
                            <span className="text-xs font-bold text-stone-900 tabular-nums">
                              {partner.activeSubscribers} / {partner.dailyCapacity} Dabbas
                            </span>
                          </div>

                          {/* Capacity Progress Bar */}
                          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all rounded-full ${
                                partner.isFull
                                  ? 'bg-rose-500'
                                  : capacityPercentage > 85
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                            />
                          </div>

                          {/* Full Capacity Alert OR Available Slots Banner */}
                          {partner.isFull ? (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5">
                              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                                <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>CAPACITY FULL FOR THIS MONTH</span>
                              </div>
                              <p className="text-[11px] text-rose-700 leading-tight">
                                <strong>No more dabba orders allowed for this month.</strong> Capacity capped to ensure zero delivery failures.
                              </p>
                              <button
                                onClick={() => handleJoinWaitlist(partner)}
                                className="w-full mt-1.5 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Users className="w-3.5 h-3.5" />
                                <span>Join Next Month's Waitlist</span>
                              </button>
                            </div>
                          ) : (
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Accepting Subscribers</span>
                                </span>
                                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full tabular-nums">
                                  {partner.slotsRemaining} slots left
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedPartner(partner.id);
                                  if (onSelectDabbawala) onSelectDabbawala(partner);
                                  if (onOpenSubscribe) onOpenSubscribe();
                                }}
                                className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                <span>Select & Subscribe (₹{partner.pricePerMeal}/meal)</span>
                              </button>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-stone-400" />
                              <span>Slot: {partner.dispatchTime}</span>
                            </span>
                            <span className="font-semibold text-stone-700">
                              {partner.deliverySuccessRate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Area Reach & Office Tower Coverage Breakdown */}
                      <div className="mt-5 pt-5 border-t border-stone-100 space-y-2.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>Delivery Reach & Covered Corporate Towers</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {partner.coveredAreas.map((area, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/90 px-2.5 py-1 rounded-lg"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Menu Specialties & Expand Live Menu Toggle */}
                      <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="font-bold text-stone-500 text-[11px]">Specialties:</span>
                          {partner.menuSpecialties.map((item, idx) => (
                            <span
                              key={idx}
                              className="bg-amber-50 text-amber-900 font-semibold px-2 py-0.5 rounded-md text-[11px] border border-amber-200/60"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => setExpandedMenuId(isExpanded ? null : partner.id)}
                          className="self-start sm:self-auto text-xs font-bold text-stone-800 hover:text-amber-800 flex items-center gap-1 py-1 cursor-pointer transition-colors"
                        >
                          <Utensils className="w-3.5 h-3.5 text-amber-600" />
                          <span>{isExpanded ? 'Hide Live Daily Menu' : "Inspect Today's Menu Archetypes"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Live Menu Archetype Breakdown */}
                    {isExpanded && (
                      <div className="bg-stone-50/80 p-6 border-t border-stone-200 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-sm font-bold text-stone-900">
                              Today's Multi-Archetype Menu Prepared by {partner.name}
                            </h4>
                            <p className="text-xs text-stone-500 mt-0.5">
                              Subscribers can swap between these archetypes daily with zero extra charges up to 8:00 PM.
                            </p>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                            100% Homestyle Ingredients
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                          {partner.sampleMenu.map((menuItem, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wide">
                                  {menuItem.archetype}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <div>
                                  <span className="text-[10px] text-stone-400 font-semibold block uppercase">Main Subzi / Protein</span>
                                  <span className="font-bold text-stone-900">{menuItem.subzi}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-stone-400 font-semibold block uppercase">Dal / Lentil</span>
                                  <span className="text-stone-700">{menuItem.dal}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100">
                                  <div>
                                    <span className="text-[10px] text-stone-400 font-semibold block uppercase">Breads</span>
                                    <span className="text-stone-700">{menuItem.bread}</span>
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-stone-400 font-semibold block uppercase">Grain</span>
                                    <span className="text-stone-700">{menuItem.rice}</span>
                                  </div>
                                </div>
                                {menuItem.extra && (
                                  <div className="pt-1 text-[11px] text-amber-900 font-medium">
                                    + {menuItem.extra}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Waitlist Modal for Full/Sold-Out Dabbawalas */}
      {waitlistPartner && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Capacity Full for This Month
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  Join Priority Waitlist
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {waitlistPartner.name} has capped subscriptions at {waitlistPartner.dailyCapacity} dabbas.
                </p>
              </div>
              <button
                onClick={() => setWaitlistPartner(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {waitlistJoined ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1.5">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">You're on the Priority Waitlist!</h4>
                <p className="text-xs text-emerald-700">
                  We'll notify you as soon as a slot opens up on the 1st of next month.
                </p>
              </div>
            ) : (
              <form onSubmit={submitWaitlist} className="space-y-3.5 text-xs">
                <p className="text-stone-600 leading-relaxed">
                  Enter your corporate email or phone to get first access when existing subscribers pause or rollover next month:
                </p>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Work Email / Phone Number</label>
                  <input
                    type="text"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="e.g. aditya@google.com or 9820012345"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Your Office Tower / Tech Park</label>
                  <input
                    type="text"
                    defaultValue={waitlistPartner.coveredAreas[0]}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-700"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setWaitlistPartner(null)}
                    className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 rounded-xl font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Confirm Waitlist Spot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Cloud Kitchen / Dabbawala Partner Onboarding Modal */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Partner Registration
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  List Your Cloud Kitchen / Dabbawala Mandal
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Get high-volume bulk subscription batches with zero aggregator commissions (₹85/dabba net kitchen payout).
                </p>
              </div>
              <button
                onClick={() => setIsOnboardingOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {onboardSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1.5">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Application Submitted!</h4>
                <p className="text-xs text-emerald-700">
                  Our regional cluster coordinator will visit for an FSSAI kitchen audit within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleOnboardSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Kitchen or Dabbawala Mandal Name</label>
                  <input
                    type="text"
                    required
                    value={newKitchenName}
                    onChange={(e) => setNewKitchenName(e.target.value)}
                    placeholder="e.g. Mahalakshmi Dabbawala Rasoi Hub"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Operating City</label>
                    <select
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Gurugram">Gurugram</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Noida">Noida</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Daily Max Dabba Capacity</label>
                    <input
                      type="number"
                      required
                      value={newCapacity}
                      onChange={(e) => setNewCapacity(e.target.value)}
                      placeholder="e.g. 300"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Primary Delivery Corridor / Tech Parks</label>
                  <input
                    type="text"
                    required
                    value={newAreas}
                    onChange={(e) => setNewAreas(e.target.value)}
                    placeholder="e.g. BKC G-Block, Lower Parel, Peninsula Tower"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700">Food Specialty / Cuisine Type</label>
                  <input
                    type="text"
                    value={newCuisine}
                    onChange={(e) => setNewCuisine(e.target.value)}
                    placeholder="e.g. North Indian Homestyle, Jain Satvik, High-Protein"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 text-[11px] leading-relaxed">
                  <strong>Platform Guarantee:</strong> FlexDabba provides insulated stainless dabbas, QR tagging labels, and customer payments upfront. Zero marketing or commissions deducted from your kitchen.
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOnboardingOpen(false)}
                    className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 rounded-xl font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    Submit Partner Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
