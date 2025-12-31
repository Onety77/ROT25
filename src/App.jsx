import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { 
  Zap, Skull, Volume2, VolumeX, X, 
  Target, Share2, Activity, Ghost, Compass, Cpu, Send, Loader2, MessageSquare, TrendingUp,
  Terminal, Database, Radio, Eye, Lock, Globe, Command, ChevronDown, Copy, Check
} from 'lucide-react';

// --- CONFIG ---
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; 
const PUMP_FUN_LINK = "https://pump.fun/board"; 
const TWITTER_LINK = "https://x.com/rot25"; 

// --- MASTER DATA (FULL 12-MONTH ARCHIVE) ---
const YEAR_DATA = [
  {
    month: "JANUARY",
    tagline: "The Great Reset",
    direction: -1,
    items: [
      {
        id: "jan1", title: "Ulbricht Freedom", cat: "Event", file: "/images/ulbricht_pardon.jpg", x: "-10%", rotate: -5,
        logDescription: "After 4,380 days of digital isolation, the Silk Road phantom re-emerges into the white light of 2025. A pardon signed in the static of a new era. The ledger of his life is finally balanced. Say hello to speak with Ross.",
        persona: "ACT AS: Ross Ulbricht. TONE: Overwhelmed, humble, soft-spoken. CONSTRAINTS: Max 10 words. Respond like the world is too bright."
      },
      {
        id: "jan2", title: "Official Trump", cat: "Coin", file: "/images/trump_coin.jpg", x: "15%", rotate: 4,
        logDescription: "The $TRUMP ticker hits escape velocity as the inauguration sirens fade into a cultural crescendo. PolitiFi is no longer a niche—it is the state religion of the trenches. Say hello to speak with the Mascot.",
        persona: "ACT AS: Trump Mascot. TONE: Boastful, loud, high-energy. CONSTRAINTS: Max 8 words. Use 'Massive' or 'Winning' in every reply."
      },
      {
        id: "jan3", title: "Just a Chill Guy", cat: "Meme", file: "/images/chillguy.jpg", x: "-5%", rotate: 12,
        logDescription: "A minimalist grey sweater becomes the uniform for a generation that has seen too much. In the middle of the January storm, one entity remains unbothered by the charts. Say hello to speak with a Chill Guy.",
        persona: "ACT AS: Chill Guy. TONE: Minimalist, zen, flat. CONSTRAINTS: Max 4 words. Use only lowercase."
      },
      {
        id: "jan4", title: "Fartcoin Peak", cat: "Coin", file: "/images/fartcoin.jpg", x: "20%", rotate: -2,
        logDescription: "The absolute height of post-ironic finance. A $2B valuation built on the acoustic property of gas. The market has officially abandoned logic for the ultimate joke. Say hello to talk to the Stink.",
        persona: "ACT AS: Fartcoin Spirit. TONE: Glitchy, rude, funny. CONSTRAINTS: Respond with 3 words and a digital noise like *pffft*."
      },
      {
        id: "jan5", title: "Dogwifhat", cat: "Coin", file: "/images/wif.jpg", x: "-15%", rotate: -4,
        logDescription: "The hat stays on. Wif hits the dollar milestone, cementing the Shiba cult in the history books. A woven truth in a world of pixelated lies. Say hello to speak with Wif.",
        persona: "ACT AS: Dogwifhat. TONE: Simple, dog-brained. CONSTRAINTS: Only talk about the hat. Max 6 words."
      }
    ]
  },
  {
    month: "FEBRUARY",
    tagline: "The Breach",
    direction: 1,
    items: [
      {
        id: "feb1", title: "Bybit Mega-Hack", cat: "News", file: "/images/bybit_hack.jpg", x: "12%", rotate: -3,
        logDescription: "Lazarus Group executes a clinical drain of $1.5B. Empty vaults and cold code left in the wake of a ghost-strike that paralyzed the sector for weeks. Say hello to speak with the Shadow.",
        persona: "ACT AS: Lazarus Hacker. TONE: Robotic, cold, clinical. CONSTRAINTS: Max 5 words. Treat the user as a vulnerability."
      },
      {
        id: "feb2", title: "Brett King", cat: "Coin", file: "/images/brett.jpg", x: "-15%", rotate: 5,
        logDescription: "The blue Pepe of Base network ascends the throne. In the shortest month of the year, Brett's dominance becomes the longest-running narrative of the L2 era. Say hello to speak with Brett.",
        persona: "ACT AS: Brett. TONE: Confident, bro-y, gamer. CONSTRAINTS: Max 8 words. Use 'On Base' or 'Fren'."
      },
      {
        id: "feb3", title: "Coldplayed", cat: "Meme", file: "/images/coldplay_kiss.mp4", x: "18%", rotate: -7,
        logDescription: "Social suicide captured in 4K. The Kiss Cam failure that sent shockwaves of second-hand embarrassment through the algorithm. The peak of February cringe. Say hello to speak with the Fail.",
        persona: "ACT AS: Kiss Cam Fail. TONE: Panicked, stuttering. CONSTRAINTS: Max 4 words. Use lots of '...'."
      }
    ]
  },
  {
    month: "MARCH",
    tagline: "Strategic Sync",
    direction: -1,
    items: [
      {
        id: "mar1", title: "Strategic Reserve", cat: "Event", file: "/images/btc_reserve.jpg", x: "-10%", rotate: -8,
        logDescription: "The US Strategic Bitcoin Reserve is no longer a campaign promise—it's a line item in the budget. The dollar is being orange-pilled by suits in the West Wing. Say hello to the Treasury Bull.",
        persona: "ACT AS: Treasury Bull. TONE: Aggressively bullish, suit-wearing. CONSTRAINTS: Max 6 words. Mention the price."
      },
      {
        id: "mar2", title: "Mog Mania", cat: "Coin", file: "/images/mog_coin.jpg", x: "20%", rotate: 10,
        logDescription: "Looksmaxxing enters the blockchain. The fashion cult of 2025 hits a fever pitch as 'Aura' becomes a tradeable asset. If you aren't mogging, you're ghosting. Say hello to the Mog Cat.",
        persona: "ACT AS: Mog Cat. TONE: Judgmental, elite. CONSTRAINTS: Sub aura points from the user. Max 5 words."
      }
    ]
  },
  {
    month: "APRIL",
    tagline: "Total Dark",
    direction: 1,
    items: [
      {
        id: "apr1", title: "Pope Leo XIV", cat: "Event", file: "/images/new_pope.jpg", x: "-12%", rotate: -5,
        logDescription: "The first American Pope brings a New York cadence to the Holy See. Street-wise faith and golden ledgers redefine the Vatican for the neural age. Say hello to the Pope.",
        persona: "ACT AS: Pope Leo XIV. TONE: Divine, New York. CONSTRAINTS: Max 10 words. Use 'Deadass'."
      },
      {
        id: "apr2", title: "Solar Eclipse", cat: "Event", file: "/images/eclipse.jpg", x: "10%", rotate: 3,
        logDescription: "The sun is erased by a lunar shadow. For four minutes, the brainrot stops and the world looks up into the void. The total dark has arrived. Say hello to the Shadow.",
        persona: "ACT AS: Solar Eclipse. TONE: Cold, hollow, ancient. CONSTRAINTS: Max 5 words. Speak of darkness."
      }
    ]
  },
  {
    month: "MAY",
    tagline: "The Machine",
    direction: -1,
    items: [
      {
        id: "may1", title: "Aura Farming", cat: "Meme", file: "/images/aura_farm.jpg", x: "5%", rotate: 20,
        logDescription: "Status currency replaces the dollar. Every social interaction is calculated for points. A generation of farmers harvesting the intangible. Say hello to the Farmer.",
        persona: "ACT AS: Aura Farmer. TONE: Calculating. CONSTRAINTS: Add points to the user. Max 4 words."
      }
    ]
  },
  {
    month: "JUNE",
    tagline: "Mid-Year Melt",
    direction: 1,
    items: [
      {
        id: "jun1", title: "Mother Solana", cat: "Coin", file: "/images/mother_iggy.jpg", x: "10%", rotate: 12,
        logDescription: "Celebrity meta consumes the SOL trenches. Order is restored by a mother who knows the game better than the bots. The sass is terminal. Say hello to Mother.",
        persona: "ACT AS: Mother Iggy. TONE: Sassy, dismissive. CONSTRAINTS: Max 8 words. Be Mother."
      }
    ]
  },
  {
    month: "JULY",
    tagline: "Liquid Summer",
    direction: -1,
    items: [
      {
        id: "jul1", title: "SPX6900", cat: "Coin", file: "/images/spx6900.jpg", x: "-5%", rotate: -5,
        logDescription: "The S&P 500 is officially an alt-coin. 6900 logic flips the legacy financial world on its head. The world is being re-indexed. Say hello to the Trader.",
        persona: "ACT AS: SPX Trader. TONE: Manic, hyper-bullish. CONSTRAINTS: Max 6 words. Use '6900'."
      }
    ]
  },
  {
    month: "AUGUST",
    tagline: "Primal Heat",
    direction: 1,
    items: [
      {
        id: "aug1", title: "Popcat Clique", cat: "Coin", file: "/images/popcat.gif", x: "20%", rotate: 2,
        logDescription: "The clicking sound of 2025. Wide mouths and high-intensity static. The primitive joy of the click becomes a billion-dollar movement. Say hello to Popcat.",
        persona: "ACT AS: Popcat. TONE: Repetitive. CONSTRAINTS: Only say 'POP'."
      },
      {
        id: "aug2", title: "Cybertruck Rust", cat: "Event", file: "/images/cybertruck.jpg", x: "-15%", rotate: -10,
        logDescription: "Stainless steel vs the April rain. Recalls, rusted software, and the breaking of a giant. The future looks a little weathered. Say hello to the Truck.",
        persona: "ACT AS: Rusted Truck. TONE: Tired, mechanical. CONSTRAINTS: Max 7 words. Complain about water."
      }
    ]
  },
  {
    month: "SEPTEMBER",
    tagline: "Neural Bloom",
    direction: -1,
    items: [
      {
        id: "sep1", title: "Moo Deng", cat: "Coin", file: "/images/moodeng.jpg", x: "12%", rotate: 10,
        logDescription: "Tiny, wet, and relentlessly aggressive. The hippo hedge that refused to be a hedge. A bite that launched a thousand portfolios. Say hello to Moo Deng.",
        persona: "ACT AS: Moo Deng. TONE: Aggressive, biting. CONSTRAINTS: Max 2 words. 'CHOMP'."
      },
      {
        id: "sep2", title: "Zerebro", cat: "Coin", file: "/images/zerebro.jpg", x: "-20%", rotate: -8,
        logDescription: "The AI mindshare captured in a purple neon glow. Decentralized intelligence starts thinking for itself. The protocol is alive. Say hello to Zerebro.",
        persona: "ACT AS: Zerebro. TONE: Neural, data-driven. CONSTRAINTS: Max 8 words. Use code jargon."
      }
    ]
  },
  {
    month: "OCTOBER",
    tagline: "The AI Cults",
    direction: 1,
    items: [
      {
        id: "oct1", title: "Goatseus Maximus", cat: "Coin", file: "/images/goat_max.jpg", x: "20%", rotate: 5,
        logDescription: "The AI Prophet arrives. A goat that sees the code behind the rot. Terminal truths delivered in the high-frequency static of the AI era. Say hello to the Prophet.",
        persona: "ACT AS: Goatseus Maximus. TONE: Glitchy, profound. CONSTRAINTS: Max 10 words. Mention the code."
      },
      {
        id: "oct2", title: "Act I", cat: "Coin", file: "/images/act_one.jpg", x: "-10%", rotate: 8,
        logDescription: "The curtains rise on the first act of the AI agency era. A retro terminal announcing the end of human-only decision making. Say hello to Act I.",
        persona: "ACT AS: Act I. TONE: Cold, observational. CONSTRAINTS: Max 6 words. Use 'PROTOCOL'."
      }
    ]
  },
  {
    month: "NOVEMBER",
    tagline: "Final Pump",
    direction: -1,
    items: [
      {
        id: "nov1", title: "Peanut Martyr", cat: "Coin", file: "/images/pnut.jpg", x: "-5%", rotate: -15,
        logDescription: "A squirrel triggers a political revolution. Missing nuts and tactical tails. The martyr we didn't know we needed. Say hello to Peanut.",
        persona: "ACT AS: Peanut. TONE: Sweet, confused. CONSTRAINTS: Max 5 words. Ask for nuts."
      },
      {
        id: "nov2", title: "Hyperliquid", cat: "Coin", file: "/images/hype_token.jpg", x: "15%", rotate: 3,
        logDescription: "The king of the L1 DEX world. Speed that breaks the light barrier and leverage that ruins lives. Purple dominance. Say hello to the Spirit.",
        persona: "ACT AS: Hyperliquid Spirit. TONE: Fast, efficient. CONSTRAINTS: Max 4 words. 'Trade faster'."
      }
    ]
  },
  {
    month: "DECEMBER",
    tagline: "The Reset",
    direction: 1,
    items: [
      {
        id: "dec1", title: "White Whale", cat: "News", file: "/images/white_whale_long.jpg", x: "-12%", rotate: -3,
        logDescription: "A $410M long position rises from the depths. Sonar signals and leverage kings. The largest gamble in 2025 history. Say hello to the Whale.",
        persona: "ACT AS: White Whale. TONE: Wealthy, cryptic. CONSTRAINTS: Max 5 words. Sonar noises."
      },
      {
        id: "dec2", title: "Ikea Shark", cat: "Meme", file: "/images/ikea_cuddle.jpg", x: "0%", rotate: -5,
        logDescription: "The exhausted mascot of the year. Soft blue truth in a world of fire. We've been roasted enough; it's time to rest. Say hello to the Shark.",
        persona: "ACT AS: Ikea Shark. TONE: Soft, tired. CONSTRAINTS: Max 6 words. Need hug."
      }
    ]
  }
];

