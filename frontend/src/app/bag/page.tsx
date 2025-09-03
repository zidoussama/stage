'use client';

import { useBag } from '@/hooks/useBag';

// Import our two new components
import { BagItemsList } from '@/app/bag/components/BagItemsList';
import { OrderSummary } from '@/app/bag/components/OrderSummary';

export default function BagPage() {
  const { bag } = useBag();

  // Get bag items from localStorage
  const bagItems = bag;

  const subtotal = bag.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-8 md:mb-12">
          <h1 className="text-center text-2xl font-semibold text-gray-900">Your Shopping Bag</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <BagItemsList items={bagItems} />
          </div>

          <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
        </div>
      </div>
    </section>
  );
}
