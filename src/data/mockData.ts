import { AddOnItem, AuthUser, DaySchedule, DietaryProfile, MealOption, SubscriptionInfo, WalletTransaction } from '../types';

export const DEMO_USERS: AuthUser[] = [
  {
    id: 'USR-DLF-01',
    name: 'Aditya Sharma',
    email: 'aditya.sharma@google.com',
    phone: '+91 98112 34567',
    role: 'customer',
    companyName: 'Google India',
    officeTower: 'DLF Cyber City Tower B',
    deskFloor: 'Floor 7, Desk 7-C21',
    avatarInitials: 'AS',
    isAuthenticated: true,
  },
  {
    id: 'USR-BKC-02',
    name: 'Priya Iyer',
    email: 'priya.iyer@mckinsey.com',
    phone: '+91 98201 98765',
    role: 'customer',
    companyName: 'McKinsey & Company',
    officeTower: 'Godrej BKC G-Block',
    deskFloor: 'Floor 12, Pod 4',
    avatarInitials: 'PI',
    isAuthenticated: true,
  },
  {
    id: 'USR-KITCHEN-01',
    name: 'Chef Rajeshwar Sharma',
    email: 'rajeshwar@annapurnarasoi.in',
    phone: '+91 99100 88221',
    role: 'kitchen',
    companyName: 'Annapurna Cloud Kitchen Hub #4',
    officeTower: 'Gurugram Metro North Line',
    deskFloor: 'Production Kitchen Bay 1',
    avatarInitials: 'RS',
    isAuthenticated: true,
  },
];

export const ADD_ON_CATALOG: AddOnItem[] = [
  { id: 'chaas', name: 'Roasted Jeera Chaas', price: 25, description: 'Chilled homestyle spiced buttermilk', unit: '250ml' },
  { id: 'extra_roti', name: '2x Whole Wheat Phulkas', price: 15, description: '100% whole grain freshly rolled rotis with light ghee', unit: '2 pcs' },
  { id: 'sprout_bowl', name: 'Moong Sprout Crunch Bowl', price: 35, description: 'Lemon pomegranate spiced raw protein sprouts', unit: '120g' },
  { id: 'desi_ghee', name: 'A2 Gir Cow Desi Ghee Cup', price: 20, description: 'Artisanal bilona ghee portion', unit: '20ml' },
  { id: 'sweet_gulab', name: 'Angoori Gulab Jamun', price: 30, description: 'Warm organic jaggery-infused mini jamuns', unit: '2 pcs' },
];

export const INITIAL_DIETARY_PROFILE: DietaryProfile = {
  dietType: 'pure_veg',
  spiceLevel: 'medium',
  blacklistedIngredients: ['Karela (Bitter Gourd)', 'Baingan (Eggplant)', 'Arbi (Taro Root)'],
  blacklistedAllergens: ['Peanuts'],
  autoSwapEnabled: true,
  preferredArchetype: 'classic',
};

export const COMMON_BLACKLIST_OPTIONS = [
  { id: 'karela', label: 'Karela (Bitter Gourd)', category: 'vegetable' },
  { id: 'baingan', label: 'Baingan (Eggplant)', category: 'vegetable' },
  { id: 'arbi', label: 'Arbi (Taro Root)', category: 'vegetable' },
  { id: 'tindora', label: 'Tindora (Ivy Gourd)', category: 'vegetable' },
  { id: 'lauki', label: 'Lauki (Bottle Gourd)', category: 'vegetable' },
  { id: 'tinda', label: 'Tinda (Apple Gourd)', category: 'vegetable' },
  { id: 'turai', label: 'Turai (Ridge Gourd)', category: 'vegetable' },
  { id: 'mushrooms', label: 'Mushrooms', category: 'fungi' },
  { id: 'okra', label: 'Okra / Bhindi', category: 'vegetable' },
  { id: 'pumpkin', label: 'Kaddu (Pumpkin)', category: 'vegetable' },
  { id: 'peanuts', label: 'Peanuts / Groundnuts', category: 'allergen' },
  { id: 'gluten', label: 'Gluten / Wheat', category: 'allergen' },
  { id: 'dairy', label: 'Dairy / Lactose', category: 'allergen' },
  { id: 'mustard', label: 'Mustard Seeds / Oil', category: 'allergen' },
];

export const INITIAL_SUBSCRIPTION: SubscriptionInfo = {
  id: 'SUB-2026-8819',
  planName: 'Office Lunch Pass (Monthly)',
  totalMeals: 22,
  mealsRemaining: 17,
  costPerMeal: 115,
  startDate: '2026-10-20',
  validUntil: '2026-11-25',
  deliveryAddress: 'WeWork Forum, DLF Cyber City, Phase 3, Gurugram',
  officeDeskInfo: 'Desk 4B-12, Tech Engineering Wing',
  preferredSlot: '12:45 PM - 1:15 PM',
  walletBalance: 345, // ₹345 accrued from 3 paused days
};

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1',
    date: '2026-10-28',
    amount: 115,
    type: 'credit',
    description: '1-Click Pause Credit: Team lunch offsite',
    reference: 'Oct 28 Lunch'
  },
  {
    id: 'tx-2',
    date: '2026-10-24',
    amount: 115,
    type: 'credit',
    description: '1-Click Pause Credit: Out of station travel',
    reference: 'Oct 24 Lunch'
  },
  {
    id: 'tx-3',
    date: '2026-10-22',
    amount: 115,
    type: 'credit',
    description: '1-Click Pause Credit: Client meeting lunch',
    reference: 'Oct 22 Lunch'
  },
];

