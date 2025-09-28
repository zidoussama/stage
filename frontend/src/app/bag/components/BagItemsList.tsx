import Image from "next/image";
import { BagItem } from "@/app/bag/types/bag";
import { FaTrash } from "react-icons/fa";
import { useBag } from "@/hooks/useBag";

interface BagItemsListProps {
  items: BagItem[];
}

export const BagItemsList = ({ items }: BagItemsListProps) => {
  const { handleRemoveItem, addToBag } = useBag();

const increase = (item: BagItem) => addToBag({ ...item }, 1/2);
const decrease = (item: BagItem) => addToBag({ ...item }, -1/2);


  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-6 sm:px-8 sm:py-10">
        <ul className="-my-8 divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item._id} className="flex flex-col sm:flex-row sm:space-x-5 space-y-3 py-6">
              <div className="shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 max-w-full rounded-lg object-contain"
                />
              </div>
              <div className="relative flex flex-1 flex-col justify-between">
                <div className="sm:grid sm:grid-cols-2 sm:gap-5">
                  <div>
                    <p className="text-base font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.categoryof}</p>
                  </div>
                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:text-right">
                      {(item.price * item.quantity).toFixed(2)} DT
                    </p>
                    <div className="flex h-8 items-stretch text-gray-600">
                      <button onClick={() => decrease(item)} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 hover:bg-black hover:text-white">-</button>
                      <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase">{item.quantity}</div>
                      <button onClick={() => increase(item)} className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 hover:bg-black hover:text-white">+</button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 sm:bottom-0 sm:top-auto">
                  <button onClick={() => handleRemoveItem(item._id)} className="flex p-2 rounded text-gray-500 hover:text-gray-900">
                    <FaTrash className="h-5 w-5"/>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
