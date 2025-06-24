import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import StreaksSection from './StreaksSection';
import WeeklyProgressGraph from './WeeklyProgressGraph';
import YearlyProgressGraph from './YearlyProgressGraph';
import SessionsHistory from './SessionsHistory';

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();
  const firstName = user?.firstName || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8">
        <header className="mb-8 mt-8">
          <h1 className="text-4xl font-bold text-slate-700 mb-2">
            Hello {firstName}!
          </h1>
          <p className="text-slate-600">Track your meditation journey</p>
        </header>

        <div className="grid gap-8">
          {/* Streaks Section */}
          <section>
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

          {/* Sessions History */}
          <section>
            <SessionsHistory />
          </section>
        </div>
      </div>
    </div>
  );
}