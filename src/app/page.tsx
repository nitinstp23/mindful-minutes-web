'use client';

import { useState } from 'react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const testimonials = [
  {
    name: "Sarah Chen",
    text: "Mindful Minutes transformed my daily routine. I've been consistent with meditation for 6 months now!",
    role: "Software Engineer"
  },
  {
    name: "Michael Torres",
    text: "The simple logging feature keeps me accountable. Love seeing my progress over time.",
    role: "Teacher"
  },
  {
    name: "Emma Williams",
    text: "Finally found a meditation app that's not overwhelming. Clean, simple, and effective.",
    role: "Designer"
  }
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const currentYear = new Date().getFullYear();

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-700 mb-6">
          <span className="text-emerald-600">🧘 Mindful</span> Minutes
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Track your meditation journey with simplicity and intention.
          Log your sessions, build consistency, and find your inner peace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignedOut>
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-colors uppercase">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-lg uppercase">
                  Create Account
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-lg uppercase">
              Start Meditation
            </button>
          </SignedIn>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Features Preview */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold text-slate-700 mb-12">
            Simple | Intentional | Effective
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 text-xl">🧘</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Track Sessions</h3>
              <p className="text-slate-600">Log your meditation sessions with just a few taps</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">View Progress</h3>
              <p className="text-slate-600">See your meditation journey unfold over time</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-600 text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-3">Stay Consistent</h3>
              <p className="text-slate-600">Build a sustainable meditation practice</p>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="bg-white rounded-3xl p-12 shadow-sm border border-emerald-100">
          <h2 className="text-3xl font-bold text-slate-700 text-center mb-12">
            What Our Users Say
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <blockquote className="text-xl text-slate-700 mb-6 leading-relaxed">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </blockquote>
              <div className="mb-8">
                <p className="font-semibold text-slate-700">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-slate-600">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors flex items-center justify-center"
              >
                ←
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-emerald-600' : 'bg-emerald-200'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors flex items-center justify-center"
              >
                →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-emerald-400">Mindful</span> Minutes
              </h3>
              <p className="text-slate-300 mb-4 max-w-md">
                Your companion for building a consistent meditation practice.
                Simple, intentional, and effective.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {currentYear} Mindful Minutes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
