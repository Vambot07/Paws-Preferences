import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const Summary = ({ likedCats, totalCats, onReset, setHeaderVisible }) => {

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (likedCats.length > 0) {
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ef4444', '#ec4899', '#8b5cf6']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ef4444', '#ec4899', '#8b5cf6']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            frame();
        }
    }, [likedCats.length]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}

                className="flex flex-col items-center w-full max-w-5xl mx-auto p-6"
            >

                {likedCats.length > 0 ? (

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full mb-12">
                        {likedCats.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                layoutId={`cat-${cat.id}`}
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                    delay: 0.4 + (index * 0.1),
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
                                onClick={() => {
                                    setSelectedImage(cat);
                                    if (setHeaderVisible) setHeaderVisible(false);
                                }}
                                className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 relative group cursor-pointer"
                            >
                                <img
                                    src={`https://cataas.com/cat/${cat.id}`}
                                    alt="Loved Cat"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center justify-center py-12 text-gray-400 gap-4"
                    >
                        <div className="text-6xl animate-bounce">😿</div>
                        <p className="text-xl font-medium text-center">No cats liked... that's cold!</p>
                    </motion.div>
                )}

                {/* Button reload */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={onReset}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all mb-8 mt-4"
                >
                    <RotateCcw className="w-5 h-5" />
                    Find More Cats
                </motion.button>
            </motion.div>

            {/* FULL SCREEN IMAGE MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setSelectedImage(null);
                            if (setHeaderVisible) setHeaderVisible(true);
                        }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }}
                            exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.1 } }}

                            className="relative max-w-[90vw] max-h-[80dvh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(236,72,153,0.15)] cursor-default bg-zinc-900 flex justify-center items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={`https://cataas.com/cat/${selectedImage.id}`}
                                alt="Loved Cat Full Size"

                                className="max-w-full max-h-[80dvh] object-contain rounded-2xl"
                            />

                            {/* Close Button safely inside the scaled wrapper */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                    if (setHeaderVisible) setHeaderVisible(true);
                                }}
                                className="absolute top-2 right-2 md:top-4 md:right-4 z-[110] bg-black/60 hover:bg-black/90 text-white rounded-full p-2 transition-colors border border-white/30 backdrop-blur-md"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Summary;