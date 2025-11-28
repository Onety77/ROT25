
import './App.css'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Twitter, ArrowUpRight, Trophy, Zap, MessageCircle, Heart, Repeat, Ban } from 'lucide-react';

/* FONTS & GLOBAL STYLES 
  We inject these styles to handle specific animations and the "noise" overlay 
*/
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Cinzel:wght@900&family=Comic+Neue:wght@700&family=Jacquard+12&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

    :root {
      --bg-color: #050505;
      --text-color: #eeeeee;
      --accent: #ccff00; /* Acid Green */
      --secondary: #ff00ff; /* Hot Magenta */
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      overflow-x: hidden;
      cursor: crosshair;
      user-select: none; /* Stop text selection highlighting to make clicking more fun */
    }

    /* Custom Scrollbar hide */
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    .font-anton { font-family: 'Anton', sans-serif; }
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-mono { font-family: 'Space Mono', monospace; }
    .font-comic { font-family: 'Comic Neue', cursive; }
    .font-gothic { font-family: 'Jacquard 12', cursive; }

    /* Noise Overlay */
    .noise {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 50;
      opacity: 0.05;
      background: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
    }

    /* Glitch Animation */
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
    
    .hover-glitch:hover {
      animation: glitch 0.2s cubic-bezier(.25, .46, .45, .94) both infinite;
      color: var(--accent);
    }

    /* Skew container based on scroll velocity */
    .elastic-content {
      transition: transform 0.1s cubic-bezier(0.1, 0.7, 1.0, 0.1);
      will-change: transform;
    }

    .tweet-card {
      transition: all 0.3s ease;
      transform-style: preserve-3d;
    }
    
    .tweet-card:hover {
      transform: scale(1.02) rotateZ(-1deg);
      box-shadow: 8px 8px 0px var(--accent);
      z-index: 10;
      background: #111;
      border-color: var(--accent);
    }

    /* Click Explosion Animation */
    @keyframes pop-fade {
      0% { transform: translate(-50%, -50%) scale(0.5) rotate(0deg); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.5) rotate(var(--rot)); opacity: 0; }
    }

    .click-w {
      position: fixed;
      pointer-events: none;
      z-index: 100;
      animation: pop-fade 0.6s ease-out forwards;
      font-weight: 900;
      text-shadow: 0 0 10px var(--accent);
    }

    /* Victory Flash Animation */
    @keyframes flash-screen {
      0% { filter: invert(0); }
      10% { filter: invert(1); }
      30% { filter: invert(0); }
      50% { filter: invert(1); }
      100% { filter: invert(0); }
    }

    @keyframes shake-screen {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(-10px, 10px) rotate(-1deg); }
      50% { transform: translate(10px, -10px) rotate(1deg); }
      75% { transform: translate(-10px, -10px) rotate(-1deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }

    .victory-mode {
      animation: flash-screen 0.5s ease-out, shake-screen 0.5s ease-out;
    }
    
    /* Rotate Badge */
    @keyframes rotate-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .rotate-badge {
      animation: rotate-slow 10s linear infinite;
    }
  `}</style>
);

// --- DATA: The Curated Stream of W ---
const MOCK_TWEETS = [
  {
    id: 1,
    handle: "@WinnerMindset",
    content: "If you aren't collecting Ws, you are functionally invisible. The W is not a letter, it is a lifestyle choice.",
    likes: "8.2k",
    retweets: "4.1k",
    font: "font-mono",
    rotation: "rotate-1"
  },
  {
    id: 2,
    handle: "@TypographyNerd",
    content: "Consider the geometry of the W. Two Vs connected. Double victory. It is structurally the strongest letter in the alphabet.",
    likes: "12k",
    retweets: "900",
    font: "font-cinzel",
    rotation: "-rotate-2"
  },
  {
    id: 3,
    handle: "@CryptoDegenz",
    content: "$W ticker is live. We are not going to the moon. We are going to a completely different dimension where gravity is optional.",
    likes: "44k",
    retweets: "12k",
    font: "font-anton",
    rotation: "rotate-3",
    highlight: true
  },
  {
    id: 4,
    handle: "@PhilosophyBot",
    content: "L is merely a W waiting to happen. Invert your perspective. Literally turn your phone upside down.",
    likes: "300",
    retweets: "50",
    font: "font-gothic",
    rotation: "-rotate-1"
  },
  {
    id: 5,
    handle: "@DesignCrimes",
    content: "Why stick to grid systems when you can just scatter Ws everywhere? Chaos is the new UX.",
    likes: "9k",
    retweets: "2k",
    font: "font-comic",
    rotation: "rotate-6"
  },
  {
    id: 6,
    handle: "@AbstractArtist",
    content: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    likes: "100k",
    retweets: "50k",
    font: "font-mono",
    rotation: "-rotate-3"
  }
];

// --- COMPONENT: Floating Background Ws ---
const FloatingWs = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate random Ws
    const fonts = ['font-anton', 'font-cinzel', 'font-mono', 'font-comic', 'font-gothic'];
    const count = 25;
    const newElements = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2, // rem
      font: fonts[Math.floor(Math.random() * fonts.length)],
      rotation: Math.random() * 360,
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.3 + 0.05
    }));
    setElements(newElements);
  }, []);

  // Animation Loop
  const requestRef = useRef();
  
  const animate = useCallback(() => {
    setElements(prev => prev.map(el => {
      let newX = el.x + el.speedX;
      let newY = el.y + el.speedY;

      // Wrap around screen
      if (newX > 110) newX = -10;
      if (newX < -10) newX = 110;
      if (newY > 110) newY = -10;
      if (newY < -10) newY = 110;

      return { ...el, x: newX, y: newY, rotation: el.rotation + 0.1 };
    }));
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map(el => (
        <div
          key={el.id}
          className={`absolute text-white select-none ${el.font}`}
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}rem`,
            transform: `rotate(${el.rotation}deg)`,
            opacity: el.opacity,
            transition: 'opacity 0.5s'
          }}
        >
          W
        </div>
      ))}
    </div>
  );
};

