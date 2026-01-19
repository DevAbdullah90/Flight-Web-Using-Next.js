'use client';

import { useFlightStore } from '@/store/useFlightStore';
import { fetchFlights } from '@/lib/api';
import { SearchForm } from '@/components/SearchForm';
import { ResultsList } from '@/components/ResultsList';
import { FilterSidebar } from '@/components/FilterSidebar';
import { PriceGraph } from '@/components/PriceGraph';
import { MobileFilterDrawer } from '@/components/MobileFilterDrawer';
import { selectFilteredFlights } from '@/store/selectors';
import { useMemo } from 'react';
import { X } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { StatsCards } from '@/components/ui/StatsCards';
import { EmptyStateIllustration } from '@/components/ui/EmptyStateIllustration';

export default function Home() {
  const { rawFlights, filters, isLoading, error, setFlights, setLoading, setError, startSearch } = useFlightStore();

  const handleSearch = async (params: any) => {
    startSearch();
    try {
      const data = await fetchFlights(params);
      setFlights(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to search');
      setFlights([]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Derived State (Client-side Truth)
  const filteredFlights = useMemo(
    () => selectFilteredFlights(rawFlights, filters),
    [rawFlights, filters]
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section with Search Form */}
      <HeroSection onSearch={handleSearch} isLoading={isLoading} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg shadow-sm flex justify-between items-center animate-in fade-in slide-in-from-top-4">
            <span className="font-medium">{error}</span>
            <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Results Section */}
        {rawFlights.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-8">
                <FilterSidebar />
              </div>
            </aside>

            <section className="flex-1 min-w-0 space-y-6">
              <MobileFilterDrawer />

              <StatsCards />

              <PriceGraph flights={filteredFlights} />

              {filteredFlights.length > 0 ? (
                <ResultsList flights={filteredFlights} isLoading={isLoading} />
              ) : (
                <EmptyStateIllustration />
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}