// Helper to construct meal archetypes
const buildDayOptions = (dayIndex: number): MealOption[] => {
  const optionsMap: Record<number, MealOption[]> = {
    // Monday
    0: [
      {
        id: 'mon-opt-classic',
        archetype: 'classic',
        name: 'Classic Homestyle Thali',
        tagline: 'Maa ke haath jaisa comfort',
        description: 'Tender Paneer Bhurji with light tomatoes and cumin, paired with hearty Dal Tadka, 3 phulkas, jeera rice, and cucumber kachumber.',
        dishes: ['Amritsari Paneer Bhurji', 'Panchmel Dal Tadka', '3x Whole Wheat Phulkas', 'Steamed Jeera Basmati', 'Mint Cucumber Salad'],
        calories: 580,
        protein: 21,
        carbs: 72,
        fat: 16,
        fiber: 9,
        allergens: ['Dairy', 'Gluten'],
        ingredients: ['Paneer', 'Yellow Lentils', 'Wheat Flour', 'Basmati Rice', 'Cumin', 'Tomatoes'],
        accentColor: '#d97706',
      },
      {
        id: 'mon-opt-fit',
        archetype: 'fit_protein',
        name: 'Fit & High-Protein Fuel',
        tagline: '32g Clean protein, low glycemic index',
        description: 'Smoked Soya Tikka chunks with crunchy green bell peppers, double-sprout dal, 2 multigrain jowar-wheat rotis, and brown rice.',
        dishes: ['High-Protein Soya Tikka Stir-fry', 'Double-Sprout Dal Palak', '2x Multigrain Rotis', 'Steamed Brown Rice', 'Pomegranate Sprout Chaat'],
        calories: 490,
        protein: 32,
        carbs: 58,
        fat: 9,
        fiber: 14,
        allergens: ['Soy'],
        ingredients: ['Soya Chunks', 'Spinach', 'Moong Sprouts', 'Jowar', 'Wheat', 'Bell Peppers'],
        accentColor: '#16a34a',
      },
      {
        id: 'mon-opt-regional',
        archetype: 'regional',
        name: 'Regional: Punjabi Rajma Chawal',
        tagline: 'Slow-simmered Kashmiri Rajma comfort',
        description: 'Traditional slow-cooked Jammu Rajma in rich onion-tomato masala, served with fragrant Ghee Jeera Rice, pickled baby onions, and roasted papad.',
        dishes: ['Jammu Slow-Simmered Rajma', 'Cumin Ghee Jeera Rice', '2x Soft Phulkas', 'Sirka Pickled Onions', 'Crispy Roasted Papad'],
        calories: 540,
        protein: 19,
        carbs: 82,
        fat: 12,
        fiber: 12,
        allergens: ['Gluten'],
        ingredients: ['Red Kidney Beans', 'Basmati Rice', 'Tomatoes', 'Onions', 'Ginger Garlic'],
        accentColor: '#ea580c',
      },
      {
        id: 'mon-opt-khichdi',
        archetype: 'khichdi_rescue',
        name: 'Khichdi Rescue (Gentle & Light)',
        tagline: 'For sensitive digestion or light work days',
        description: 'Golden yellow Moong Dal & Rice Khichdi tempered with hing and cumin, served with fresh cooling dahi, roasted aloo jeera, and sweet mango pickle.',
        dishes: ['Desi Ghee Moong Dal Khichdi', 'Mild Roasted Aloo Jeera', 'Fresh Cultured Dahi (100g)', 'Khatta Meetha Achar', 'Roasted Papad'],
        calories: 440,
        protein: 15,
        carbs: 68,
        fat: 10,
        fiber: 8,
        allergens: ['Dairy'],
        ingredients: ['Yellow Moong Dal', 'Rice', 'Potatoes', 'Cumin', 'Curd', 'Asafoetida'],
        accentColor: '#0284c7',
      },
    ],

    // Tuesday
    1: [
      {
        id: 'tue-opt-classic',
        archetype: 'classic',
        name: 'Classic Homestyle Thali',
        tagline: 'Aloo Gobhi Adraki & Yellow Moong Dal',
        description: 'Tender cauliflower florets with baby potatoes tossed with julienned ginger, paired with light Moong Dal, warm phulkas, and fresh lemon salad.',
        dishes: ['Adraki Aloo Gobhi Dry Sabzi', 'Tempered Yellow Moong Dal', '3x Soft Phulkas', 'Steamed Rice', 'Carrot Lemon Slaw'],
        calories: 530,
        protein: 16,
        carbs: 76,
        fat: 14,
        fiber: 10,
        allergens: ['Gluten'],
        ingredients: ['Cauliflower', 'Potatoes', 'Ginger', 'Yellow Moong', 'Wheat Flour', 'Coriander'],
        accentColor: '#d97706',
      },
      {
        id: 'tue-opt-fit',
        archetype: 'fit_protein',
        name: 'Fit & High-Protein Fuel',
        tagline: 'Grilled Paneer & Edamame Power Bowl',
        description: 'Golden pan-seared malai paneer cubes with tender edamame and capsicum, served alongside protein chana dal and ragi phulkas.',
        dishes: ['Herb-Seared Paneer & Edamame', 'Chana Dal Tadka with Garlic', '2x Ragi-Wheat Phulkas', 'Red Rice Pilaf', 'Beetroot Cucumber Slaw'],
        calories: 510,
        protein: 29,
        carbs: 52,
        fat: 15,
        fiber: 11,
        allergens: ['Dairy'],
        ingredients: ['Paneer', 'Edamame', 'Chana Dal', 'Ragi', 'Beetroot', 'Capsicum'],
        accentColor: '#16a34a',
      },
      {
        id: 'tue-opt-regional',
        archetype: 'regional',
        name: 'Regional: Gujarati Kathiyawadi',
        tagline: 'Kathiyawadi Sev Tameta & Bajra Roti',
        description: 'Tangy and spicy Kathiyawadi Sev Tameta curry, served with warm earthen-roasted Bajra Rotla, garlic chutney, and mild jaggery slice.',
        dishes: ['Kathiyawadi Sev Tameta Nu Shaak', 'Moong Dal Khichdi with Ghee', '2x Bajra Rotla', 'Lasaniya Marcha Chutney', 'Organic Jaggery Slice'],
        calories: 570,
        protein: 17,
        carbs: 84,
        fat: 16,
        fiber: 13,
        allergens: ['Gluten'],
        ingredients: ['Gram Flour Sev', 'Tomatoes', 'Pearl Millet (Bajra)', 'Garlic', 'Jaggery'],
        accentColor: '#ea580c',
      },
      {
        id: 'tue-opt-khichdi',
        archetype: 'khichdi_rescue',
        name: 'Khichdi Rescue (Gentle & Light)',
        tagline: 'Easy on the stomach comfort bowl',
        description: 'Palak Moong Dal Khichdi topped with mild cumin tempering, with sweet curd and mild pumpkin-free dry jeera aloo.',
        dishes: ['Spinach Infused Moong Khichdi', 'Cumin Spiced Soft Potatoes', 'Fresh Sweet Curd', 'Papad Roll'],
        calories: 430,
        protein: 16,
        carbs: 65,
        fat: 9,
        fiber: 9,
        allergens: ['Dairy'],
        ingredients: ['Moong Dal', 'Spinach', 'Rice', 'Curd', 'Cumin'],
        accentColor: '#0284c7',
      },
    ],

    // Wednesday (Contains Karela in Classic to showcase Auto-Swap!)
    2: [
      {
        id: 'wed-opt-classic',
        archetype: 'classic',
        name: 'Classic Homestyle Thali',
        tagline: 'Karela Pyaz Masala & Dal Makhani (Default Chef Menu)',
        description: 'Pan-fried bitter gourd caramelized with onions, amchur and whole spices, served with slow-cooked Dal Makhani, 3 phulkas, and rice.',
        dishes: ['Crispy Karela Pyaz Masala', 'Slow-Simmered Dal Makhani', '3x Whole Wheat Phulkas', 'Steamed Rice', 'Radish Greens Salad'],
        calories: 560,
        protein: 18,
        carbs: 74,
        fat: 17,
        fiber: 11,
        allergens: ['Gluten', 'Dairy'],
        ingredients: ['Karela (Bitter Gourd)', 'Onions', 'Black Lentils', 'Wheat Flour', 'Dry Mango Powder'],
        accentColor: '#d97706',
      },
      {
        id: 'wed-opt-fit',
        archetype: 'fit_protein',
        name: 'Fit & High-Protein Fuel',
        tagline: 'Grilled Tofu Matar & Sprouted Horsegram Dal',
        description: 'Marinated high-protein organic tofu cubes with tender sweet peas in tomato onion reduction, protein kulthi dal, and oats rotis.',
        dishes: ['Grilled Tofu Matar Curry', 'Kulthi (Horsegram) Protein Dal', '2x Oats-Wheat Phulkas', 'Nutty Quinoa Rice Blend', 'Flaxseed Sprout Salad'],
        calories: 480,
        protein: 31,
        carbs: 56,
        fat: 10,
        fiber: 15,
        allergens: ['Soy'],
        ingredients: ['Organic Tofu', 'Green Peas', 'Horsegram Lentils', 'Oats', 'Quinoa', 'Flaxseeds'],
        accentColor: '#16a34a',
      },
      {
        id: 'wed-opt-regional',
        archetype: 'regional',
        name: 'Regional: Sindhi Kadhi Chawal',
        tagline: 'Gram-flour tamarind curry with okra & lotus stem',
        description: 'Fragrant roasted besan broth infused with sweet tamarind, ladyfinger, drumstick, and lotus stem, served with golden jeera rice and sweet boondi.',
        dishes: ['Authentic Sindhi Tomato Kadhi', 'Bhindi & Lotus Stem Fry', 'Fragrant Jeera Basmati', '2x Warm Phulkas', 'Sweet Mithi Boondi'],
        calories: 540,
        protein: 15,
        carbs: 86,
        fat: 12,
        fiber: 10,
        allergens: ['Gluten'],
        ingredients: ['Besan (Gram Flour)', 'Tamarind', 'Okra', 'Lotus Stem', 'Tomatoes'],
        accentColor: '#ea580c',
      },
      {
        id: 'wed-opt-khichdi',
        archetype: 'khichdi_rescue',
        name: 'Khichdi Rescue (Gentle & Light)',
        tagline: 'Light tummy rescue meal',
        description: 'Lightly roasted Daliya (Broken Wheat) & Moong Khichdi with mild carrots, peas, fresh curd and mint chutney.',
        dishes: ['Vegetable Daliya Moong Khichdi', 'Fresh Masala Dahi', 'Roasted Papadum', 'Mint Coriander Dip'],
        calories: 410,
        protein: 15,
        carbs: 64,
        fat: 8,
        fiber: 10,
        allergens: ['Gluten', 'Dairy'],
        ingredients: ['Broken Wheat', 'Moong Dal', 'Carrots', 'Curd', 'Mint'],
        accentColor: '#0284c7',
      },
    ],

    // Thursday
    3: [
      {
        id: 'thu-opt-classic',
        archetype: 'classic',
        name: 'Classic Homestyle Thali',
        tagline: 'Paneer Makhani & Mixed Vegetable Korma',
        description: 'Velvety cottage cheese in rich tomato gravy with mild kasuri methi, vegetable korma, 3 phulkas, jeera rice, and onion salad.',
        dishes: ['Shahi Paneer Makhani', 'Seasonal Mixed Veg Dry Sabzi', '3x Soft Phulkas', 'Jeera Basmati Rice', 'Crunchy Kachumber'],
        calories: 610,
        protein: 23,
        carbs: 70,
        fat: 21,
        fiber: 8,
        allergens: ['Dairy', 'Gluten'],
        ingredients: ['Paneer', 'Tomatoes', 'French Beans', 'Carrots', 'Wheat Flour', 'Kasuri Methi'],
        accentColor: '#d97706',
      },
      {
        id: 'thu-opt-fit',
        archetype: 'fit_protein',
        name: 'Fit & High-Protein Fuel',
        tagline: 'Sprouted Chana & Soya Tikka Khichdi Bowl',
        description: 'High-fiber black chickpeas with tender soya chunks, sauteed green beans, 2 multigrain rotis, and cooling cucumber raita.',
        dishes: ['Kala Chana Masala (26g Protein)', 'Beans Poriyal with Grated Coconut', '2x Multigrain Rotis', 'Brown Basmati Rice', 'Cucumber Chia Seed Raita'],
        calories: 505,
        protein: 30,
        carbs: 62,
        fat: 11,
        fiber: 16,
        allergens: ['Soy', 'Dairy'],
        ingredients: ['Black Chickpeas', 'Soya', 'Green Beans', 'Chia Seeds', 'Curd'],
        accentColor: '#16a34a',
      },
      {
        id: 'thu-opt-regional',
        archetype: 'regional',
        name: 'Regional: South Indian Chettinad',
        tagline: 'Chettinad Veg Kurma & Malabar Parotta',
        description: 'Stone-ground coconut and black pepper spiced Chettinad vegetable kurma, layered Malabar parotta, lemon rice, and cabbage thoran.',
        dishes: ['Chettinad Pepper Veg Kurma', 'Cabbage Coconut Thoran', '2x Flaky Parottas', 'Fragrant Lemon Rice', 'Appalam Crisp'],
        calories: 590,
        protein: 16,
        carbs: 78,
        fat: 22,
        fiber: 11,
        allergens: ['Gluten', 'Coconut'],
        ingredients: ['Black Pepper', 'Coconut', 'Curry Leaves', 'Lemon', 'Wheat Flour'],
        accentColor: '#ea580c',
      },
      {
        id: 'thu-opt-khichdi',
        archetype: 'khichdi_rescue',
        name: 'Khichdi Rescue (Gentle & Light)',
        tagline: 'Comforting Curd Rice & Tadka',
        description: 'South Indian temple-style Curd Rice tempered with mustard, curry leaves, ginger and pomegranate, with warm aloo jeera.',
        dishes: ['Thayir Sadam (Temple Curd Rice)', 'Hing Jeera Aloo', 'Roasted Papadum', 'Sweet Lemon Pickle'],
        calories: 420,
        protein: 12,
        carbs: 64,
        fat: 11,
        fiber: 5,
        allergens: ['Dairy', 'Mustard'],
        ingredients: ['Curd', 'Rice', 'Curry Leaves', 'Mustard', 'Pomegranate'],
        accentColor: '#0284c7',
      },
    ],

    // Friday
    4: [
      {
        id: 'fri-opt-classic',
        archetype: 'classic',
        name: 'Classic Homestyle Thali',
        tagline: 'Bhindi Do Pyaza & Arhar Dal Tadka',
        description: 'Crisp ladyfinger sauteed with diced caramelized onions and whole coriander, garlic arhar dal, 3 phulkas, and fragrant rice.',
        dishes: ['Bhindi Do Pyaza Sabzi', 'Lehsuni Arhar Dal Tadka', '3x Whole Wheat Phulkas', 'Steamed Rice', 'Sirka Onion Salad'],
        calories: 540,
        protein: 17,
        carbs: 75,
        fat: 15,
        fiber: 11,
        allergens: ['Gluten'],
        ingredients: ['Ladyfinger (Bhindi)', 'Onions', 'Toor Dal', 'Garlic', 'Wheat Flour'],
        accentColor: '#d97706',
      },
      {
        id: 'fri-opt-fit',
        archetype: 'fit_protein',
        name: 'Fit & High-Protein Fuel',
        tagline: 'Methi Paneer Tikka & Sprout Dal',
        description: 'Fresh fenugreek and low-fat cottage cheese tossed with bell peppers and roasted cumin, paired with moong sprout dal and jowar rotis.',
        dishes: ['Methi Paneer Tikka Masala', 'Moong Sprout Tadka Dal', '2x Jowar-Wheat Phulkas', 'Steamed Brown Rice', 'Carrot Mint Salad'],
        calories: 495,
        protein: 30,
        carbs: 54,
        fat: 12,
        fiber: 13,
        allergens: ['Dairy'],
        ingredients: ['Paneer', 'Fenugreek Leaves', 'Moong Sprouts', 'Jowar', 'Carrots'],
        accentColor: '#16a34a',
      },
      {
        id: 'fri-opt-regional',
        archetype: 'regional',
        name: 'Regional: Maharashtrian Thali',
        tagline: 'Zunka Bhakri & Shengdana Amti',
        description: 'Traditional spiced gram flour Zunka, hot Jowar Bhakri, tangy sweet Maharashtrian Amti dal, Thecha chutney, and onion wedges.',
        dishes: ['Spiced Onion Maharashtrian Zunka', 'Sweet & Tangy Shengdana Amti', '2x Soft Jowar Bhakri', 'Indrayani Steamed Rice', 'Green Mirchi Thecha'],
        calories: 565,
        protein: 20,
        carbs: 80,
        fat: 14,
        fiber: 14,
        allergens: ['Peanuts'],
        ingredients: ['Besan', 'Jowar', 'Peanuts', 'Green Chillies', 'Curry Leaves'],
        accentColor: '#ea580c',
      },
      {
        id: 'fri-opt-khichdi',
        archetype: 'khichdi_rescue',
        name: 'Khichdi Rescue (Gentle & Light)',
        tagline: 'Golden Turmeric Comfort Khichdi',
        description: 'Golden yellow moong rice khichdi with desi cow ghee, roasted cumin aloo, fresh salted curd, and mint chutney.',
        dishes: ['Desi Cow Ghee Moong Khichdi', 'Sukhe Aloo Jeera', 'Fresh Salted Dahi', 'Roasted Papad'],
        calories: 435,
        protein: 15,
        carbs: 66,
        fat: 10,
        fiber: 8,
        allergens: ['Dairy'],
        ingredients: ['Moong Dal', 'Rice', 'Curd', 'Cumin', 'Ghee'],
        accentColor: '#0284c7',
      },
    ],

    // Saturday
    5: [
      {
        id: 'sat-opt-classic',
        archetype: 'classic',
        name: 'Classic Weekend Feast Thali',
        tagline: 'Dum Aloo Kashmiri & Chana Dal',
        description: 'Kashmiri fennel spiced baby potatoes in rich curd gravy, hearty Bengal gram dal, 3 phulkas, and saffron scented rice.',
        dishes: ['Kashmiri Shahi Dum Aloo', 'Dhaba-Style Chana Dal', '3x Soft Phulkas', 'Saffron Rice Pilaf', 'Cucumber Mint Kachumber'],
        calories: 585,
        protein: 18,
        carbs: 79,
        fat: 17,
        fiber: 11,
        allergens: ['Dairy', 'Gluten'],
        ingredients: ['Baby Potatoes', 'Fennel', 'Chana Dal', 'Wheat Flour', 'Curd'],
        accentColor: '#d97706',
      },
      {
        id: 'sat-opt-fit',
        archetype: 'fit_protein',
        name: 'Fit & High-Protein Fuel',
        tagline: 'Chargrilled Soya Chaap & Spinach Dal',
        description: 'Tandoori marinated soya chaap pieces in charred onion tomato reduction, green spinach dal, 2 multigrain rotis, and high-protein salad.',
        dishes: ['Tandoori Soya Chaap Tikka', 'Palak Moong Dal', '2x Multigrain Rotis', 'Brown Basmati Rice', 'Sprouted Moong Salad'],
        calories: 515,
        protein: 34,
        carbs: 55,
        fat: 11,
        fiber: 14,
        allergens: ['Soy', 'Gluten'],
        ingredients: ['Soya Chaap', 'Spinach', 'Moong Dal', 'Multigrain Flour'],
        accentColor: '#16a34a',
      },
      {
        id: 'sat-opt-regional',
        archetype: 'regional',
        name: 'Regional: Rajasthani Dal Baati Churma',
        tagline: 'Weekend Royal Heritage Specialty',
        description: 'Panchmel dal simmered with cloves and desi ghee, 2 baked whole wheat baatis, crumbled jaggery churma, and garlic red chilli chutney.',
        dishes: ['Rajasthani Panchmel Dal', '2x Ghee Dipped Wheat Baatis', 'Crumbled Jaggery Churma (Sweet)', 'Lahsun Ki Teekhi Chutney', 'Chaas Cup'],
        calories: 640,
        protein: 20,
        carbs: 88,
        fat: 22,
        fiber: 12,
        allergens: ['Dairy', 'Gluten'],
        ingredients: ['Mixed Lentils', 'Whole Wheat', 'Desi Ghee', 'Garlic', 'Jaggery'],
        accentColor: '#ea580c',
      },
      {
        id: 'sat-opt-khichdi',
        archetype: 'khichdi_rescue',
        name: 'Khichdi Rescue (Gentle & Light)',
        tagline: 'Simple Weekend Detox Bowl',
        description: 'Light whole moong and brown rice khichdi with cumin tempering, probiotic dahi, and tender spiced pumpkin-free carrots.',
        dishes: ['Whole Moong Brown Rice Khichdi', 'Spiced Tender Carrots & Peas', 'Cultured Plain Dahi', 'Roasted Papad'],
        calories: 425,
        protein: 16,
        carbs: 65,
        fat: 8,
        fiber: 11,
        allergens: ['Dairy'],
        ingredients: ['Whole Moong', 'Brown Rice', 'Curd', 'Cumin'],
        accentColor: '#0284c7',
      },
    ],

    // Sunday
    6: [
      {
        id: 'sun-opt-classic',
        archetype: 'classic',
        name: 'Sunday Chef Special: Paneer Lababdar',
        tagline: 'Rich weekend indulgence with homestyle health',
        description: 'Grated and cubed fresh paneer in velvety cashewnut-onion gravy, Dal Bukhara, 3 soft butter phulkas, and aromatic jeera rice.',
        dishes: ['Paneer Lababdar Curry', 'Slow-Simmered Dal Bukhara', '3x Soft Butter Phulkas', 'Shahi Jeera Rice', 'Fresh Garden Salad'],
        calories: 630,
        protein: 24,
        carbs: 72,
        fat: 23,
        fiber: 8,
        allergens: ['Dairy', 'Gluten'],
        ingredients: ['Paneer', 'Cashew Paste', 'Black Lentils', 'Butter', 'Wheat Flour'],
        accentColor: '#d97706',
      },
      {
        id: 'sun-opt-fit',
        archetype: 'fit_protein',
        name: 'Fit & High-Protein Fuel',
        tagline: 'Grilled Paneer Steaks & Sprout Pilaf',
        description: 'Herb crusted paneer steaks with sauteed broccoli and bell peppers, lemon coriander protein soup, and quinoa sprout pilaf.',
        dishes: ['Herb Crusted Grilled Paneer Steaks', 'Lemon Coriander Lentil Broth', 'Warm Quinoa & Sprout Pilaf', '2x Ragi Rotis', 'Beetroot Slaw'],
        calories: 520,
        protein: 31,
        carbs: 52,
        fat: 16,
        fiber: 13,
        allergens: ['Dairy'],
        ingredients: ['Paneer', 'Broccoli', 'Quinoa', 'Ragi', 'Bell Peppers'],
        accentColor: '#16a34a',
      },
      {
        id: 'sun-opt-regional',
        archetype: 'regional',
        name: 'Regional: Hyderabadi Veg Biryani',
        tagline: 'Dum Cooked Fragrant Saffron Biryani',
        description: 'Layered basmati rice with marinated seasonal vegetables, mint, caramelized onions and saffron, served with spicy Mirchi Ka Salan and cooling raita.',
        dishes: ['Hyderabadi Dum Veg Biryani', 'Hyderabadi Mirchi Ka Salan', 'Burani Garlic Raita', 'Roasted Papadum', 'Fresh Gulab Jamun (1 pc)'],
        calories: 620,
        protein: 17,
        carbs: 85,
        fat: 20,
        fiber: 9,
        allergens: ['Dairy', 'Gluten'],
        ingredients: ['Basmati Rice', 'Saffron', 'Mint', 'Green Chillies', 'Curd'],
        accentColor: '#ea580c',
      },
      {
        id: 'sun-opt-khichdi',
        archetype: 'khichdi_rescue',
        name: 'Khichdi Rescue (Gentle & Light)',
        tagline: 'Weekend Digestive Rest Bowl',
        description: 'Moong dal and oats khichdi with roasted cumin, accompanied by fresh chilled chaas and roasted potato wedges.',
        dishes: ['Oats & Yellow Moong Khichdi', 'Chilled Roasted Jeera Chaas', 'Crisp Jeera Aloo', 'Roasted Papad'],
        calories: 415,
        protein: 16,
        carbs: 64,
        fat: 8,
        fiber: 10,
        allergens: ['Dairy'],
        ingredients: ['Oats', 'Yellow Moong', 'Curd', 'Cumin'],
        accentColor: '#0284c7',
      },
    ],
  };

  return optionsMap[dayIndex] || optionsMap[0];
};

