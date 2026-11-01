/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  generateWeeklySchedule, 
  INITIAL_DIETARY_PROFILE, 
  INITIAL_SUBSCRIPTION, 
  INITIAL_TRANSACTIONS,
  DEMO_USERS 
} from './data/mockData';
import { AuthUser, DaySchedule, DietaryProfile, SubscriptionInfo, UserRole, WalletTransaction } from './types';
import { Header } from './components/Header';
import { ProblemSolutionBanner } from './components/ProblemSolutionBanner';
import { WeeklyMenuBoard } from './components/WeeklyMenuBoard';
import { DietaryProfileView } from './components/DietaryProfileView';
import { WalletAndEconomicsView } from './components/WalletAndEconomicsView';
import { KitchenPortalView } from './components/KitchenPortalView';
import { SubscribeModal } from './components/SubscribeModal';
import { ManagePlanModal } from './components/ManagePlanModal';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser>(DEMO_USERS[0]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [activeTab, setActiveTab] = useState<'menu' | 'profile' | 'wallet' | 'kitchen'>('menu');
  const [schedule, setSchedule] = useState<DaySchedule[]>(generateWeeklySchedule);
  const [dietaryProfile, setDietaryProfile] = useState<DietaryProfile>(INITIAL_DIETARY_PROFILE);
  const [subscription, setSubscription] = useState<SubscriptionInfo>(INITIAL_SUBSCRIPTION);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isManagePlanOpen, setIsManagePlanOpen] = useState(false);

  // Update a single day's schedule
  const handleUpdateDaySchedule = (updatedDay: DaySchedule) => {
    setSchedule(prev => prev.map(d => (d.dateStr === updatedDay.dateStr ? updatedDay : d)));
  };

  // Add credit to wallet when user pauses a day
  const handleCreditWallet = (amount: number, reason: string) => {
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount,
      type: 'credit',
      description: reason,
      reference: 'Auto-Pause Refund',
    };

    setTransactions(prev => [newTx, ...prev]);
    setSubscription(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
    }));
  };

  // Run simulation and automatically swap matching meals in schedule
  const handleRunSimulation = (newProfile: DietaryProfile) => {
    setSchedule(prev =>
      prev.map(day => {
        const classicOpt = day.availableOptions.find(o => o.archetype === 'classic');
        if (!classicOpt) return day;

        const hasBlacklisted = newProfile.blacklistedIngredients.some(b =>
          classicOpt.ingredients.some(ing => ing.toLowerCase().includes(b.split(' ')[0].toLowerCase()))
        );

        if (hasBlacklisted) {
          // Switch to fit_protein or regional
          const alternative = day.availableOptions.find(o => o.archetype === 'fit_protein') || day.availableOptions[1];
          return {
            ...day,
            lunch: {
              ...day.lunch,
              selectedOptionId: alternative.id,
              wasAutoSwapped: true,
              autoSwapOriginalArchetype: classicOpt.name,
              autoSwapReason: `Detected ingredients matching your blacklist in Classic Thali. Auto-swapped to ${alternative.name}.`,
            },
          };
        }
        return day;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 font-sans">
      {/* Universal Top Bar with Two-Sided Platform Role Switcher */}
      <Header
        userRole={userRole}
        onSelectRole={setUserRole}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSubscribeModal={() => setIsSubscribeOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => setCurrentUser({ ...currentUser, isAuthenticated: false })}
        currentUser={currentUser}
        mealsRemaining={subscription.mealsRemaining}
      />

      {/* Problem & Solution Context Banner */}
      <ProblemSolutionBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {userRole === 'kitchen' || activeTab === 'kitchen' ? (
          <KitchenPortalView
            onOpenSubscribe={() => setIsSubscribeOpen(true)}
            onSelectDabbawala={(partner) => {
              setSubscription(prev => ({
                ...prev,
                costPerMeal: partner.pricePerMeal,
                deliveryAddress: partner.coveredAreas[0] || prev.deliveryAddress,
              }));
              setIsSubscribeOpen(true);
            }}
          />
        ) : (
          <>
            {activeTab === 'menu' && (
              <WeeklyMenuBoard
                schedule={schedule}
                dietaryProfile={dietaryProfile}
                costPerMeal={subscription.costPerMeal}
                walletBalance={subscription.walletBalance}
                onUpdateDaySchedule={handleUpdateDaySchedule}
                onCreditWallet={handleCreditWallet}
                onOpenDietaryProfile={() => setActiveTab('profile')}
              />
            )}

            {activeTab === 'profile' && (
              <DietaryProfileView
                profile={dietaryProfile}
                schedule={schedule}
                onSaveProfile={setDietaryProfile}
                onRunSimulation={handleRunSimulation}
              />
            )}

            {activeTab === 'wallet' && (
              <WalletAndEconomicsView
                subscription={subscription}
                transactions={transactions}
                onAddCredit={(amt, r) => handleCreditWallet(amt, r)}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom-most Footer: Single visible subtitle asserting authentic Dabbawala logistics */}
      <footer className="bg-white border-t border-stone-200 mt-12 py-8 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-stone-700 font-semibold tracking-wide text-xs sm:text-sm">
            Powered by Mumbai & Gurugram certified Dabbawala logistics networks — Six Sigma operational precision delivering fresh, homestyle dabbas straight to your desk every workday.
          </p>
        </div>
      </footer>

      {/* Production Subscription & Renewal Checkout Modal */}
      <SubscribeModal
        subscription={subscription}
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSaveSubscription={(newSub) => {
          setSubscription(newSub);
          const newTx: WalletTransaction = {
            id: `tx-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            amount: newSub.costPerMeal * newSub.mealsRemaining,
            type: 'debit',
            description: `Activated ${newSub.planName} plan (${newSub.mealsRemaining} meals)`,
            reference: 'Subscription Pass',
          };
          setTransactions(prev => [newTx, ...prev]);
        }}
      />

      {/* Plan Details & Management Modal */}
      <ManagePlanModal
        subscription={subscription}
        isOpen={isManagePlanOpen}
        onClose={() => setIsManagePlanOpen(false)}
        onUpdateSubscription={setSubscription}
      />

      {/* Login & Corporate Authentication Modal / Page */}
      {isLoginOpen && (
        <LoginPage
          initialRole={userRole}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setUserRole(user.role);
            setIsLoginOpen(false);
            if (user.officeTower) {
              setSubscription(prev => ({
                ...prev,
                deliveryAddress: user.officeTower,
                officeDeskInfo: user.deskFloor,
              }));
            }
          }}
        />
      )}
    </div>
  );
}
