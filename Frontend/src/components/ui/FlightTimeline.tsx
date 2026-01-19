export function FlightTimeline() {
  return (
    <div className="flex items-center gap-2 w-full">
      {/* Visual Timeline: Dep o-------o Arr */}
      <div className="text-xs font-bold">08:00</div>
      <div className="flex-1 h-[2px] bg-gray-300 relative flex items-center justify-center">
        <div className="absolute left-0 w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="bg-gray-100 px-2 text-[10px] text-gray-500">6h 20m</div>
        <div className="absolute right-0 w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
      <div className="text-xs font-bold">14:20</div>
    </div>
  );
}