export const generateWeeklySchedule = (): DaySchedule[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dates = ['Nov 3', 'Nov 4', 'Nov 5', 'Nov 6', 'Nov 7', 'Nov 8', 'Nov 9'];
  const dateStrs = ['2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06', '2026-11-07', '2026-11-08', '2026-11-09'];

  return days.map((dayName, idx) => {
    const options = buildDayOptions(idx);
    
    // On Wednesday (idx = 2), auto-swap was triggered because Classic Thali has Karela!
    // The engine automatically swapped to Fit & High-Protein (Tofu Matar)
    const isWed = idx === 2;
    const isToday = idx === 0; // Monday is active/today

    const selectedLunchId = isWed ? 'wed-opt-fit' : options[0].id;
    const selectedDinnerId = options[1].id;

    return {
      dateStr: dateStrs[idx],
      dayOfWeek: dayName,
      displayDate: dates[idx],
      isToday: isToday,
      isPast: false,
      isLocked: false,
      cutOffDisplay: '8:00 PM Tonight',
      availableOptions: options,
      lunch: {
        selectedOptionId: selectedLunchId,
        status: 'scheduled',
        addOns: isToday ? [{ item: ADD_ON_CATALOG[0], quantity: 1 }] : [],
        wasAutoSwapped: isWed,
        autoSwapOriginalArchetype: isWed ? 'Classic Homestyle Thali' : undefined,
        autoSwapReason: isWed ? 'Classic menu had Karela (Bitter Gourd) which is in your Dislike Blacklist. Auto-swapped to Fit & Protein.' : undefined,
        deliverySlot: '12:45 PM - 1:15 PM',
      },
      dinner: {
        selectedOptionId: selectedDinnerId,
        status: 'scheduled',
        addOns: [],
        deliverySlot: '7:45 PM - 8:15 PM',
      },
    };
  });
};

