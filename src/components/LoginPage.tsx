import React, { useState } from 'react';
import { AuthUser, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { 
  ChefHat, 
  Mail, 
  Lock, 
  Phone, 
  Building2, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  KeyRound, 
  User, 
  X, 
  Eye, 
  EyeOff 
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  onClose?: () => void;
  initialRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onClose,
  initialRole = 'customer',
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email');

  // Sign in fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [companyName, setCompanyName] = useState('Google India');
  const [officeTower, setOfficeTower] = useState('DLF Cyber City Tower B');
  const [deskFloor, setDeskFloor] = useState('Floor 7, Desk 7-C21');

  // Status feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // 1-Click Quick Demo Login
  const handleQuickDemoLogin = (demoUser: AuthUser) => {
    setIsSubmitting(true);
    setErrorMsg('');
    setTimeout(() => {
      setSuccessMsg(`Logged in as ${demoUser.name}`);
      setTimeout(() => {
        onLoginSuccess(demoUser);
      }, 700);
    }, 400);
  };

  // Handle Sign In Submit
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (loginMethod === 'otp' && !otpSent) {
      if (!phone.trim() || phone.length < 10) {
        setErrorMsg('Please enter a valid 10-digit mobile number.');
        return;
      }
      setOtpSent(true);
      setSuccessMsg('OTP sent to ' + phone + ' (Use 123456 for demo)');
      return;
    }

    if (loginMethod === 'otp' && otpSent) {
      if (otpCode.trim() !== '123456' && otpCode.trim() !== '999999') {
        setErrorMsg('Invalid OTP. Please enter 123456 for instant demo sign-in.');
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const initials = (email.split('@')[0] || 'User')
        .slice(0, 2)
        .toUpperCase();

      const user: AuthUser = {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: email ? email.split('@')[0].replace('.', ' ') : 'Corporate Subscriber',
        email: email || 'subscriber@cybercity.com',
        phone: phone || '+91 98765 43210',
        role: selectedRole,
        companyName: selectedRole === 'customer' ? 'Corporate Hub' : 'Annapurna Cloud Kitchen Hub #4',
        officeTower: selectedRole === 'customer' ? 'DLF Cyber City Building 10' : 'Gurugram Metro North Line',
        deskFloor: 'Floor 4, Desk D-18',
        avatarInitials: initials || 'FD',
        isAuthenticated: true,
      };

      setSuccessMsg(`Welcome to FlexDabba, ${user.name}!`);
      setTimeout(() => {
        onLoginSuccess(user);
      }, 700);
    }, 600);
  };

  // Handle Sign Up Submit
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !signupEmail.trim()) {
      setErrorMsg('Please fill in your full name and corporate email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const initials = fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

      const newUser: AuthUser = {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: fullName,
        email: signupEmail,
        phone: signupPhone || '+91 98000 11223',
        role: selectedRole,
        companyName: companyName,
        officeTower: officeTower,
        deskFloor: deskFloor,
        avatarInitials: initials || 'FD',
        isAuthenticated: true,
      };

      setSuccessMsg(`Account created for ${newUser.name}! Activating subscription portal...`);
      setTimeout(() => {
        onLoginSuccess(newUser);
      }, 700);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full border border-stone-200/90 shadow-2xl overflow-hidden flex flex-col md:flex-row my-8">
        {/* Close Button (if dismissed) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-700 bg-white/80 hover:bg-stone-100 rounded-full transition-colors cursor-pointer shadow-xs"
            title="Close login"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Left Side: Brand Story, Six Sigma Dabbawala Trust */}
        <div className="md:w-5/12 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 p-6 sm:p-8 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800">
          <div className="space-y-6">
            {/* Wordmark */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  FlexDabba
                </span>
                <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase mt-1">
                  Smart Tiffin Network
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
                Authentic Homestyle Lunch. Zero Rigid Menus.
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                Log in to customize your daily meal archetype, activate automatic ingredient blacklists, and manage your 0-waste wallet credits.
              </p>
            </div>

            {/* Dabbawala Six Sigma Guarantee */}
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Six Sigma Dabbawala Delivery</span>
              </div>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                Hot stainless steel tiffins delivered right to your corporate desk or reception pod with 99.8% on-time accuracy.
              </p>
            </div>

            {/* Corporate Hubs */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Serving Corporate Campuses In:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-300">
                <span className="bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700">DLF Cyber City</span>
                <span className="bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700">Bandra-Kurla Complex</span>
                <span className="bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700">Outer Ring Road BLR</span>
                <span className="bg-stone-800 px-2 py-0.5 rounded-md border border-stone-700">Candor TechSpace Noida</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Note */}
          <div className="pt-6 border-t border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>FSSAI Partnered & 100% Preservative-Free</span>
          </div>
        </div>

        {/* Right Side: Interactive Login / Sign Up Form */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Top Toggle: Sign In vs Sign Up */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200/80 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    authMode === 'signin'
                      ? 'bg-white text-stone-950 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-white text-stone-950 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Role Toggle */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-stone-400 font-semibold hidden sm:inline text-[11px]">Role:</span>
                <button
                  type="button"
                  onClick={() => setSelectedRole(selectedRole === 'customer' ? 'kitchen' : 'customer')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    selectedRole === 'customer'
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : 'bg-stone-900 text-white border-stone-800'
                  }`}
                >
                  {selectedRole === 'customer' ? '👤 Corporate Subscriber' : '👨‍🍳 Kitchen / Dabbawala'}
                </button>
              </div>
            </div>

            {/* Error or Success Alerts */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Fast Demo Accounts Picker (Saves typing for testing!) */}
            <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                  <span>1-Click Instant Demo Login:</span>
                </span>
                <span className="text-[10px] text-amber-700 font-medium">Click to test profile</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {DEMO_USERS.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleQuickDemoLogin(u)}
                    className="p-2 bg-white hover:bg-amber-100/60 rounded-xl border border-amber-200/90 text-left transition-all hover:shadow-2xs cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-bold text-stone-900 block truncate">{u.name}</span>
                      <span className="text-[10px] text-stone-500 block truncate">{u.companyName}</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-800 mt-1 uppercase tracking-wide">
                      {u.role === 'customer' ? 'Subscriber' : 'Kitchen Hub'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mode A: Sign In Form */}
            {authMode === 'signin' ? (
              <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
                {/* Method Selector: Email vs Mobile OTP */}
                <div className="flex items-center gap-4 text-xs font-semibold text-stone-600">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="loginMethod"
                      checked={loginMethod === 'email'}
                      onChange={() => {
                        setLoginMethod('email');
                        setOtpSent(false);
                      }}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Work Email & Password</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="loginMethod"
                      checked={loginMethod === 'otp'}
                      onChange={() => setLoginMethod('otp')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Mobile Number + OTP</span>
                  </label>
                </div>

                {loginMethod === 'email' ? (
                  <>
                    <div className="space-y-1">
                      <label className="font-bold text-stone-700">Corporate Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. aditya@company.com"
                          className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 placeholder:text-stone-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-700">Password</label>
                        <button
                          type="button"
                          onClick={() => setSuccessMsg('Password reset instructions sent to work email.')}
                          className="text-[11px] text-amber-700 hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="font-bold text-stone-700">Registered Mobile Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 98112 34567"
                          className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900"
                        />
                      </div>
                    </div>

                    {otpSent && (
                      <div className="space-y-1 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-stone-700">Enter 6-Digit OTP</label>
                          <span className="text-[11px] text-amber-700 font-medium">Demo Code: 123456</span>
                        </div>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="123456"
                          className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-center text-base tracking-widest font-extrabold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                        />
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-850 hover:to-stone-750 text-white font-bold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{loginMethod === 'otp' && !otpSent ? 'Send Login OTP' : 'Sign In to FlexDabba'}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            ) : (
              /* Mode B: Sign Up / New Corporate Subscriber Registration */
              <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aditya Sharma"
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Corporate Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="aditya@company.com"
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Mobile Number (For Desk SMS)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="+91 98112 34567"
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Company Name</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Google, Zomato, Deloitte"
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Office Tech Park / Building</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={officeTower}
                        onChange={(e) => setOfficeTower(e.target.value)}
                        placeholder="e.g. DLF Cyber City Tower B"
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700">Floor & Desk / Pod #</label>
                    <input
                      type="text"
                      value={deskFloor}
                      onChange={(e) => setDeskFloor(e.target.value)}
                      placeholder="e.g. Floor 7, Desk 7-C21"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Create Account & Start Subscription</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="pt-2 text-center text-[11px] text-stone-400 border-t border-stone-100">
            By signing in, you agree to FlexDabba's Daily 8:00 PM Cut-off Terms and Dabbawala Service Guidelines.
          </div>
        </div>
      </div>
    </div>
  );
};
