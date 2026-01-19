'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';

export function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden mb-4">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-gray-700 shadow-sm w-full justify-center"
      >
        <Filter size={18} />
        Filters
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-80 bg-white h-full overflow-y-auto p-4 animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
}