export interface KitchenProductionStat {
  date: string;
  totalTiffins: number;
  cutOffLocked: boolean;
  lockTime: string;
  breakdown: {
    classic: { count: number; percentage: number; dishSummary: string };
    fitProtein: { count: number; percentage: number; dishSummary: string };
    regional: { count: number; percentage: number; dishSummary: string };
    khichdiRescue: { count: number; percentage: number; dishSummary: string };
  };
  dietaryBadges: {
    pureJain: number;
    glutenFreeFlour: number;
    mildSpiceOnly: number;
    extraProteinAddons: number;
  };
  sampleLabels: {
    id: string;
    customerName: string;
    company: string;
    deliveryAddress: string;
    mealArchetype: string;
    badge: string;
    addons: string[];
    qrCodeMock: string;
  }[];
}

export const MOCK_KITCHEN_DATA: KitchenProductionStat = {
  date: 'Tomorrow, Tuesday Nov 4',
  totalTiffins: 294,
  cutOffLocked: false,
  lockTime: 'Locks at 8:00 PM Tonight',
  breakdown: {
    classic: { count: 146, percentage: 50, dishSummary: 'Adraki Aloo Gobhi & Moong Dal' },
    fitProtein: { count: 92, percentage: 31, dishSummary: 'Herb-Seared Paneer & Edamame' },
    regional: { count: 42, percentage: 14, dishSummary: 'Kathiyawadi Sev Tameta Nu Shaak' },
    khichdiRescue: { count: 14, percentage: 5, dishSummary: 'Palak Moong Dal Khichdi' },
  },
  dietaryBadges: {
    pureJain: 18,
    glutenFreeFlour: 24,
    mildSpiceOnly: 38,
    extraProteinAddons: 52,
  },
  sampleLabels: [
    {
      id: 'LBL-401',
      customerName: 'Aditya Sharma',
      company: 'Google / DLF Cyber City Tower B',
      deliveryAddress: 'Floor 7, Desk 7-C21',
      mealArchetype: 'Fit & High-Protein Fuel',
      badge: 'High-Protein 29g',
      addons: ['1x Roasted Jeera Chaas'],
      qrCodeMock: 'BOX-DLF-0912',
    },
    {
      id: 'LBL-402',
      customerName: 'Priya Iyer',
      company: 'McKinsey & Co',
      deliveryAddress: 'Tower 8, Reception Pod 2',
      mealArchetype: 'Regional: Kathiyawadi',
      badge: 'Jain Friendly (No Onion/Garlic)',
      addons: ['2x Extra Bajra Rotla'],
      qrCodeMock: 'BOX-MCK-1823',
    },
    {
      id: 'LBL-403',
      customerName: 'Vikram Mehta',
      company: 'Zomato HQ, Sector 44',
      deliveryAddress: 'Floor 3, Product Bay',
      mealArchetype: 'Khichdi Rescue (Gentle)',
      badge: 'Mild Spice · Probiotic Dahi',
      addons: [],
      qrCodeMock: 'BOX-ZOM-4411',
    },
  ],
};

