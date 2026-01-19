"use client"

import * as React from "react"
import { Menu, ChevronDown, X, User } from "lucide-react" // Added X and User
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 md:px-10 text-white">
            <div className="flex items-center justify-between">
                {/* Left: Logo/Brand & Mobile Trigger */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    {/* Desktop Menu Icon (Decorative or different function, keeping as in original but maybe redundant on mobile if replaced by hamburger above? Original had Menu icon as logo part maybe? preserving it for desktop, hiding on mobile to avoid double menu) */}
                    <Menu className="hidden md:block w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity" />

                    <span className="text-xl font-semibold tracking-wide">Flight Booking</span>
                </div>

                {/* Right: Navigation & Profile (Desktop) */}
                <div className="hidden md:flex items-center gap-6 md:gap-8">
                    <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity">
                        Customer Support
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    <button className="text-sm font-medium hover:opacity-80 transition-opacity">
                        Explore
                    </button>

                    <button className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
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
                        <span className="text-sm font-medium">HR Rumen</span>
                    </div>
                </div>

                {/* Mobile Profile Icon (Visible when menu closed) */}
                <div className="md:hidden w-8 h-8 rounded-full bg-slate-200 overflow-hidden border-2 border-white/20">
                    <img
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
                        alt="User"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200">
                    <div className="absolute top-0 left-0 bottom-0 w-[80%] max-w-[300px] bg-white text-slate-900 shadow-2xl p-6 animate-in slide-in-from-left duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-flight-primary">Menu</h2>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Mobile Profile Section */}
                            <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold">HR Rumen</h3>
                                    <p className="text-xs text-slate-500">Traveler</p>
                                </div>
                            </div>

                            <nav className="space-y-4">
                                <button className="flex w-full items-center justify-between text-left font-medium p-2 hover:bg-slate-50 rounded-lg">
                                    Customer Support
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </button>
                                <button className="flex w-full items-center justify-between text-left font-medium p-2 hover:bg-slate-50 rounded-lg">
                                    Explore
                                </button>
                                <button className="flex w-full items-center justify-between text-left font-medium p-2 hover:bg-slate-50 rounded-lg">
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">🇺🇸</span> USA
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </button>
                            </nav>
                        </div>
                    </div>
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 z-[-1]" onClick={() => setIsMobileMenuOpen(false)} />
                </div>
            )}
        </header>
    )
}
