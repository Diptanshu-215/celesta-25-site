"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./timeline.css";

const timelineData = [
    {
        date: "17 August",
        title: "Robotic Exhibition",
        description: "Showcasing the future of automation and robotics with cutting-edge demonstrations and interactive exhibits.",
        image: "/images/events/robotic-exhibition.jpg",
    },
    {
        date: "30, 31 August",
        title: "Workshop",
        description: "Hands-on learning sessions covering tech stacks, design, and innovation.",
        image: "/images/events/workshop.jpg",
    },
    {
        date: "8 September",
        title: "Lucknow Multicity",
        description: "Connecting with talent and innovators across Lucknow in our multi-city promotional run.",
        image: "/images/events/lucknow.jpg",
    },
    {
        date: "7 October",
        title: "Under 25 Summit",
        description: "A gathering of young minds to inspire, educate, and celebrate youth culture.",
        image: "/images/events/under25.jpg",
    },
];

const CircuitConnector = ({ isEven }: { isEven: boolean }) => {
    return (
        <div className={`hidden md:block absolute top-8 ${isEven ? 'right-1/2 translate-x-[2px]' : 'left-1/2 -translate-x-[2px]'} z-0 pointer-events-none`}>
            <svg width="120" height="60" viewBox="0 0 120 60" className={isEven ? "transform scale-x-[-1]" : ""}>
                {/* Circuit Path */}
                <motion.path
                    d="M 0 30 L 40 30 L 60 10 L 120 10"
                    fill="none"
                    stroke="#2DD4BF"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Node at the end */}
                <motion.circle
                    cx="120" cy="10" r="4" fill="#000" stroke="#2DD4BF" strokeWidth="2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                />

                {/* Decorative drifting lines */}
                <motion.path
                    d="M 40 30 L 50 45"
                    fill="none"
                    stroke="#2DD4BF"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                />
                <motion.circle
                    cx="50" cy="45" r="2" fill="#2DD4BF"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 }}
                />
            </svg>
        </div>
    );
};

// Background with MORE circuit lines and denser pattern
const CircuitBackground = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
            <svg className="w-full h-full">
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.08" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Random Circuit Traces - Dense Network */}
                {/* Left Side Traces */}
                <path d="M 0 100 L 100 100 L 120 120 L 300 120" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeOpacity="0.6" />
                <path d="M 0 300 L 50 300 L 80 350 L 200 350" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeOpacity="0.5" />
                <path d="M 50 500 L 150 500 L 180 550 L 250 550 L 250 600" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeOpacity="0.5" />

                {/* Right Side Traces */}
                <path d="M 100% 200 L 90% 200 L 85% 250 L 70% 250" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeOpacity="0.6" />
                <path d="M 100% 400 L 80% 400 L 75% 350 L 60% 350" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeOpacity="0.5" />
                <path d="M 90% 700 L 85% 750 L 70% 750 L 70% 800" fill="none" stroke="#2DD4BF" strokeWidth="1.5" strokeOpacity="0.5" />

                {/* Vertical Data Lines */}
                <path d="M 20% 0 L 20% 100 L 25% 150 L 25% 300" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5,5" />
                <path d="M 80% 0 L 80% 150 L 75% 200 L 75% 400" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5,5" />

                {/* Nodes */}
                <circle cx="20%" cy="300" r="3" fill="#3b82f6" opacity="0.6" />
                <circle cx="80%" cy="400" r="3" fill="#3b82f6" opacity="0.6" />
                <circle cx="300" cy="120" r="3" fill="#2DD4BF" opacity="0.6" />
                <circle cx="70%" cy="250" r="3" fill="#2DD4BF" opacity="0.6" />
            </svg>
        </div>
    )
}

const TimelineItem = ({ item, index }: { item: typeof timelineData[0]; index: number }) => {
    const isEven = index % 2 === 0;
    return (
        <div className="relative w-full mb-24">
            {/* Connector for Desktop */}
            <CircuitConnector isEven={isEven} />

            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative flex items-center justify-between gap-12 w-full ${isEven ? "flex-row-reverse" : "flex-row"
                    } timeline-item-container`}
            >
                {/* Content Side */}
                <div className="w-full md:w-5/12 z-10">
                    <div className="bg-black/60 border border-teal-500/30 p-6 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(45,212,191,0.1)] hover:border-teal-400/60 transition-colors duration-300 relative group">
                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-500/50 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-500/50 rounded-bl-lg" />

                        <div className="text-teal-400 tracking-widest mb-2 uppercase text-xs">
                            {item.date} // ERROR_LOG_00{index + 1}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 race">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
                            {item.description}
                        </p>
                    </div>
                </div>

                {/* Center Node (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Outer Ring */}
                        <div className="absolute inset-0 border border-teal-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-2 border border-teal-500/50 rounded-full border-t-transparent animate-[spin_3s_linear_infinite_reverse]" />
                        {/* Core */}
                        <div className="w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_10px_#2DD4BF]" />
                    </div>
                </div>

                {/* Empty Side or Image */}
                <div className="hidden md:block w-5/12 text-center opacity-60">
                    {/* Tech Frame for Image */}
                    <div className="relative w-full h-48 group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                        <div className="relative w-full h-full bg-black/80 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                            {/* Grid Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                            <span className="text-xs text-teal-500/50">IMG_SOURCE_NOT_FOUND</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function SoFarPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-teal-500/30 state-wide">
            {/* Updated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/images/backdrop.png')] bg-cover bg-center bg-fixed opacity-60" />
                <div className="absolute inset-0 bg-black/70 mix-blend-multiply" /> {/* Darker overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            </div>

            <CircuitBackground />

            <div className="relative z-10 container mx-auto px-6 py-24 md:py-32" ref={containerRef}>
                {/* Header */}
                <div className="text-center mb-24 md:mb-32 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent -z-10" />

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 race"
                    >
                        Celesta <span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">So Far...</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-teal-400/60 text-sm md:text-base tracking-widest uppercase"
                    >
             // INITIALIZING_TIMELINE_SEQUENCE
                    </motion.p>
                </div>

                {/* Timeline Container */}
                <div className="relative py-10 w-full max-w-6xl mx-auto">
                    {/* Main Central Bus */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 flex justify-between z-0">
                        <div className="w-[1px] h-full bg-white/10 relative overflow-hidden">
                            <motion.div style={{ scaleY }} className="absolute top-0 w-full h-full bg-teal-500/50 origin-top" />
                        </div>
                        <div className="w-[1px] h-full bg-white/10 relative overflow-hidden">
                            <motion.div style={{ scaleY }} className="absolute top-0 w-full h-full bg-blue-500/50 origin-top" />
                        </div>
                    </div>

                    <div className="space-y-12">
                        {timelineData.map((item, index) => (
                            <div key={index} className="relative pl-12 md:pl-0">
                                {/* Mobile Connector */}
                                <div className="md:hidden absolute left-8 top-10 w-8 h-[1px] bg-teal-500/50" />
                                <div className="md:hidden absolute left-8 top-10 w-2 h-2 -translate-y-1/2 -translate-x-1/2 bg-black border border-teal-500 rounded-full z-10" />

                                <TimelineItem item={item} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-32 text-teal-300 text-sm md:text-lg font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(45,212,191,0.6)]"
                >
            // More memories in the making...
                </motion.div>
            </div>
        </main>
    );
}
