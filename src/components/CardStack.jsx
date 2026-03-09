import React from 'react';
import { Heart, X } from 'lucide-react';
import CatCard from './CatCard';

const CardStack = ({ cats, onSwipe, isFinished }) => {
    const visibleCats = cats.slice(0, 3);

    if (isFinished) {
        return null;
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-center w-full mx-auto p-4 relative">

            {/*The Stack*/}
            <div className="relative w-full max-w-sm aspect-[3/4] max-h-[55vh] flex justify-center items-center">
                {visibleCats.length === 0 ? (
                    <div>
                        Fetching cats ...
                    </div>
                ) : (
                    [...visibleCats].reverse().map((cat, index) => {
                        const depthIndex = visibleCats.length - 1 - index;
                        const scale = 1 - (depthIndex * 0.05);
                        const yOffset = depthIndex * 40;
                        const isTop = index === visibleCats.length - 1;

                        return (
                            <div
                                key={cat.id}
                                className="absolute inset-0 flex justify-center items-center w-full h-full pointer-events-none"
                                style={{
                                    zIndex: 100 - depthIndex,
                                    transform: `translateY(${yOffset}px) scale(${scale})`,
                                    transformOrigin: 'top center',
                                    transition: 'transform 0.3s ease-out'
                                }}
                            >
                                <div className={`w-full h-full ${isTop ? 'pointer-events-auto' : ''}`}>
                                    <CatCard
                                        cat={cat}
                                        onSwipe={onSwipe}
                                        index={depthIndex} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>


            {/*Buttons*/}
            <div className="mt-10 flex justify-center gap-6 w-full z-50 pointer-events-none px-4">
                <button
                    onClick={() => visibleCats[0] && onSwipe('dislike', visibleCats[0])}
                    className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-full shadow-2xl hover:bg-white/20 hover:scale-110 active:scale-95 transition-all group"
                >
                    <X className="w-10 h-10 text-red-500 stroke-[3] drop-shadow-lg group-hover:rotate-[-15deg] transition-transform" />
                </button>

                <button
                    onClick={() => visibleCats[0] && onSwipe('like', visibleCats[0])}
                    className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-full shadow-2xl hover:bg-white/20 hover:scale-110 active:scale-95 transition-all group"
                >
                    <Heart className="w-10 h-10 text-green-500 fill-green-500 drop-shadow-lg group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default CardStack;
