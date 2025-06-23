import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import StreaksSection from './StreaksSection';
import WeeklyProgressGraph from './WeeklyProgressGraph';
import YearlyProgressGraph from './YearlyProgressGraph';

export default async function Dashboard() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      <div className="container mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-700 mb-2">
            <span className="text-emerald-600">🧘</span> Dashboard
          </h1>
          <p className="text-slate-600">Track your meditation journey</p>
        </header>

        <div className="grid gap-8">
          {/* Streaks Section */}
          <section>
            <h2 className="text-2xl font-bold text-slate-700 mb-6">Your Streaks</h2>
            <StreaksSection />
          </section>

          {/* Weekly Progress */}
          <section>
            <WeeklyProgressGraph />
          </section>

          {/* Yearly Progress */}
          <section>
            <YearlyProgressGraph />
          </section>
        </div>
      </div>
    </div>
  );
}