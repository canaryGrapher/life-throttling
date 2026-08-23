'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass } from '../components/Icons';

export default function NotFoundPage() {
  const router = useRouter();

  // Gently redirect the user back to the root after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-50 px-6 py-16">
      <div className="max-w-xl text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center animate-pulse">
            <Compass className="w-7 h-7 text-primary" />
          </div>
        </div>

        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">404 • Off the Map</p>
        <h1 className="mt-2 font-serif text-3xl md:text-4xl font-bold">
          This trail doesn&apos;t exist (yet).
        </h1>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          You&apos;ve ridden beyond the mapped routes of this travel log. We&apos;re guiding you back
          to the main journey overview so you can pick a new destination.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
          >
            Back to Journey Map
          </Link>

          <p className="text-xs text-slate-400">
            Redirecting you automatically in a few seconds…
          </p>
        </div>
      </div>
    </div>
  );
}
