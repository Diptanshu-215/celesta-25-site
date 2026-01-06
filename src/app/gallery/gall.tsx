"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
    AnimatePresence,
} from "framer-motion";

type Product = {
    title: string;
    link: string;
    thumbnail: string;
};

const HeroParallax = ({ products }: { products: Product[] }) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.4, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
        springConfig
    );
    const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);

    const openModal = (index: number) => {
        setSelectedProductIndex(index);
    };

    const closeModal = () => {
        setSelectedProductIndex(null);
    };

    const goToNext = () => {
        if (selectedProductIndex !== null) {
            setSelectedProductIndex((prevIndex) => (prevIndex! + 1) % products.length);
        }
    };

    const goToPrev = () => {
        if (selectedProductIndex !== null) {
            setSelectedProductIndex((prevIndex) => (prevIndex! - 1 + products.length) % products.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedProductIndex === null) return;
            if (event.key === 'ArrowRight') {
                goToNext();
            } else if (event.key === 'ArrowLeft') {
                goToPrev();
            } else if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedProductIndex]);
    return (
        <>
            <div className="fixed inset-0 z-0">
                <img src="/images/events-backdrop.png" alt="Background" className="w-full h-full object-cover opacity-75" />
            </div>
            <div
                ref={ref}
                className="h-[300vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
            >
                <div className="absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_65%,white_100%)]">
                    <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                        <defs>
                            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.5"></path></pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)"></rect>
                    </svg>
                </div>

                <Header />
                <motion.div
                    style={{
                        rotateX,
                        rotateZ,
                        translateY,
                        opacity,
                    }}
                    className=""
                >
                    <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                        {[...firstRow, ...firstRow].map((product, index) => (
                            <ProductCard
                                product={product}
                                translate={translateX}
                                key={`first-${index}-${product.title}`}
                                onClick={() => {
                                    const originalIndex = products.findIndex(p => p.thumbnail === product.thumbnail && p.title === product.title);
                                    if (originalIndex !== -1) {
                                        openModal(originalIndex)
                                    }
                                }}
                            />
                        ))}
                    </motion.div>
                    <motion.div className="flex flex-row mb-20 space-x-20">
                        {[...secondRow, ...secondRow].map((product, index) => (
                            <ProductCard
                                product={product}
                                translate={translateXReverse}
                                key={`second-${index}-${product.title}`}
                                onClick={() => {
                                    const originalIndex = products.findIndex(p => p.thumbnail === product.thumbnail && p.title === product.title);
                                    if (originalIndex !== -1) {
                                        openModal(originalIndex)
                                    }
                                }}
                            />
                        ))}
                    </motion.div>
                    <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                        {[...thirdRow, ...thirdRow].map((product, index) => (
                            <ProductCard
                                product={product}
                                translate={translateX}
                                key={`third-${index}-${product.title}`}
                                onClick={() => {
                                    const originalIndex = products.findIndex(p => p.thumbnail === product.thumbnail && p.title === product.title);
                                    if (originalIndex !== -1) {
                                        openModal(originalIndex)
                                    }
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
            <AnimatePresence>
                {selectedProductIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-4xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={products[selectedProductIndex].thumbnail}
                                alt={products[selectedProductIndex].title}
                                className="object-contain w-full h-full rounded-lg shadow-2xl"
                            />
                            <div className="absolute top-0 left-0 p-4 text-white text-lg font-bold bg-black/50 rounded-br-lg">
                                {products[selectedProductIndex].title}
                            </div>
                        </motion.div>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-gray-300 z-50">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); goToPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors z-50">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors z-50">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Header = () => {
    return (
        <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
            <h1 className="text-2xl md:text-7xl font-bold text-white race">
                The Ultimate <br /> Celesta's Gallery
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200">
                Immortalizing the Euphoria: A Visual Odyssey of Celesta.
            </p>
        </div>
    );
};

interface ProductCardProps {
    product: Product;
    translate: MotionValue<number>;
    onClick: () => void;
}

const ProductCard = ({ product, translate, onClick }: ProductCardProps) => {
    return (
        <motion.div
            style={{ x: translate }}
            whileHover={{ y: -20 }}
            key={product.title}
            className="group/product h-48 w-[15rem] md:h-96 md:w-[30rem] relative flex-shrink-0 cursor-pointer"
            onClick={onClick}
        >
            <div className="block group-hover/product:shadow-2xl w-full h-full">
                <img
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-center absolute h-full w-full inset-0 rounded-lg"
                    alt={product.title}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x600/000000/FFFFFF?text=${product.title.replace(/\s/g, '+')}`;
                    }}
                />
            </div>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300 rounded-lg"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white transition-opacity duration-300">
                {product.title}
            </h2>
        </motion.div>
    );
};

export default function SurrealGallery() {
    const products: Product[] = [
        { title: "Enchanted Forest", link: "#", thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2940&auto=format&fit=crop" },
        { title: "City of Clouds", link: "#", thumbnail: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2940&auto=format&fit=crop" },
        { title: "Timeless Sands", link: "#", thumbnail: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2940&auto=format&fit=crop" },
        { title: "Retro Future", link: "#", thumbnail: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2940&auto=format&fit=crop" },
    ];

    return (
        <div className="bg-black text-white">
            <HeroParallax products={products} />
        </div>
    );
}
