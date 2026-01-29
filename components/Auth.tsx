'use client';

import { db } from '@/lib/db';
import { useState } from 'react';

function SignedInView() {
  const user = db.useUser();

  const handleSignOut = async () => {
    try {
      await db.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
        <span className="text-base sm:text-lg">👤</span>
        <span className="text-xs sm:text-sm font-medium text-white truncate max-w-[100px] sm:max-w-none">
          {user?.email || 'Guest User'}
        </span>
      </div>
      <button
        onClick={handleSignOut}
        className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm sm:text-base font-medium transition-colors backdrop-blur-sm"
      >
        Sign Out
      </button>
    </div>
  );
}

function SignedOutView() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      // Use guest auth for simplicity
      await db.auth.signInAsGuest();
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isSigningIn}
      className="px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm sm:text-base font-medium transition-colors backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSigningIn ? 'Signing In...' : 'Sign In'}
    </button>
  );
}

export default function Auth() {
  return (
    <>
      <db.SignedIn>
        <SignedInView />
      </db.SignedIn>
      <db.SignedOut>
        <SignedOutView />
      </db.SignedOut>
    </>
  );
}