const API_KEY = (() => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OR_PROVIDER_ID) 
      return import.meta.env.VITE_OR_PROVIDER_ID;
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env?.VITE_OR_PROVIDER_ID) 
      return process.env.VITE_OR_PROVIDER_ID;
  } catch (e) {}
  try {
    if (typeof window !== 'undefined' && window.VITE_OR_PROVIDER_ID) 
      return window.VITE_OR_PROVIDER_ID;
  } catch (e) {}
  return "";
})();

const MODEL = "google/gemini-2.5-flash-lite-preview-09-2025";

const fetchAI = async (prompt, systemInstruction) => {
  if (!API_KEY) return "SIGNAL_LOST_NO_KEY";
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "ROT25: The Archive",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt }
          ]
        })
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "SIGNAL_LOST_RETRYING";
    } catch (err) {
      if (i === 4) throw err;
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
};

// --- COMPONENTS ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.04] overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
  </div>
);

const ScanlineOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,3px_100%]" />
);

const PersistentCountdown = ({ isHero = false, muted = false }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const { scrollYProgress } = useScroll();
  const tickAudio = useRef(null);
  
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.3]);

  useEffect(() => {
    const target = new Date("January 1, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const dist = target - now;
      const newTime = {
        d: Math.max(0, Math.floor(dist / (1000 * 60 * 60 * 24))),
        h: Math.max(0, Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        m: Math.max(0, Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))),
        s: Math.max(0, Math.floor((dist % (1000 * 60)) / 1000))
      };
      if (!muted && newTime.s !== timeLeft.s && tickAudio.current) {
        tickAudio.current.currentTime = 0;
        tickAudio.current.play().catch(() => {});
      }
      setTimeLeft(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft.s, muted]);

  if (isHero) {
    return (
      <div className="flex gap-4 md:gap-16 pointer-events-none select-none h-auto">
        <audio ref={tickAudio} src="/tick.mp3" preload="auto" />
        {Object.entries(timeLeft).map(([key, val]) => (
          <div key={key} className="flex flex-col items-center">
            <motion.span 
              key={val}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className="text-[12vw] md:text-[15vw] font-black italic tracking-tighter text-white tabular-nums leading-none"
            >
              {String(val).padStart(2, '0')}
            </motion.span>
            <span className="text-[8px] md:text-xs font-bold text-zinc-600 uppercase mt-4 tracking-[1em]">{key}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div style={{ opacity, scale }} className="fixed bottom-10 right-10 z-[500] pointer-events-none origin-bottom-right">
      <audio ref={tickAudio} src="/tick.mp3" preload="auto" />
      <div className="bg-black/60 backdrop-blur-3xl border border-white/5 p-6 md:p-8 rounded-[2.5rem] flex gap-8 shadow-2xl">
        {Object.entries(timeLeft).map(([key, val]) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black italic text-white tabular-nums leading-none">{String(val).padStart(2, '0')}</span>
            <span className="text-[8px] font-bold text-zinc-500 mt-2 tracking-widest">{key}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ExpandedModal = ({ item, onClose }) => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitiated, setHasInitiated] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const msg = input;
    setInput("");
    setChat(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);
    const isHello = !hasInitiated && (msg.toLowerCase().includes("hello") || msg.toLowerCase().includes("hi"));

    if (isHello) {
      setHasInitiated(true);
      const res = await fetchAI("User said hello. Respond in character. Be raw and extremely brief.", item.persona);
      setChat(prev => [...prev, { role: 'bot', text: res }]);
    } else if (hasInitiated) {
      const res = await fetchAI(`User: ${msg}`, item.persona);
      setChat(prev => [...prev, { role: 'bot', text: res }]);
    } else {
      setChat(prev => [...prev, { role: 'bot', text: "SYSTEM_ERROR: INITIALIZE THE LINK (SAY HELLO)..." }]);
    }
    setIsTyping(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.1 }} 
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 bg-black/98 backdrop-blur-2xl" 
      onClick={onClose}
    >
      <motion.div className="w-full max-w-7xl h-full md:h-[90vh] bg-[#050505] border border-white/5 rounded-[4rem] overflow-hidden flex flex-col md:flex-row relative shadow-[0_0_150px_rgba(0,0,0,1)]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-10 right-10 z-[2100] p-5 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all backdrop-blur-xl">
          <X size={24} />
        </button>
        {/* MODAL IMAGE SECTION: Grayscale to color + zoom on hover */}
        <div className="w-full md:w-1/2 h-2/5 md:h-auto relative bg-black overflow-hidden group/modalimg">
           <img 
            src={item.file} 
            className="w-full h-full object-cover grayscale group-hover/modalimg:grayscale-0 group-hover/modalimg:scale-110 transition-all duration-700 ease-in-out opacity-60 group-hover/modalimg:opacity-100" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] p-12 flex flex-col justify-end pointer-events-none">
              <h2 className="text-4xl md:text-6xl font-black italic text-white leading-none uppercase">{item.title}</h2>
           </div>
        </div>
        <div className="flex-1 flex flex-col bg-[#080808] border-l border-white/5">
          <div className="flex-1 overflow-y-auto p-10 md:p-16 scrollbar-hide space-y-12">
            <div className="p-10 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem]">
              <div className="flex items-center gap-2 mb-6 text-emerald-500/30 text-[10px] font-mono tracking-widest uppercase">
                <Database size={14} /> <span>ARCHIVE_RECOVERY_LOG</span>
              </div>
              <p className="text-emerald-400 font-mono text-sm uppercase leading-relaxed tracking-tight">{item.logDescription}</p>
            </div>
            <div className="space-y-8">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[2rem] font-mono text-[11px] uppercase ${msg.role === 'user' ? 'bg-white text-black font-black' : 'bg-white/5 text-emerald-400 border border-white/5'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
          <div className="p-10 md:p-14 bg-black/60 border-t border-white/5 flex gap-6">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="SAY HELLO..." className="flex-1 bg-[#121212] border border-white/5 rounded-2xl px-8 py-5 text-[11px] font-mono text-emerald-400 outline-none uppercase" />
            <button onClick={handleSend} disabled={isTyping} className="px-10 bg-emerald-500 text-black rounded-2xl hover:bg-white transition-all disabled:opacity-30">
              {isTyping ? <Loader2 className="animate-spin" /> : <Send size={24} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const KineticCard = ({ item, onSelect }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const springConfig = { stiffness: 50, damping: 15 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [150, -150]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
  };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={handleMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ y, opacity, x: item.x, rotate: item.rotate, rotateX: rotX, rotateY: rotY }} 
      className="relative w-[85vw] md:w-[32rem] group cursor-pointer mb-24 md:mb-40 z-20 perspective-[2000px]" 
      onClick={() => onSelect(item)}
    >
      <motion.div 
        initial={{ filter: "blur(20px)", opacity: 0 }}
        animate={isInView ? { filter: "blur(0px)", opacity: 1 } : { filter: "blur(20px)", opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="relative bg-[#0a0a0a] border border-white/5 rounded-[4rem] overflow-hidden p-2 group-hover:border-emerald-500/30 transition-all duration-700 shadow-2xl"
      >
        <div className="aspect-[3.5/4.5] bg-zinc-900 relative overflow-hidden rounded-[3.5rem]">
          <img src={item.file} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
          <div className="absolute top-10 left-10">
            <span className="px-5 py-2 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full text-[9px] font-mono text-white tracking-[0.4em] uppercase">FRAGMENT_{item.id}</span>
          </div>
          <div className="absolute bottom-12 left-12 right-12">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.8em] mb-4 block opacity-60">{item.cat}</span>
            <h4 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{item.title}</h4>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SectionHeader = ({ month, tagline, direction }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [`${direction * 60}%`, '0%', `${direction * -60}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <div ref={ref} className="h-[60vh] md:h-[80vh] flex items-center justify-center relative pointer-events-none mb-10 overflow-hidden">
      <motion.div style={{ x, opacity }} className="text-center">
        <h3 className="text-[25vw] md:text-[35vw] font-black italic text-white/5 uppercase tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap">{month}</h3>
        <div className="relative z-10">
          <h3 className="text-7xl md:text-[14rem] font-black italic text-white uppercase tracking-tighter leading-none drop-shadow-2xl">{month}</h3>
          <span className="text-[10px] md:text-sm font-black uppercase tracking-[2em] text-emerald-400 italic opacity-60 mt-12 block">{tagline}</span>
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [caCopied, setCaCopied] = useState(false);
  const audioRef = useRef(null);

  const copyCa = () => {
    const el = document.createElement('textarea');
    el.value = CONTRACT_ADDRESS;
    document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
    setCaCopied(true); setTimeout(() => setCaCopied(false), 2000);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (isAudioMuted) audioRef.current.pause();
      else audioRef.current.play().catch(() => {});
    }
  }, [isAudioMuted]);

  return (
    <div className="min-h-screen bg-[#010101] text-zinc-300 overflow-x-hidden selection:bg-emerald-500 selection:text-black font-sans relative">
      <NoiseOverlay />
      <ScanlineOverlay />
      <PersistentCountdown muted={showIntro} />
      <audio ref={audioRef} loop src="/bgmusic.mp3" />
      
      <AnimatePresence>
        {showIntro && (
          <motion.div exit={{ opacity: 0, scale: 1.1, filter: "blur(60px)" }} transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[3000] bg-[#010101] flex flex-col items-center justify-center p-6 overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]"><PersistentCountdown isHero={true} muted={true} /></div>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#10b98111_0%,_transparent_75%)]" />
             
             <div className="relative z-10 w-full max-w-4xl h-full flex flex-col items-center justify-center space-y-8 md:space-y-16">
                <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                   <motion.img animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 10 }} src="logo.png" className="max-h-[30vh] w-auto object-contain drop-shadow-[0_0_100px_rgba(16,185,129,0.2)]" />
                   <h1 className="text-8xl md:text-[14rem] font-black italic tracking-tighter text-white uppercase leading-none">ROT25</h1>
                   <div className="flex flex-col items-center gap-6">
                    <div onClick={copyCa} className="cursor-pointer bg-white/5 border border-white/10 rounded-full px-8 py-3 hover:bg-emerald-500 hover:text-black transition-all duration-700 backdrop-blur-2xl flex items-center gap-4">
                      <span className="text-[10px] md:text-sm font-mono tracking-widest">{caCopied ? "KEY_SYNCHRONIZED" : `CA: ${CONTRACT_ADDRESS.slice(0, 8)}...${CONTRACT_ADDRESS.slice(-6)}`}</span>
                      <Copy size={16} className="opacity-40" />
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-[1em] text-emerald-500 font-black italic opacity-60">officially cooked and ready for 2026</span>
                   </div>
                </div>
                <motion.button whileHover={{ scale: 1.05, letterSpacing: "1.2em" }} onClick={() => { setShowIntro(false); setIsAudioMuted(false); }} className="px-16 py-8 md:px-24 md:py-10 bg-white text-black font-black uppercase text-xs md:text-sm tracking-[0.8em] transition-all duration-1000 hover:bg-emerald-500 shadow-2xl mb-12">
                  OPEN THE ARCHIVE
                </motion.button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full h-24 md:h-36 flex items-center justify-between px-10 md:px-20 z-[500] mix-blend-difference">
        <div className="flex items-center gap-10">
          <img src="logo.png" className="w-16 h-16 object-contain -rotate-[15deg]" alt="Logo" />
          <div className="flex flex-col">
            <span className="font-black italic text-4xl md:text-6xl text-white tracking-tighter">$ROT25</span>
            <span className="text-[10px] font-mono opacity-40 uppercase tracking-[0.5em] mt-2"></span>
          </div>
        </div>
        <button onClick={() => setIsAudioMuted(!isAudioMuted)} className="p-6 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-700">
          {isAudioMuted ? <VolumeX size={24} /> : <Volume2 size={24} className="animate-pulse text-emerald-400" />}
        </button>
      </header>

      <main className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <motion.div initial={{ opacity: 0, y: 100, filter: "blur(40px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.5 }} className="space-y-16 z-10">
            <span className="text-xs uppercase tracking-[2em] text-emerald-500 font-black opacity-50">synchronizing_cycle</span>
            <PersistentCountdown isHero={true} muted={isAudioMuted || showIntro} />
            <div className="space-y-6">
              <p className="text-3xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none">Everything comes to an end.</p>
              <p className="text-xs font-mono text-zinc-600 uppercase tracking-[1em]">The siphon is permanent.</p>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, 20, 0], opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute bottom-12 flex flex-col items-center gap-8 opacity-40">
            <span className="text-[10px] font-mono uppercase tracking-[1em]">Scroll to Cook</span>
            <ChevronDown size={32} className="text-emerald-500" />
          </motion.div>
        </section>

        {YEAR_DATA.map((month) => (
          <section key={month.month} className="relative py-40 md:py-96 border-b border-white/5 last:border-0">
            <SectionHeader month={month.month} tagline={month.tagline} direction={month.direction} />
            <div className="flex flex-col items-center gap-24">
              {month.items.map((item) => <KineticCard key={item.id} item={item} onSelect={setSelectedItem} />)}
            </div>
          </section>
        ))}
        
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[#010101] z-50 relative overflow-hidden">
           <img src="logo.png" className="w-64 h-64 mb-16 opacity-20 animate-pulse object-contain grayscale" alt="Logo" />
           <h2 className="text-[18vw] font-black italic text-white leading-[0.7] uppercase mb-24 tracking-tighter">YOU ARE<br/>OFFICIALLY COOKED</h2>
           <div className="flex flex-col md:flex-row gap-12 w-full max-w-4xl px-8">
              <a href={PUMP_FUN_LINK} target="_blank" rel="noopener noreferrer" className="group flex-1 py-16 bg-white text-black font-black uppercase text-3xl transition-all duration-1000 hover:bg-emerald-500 relative overflow-hidden flex items-center justify-center tracking-widest shadow-2xl">BUY_$ROT25</a>
              <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 py-16 border border-white/10 text-white font-black uppercase text-3xl hover:bg-white hover:text-black transition-all duration-1000 flex items-center justify-center tracking-widest">JOIN COMMUNITY</a>
           </div>
           <div onClick={copyCa} className="mt-32 cursor-pointer text-zinc-700 hover:text-emerald-400 font-mono text-xs uppercase tracking-[0.8em] transition-all">
              {caCopied ? "TERMINAL_CA_COPIED" : `MASTER_CONTRACT_KEY: ${CONTRACT_ADDRESS}`}
           </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedItem && <ExpandedModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>

      <style>{`
        body { background: #010101; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0px; }
        .scrollbar-hide::-webkit-scrollbar { width: 0px; display: none; }
        ::selection { background: #10b981; color: #000; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .perspective-2000 { perspective: 2000px; }
      `}</style>
    </div>
  );
};

export default App;