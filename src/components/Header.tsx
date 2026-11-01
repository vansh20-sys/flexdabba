import React, { useState } from 'react';
import { ChefHat, Sparkles, User, UtensilsCrossed, CalendarCheck, LogIn, LogOut, ChevronDown, Building2 } from 'lucide-react';
import { AuthUser, UserRole } from '../types';

interface HeaderProps {
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  activeTab: 'menu' | 'profile' | 'wallet' | 'kitchen';
  onSelectTab: (tab: 'menu' | 'profile' | 'wallet' | 'kitchen') => void;
  onOpenSubscribeModal: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  currentUser: AuthUser;
  mealsRemaining: number;
}

export const Header: React.FC<HeaderProps> = ({
  userRole,
  onSelectRole,
  activeTab,
  onSelectTab,
  onOpenSubscribeModal,
  onOpenLogin,
  onLogout,
  currentUser,
  mealsRemaining,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => {
            onSelectRole('customer');
            onSelectTab('menu');
          }}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-xs">
            <ChefHat className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-stone-900 leading-none">
              FlexDabba
            </span>
            <span className="text-[10px] font-semibold text-amber-700 tracking-wider uppercase mt-0.5">
              {userRole === 'customer' ? 'Smart Tiffin Pass' : 'Kitchen & Dabbawala Hub'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Exactly 4 Clean Options on Client Interface) */}
        {userRole === 'customer' ? (
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
            <button
              onClick={() => onSelectTab('menu')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'menu'
                  ? 'text-amber-800 border-b-2 border-amber-600 font-bold'
                  : 'hover:text-stone-900'
              }`}
            >
              Daily Meals & Swaps
            </button>
            <button
              onClick={() => onSelectTab('profile')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'profile'
                  ? 'text-amber-800 border-b-2 border-amber-600 font-bold'
                  : 'hover:text-stone-900'
              }`}
            >
              Taste & Blacklist Guard
            </button>
            <button
              onClick={() => onSelectTab('wallet')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'wallet'
                  ? 'text-amber-800 border-b-2 border-amber-600 font-bold'
                  : 'hover:text-stone-900'
              }`}
            >
              0-Waste Wallet
            </button>
            <button
              onClick={() => onSelectTab('kitchen')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'kitchen'
                  ? 'text-amber-800 border-b-2 border-amber-600 font-bold'
                  : 'hover:text-stone-900'
              }`}
            >
              Dabbawalas & Delivery Reach
            </button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
            <span>Cloud Kitchen Production Mode (294 Dabbas Scheduled Tomorrow)</span>
          </div>
        )}

        {/* Zone 3: Role Switcher & Subscribe CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Platform Role Switcher */}
          <div className="flex items-center p-0.5 bg-stone-100 rounded-xl border border-stone-200/90 text-xs font-bold shadow-2xs">
            <button
              onClick={() => {
                onSelectRole('customer');
                if (activeTab === 'kitchen') onSelectTab('menu');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                userRole === 'customer'
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>
            <button
              onClick={() => {
                onSelectRole('kitchen');
                onSelectTab('kitchen');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                userRole === 'kitchen'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Kitchen Hub</span>
            </button>
          </div>

          {/* Meals Remaining Badge */}
          <button
            onClick={onOpenSubscribeModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-xl transition-all shadow-2xs tabular-nums cursor-pointer"
            title="Click to view subscription & renewal options"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{mealsRemaining} Meals Left</span>
          </button>

          {/* Primary CTA: Subscribe / Change Plan */}
          <button
            onClick={onOpenSubscribeModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span className="hidden xs:inline">Get Subscription</span>
            <span className="xs:hidden">Subscribe</span>
          </button>

          {/* User Account / Login Button */}
          {currentUser.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1 sm:pr-2.5 bg-stone-100 hover:bg-stone-200/70 border border-stone-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title={`${currentUser.name} (${currentUser.officeTower})`}
              >
                <div className="w-7 h-7 rounded-lg bg-stone-900 text-amber-300 flex items-center justify-center text-[10px] font-black uppercase">
                  {currentUser.avatarInitials}
                </div>
                <div className="hidden lg:flex flex-col text-left leading-none">
                  <span className="text-[11px] font-bold text-stone-900 truncate max-w-[85px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-stone-500 font-semibold truncate max-w-[85px]">
                    {currentUser.companyName.split(' ')[0]}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-stone-400 hidden sm:block" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-3 space-y-3 z-50 text-xs animate-in fade-in duration-100">
                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                    <span className="font-bold text-stone-900 block">{currentUser.name}</span>
                    <span className="text-stone-500 text-[11px] block">{currentUser.email}</span>
                    <div className="flex items-center gap-1 text-stone-600 text-[10px] pt-1">
                      <Building2 className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{currentUser.officeTower}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-stone-700 hover:bg-stone-100 font-semibold flex items-center justify-between cursor-pointer"
                    >
                      <span>Switch User / Account</span>
                      <LogIn className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-rose-700 hover:bg-rose-50 font-bold flex items-center justify-between cursor-pointer"
                    >
                      <span>Sign Out</span>
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl border border-stone-200 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-700" />
              <span>Log In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile sub-bar navigation: 4 Clean Tabs */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-100 px-2 py-2 overflow-x-auto text-xs bg-white">
        {userRole === 'customer' ? (
          <>
            <button
              onClick={() => onSelectTab('menu')}
              className={`px-2 py-1 whitespace-nowrap cursor-pointer ${
                activeTab === 'menu' ? 'text-amber-800 font-bold border-b-2 border-amber-600' : 'text-stone-500'
              }`}
            >
              Daily Meals
            </button>
            <button
              onClick={() => onSelectTab('profile')}
              className={`px-2 py-1 whitespace-nowrap cursor-pointer ${
                activeTab === 'profile' ? 'text-amber-800 font-bold border-b-2 border-amber-600' : 'text-stone-500'
              }`}
            >
              Taste Guard
            </button>
            <button
              onClick={() => onSelectTab('wallet')}
              className={`px-2 py-1 whitespace-nowrap cursor-pointer ${
                activeTab === 'wallet' ? 'text-amber-800 font-bold border-b-2 border-amber-600' : 'text-stone-500'
              }`}
            >
              0-Waste Wallet
            </button>
            <button
              onClick={() => onSelectTab('kitchen')}
              className={`px-2 py-1 whitespace-nowrap cursor-pointer ${
                activeTab === 'kitchen' ? 'text-amber-800 font-bold border-b-2 border-amber-600' : 'text-stone-500'
              }`}
            >
              Dabbawalas & Reach
            </button>
          </>
        ) : (
          <span className="text-[11px] font-bold text-amber-800 py-1">
            Kitchen Production Mode: 6 Modules Active
          </span>
        )}
      </div>
    </header>
  );
};
