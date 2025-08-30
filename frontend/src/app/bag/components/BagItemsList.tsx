// src/app/bag/components/BagItemsList.tsx

import Image from "next/image";
import { BagItemsListProps } from "@/app/bag/types/bag";
import { FaTrash } from "react-icons/fa";



export const BagItemsList = ({ items }: BagItemsListProps) => (
    <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
                <ul className="-my-8 divide-y divide-gray-200">
                    {items.map((item) => (
                        <li key={item.id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                            <div className="shrink-0"><Image className="h-24 w-24 max-w-full rounded-lg object-contain" src={item.image} alt={item.name} /></div>
                            <div className="relative flex flex-1 flex-col justify-between">
                                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                    <div className="pr-8 sm:pr-5"><p className="text-base font-semibold text-gray-900">{item.name}</p><p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{item.brand}</p></div>
                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                        <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${(item.price * item.quantity).toFixed(2)}</p>
                                        <div className="sm:order-1"><div className="mx-auto flex h-8 items-stretch text-gray-600"><button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button><div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div><button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button></div></div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto"><button type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-900"><FaTrash className="h-5 w-5" /></button></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);