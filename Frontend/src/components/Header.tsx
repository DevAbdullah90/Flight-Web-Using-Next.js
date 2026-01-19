"use client"

import * as React from "react"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function Header() {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 text-white">
            {/* Left: Logo/Brand */}
            <div className="flex items-center gap-3">
                <Menu className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity" />
                <span className="text-xl font-semibold tracking-wide">Flight Booking</span>
            </div>

            {/* Right: Navigation & Profile */}
            <div className="flex items-center gap-6 md:gap-8">
                <button className="hidden md:flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity">
                    Customer Support
                    <ChevronDown className="w-4 h-4" />
                </button>

                <button className="hidden md:block text-sm font-medium hover:opacity-80 transition-opacity">
                    Explore
                </button>

                <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
                    {/* Flag placeholder: Use emoji or simple div */}
                    <span className="text-lg">🇺🇸</span>
                    USA
                    <ChevronDown className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border-2 border-white/20">
                        <img
                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="hidden md:block text-sm font-medium">HR Rumen</span>
                </div>
            </div>
        </header>
    )
}
