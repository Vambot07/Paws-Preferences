import React from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

const CatCard = ({ cat, onSwipe, index }) => {

    const x = useMotionValue(0);
    const controls = useAnimation();

    const rotate = useTransform(x, [-200, 200], [-18, 18]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const likeOpacity = useTransform(x, [20, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

    const handleDragEnd = async (event, info) => {
        const swipeThreshold = 100;
        const velocityThreshold = 500;

        if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
            await controls.start({ x: window.innerWidth, transition: { duration: 0.2 } });
            onSwipe('like', cat);
        }
        else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
            await controls.start({ x: -window.innerWidth, transition: { duration: 0.2 } });
            onSwipe('dislike', cat);
        } else {
            controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
        }
    };


    return (
        <motion.div
            className="absolute top-0 w-full h-full rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/10"
            animate={controls}
            style={{
                x,
                rotate,
                opacity,
                zIndex: 100 - index,
                backgroundImage: `url(https://cataas.com/cat/${cat.id})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                touchAction: 'none',
            }}
            drag='x' //untk axis
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        >

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            <motion.div
                className="absolute inset-0 bg-green-500/20 pointer-events-none flex justify-center items-center"
                style={{ opacity: likeOpacity }}
            >
                <span className="text-white text-6xl font-bold border-8 border-white/20 px-8 py-4 rounded-2xl rotate-[-15deg]">LIKE</span>
            </motion.div>

            <motion.div
                className="absolute inset-0 bg-red-500/20 pointer-events-none flex justify-center items-center"
                style={{ opacity: nopeOpacity }}
            >
                <span className="text-white text-6xl font-bold border-8 border-white/20 px-8 py-4 rounded-2xl rotate-[15deg]">NOPE</span>
            </motion.div>
        </motion.div>
    );
};

export default CatCard;
