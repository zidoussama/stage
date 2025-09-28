// app/filter/page.tsx (server component - remove 'use client')
import { Suspense } from 'react';
import FilterContent from './FilterContent'; // New client component

export default function FilterPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading filters...</div>}>
      <FilterContent />
    </Suspense>
  );
}