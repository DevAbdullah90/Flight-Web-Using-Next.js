export function HeroSection({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 flex flex-col items-center justify-center text-white pb-24 pt-20 px-4 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-overlay blur-3xl"></div>
      </div>

      <div className="text-center z-10 mb-8 max-w-2xl">
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-medium mb-4 tracking-wide uppercase">
          ✈️ Explore the World
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
          Find Flights, <br/> <span className="text-green-100">The Eco Way.</span>
        </h1>
        <p className="text-lg md:text-xl opacity-90 font-light text-green-50">
          Sustainable travel starts with smarter search. Compare prices and routes instantly.
        </p>
      </div>
      <div className="w-full max-w-5xl z-20">
        {children}
      </div>
    </div>
  );
}