export const MOCK_KITCHEN_PROFILE = {
  kitchenId: 'KITCHEN-GGN-04',
  kitchenName: 'Annapurna Rasoi Cloud Kitchen Hub #4',
  ownerName: 'Chef Rajeshwar Sharma',
  fssaiNumber: '10824005001239',
  cluster: 'DLF Cyber City & Sector 44 Cluster',
  rating: 4.88,
  dailyCapacity: 350,
  activeSubscribersServed: 294,
  payoutRatePerDabba: 85, // ₹85 paid directly to kitchen per delivered box
  totalWeeklyEarnings: 124950, // ₹1,24,950 per week
};

export const MOCK_WHOLESALE_PROCUREMENT: import('../types').WholesaleIngredientItem[] = [
  { id: 'ing-1', name: 'Fresh Malai Paneer (Dairy Wholesale)', requiredQuantity: 18.5, unit: 'kg', category: 'dairy_protein', procured: true, estimatedCost: 5920 },
  { id: 'ing-2', name: 'High-Protein Defatted Soya Chunks', requiredQuantity: 9.0, unit: 'kg', category: 'dairy_protein', procured: true, estimatedCost: 1080 },
  { id: 'ing-3', name: 'MP Sharbati Whole Wheat Atta', requiredQuantity: 36.0, unit: 'kg', category: 'grains_flour', procured: true, estimatedCost: 1620 },
  { id: 'ing-4', name: 'Toor Dal & Washed Moong Dal', requiredQuantity: 14.0, unit: 'kg', category: 'grains_flour', procured: false, estimatedCost: 2100 },
  { id: 'ing-5', name: 'Fresh Cauliflower (Gobhi) & Potatoes', requiredQuantity: 26.0, unit: 'kg', category: 'produce', procured: false, estimatedCost: 1040 },
  { id: 'ing-6', name: 'Desi Hybrid Red Tomatoes', requiredQuantity: 22.0, unit: 'kg', category: 'produce', procured: true, estimatedCost: 880 },
  { id: 'ing-7', name: 'Fresh Mint, Coriander & Green Chilies', requiredQuantity: 4.5, unit: 'kg', category: 'produce', procured: false, estimatedCost: 450 },
  { id: 'ing-8', name: 'Cold-Pressed Mustard & Groundnut Oil', requiredQuantity: 8.0, unit: 'L', category: 'spices_oil', procured: true, estimatedCost: 1440 },
];

