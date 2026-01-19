"use client"

import * as React from "react"
import { Header } from "@/components/Header"
import { FlightSearchForm } from "@/components/FlightSearchForm"

interface HeroSectionProps {
    onSearch?: (params: any) => void
    isLoading?: boolean
}

export function HeroSection({ onSearch, isLoading }: HeroSectionProps) {
    return (
        <div className="relative w-full h-screen min-h-[600px] flex flex-col">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600">
                <img
                    src="/sky-bg.jpg" // Using local asset as user replaced it
                    alt="Sky Background"
                    className="w-full h-full object-cover mix-blend-overlay opacity-50"
                />
                <div className="absolute inset-0 bg-blue-500/20" /> {/* Blue overlay for branding tint */}
            </div>

            {/* Header */}
            <Header />

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 px-4">
                {/* Center Visuals? (Clouds in original design were subtle) */}
                {/* The search form is the star */}
                <div className="w-full animate-in fade-in zoom-in-95 duration-700">
                    <FlightSearchForm onSearch={onSearch} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}
