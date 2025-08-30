'use client';

import { useBagPage } from '@/app/bag/hooks/useBagPage';

// Import our two new components
import { BagItemsList } from '@/app/bag/components/BagItemsList';
import { OrderSummary } from '@/app/bag/components/OrderSummary';

export default function BagPage() {
  const {
    cartItems,
    subtotal,
    shipping,
    total,
  } = useBagPage();

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8 md:mb-12">
          <h1 className="text-center text-2xl font-semibold text-gray-900">Your Shopping Bag</h1>
        </div>
        
        {/* Updated grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: The list of items */}
          <div className="lg:col-span-2">
            <BagItemsList items={cartItems} />
          </div>

          {/* Right Column: The sticky order summary */}
          <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />

        </div>
      </div>
    </section>
  );
}