export const MOCK_DELIVERY_CLUSTERS: import('../types').DeliveryClusterRoute[] = [
  {
    id: 'ROUTE-CYBER-B',
    towerName: 'DLF Cyber City — Tower B & Building 8',
    clusterArea: 'Phase 3, Cyber City',
    totalDabbas: 94,
    floorBreakdown: 'Fl 2 (18), Fl 4 (26), Fl 7 (32), Fl 9 (18)',
    runnerName: 'Rameshwar Dabbawala (Lead Host)',
    vehicleType: 'Electric Cargo Van #DL-04',
    dispatchTime: '11:45 AM',
    status: 'in_transit',
  },
  {
    id: 'ROUTE-CYBER-C',
    towerName: 'DLF Cyber City — Tower C & Forum Pods',
    clusterArea: 'Phase 3, Cyber City',
    totalDabbas: 86,
    floorBreakdown: 'Fl 3 (24), Fl 5 (30), Fl 8 (32)',
    runnerName: 'Suraj Pal (Dabba Runner)',
    vehicleType: 'Electric Cargo Scooter #HR-26',
    dispatchTime: '11:55 AM',
    status: 'packing',
  },
  {
    id: 'ROUTE-SEC-44',
    towerName: 'Sector 44 Tech Park & Zomato HQ Bay',
    clusterArea: 'Sector 44 Commercial Hub',
    totalDabbas: 68,
    floorBreakdown: 'Fl 1 (20), Fl 3 (28), Fl 4 (20)',
    runnerName: 'Vikas Yadav (Dabba Runner)',
    vehicleType: 'Electric Cargo Van #DL-09',
    dispatchTime: '12:05 PM',
    status: 'packing',
  },
  {
    id: 'ROUTE-HORIZON',
    towerName: 'One Horizon Center — Golf Course Road',
    clusterArea: 'Golf Course Road Hub',
    totalDabbas: 46,
    floorBreakdown: 'Fl 6 (16), Fl 11 (18), Fl 14 (12)',
    runnerName: 'Amit Sharma (Dabba Runner)',
    vehicleType: 'Electric Cargo Scooter #HR-55',
    dispatchTime: '12:15 PM',
    status: 'packing',
  },
];

