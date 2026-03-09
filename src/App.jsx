import React, { useState, useEffect, useCallback } from 'react';
import CardStack from './components/CardStack';
import Summary from './components/Summary';
import { Loader2, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


function App() {
  const [cats, setCats] = useState([]);
  const [likedCats, setLikedCats] = useState([]);
  const [dislikedCats, setDislikedCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCats, setTotalCats] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const [floatingIcons, setFloatingIcons] = useState([]);

  const fetchCats = async () => {
    setIsLoading(true);
    try {
      const randomSkip = Math.floor(Math.random() * 100);
      const response = await fetch(`https://cataas.com/api/cats?limit=15&skip=${randomSkip}`);
      const data = await response.json();

      const formattedCats = data.map(cat => ({
        id: cat._id || cat.id,
        ...cat
      })).filter(cat => cat.id);

      setCats(formattedCats);
      setTotalCats(formattedCats.length);
    } catch (error) {
      console.error("Error fetching cats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const triggerVibration = useCallback((type) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      if (type === 'like') {
        window.navigator.vibrate([30, 50, 30]);
      } else {
        window.navigator.vibrate([50]);
      }
    }
  }, []);


  const handleSwipe = (direction, cat) => {
    triggerVibration(direction);

    const newIcon = {
      id: Date.now(),
      type: direction,
      x: Math.random() * 100 - 50,
    };

    setFloatingIcons(prev => [...prev, newIcon]);


    setTimeout(() => {
      setFloatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
    }, 1500);

    setCats((prevCats) => {
      const remaining = prevCats.filter((c) => c.id !== cat.id);
      if (remaining.length === 0) {
        setIsGeneratingSummary(true);
        setTimeout(() => {
          setIsGeneratingSummary(false);
        }, 2000);
      }
      return remaining;
    });

    if (direction === 'like') {
      setLikedCats((prev) => [...prev, cat]);
    } else {
      setDislikedCats((prev) => [...prev, cat]);
    }
  };

  const handleReset = () => {
    setLikedCats([]);
    setDislikedCats([]);
    setIsGeneratingSummary(false);
    fetchCats();
  };

  const hasSwipedAll = !isLoading && cats.length === 0;

  return (
    <div className="w-full h-[100dvh] bg-neutral-950 text-white flex flex-col overflow-hidden relative selection:bg-pink-500/30">

      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-700/20 blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-700/20 blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />

      <AnimatePresence>
        {floatingIcons.map(icon => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 1, y: 0, x: icon.x, scale: 0.5 }}
            animate={{ opacity: 0, y: -200, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
          >
            {icon.type === 'like' ? (
              <Heart className="w-24 h-24 text-pink-500 fill-pink-500 opacity-50 drop-shadow-2xl" />
            ) : (
              <X className="w-24 h-24 text-red-500 stroke-[3] opacity-50 drop-shadow-2xl" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header */}
      <header className={`w-full p-4 flex flex-col items-center justify-center z-50 shrink-0 mt-2 transition-all duration-300 ${(!hasSwipedAll || isGeneratingSummary) ? 'pointer-events-none' : ''} ${!isHeaderVisible ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 tracking-tight drop-shadow-md">
          Paws & Preferences
        </h1>
        <p className={`font-medium font-bold mt-1 ${hasSwipedAll && !isGeneratingSummary ? 'text-xl text-gray-300' : 'text-gray-400'}`}>
          {hasSwipedAll && !isGeneratingSummary ? (
            <>You liked <span className="text-pink-500 font-bold">{likedCats.length}</span> out of {totalCats} cats!</>
          ) : (
            "Swipe or click the buttons below!"
          )}
        </p>
      </header>

      {/* Main Area */}
      <main className="flex-1 w-full relative z-10 flex flex-col items-center overflow-y-auto overflow-x-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-pink-500" />
            </motion.div>
            <p className="font-medium animate-bounce text-lg">Summoning cute cats...</p>
          </div>
        ) : hasSwipedAll && isGeneratingSummary ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-violet-500" />
            </motion.div>
            <p className="font-medium animate-pulse text-lg">Here are your cute cats...</p>
          </motion.div>
        ) : hasSwipedAll ? (
          <Summary
            likedCats={likedCats}
            totalCats={totalCats}
            onReset={handleReset}
            setHeaderVisible={setIsHeaderVisible}
          />
        ) : (
          <CardStack
            cats={cats}
            onSwipe={handleSwipe}
            isFinished={hasSwipedAll}
          />
        )}
      </main>

    </div>
  );
}

export default App;
