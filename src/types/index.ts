export type MealArchetype = 'classic' | 'fit_protein' | 'regional' | 'khichdi_rescue';
export type UserRole = 'customer' | 'kitchen';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  companyName: string;
  officeTower: string;
  deskFloor: string;
  avatarInitials: string;
  isAuthenticated: boolean;
}

export interface MealOption {
  id: string;
  archetype: MealArchetype;
  name: string;
  tagline: string;
  dishes: string[];
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  allergens: string[];
  ingredients: string[];
  isSpicy?: boolean;
  isJainFriendly?: boolean;
  accentColor: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  description: string;
  unit: string;
}

export interface MealSlotSelection {
  selectedOptionId: string;
  status: 'scheduled' | 'paused' | 'delivered';
  pauseType?: 'wallet_credit' | 'extend_plan';
  addOns: { item: AddOnItem; quantity: number }[];
  wasAutoSwapped?: boolean;
  autoSwapOriginalArchetype?: string;
  autoSwapReason?: string;
  deliverySlot: string;
  assignedDabbawalaId?: string;
  assignedDabbawalaName?: string;
  assignedDabbawalaCircle?: string;
}

export interface DaySchedule {
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: string; // "Monday", etc.
  displayDate: string; // "Nov 3"
  isToday: boolean;
  isPast: boolean;
  isLocked: boolean; // locked after cut-off
  cutOffDisplay: string;
  lunch: MealSlotSelection;
  dinner: MealSlotSelection;
  availableOptions: MealOption[];
}

export interface DietaryProfile {
  dietType: 'pure_veg' | 'high_protein' | 'vegan' | 'jain' | 'diabetic_friendly';
  spiceLevel: 'mild' | 'medium' | 'desi_spicy';
  blacklistedIngredients: string[];
  blacklistedAllergens: string[];
  autoSwapEnabled: boolean;
  preferredArchetype: MealArchetype;
}

export interface SubscriptionInfo {
  id: string;
  planName: string;
  totalMeals: number;
  mealsRemaining: number;
  costPerMeal: number;
  startDate: string;
  validUntil: string;
  deliveryAddress: string;
  officeDeskInfo: string;
  preferredSlot: string;
  walletBalance: number;
}

export interface WalletTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  reference: string;
}

// B2B Kitchen Partner & Dabbawala Types
export interface WholesaleIngredientItem {
  id: string;
  name: string;
  requiredQuantity: number;
  unit: string;
  category: 'produce' | 'dairy_protein' | 'grains_flour' | 'spices_oil';
  procured: boolean;
  estimatedCost: number;
}

export interface DeliveryClusterRoute {
  id: string;
  towerName: string;
  clusterArea: string;
  totalDabbas: number;
  floorBreakdown: string;
  runnerName: string;
  vehicleType: string;
  dispatchTime: string;
  status: 'packing' | 'in_transit' | 'delivered';
}

export interface KitchenPartnerProfile {
  kitchenId: string;
  kitchenName: string;
  ownerName: string;
  fssaiNumber: string;
  cluster: string;
  rating: number;
  dailyCapacity: number;
  activeSubscribersServed: number;
  payoutRatePerDabba: number;
  totalWeeklyEarnings: number;
}

export interface DabbawalaPartner {
  id: string;
  name: string;
  dabbawalaCircle: string;
  fssaiNumber: string;
  rating: number;
  reviewsCount: number;
  city: string;
  coveredAreas: string[];
  coveredTowers: string[];
  kitchenType: string;
  cuisineTag: string;
  menuSpecialties: string[];
  dailyCapacity: number;
  activeSubscribers: number;
  isFull: boolean;
  slotsRemaining: number;
  dispatchTime: string;
  pricePerMeal: number;
  deliverySuccessRate: string;
  badges: string[];
  sampleMenu: {
    archetype: string;
    subzi: string;
    dal: string;
    bread: string;
    rice: string;
    extra?: string;
  }[];
}
