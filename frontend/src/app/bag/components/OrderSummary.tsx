// src/app/bag/components/OrderSummary.tsx
import { OrderSummaryProps } from '@/app/bag/types/bag';


export const OrderSummary = ({ subtotal, shipping, total }: OrderSummaryProps) => (
    // The `sticky` and `top-8` classes make this component stick to the top of the viewport
    <aside className="lg:col-span-1 h-fit sticky top-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold border-b pb-4 mb-4">Order Summary</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-base font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Shipping</p>
                    <p className="text-base font-semibold text-gray-900">${shipping.toFixed(2)}</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-xl font-bold text-gray-900">${total.toFixed(2)}</p>
                </div>
            </div>
            <div className="mt-6">
                <button type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-gray-800">
                    Checkout
                    <span className="group-hover:ml-4 ml-2 transition-all">→</span>
                </button>
            </div>
        </div>
    </aside>
);