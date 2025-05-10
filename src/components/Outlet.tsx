"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Correctly import the components based on their actual exports
const FloatingDock = dynamic(() => import('./ui/floating-dock').then(mod => ({ default: mod.FloatingDock })), {
  ssr: false,
  loading: () => <div className="fixed bottom-4 left-1/2 -translate-x-1/2 h-16 w-64 bg-zinc-900/50 rounded-full animate-pulse" />
});

const DynamicIsland = dynamic(() => import('./ui/dynamic-island').then(mod => ({ default: mod.DynamicIsland })), {
  ssr: false,
  loading: () => <div className="fixed top-3 left-1/2 -translate-x-1/2 h-8 w-32 bg-zinc-900/50 rounded-full animate-pulse" />
});

const Header = dynamic(() => import('./ui/header'), {
  ssr: true,
  loading: () => <div className="h-16 w-full bg-zinc-900/50 animate-pulse" />
});

const LoadingScreen = dynamic(() => import('./ui/loading'), {
  ssr: false
});

const Outlet = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>}>
        <Header />
        <DynamicIsland className="top-3" />
        <main className="relative z-10 pt-16">
          {children}
        </main>
        <FloatingDock />
      </Suspense>
    </div>
  );
};

export default Outlet;
