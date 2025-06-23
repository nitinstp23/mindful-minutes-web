'use client';

import Link from 'next/link';
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Navigation() {
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
              <div className="border-2 border-emerald-600 rounded-full bg-white flex items-center justify-center">
                <UserButton />
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