'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    signOut();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🧘</span>
              <span className="text-xl font-bold text-slate-700">Mindful Minutes</span>
            </Link>
          </div>

          {/* Navigation Links - Only show when signed in */}
          <SignedIn>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/sessions"
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                Sessions
              </Link>
              <Link
                href="/analytics"
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
              >
                Analytics
              </Link>
            </div>
          </SignedIn>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                + New Session
              </button>

              {/* Custom User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {user?.imageUrl ? (
                    <picture>
                      <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-emerald-600"
                      />
                    </picture>
                  ) : (
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 text-slate-600 font-medium hover:text-emerald-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}