export const MOCK_DABBAWALA_PARTNERS: import('../types').DabbawalaPartner[] = [
  {
    id: 'DABBA-GGN-01',
    name: 'Annapurna Dabbawala Circle #14',
    dabbawalaCircle: 'Gurugram Metro North Line · Mandal #14',
    fssaiNumber: '10824005001239',
    rating: 4.9,
    reviewsCount: 428,
    city: 'Gurugram',
    coveredAreas: [
      'DLF Cyber City (Buildings 5, 8, 9, 10, 14)',
      'Cyber Greens & Infinity Towers',
      'Udyog Vihar Phase 1 to 4',
      'DLF Gateway Tower',
      'One Horizon Center'
    ],
    coveredTowers: ['Building 10', 'Building 14', 'Cyber Greens', 'Infinity Tower A & B', 'One Horizon Center'],
    kitchenType: 'Homestyle Cloud Kitchen Hub',
    cuisineTag: 'North Indian Homestyle & Protein Balanced',
    menuSpecialties: ['Desi Sharbati Phulkas', 'Slow Simmered Dal Makhani', 'Matar Paneer', 'Cold-Pressed Mustard Oil Tadka'],
    dailyCapacity: 320,
    activeSubscribers: 306,
    isFull: false,
    slotsRemaining: 14,
    dispatchTime: '12:30 PM - 1:15 PM',
    pricePerMeal: 115,
    deliverySuccessRate: '99.8% On-Time',
    badges: ['Verified Dabbawala Trust', 'FSSAI Grade A+', 'Insulated Stainless Steel Dabbas'],
    sampleMenu: [
      {
        archetype: 'Classic Homestyle',
        subzi: 'Paneer Bhurji & Aloo Gobhi Adraki',
        dal: 'Panchmel Dal Tadka',
        bread: '3x Whole Wheat Phulkas',
        rice: 'Jeera Basmati Rice',
        extra: 'Fresh Cucumber Radish Kachumber'
      },
      {
        archetype: 'Fit & High-Protein',
        subzi: 'Soya Matar Protein Curry (32g P)',
        dal: 'Kulthi Horsegram Protein Dal',
        bread: '2x Multigrain Oats Roti',
        rice: 'Brown Rice Quinoa Blend',
        extra: 'Sprouted Moong Chana Bowl'
      },
      {
        archetype: 'Khichdi Comfort',
        subzi: 'Mild Jeera Aloo',
        dal: 'Spinach Moong Dal Khichdi',
        bread: 'Papad Roll',
        rice: 'Infused Moong Grain',
        extra: 'Sweet Fresh Curd'
      }
    ]
  },
  {
    id: 'DABBA-BOM-02',
    name: 'Girnar Kathiyawadi & Satvik Dabbawala Hub',
    dabbawalaCircle: 'Bandra-BKC & Lower Parel Dabbawala Union',
    fssaiNumber: '11523007008891',
    rating: 5.0,
    reviewsCount: 684,
    city: 'Mumbai',
    coveredAreas: [
      'Bandra Kurla Complex (BKC G-Block)',
      'Lower Parel (One World Center)',
      'Kamala Mills & Peninsula Corporate Park',
      'Dadar West & Prabhadevi Hub',
      'Bandra East Govt Colony'
    ],
    coveredTowers: ['Godrej BKC', 'Maker Maxity', 'One World Center', 'Peninsula Tower', 'IL&FS Corporate'],
    kitchenType: 'Authentic Gujarati & Kathiyawadi Rasoi',
    cuisineTag: 'Kathiyawadi, Jain Satvik & Gujarati',
    menuSpecialties: ['Sev Tameta Shaak', 'Gujarati Kadhi with Jaggery', 'Ringan No Oro', 'Bajra Rotla with Desi Ghee', 'Masala Chaas'],
    dailyCapacity: 350,
    activeSubscribers: 350,
    isFull: true,
    slotsRemaining: 0,
    dispatchTime: '12:15 PM - 1:00 PM',
    pricePerMeal: 115,
    deliverySuccessRate: '99.9% (Six Sigma Certified)',
    badges: ['Mumbai Dabbawala Union (Est. 1890)', 'Strict Jain / Satvik Segregation', 'Zero Plastic Guarantee'],
    sampleMenu: [
      {
        archetype: 'Regional Kathiyawadi',
        subzi: 'Kathiyawadi Sev Tameta & Ringan Oro',
        dal: 'Sweet Tangy Gujarati Kadhi',
        bread: '2x Thick Bajra Rotla with Makhan',
        rice: 'Surti Kolam Rice',
        extra: 'Chilled Spiced Buttermilk'
      },
      {
        archetype: 'Classic Thali',
        subzi: 'Bhindi Masala & Rasawala Bateta',
        dal: 'Khatti Meethi Toor Dal',
        bread: '4x Soft Phulkas (Cow Ghee)',
        rice: 'Steamed Rice',
        extra: 'Gor Keri Pickle'
      },
      {
        archetype: 'Khichdi Comfort',
        subzi: 'Sukhi Bhaji (Batata Jeera)',
        dal: 'Vaghareli Moong Dal Khichdi',
        bread: 'Roasted Khakhra Crisp',
        rice: 'Moong Chawal Harmony',
        extra: 'Probiotic Curd & Methi Sambharo'
      }
    ]
  },
  {
    id: 'DABBA-BLR-03',
    name: 'FitFuel Corporate Dabba Fleet',
    dabbawalaCircle: 'Outer Ring Road & Bellandur Tech Corridor',
    fssaiNumber: '11224003004451',
    rating: 4.85,
    reviewsCount: 312,
    city: 'Bengaluru',
    coveredAreas: [
      'Outer Ring Road (ORR Bellandur)',
      'Prestige Tech Park & Ecospace',
      'Embassy TechVillage (ETV)',
      'Cessna Business Park',
      'Kadubeesanahalli & Marathahalli'
    ],
    coveredTowers: ['Ecospace Campus 1-5', 'Prestige Tech Park Jupiter/Vega', 'ETV Block 7', 'Cessna Block B', 'RMZ Ecoworld'],
    kitchenType: 'High-Protein Macro Calculated Kitchen',
    cuisineTag: 'High-Protein Fitness & Balanced Bowls',
    menuSpecialties: ['30g+ Macro Tracked Protein', 'No Refined Flour / Sugar', 'Cold Pressed Oils Only', 'Superfood Millet Rotis'],
    dailyCapacity: 280,
    activeSubscribers: 254,
    isFull: false,
    slotsRemaining: 26,
    dispatchTime: '12:45 PM - 1:30 PM',
    pricePerMeal: 120,
    deliverySuccessRate: '99.5% On-Time',
    badges: ['Certified Nutritionist Backed', 'Clean Macros', 'Eco-Fiber Tiffin Inserts'],
    sampleMenu: [
      {
        archetype: 'Fit & High-Protein',
        subzi: 'Grilled Tofu Matar / Low-Fat Paneer Bhurji (34g P)',
        dal: 'High-Fiber Sprouted Horsegram Dal',
        bread: '2x Jowar-Oats Phulkas',
        rice: 'Red Rice & Quinoa Pilaf',
        extra: 'Boiled Chickpea Sunflower Seed Salad'
      },
      {
        archetype: 'Classic Homestyle',
        subzi: 'Methi Malai Matar & Jeera Aloo',
        dal: 'Yellow Moong Tadka',
        bread: '3x Whole Wheat Rotis',
        rice: 'Steamed Sona Masoori Rice',
        extra: 'Carrot Beetroot Crunch'
      }
    ]
  },
  {
    id: 'DABBA-BOM-04',
    name: 'Shree Ganesh Mumbai Dabbawala Mandal #03',
    dabbawalaCircle: 'South Mumbai Heritage Line (Churchgate - CST)',
    fssaiNumber: '11522001000912',
    rating: 5.0,
    reviewsCount: 946,
    city: 'Mumbai',
    coveredAreas: [
      'Nariman Point (Maker Chambers, Express Towers)',
      'Fort & Kala Ghoda Business District',
      'Ballard Estate Shipping Hub',
      'Churchgate & Marine Lines'
    ],
    coveredTowers: ['Maker Chambers IV & V', 'Express Towers', 'Nariman Bhavan', 'Free Press Journal House', 'Earnest House'],
    kitchenType: 'Traditional Maharashtrian & Mumbai Thali',
    cuisineTag: 'Authentic Maharashtrian & Coastal Homestyle',
    menuSpecialties: ['Varan Bhaat with Pure Sajuk Toop', 'Pithla Bhakri', 'Matki Usal', 'Tomato Saar', 'Koshimbir'],
    dailyCapacity: 400,
    activeSubscribers: 400,
    isFull: true,
    slotsRemaining: 0,
    dispatchTime: '12:00 PM - 12:45 PM',
    pricePerMeal: 110,
    deliverySuccessRate: '99.99% Six Sigma Gold Standard',
    badges: ['Authentic Mumbai Dabbawala Trust', 'Colour-Code Box Routing', 'Zero Emission Train Logistics'],
    sampleMenu: [
      {
        archetype: 'Regional Maharashtrian',
        subzi: 'Zunka Bhakri & Sprouted Matki Usal',
        dal: 'Amti Dal (Kokum & Goda Masala)',
        bread: '2x Hot Jowar Bhakri',
        rice: 'Varan Bhaat with Desi Ghee',
        extra: 'Khamang Kakdi Koshimbir'
      },
      {
        archetype: 'Classic Homestyle',
        subzi: 'Flower Vatana Bhaaji (Cauliflower Peas)',
        dal: 'Katachi Toor Dal',
        bread: '3x Soft Chapati with Ghee',
        rice: 'Jeera Steamed Bhaat',
        extra: 'Limbu Mirchi Thecha'
      }
    ]
  },
  {
    id: 'DABBA-NOI-05',
    name: 'Rasoi Ghar Express Hub',
    dabbawalaCircle: 'Noida Sector 62 & Expressway IT Corridor',
    fssaiNumber: '12723004006173',
    rating: 4.8,
    reviewsCount: 219,
    city: 'Noida',
    coveredAreas: [
      'Sector 62 IT Hub & Institutional Area',
      'Sector 63 Commercial Park',
      'Noida-Greater Noida Expressway (Sector 125 - 135)',
      'Stellar IT Park & Logix Cyber Park'
    ],
    coveredTowers: ['Candor TechSpace Tower 1-4', 'Stellar IT Park Block A', 'Advant Navis Tower B', 'Logix Park'],
    kitchenType: 'Homestyle Punjabi & North Indian Thali',
    cuisineTag: 'Punjabi Homestyle & Slow-Cooked Dals',
    menuSpecialties: ['Maa Ki Daal', 'Pindi Chole', 'Ghar Ki Gobhi Adraki', 'Fluffy Tawa Phulkas', 'Mint Boondi Raita'],
    dailyCapacity: 220,
    activeSubscribers: 213,
    isFull: false,
    slotsRemaining: 7,
    dispatchTime: '12:40 PM - 1:20 PM',
    pricePerMeal: 115,
    deliverySuccessRate: '99.4% On-Time',
    badges: ['FSSAI Hygiene Rated 5★', 'Low Sodium Option', 'Tamper-Evident Thermal Seal'],
    sampleMenu: [
      {
        archetype: 'Classic Homestyle',
        subzi: 'Punjabi Kadhi Pakora & Aloo Shimla Mirch',
        dal: 'Dhabe Wali Yellow Dal Fry',
        bread: '3x Tawa Phulkas',
        rice: 'Steamed Basmati Rice',
        extra: 'Fresh Sirka Onion Salad'
      },
      {
        archetype: 'Khichdi Comfort',
        subzi: 'Dahi Aloo (Mild Spiced)',
        dal: 'Moong Dal Khichdi with Desi Ghee',
        bread: 'Roasted Papad',
        rice: 'Khichdi Grain Medley',
        extra: 'Thick Punjabi Dahi'
      }
    ]
  },
  {
    id: 'DABBA-BOM-06',
    name: 'Marwar Khichdi & Jain Tiffin Network',
    dabbawalaCircle: 'Andheri East & MIDC-SEEPZ Fleet',
    fssaiNumber: '11523008007712',
    rating: 4.92,
    reviewsCount: 388,
    city: 'Mumbai',
    coveredAreas: [
      'Andheri East (MIDC Industrial Estate)',
      'SEEPZ Special Economic Zone',
      'Andheri-Kurla Road & Chakala Metro',
      'Solitaire Corporate Park & Times Square',
      'Powai Hiranandani Business Park'
    ],
    coveredTowers: ['Solitaire Park Bldg 1-6', 'Times Square Tower A', 'Boomerang Bldg', 'Dynasty Corporate', 'SEEPZ Gem Building'],
    kitchenType: '100% Strict Jain & Marwari Sattvic Rasoi',
    cuisineTag: '100% Strict Jain (No Root Veg, No Onion/Garlic)',
    menuSpecialties: ['No Onion No Garlic No Potato', 'Panchmel Dal', 'Gatte Ki Sabzi', 'Moong Mogar', 'Vaghareli Khichdi'],
    dailyCapacity: 200,
    activeSubscribers: 184,
    isFull: false,
    slotsRemaining: 16,
    dispatchTime: '12:20 PM - 1:05 PM',
    pricePerMeal: 115,
    deliverySuccessRate: '99.7% On-Time',
    badges: ['Dedicated 100% Jain Kitchen', 'Sanitized Stainless Steel Dabbas', 'Mumbai Dabbawala Express Delivery'],
    sampleMenu: [
      {
        archetype: 'Regional Jain Marwari',
        subzi: 'Rajasthani Gatte Ki Sabzi & Raw Banana Masala',
        dal: 'Panchmel Dal Tadka (No Onion/Garlic)',
        bread: '3x Soft Phulkas with Cow Ghee',
        rice: 'Steamed Rice with Cumin',
        extra: 'Sweet Boondi or Mint Chutney'
      },
      {
        archetype: 'Khichdi Comfort',
        subzi: 'Lauki Tamatar Ki Sabzi',
        dal: 'Yellow Moong Khichdi (Jain Style)',
        bread: 'Papad Roll',
        rice: 'Gentle Moong Khichdi',
        extra: 'Fresh Cow Milk Dahi'
      }
    ]
  }
];