// --- COMPONENT: Global Click Effects (The "W" Popups) ---
const ClickEffects = () => {
  const [clicks, setClicks] = useState([]);
  
  useEffect(() => {
    const fonts = ['font-anton', 'font-cinzel', 'font-mono', 'font-comic', 'font-gothic'];
    
    const handleClick = (e) => {
      const id = Date.now();
      const newClick = {
        id,
        x: e.clientX,
        y: e.clientY,
        rot: Math.random() * 90 - 45 + 'deg', // Random end rotation
        font: fonts[Math.floor(Math.random() * fonts.length)],
        color: Math.random() > 0.5 ? 'var(--accent)' : '#fff'
      };
      
      setClicks(prev => [...prev, newClick]);
      
      // Cleanup after animation
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== id));
      }, 700);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {clicks.map(c => (
        <div 
          key={c.id}
          className={`click-w text-4xl ${c.font}`}
          style={{ 
            left: c.x, 
            top: c.y, 
            '--rot': c.rot,
            color: c.color
          }}
        >
          W
        </div>
      ))}
    </>
  );
};

// --- COMPONENT: The Glitch Tweet Card ---
const TweetCard = ({ tweet }) => {
  return (
    <div 
      className={`tweet-card w-full max-w-md mx-auto bg-black border border-neutral-800 p-6 mb-8 cursor-pointer relative overflow-hidden group ${tweet.rotation}`}
      onClick={(e) => {
          e.stopPropagation(); // Let the global click handler also fire, but we handle specific logic here
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet.content)}`, '_blank');
      }}
    >
      {/* Background decoration on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--accent)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-black transition-colors">
            <span className="font-bold text-xl">W</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-200 group-hover:text-[var(--accent)]">{tweet.handle}</span>
            <span className="text-xs text-neutral-500">@project_w</span>
          </div>
        </div>
        <Twitter className="w-5 h-5 text-neutral-600 group-hover:text-blue-400 transition-colors" />
      </div>
      
      <p className={`text-xl mb-6 text-neutral-100 leading-snug ${tweet.font} ${tweet.highlight ? 'text-[var(--accent)]' : ''}`}>
        {tweet.content}
      </p>
      
      <div className="flex justify-between text-neutral-500 text-sm font-mono relative z-10">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 hover:text-pink-500 transition-colors"><MessageCircle size={14} /> 22</span>
          <span className="flex items-center gap-1 hover:text-green-500 transition-colors"><Repeat size={14} /> {tweet.retweets}</span>
          <span className="flex items-center gap-1 hover:text-red-500 transition-colors"><Heart size={14} /> {tweet.likes}</span>
        </div>
        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
           VIEW <ArrowUpRight size={14} />
        </span>
      </div>
    </div>
  );
};

// --- COMPONENT: Glitch Text Header ---
const GlitchHeader = ({ text }) => {
  return (
    <h1 className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-1 text-[var(--accent)] opacity-70 animate-pulse mix-blend-screen">{text}</span>
      <span className="absolute top-0 left-0 ml-1 text-[var(--secondary)] opacity-70 animate-pulse mix-blend-screen" style={{ animationDelay: '0.1s' }}>{text}</span>
    </h1>
  );
};

// --- COMPONENT: No Ls Badge ---
const NoLsBadge = () => (
    <div className="absolute top-24 right-4 md:top-32 md:right-32 z-20 mix-blend-difference pointer-events-none opacity-80 rotate-badge">
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[14px] font-mono font-bold tracking-widest uppercase">
                    <textPath href="#circlePath" startOffset="0%">
                         • No Ls Allowed • No Ls Allowed 
                    </textPath>
                </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <Ban size={40} className="text-[var(--accent)]" />
            </div>
        </div>
    </div>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isVictoryMode, setIsVictoryMode] = useState(false);
  const [claimText, setClaimText] = useState("Claim Victory");
  
  const lastScrollY = useRef(0);
  const containerRef = useRef(null);

  // Scroll Velocity Logic for Distortion
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = currentScrollY - lastScrollY.current;
      
      // Dampen the velocity for smoother skew
      setScrollVelocity(v => v * 0.9 + velocity * 0.1);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup/Reset velocity when idle
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollVelocity(v => {
        if (Math.abs(v) < 0.1) return 0;
        return v * 0.8;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleClaimVictory = (e) => {
      e.stopPropagation();
      setIsVictoryMode(true);
      setClaimText("WINNER DETECTED");
      
      // Reset after animation
      setTimeout(() => {
          setIsVictoryMode(false);
      }, 600);
      
      setTimeout(() => {
          setClaimText("Claim Victory");
      }, 3000);
  };

  const skewAmount = Math.min(Math.max(scrollVelocity * 0.2, -10), 10);

  return (
    <div className={`min-h-screen bg-black text-white overflow-x-hidden selection:bg-[var(--accent)] selection:text-black ${isVictoryMode ? 'victory-mode' : ''}`}>
      <GlobalStyles />
      <div className="noise" />
      <FloatingWs />
      <ClickEffects />

      {/* NAVIGATION / HEADER */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-4xl font-black font-anton tracking-tighter hover:scale-110 transition-transform cursor-pointer">
          W
        </div>
        <button 
          className="border-2 border-[var(--accent)] text-[var(--accent)] px-8 py-2 rounded-full font-mono text-sm hover:bg-[var(--accent)] hover:text-black transition-all hover:scale-105 hover:rotate-2 uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]"
          onClick={() => alert("MARKET BUY ORDER INITIATED...")}
        >
          ACQUIRE $W
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-4 z-10">
        <NoLsBadge />
        
        <div 
          className="elastic-content text-center flex flex-col items-center"
          style={{ transform: `skewY(${skewAmount}deg)` }}
        >
          <div className="mb-4 text-[var(--accent)] font-mono text-sm tracking-[0.5em] animate-bounce">
            TICKER: $W
          </div>
          
          <div className="text-[15vw] leading-[0.8] font-black font-anton uppercase mb-8 hover-glitch cursor-default select-none">
            <GlitchHeader text="Just" /> <br />
            <GlitchHeader text="Win" />
          </div>

          <p className="max-w-xl text-center text-neutral-400 font-mono text-lg md:text-xl leading-relaxed mb-12 mix-blend-exclusion select-none">
            Not a project. A state of being. The ticker is $W. The vibe is absolute victory. Welcome to the winner's circle.
          </p>

          <button 
            className="group relative px-12 py-6 bg-white text-black font-black text-2xl uppercase tracking-tighter overflow-hidden border-2 border-white hover:border-[var(--accent)] transition-colors"
            onClick={(e) => {
                // Fun interaction: Button jumps a bit or ripples
                e.target.style.transform = `scale(0.95) rotate(${Math.random() * 10 - 5}deg)`;
                setTimeout(() => e.target.style.transform = 'none', 150);
            }}
          >
            <span className="relative z-10 group-hover:text-[var(--accent)] mix-blend-difference transition-colors">Enter The Arena</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </button>
        </div>
      </section>

      {/* MAIN CONTENT STREAM */}
      <section className="relative z-20 py-24 px-4 md:px-12 bg-black/50 backdrop-blur-sm border-t border-neutral-900">
        
        <div className="mb-24 text-center">
          <h2 className="text-6xl md:text-8xl font-gothic text-white mb-4 transform -rotate-2 select-none">
            THE FEED
          </h2>
          <div className="w-24 h-2 bg-[var(--accent)] mx-auto animate-pulse" />
        </div>

        <div 
          ref={containerRef}
          className="elastic-content max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
          style={{ transform: `skewY(${skewAmount * 0.5}deg)` }}
        >
          {MOCK_TWEETS.map((tweet) => (
            <div key={tweet.id} className="break-inside-avoid">
              <TweetCard tweet={tweet} />
            </div>
          ))}
          
          {/* Random Interstitial Content */}
          <div className="break-inside-avoid p-8 bg-[var(--accent)] text-black mb-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
             <h3 className="font-anton text-4xl uppercase mb-2">Did you know?</h3>
             <p className="font-mono text-sm">The letter W is the only letter in the English alphabet with a polysyllabic name.</p>
          </div>

          {/* CLAIM VICTORY INTERACTIVE BOX */}
          <div 
              className={`break-inside-avoid p-12 border-4 ${claimText === 'WINNER DETECTED' ? 'border-[var(--accent)] bg-[var(--accent)] text-black scale-110' : 'border-white text-white hover:bg-white hover:text-black'} mb-8 text-center transition-all duration-100 cursor-pointer group select-none`}
              onClick={handleClaimVictory}
          >
            <Trophy size={64} className={`mx-auto mb-4 ${claimText === 'WINNER DETECTED' ? 'animate-bounce' : 'group-hover:animate-spin'}`} />
            <h3 className="font-cinzel text-2xl font-bold">{claimText}</h3>
          </div>
        </div>

      </section>

      {/* CHAOTIC FOOTER */}
      <footer className="relative z-20 py-24 bg-[var(--accent)] text-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           {Array.from({length: 10}).map((_, i) => (
             <div key={i} className="absolute text-9xl font-black" style={{ 
               top: `${Math.random() * 100}%`, 
               left: `${Math.random() * 100}%`,
               transform: `rotate(${Math.random() * 360}deg)`
             }}>W</div>
           ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-9xl font-black font-anton leading-none tracking-tighter mb-4 select-none">
              KEEP<br/>WINNING
            </h2>
            <div className="flex gap-4 font-mono text-sm uppercase font-bold tracking-widest">
              <a href="#" className="hover:underline decoration-4">Twitter</a>
              <a href="#" className="hover:underline decoration-4">Dexscreener</a>
            </div>
          </div>
          
          <div className="mt-12 md:mt-0 text-right">
            <p className="font-mono text-xs max-w-xs ml-auto mb-4 font-bold">
              Paper hands are a myth. We only know diamond grips and green candles. This is financial advice: Win.
            </p>
            <div className="text-4xl font-gothic animate-pulse">
              © 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;