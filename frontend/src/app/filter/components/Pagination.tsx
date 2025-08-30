import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Pagination = () => (
    <div className="flex justify-center items-center mt-8">
        <nav className="flex items-center gap-2">
            <button className="p-2 opacity-50"><FiChevronLeft /></button>
            <button className="w-8 h-8 rounded-md bg-gray-800 text-white font-semibold">1</button>
            <button className="w-8 h-8 rounded-md hover:bg-gray-200 font-semibold">2</button>
            <button className="p-2"><FiChevronRight /></button>
        </nav>
    </div>
);