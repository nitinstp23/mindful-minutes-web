import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Footer from './Footer';
import Testimonials from './Testimonials';

export default function Home() {

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

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
