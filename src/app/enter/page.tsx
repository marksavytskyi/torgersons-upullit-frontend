'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

function EnterForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const from         = searchParams.get('from') ?? '/';

  const [password, setPassword] = useState('');
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch('/api/enter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={e => { setPassword(e.target.value); setError(false); }}
          placeholder="Enter password"
          autoFocus
          className={`w-full pl-4 pr-12 py-3.5 rounded-xl border text-sm font-medium transition focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-300 bg-red-50 focus:ring-red-300 text-red-800 placeholder-red-400'
              : 'border-slate-200 bg-slate-50 focus:ring-orange-400 text-slate-800 placeholder-slate-400'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2.5 rounded-xl border border-red-100">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Incorrect password. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="btn-primary justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Checking…' : 'Enter Site'}
      </button>
    </form>
  );
}

export default function EnterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" variant="dark" href="" />
          </div>

          {/* Lock icon */}
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 mx-auto mb-5">
            <Lock className="w-6 h-6 text-orange-500" />
          </div>

          <h1 className="text-center text-xl font-bold text-slate-900 mb-1">
            Members Only
          </h1>
          <p className="text-center text-sm text-slate-500 mb-6">
            Enter the site password to continue.
          </p>

          <Suspense>
            <EnterForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Need access? Call{' '}
          <a href="tel:+13604973200" className="underline hover:text-slate-600">
            (360) 497-3200
          </a>
        </p>
      </div>
    </main>
  );
}
