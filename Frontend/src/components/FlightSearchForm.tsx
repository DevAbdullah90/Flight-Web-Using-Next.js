"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Plane, Building, Globe, Briefcase, ArrowRightLeft, Search } from "lucide-react"
import { cn } from "@/lib/utils"
// Using a direct import for now, assuming AIRPORTS is available. If not, we'll need to define it or fetch it.
// Checking previous SearchForm, it imported from '@/lib/airports'
import { AIRPORTS } from "@/lib/airports"

export interface FlightSearchFormProps {
    onSearch?: (params: any) => void
    isLoading?: boolean
}

export function FlightSearchForm({ onSearch, isLoading }: FlightSearchFormProps) {
    const [tripType, setTripType] = React.useState<"one-way" | "return" | "multi-city">("one-way")
    const [activeTab, setActiveTab] = React.useState<"flight" | "visa" | "hotel" | "package">("flight")

    // Default values matching original codebase where possible
    const [origin, setOrigin] = React.useState("JFK")
    const [destination, setDestination] = React.useState("LHR")
    const [departDate, setDepartDate] = React.useState("2026-03-01")
    const [returnDate, setReturnDate] = React.useState("")
    const [travelers, setTravelers] = React.useState(1)
    const [cabinClass, setCabinClass] = React.useState("Economy")

    const handleSearchClick = (e: React.FormEvent) => {
        e.preventDefault()
        if (onSearch) {
            onSearch({
                origin,
                destination,
                date: departDate,
                passengers: travelers
            })
        }
    }

    // Helper to find airport
    const getAirport = (code: string) => AIRPORTS.find(a => a.code === code)

    return (
        <form onSubmit={handleSearchClick} className="w-full max-w-6xl mx-auto px-4 relative z-10 font-sans">
            <datalist id="airports">
                {AIRPORTS.map((airport) => (
                    <option key={airport.code} value={airport.code}>{airport.city} ({airport.name})</option>
                ))}
            </datalist>

            {/* Tabs */}
            <div className="flex justify-center mb-0 w-full">
                <div className="w-full md:w-auto bg-white rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] px-4 md:px-6 py-3 flex gap-4 md:gap-8 items-center overflow-x-auto scrollbar-hide mask-fade-sides">
                    <button
                        type="button"
                        onClick={() => setActiveTab("flight")}
                        className={cn("flex items-center gap-2 text-sm font-semibold transition-colors pb-1 border-b-2 whitespace-nowrap shrink-0", activeTab === "flight" ? "text-flight-primary border-flight-primary" : "text-gray-500 border-transparent hover:text-gray-700")}
                    >
                        <Plane className="w-4 h-4" />
                        Book a flight
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("visa")}
                        className={cn("flex items-center gap-2 text-sm font-medium transition-colors pb-1 border-b-2 whitespace-nowrap shrink-0", activeTab === "visa" ? "text-flight-primary border-flight-primary" : "text-gray-500 border-transparent hover:text-gray-700")}
                    >
                        <Globe className="w-4 h-4" />
                        Visa
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("hotel")}
                        className={cn("flex items-center gap-2 text-sm font-medium transition-colors pb-1 border-b-2 whitespace-nowrap shrink-0", activeTab === "hotel" ? "text-flight-primary border-flight-primary" : "text-gray-500 border-transparent hover:text-gray-700")}
                    >
                        <Building className="w-4 h-4" />
                        Hotel
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("package")}
                        className={cn("flex items-center gap-2 text-sm font-medium transition-colors pb-1 border-b-2 whitespace-nowrap shrink-0", activeTab === "package" ? "text-flight-primary border-flight-primary" : "text-gray-500 border-transparent hover:text-gray-700")}
                    >
                        <Briefcase className="w-4 h-4" />
                        Holiday Package
                    </button>
                </div>
            </div>

            {/* Main Search Card */}
            <div className="bg-white rounded-xl rounded-tl-none shadow-xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">

                {/* Route Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr_1fr_1.2fr] gap-4 mb-6">

                    {/* From */}
                    <div className="border border-slate-200 rounded-lg p-3 hover:border-flight-primary cursor-pointer group transition-colors relative bg-slate-50/50">
                        <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">From</label>
                        <div className="relative">
                            <input
                                list="airports"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                                className="w-full bg-transparent font-bold text-lg text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-300 uppercase outline-none"
                                placeholder="Origin"
                                maxLength={3}
                            />
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-1 h-4">
                            {getAirport(origin)?.name || "Select Airport"}
                        </p>
                    </div>

                    {/* To (with Swap Icon) */}
                    <div className="relative">
                        <div className="border border-slate-200 rounded-lg p-3 hover:border-flight-primary cursor-pointer group transition-colors relative bg-slate-50/50 h-full">
                            <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">To</label>
                            <div className="relative">
                                <input
                                    list="airports"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value.toUpperCase())}
                                    className="w-full bg-transparent font-bold text-lg text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-300 uppercase outline-none"
                                    placeholder="Dest"
                                    maxLength={3}
                                />
                            </div>
                            <p className="text-xs text-slate-400 truncate mt-1 h-4">
                                {getAirport(destination)?.name || "Select Airport"}
                            </p>
                        </div>

                        {/* Swap Button - Responsive */}
                        {/* Desktop: Standard left positioning */}
                        <div className="absolute top-1/2 -left-3 -translate-y-1/2 z-10 hidden md:flex">
                            <button type="button" onClick={() => {
                                const temp = origin;
                                setOrigin(destination);
                                setDestination(temp);
                            }} className="bg-white rounded-full p-1 border border-slate-200 shadow-sm text-flight-primary hover:bg-slate-50 transition-colors cursor-pointer">
                                <ArrowRightLeft className="w-3 h-3" />
                            </button>
                        </div>
                        {/* Mobile: Floating centered button between fields (using negative margins or absolute ops) */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 md:hidden">
                            <button type="button" onClick={() => {
                                const temp = origin;
                                setOrigin(destination);
                                setDestination(temp);
                            }} className="bg-white rounded-full p-1.5 border border-slate-200 shadow-sm text-flight-primary hover:bg-slate-50 transition-colors cursor-pointer">
                                <ArrowRightLeft className="w-4 h-4 rotate-90" />
                            </button>
                        </div>
                    </div>

                    {/* Departure Date */}
                    <div className="border border-slate-200 rounded-lg p-3 hover:border-flight-primary cursor-pointer group transition-colors bg-white">
                        <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">Departure Date</label>
                        <input
                            type="date"
                            value={departDate}
                            onChange={(e) => setDepartDate(e.target.value)}
                            className="w-full bg-transparent font-bold text-lg text-slate-900 border-none p-0 focus:ring-0 outline-none"
                        />
                        <p className="text-xs text-slate-400 mt-1 h-4">
                            {departDate ? new Date(departDate).toLocaleDateString('en-US', { weekday: 'long' }) : ''}
                        </p>
                    </div>

                    {/* Return Date */}
                    <div className={cn("border border-slate-200 rounded-lg p-3 hover:border-flight-primary cursor-pointer group transition-colors bg-white", tripType === "one-way" && "opacity-50 pointer-events-none")}>
                        <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">Return Date</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            disabled={tripType === "one-way"}
                            className="w-full bg-transparent font-bold text-lg text-slate-900 border-none p-0 focus:ring-0 disabled:cursor-not-allowed outline-none"
                        />
                        <p className="text-xs text-slate-400 mt-1 h-4">
                            {returnDate ? new Date(returnDate).toLocaleDateString('en-US', { weekday: 'long' }) : 'Tap to add'}
                        </p>
                    </div>

                    {/* Room & Traveler */}
                    <div className="border border-slate-200 rounded-lg p-3 hover:border-flight-primary cursor-pointer group transition-colors bg-white flex flex-col justify-center">
                        <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">Travelers & Class</label>
                        <div className="flex items-center gap-2 mt-1">
                            <input
                                type="number"
                                min={1}
                                max={9}
                                value={travelers}
                                onChange={(e) => setTravelers(parseInt(e.target.value))}
                                className="w-12 bg-transparent font-bold text-lg text-slate-900 border-b border-slate-200 focus:border-flight-primary focus:ring-0 p-0 text-center outline-none"
                            />
                            <span className="text-sm font-medium text-slate-700">Traveler(s)</span>
                        </div>
                        <select
                            value={cabinClass}
                            onChange={(e) => setCabinClass(e.target.value)}
                            className="mt-1 text-xs text-slate-500 bg-transparent border-none p-0 focus:ring-0 cursor-pointer outline-none w-full"
                        >
                            <option>Economy</option>
                            <option>Business</option>
                            <option>First Class</option>
                        </select>
                    </div>
                </div>

                {/* Footer Row: Trip Type & Search Button */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Trip Type Radios */}
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center transition-colors", tripType === "one-way" ? "border-flight-primary" : "border-slate-300 group-hover:border-flight-primary")}>
                                {tripType === "one-way" && <div className="w-2.5 h-2.5 rounded-full bg-flight-primary" />}
                            </div>
                            <input type="radio" name="tripType" className="hidden" checked={tripType === "one-way"} onChange={() => setTripType("one-way")} />
                            <span className={cn("text-sm font-medium", tripType === "one-way" ? "text-slate-900" : "text-slate-500")}>One Way</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center transition-colors", tripType === "return" ? "border-flight-primary" : "border-slate-300 group-hover:border-flight-primary")}>
                                {tripType === "return" && <div className="w-2.5 h-2.5 rounded-full bg-flight-primary" />}
                            </div>
                            <input type="radio" name="tripType" className="hidden" checked={tripType === "return"} onChange={() => setTripType("return")} />
                            <span className={cn("text-sm font-medium", tripType === "return" ? "text-slate-900" : "text-slate-500")}>Return</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center transition-colors", tripType === "multi-city" ? "border-flight-primary" : "border-slate-300 group-hover:border-flight-primary")}>
                                {tripType === "multi-city" && <div className="w-2.5 h-2.5 rounded-full bg-flight-primary" />}
                            </div>
                            <input type="radio" name="tripType" className="hidden" checked={tripType === "multi-city"} onChange={() => setTripType("multi-city")} />
                            <span className={cn("text-sm font-medium", tripType === "multi-city" ? "text-slate-900" : "text-slate-500")}>Multi City</span>
                        </label>
                    </div>

                    {/* Search Button */}
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="rounded-xl px-8 font-bold text-base shadow-lg shadow-flight-primary/25 min-w-[160px]"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Search className="w-5 h-5 mr-2" />
                                Search Flight
                            </>
                        )}
                    </Button>
                </div>

            </div>
        </form>
    )
}
