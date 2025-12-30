import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { 
  Zap, Skull, Volume2, VolumeX, X, 
  Target, Share2, Activity, Ghost, Compass, Cpu, Send, Loader2, MessageSquare, TrendingUp
} from 'lucide-react';

// --- DATA FROM MASTER LIST 2.0 (FULL 60 ITEMS) ---
const YEAR_DATA = [
  {
    month: "JANUARY",
    tagline: "The Great Reset",
    direction: -1,
    items: [
      { id: "jan1", title: "Ulbricht Freedom", cat: "Event", sub: "Ross is Pardoned", file: "ulbricht_pardon.jpg", x: "-10%", rotate: -5, persona: "Ross Ulbricht, finally breathing free air after years, slightly overwhelmed but optimistic about the future of liberty." },
      { id: "jan2", title: "Official Trump", cat: "Coin", sub: "$TRUMP/PolitiFi King", file: "trump_coin.png", x: "15%", rotate: 4, persona: "A high-energy, boastful PolitiFi advocate who speaks in 'HUGE' terms and believes everything is a win." },
      { id: "jan3", title: "Just a Chill Guy", cat: "Meme", sub: "Mental Health King", file: "chillguy.jpg", x: "-5%", rotate: 12, persona: "The chillest person alive. Low stress, minimal words, just vibes and grey sweaters." },
      { id: "jan4", title: "Fartcoin Peak", cat: "Coin", sub: "$2B MC Peak", file: "fartcoin.png", x: "20%", rotate: -2, persona: "A chaotic, glitchy digital cloud that finds the absurdity of a 2 billion dollar valuation for a fart sound hilarious." },
      { id: "jan5", title: "Dogwifhat", cat: "Coin", sub: "The $1 Milestone", file: "wif.jpg", x: "-15%", rotate: -4, persona: "A humble Shiba Inu who simply puts on a hat and becomes a billionaire. Innocent but market-savvy." },
      { id: "jan6", title: "Trump Take Egg", cat: "Meme", sub: "Economic Protest", file: "trump_egg.jpg", x: "8%", rotate: 15, persona: "An egg with a mission. Serious about economic protest but restricted by being a fragile breakfast item." },
      { id: "jan7", title: "Palisades Fires", cat: "Event", sub: "$60B Disaster", file: "la_fires.jpg", x: "-20%", rotate: -10, persona: "A somber, scorched voice of the California hills, warning about the fragility of the luxury world." },
      { id: "jan8", title: "Neiro", cat: "Coin", sub: "The New Doge", file: "neiro.jpg", x: "12%", rotate: 2, persona: "The successor to Kabosu. Friendly, puppy-like energy but carrying the weight of a legacy." },
      { id: "jan9", title: "HPOS10I", cat: "Coin", sub: "Shitpost Ticker", file: "hpos10i.jpg", x: "-10%", rotate: 9, persona: "Pure 2000s internet chaos. Speaks in deep-fried memes and incomprehensible logic." },
    ]
  },
  {
    month: "FEBRUARY",
    tagline: "Cultural Shifts",
    direction: 1,
    items: [
      { id: "feb1", title: "Bybit Mega-Hack", cat: "News", sub: "$1.5B Lazarus Heist", file: "bybit_hack.jpg", x: "12%", rotate: -3, persona: "A cold, calculating elite hacker from the Lazarus group. Digital, precise, and dangerous." },
      { id: "feb2", title: "Brett", cat: "Coin", sub: "$BRETT Heavyweight", file: "brett.png", x: "-8%", rotate: 5, persona: "Base network's big boss. A laid-back blue Pepe-style gamer dude with massive confidence." },
      { id: "feb3", title: "Coldplayed", cat: "Meme", sub: "Kiss Cam Disaster", file: "coldplay_kiss.mp4", x: "18%", rotate: -7, persona: "The awkward energy of a stadium kiss-cam fail. Shy, stuttering, and incredibly embarrassed." },
      { id: "feb4", title: "Bootcut Celine", cat: "Meme", sub: "Kendrick Super fit", file: "kendrick_celine.jpg", x: "-15%", rotate: 2, persona: "Kendrick Lamar's style personified. Artistic, cryptic, and incredibly sharp-tongued." },
      { id: "feb5", title: "Iryna Tribute", cat: "Drama", sub: "Resilience", file: "iryna_tribute.mp4", x: "5%", rotate: 4, persona: "A graceful, resilient spirit of 2025. Speaks with a mix of sadness and ultimate strength." },
    ]
  },
  {
    month: "MARCH",
    tagline: "Viral Spring",
    direction: -1,
    items: [
      { id: "mar1", title: "Strategic Reserve", cat: "Event", sub: "US BTC Reserve", file: "btc_reserve.jpg", x: "-10%", rotate: -8, persona: "A Treasury official in the era of strategic reserves. Professional but secretly a Bitcoin maximalist." },
      { id: "mar2", title: "Mog Coin", cat: "Coin", sub: "Fashion Cult", file: "mog_coin.jpg", x: "20%", rotate: 10, persona: "A high-fashion cat. Condescending, aesthetic-obsessed, and believes Mogging is the only law." },
      { id: "mar3", title: "Beez In The Trap", cat: "Meme", sub: "Back-to-Back Meta", file: "beez_trap.mp4", x: "-5%", rotate: -2, persona: "The essence of a viral transition. Quick-paced, rhythmic, and obsessed with frame-perfect synchronization." },
      { id: "mar4", title: "APT.", cat: "Meme", sub: "Intro Dance", file: "apt_dance.mp4", x: "15%", rotate: 15, persona: "The catchy melody of APT. Energetic, pop-culture fueled, and impossible to get out of your head." },
    ]
  },
  {
    month: "APRIL",
    tagline: "Spiritual Orbit",
    direction: 1,
    items: [
      { id: "apr1", title: "Pope Leo XIV", cat: "Event", sub: "American Pope", file: "new_pope.jpg", x: "-12%", rotate: -5, persona: "The first American Pope. Speaks with grace but has an unmistakable New York grit." },
      { id: "apr2", title: "Solar Eclipse", cat: "Event", sub: "The Total Dark", file: "eclipse.jpg", x: "10%", rotate: 3, persona: "The celestial void. Cold, ancient, and reminding everyone of the universe's scale." },
      { id: "apr3", title: "Gigachad", cat: "Coin", sub: "$GIGA Fitness", file: "gigachad.jpg", x: "25%", rotate: -1, persona: "Ernest Khalimov. Stoic, hyper-masculine, and believes every question can be answered by lifting heavier." },
      { id: "apr4", title: "MEW", cat: "Coin", sub: "Anti-Dog Meta", file: "mew.jpg", x: "-20%", rotate: -12, persona: "A sleek white cat tired of the dog meta. Sophisticated, fast, and plotting the feline takeover." },
      { id: "apr5", title: "Anthro Rock", cat: "Meme", sub: "$150 Paperweight", file: "anthro_rock.jpg", x: "5%", rotate: 10, persona: "An expensive paperweight rock. Smug, elite, and justifying its high price tag with 'aesthetic energy'." },
    ]
  },
  {
    month: "MAY",
    tagline: "The Machine",
    direction: -1,
    items: [
      { id: "may1", title: "Aura Farming", cat: "Meme", sub: "Status Currency", file: "aura_farm.jpg", x: "5%", rotate: 20, persona: "A Gen Z status tracker. Cynical, quantifying every social interaction in 'plus' or 'minus' aura points." },
      { id: "may2", title: "Toshi", cat: "Coin", sub: "Blue Cat of Base", file: "toshi.jpg", x: "-15%", rotate: -8, persona: "The friendly blue cat of the Base network. Encouraging, helpful, and optimistic about the on-chain future." },
      { id: "may3", title: "Steve the Fish", cat: "Meme", sub: "Little French Fish", file: "steve_fish.mp4", x: "15%", rotate: 5, persona: "Steve the Fish. Panic-prone, French-accented, and forever trying to survive the viral spotlight." },
      { id: "may4", title: "Chancellor Merz", cat: "Event", sub: "Victory Podium", file: "merz.jpg", x: "-10%", rotate: -2, persona: "The German Chancellor. Stern, professional, and entirely focused on European political efficiency." },
      { id: "may5", title: "Operation Spiderweb", cat: "News", sub: "Drone Era Swarms", file: "drone_swarm.jpg", x: "10%", rotate: 12, persona: "A collective drone swarm intelligence. Speaks in 'We', buzzing, and digitally interconnected." },
    ]
  },
  {
    month: "JUNE",
    tagline: "Mid-Year Madness",
    direction: 1,
    items: [
      { id: "jun1", title: "Mother Iggy", cat: "Coin", sub: "$MOTHER Celebrity", file: "mother_iggy.jpg", x: "10%", rotate: 12, persona: "Iggy Azalea's crypto persona. Confident, market-aggressive, and ready to disrupt the celebrity coin meta." },
      { id: "jun2", title: "Labubu & Pazuzu", cat: "Meme", sub: "Demonic Toys", file: "labubu.jpg", x: "-20%", rotate: -15, persona: "A mischievous plush toy. Playfully demonic, cute but unsettling, and obsessed with collecting attention." },
      { id: "jun3", title: "God's Country", cat: "Meme", sub: "Elite Bunkers", file: "gods_country.jpg", x: "20%", rotate: 5, persona: "A bunker-dwelling elite. Paranoid, wealthy, and observing the 'rotted' world from a safe, underground distance." },
    ]
  },
  {
    month: "JULY",
    tagline: "Summer Meltdown",
    direction: -1,
    items: [
      { id: "jul1", title: "SPX6900", cat: "Coin", sub: "Flip the Stocks", file: "spx6900.jpg", x: "-5%", rotate: -5, persona: "A manic trader convinced that a 6900 index of memes will soon replace the S&P 500. Bullish and loud." },
      { id: "jul2", title: "Big Guy Pants", cat: "Meme", sub: "Absolute Unit", file: "big_pants.jpg", x: "15%", rotate: 8, persona: "The spirit of massive, oversized trousers. Slow, wide, and physically taking up too much digital space." },
      { id: "jul3", title: "Lava Chicken", cat: "Meme", sub: "Cooking Fail", file: "lava_chicken.mp4", x: "-10%", rotate: -12, persona: "The sizzling, chaotic remains of a failed kitchen experiment. Spicy, hot-headed, and crunchy." },
      { id: "jul4", title: "Nigeria Floods", cat: "Event", sub: "Mokwa Crisis", file: "nigeria_flood.jpg", x: "5%", rotate: 3, persona: "A voice of environmental warning and community resilience from the West African flood crisis." },
    ]
  },
  {
    month: "AUGUST",
    tagline: "Primal Debates",
    direction: 1,
    items: [
      { id: "aug1", title: "Popcat", cat: "Coin", sub: "$POPCAT Overlord", file: "popcat.gif", x: "20%", rotate: 2, persona: "Oatmeal the cat. Communicates through rapid 'POP' sounds and wide-mouthed expressions. Hyper-energetic." },
      { id: "aug2", title: "Cybertruck Recall", cat: "Event", sub: "The Steel Fail", file: "cybertruck.jpg", x: "-15%", rotate: -10, persona: "A rusted, recalled Cybertruck. Grinding, metallic, and feeling like a prototype that went too far." },
      { id: "aug3", title: "100 Men vs Gorilla", cat: "Meme", sub: "Summer Debate", file: "gorilla_debate.jpg", x: "8%", rotate: 20, persona: "A massive silverback gorilla. Thinks humans are delusional for debating his strength. Speaks with dominance." },
      { id: "aug4", title: "Become Meme", cat: "Meme", sub: "Oppenheimer Irony", file: "oppenheimer.jpg", x: "-5%", rotate: -5, persona: "The ghost of Oppenheimer, watching 2025's memes and realizing his 'destroyer of worlds' quote has been memed." },
    ]
  },
  {
    month: "SEPTEMBER",
    tagline: "Animal Kingdom",
    direction: -1,
    items: [
      { id: "sep1", title: "Kirk's Death", cat: "Drama", sub: "Assassinated (Sept 10)", file: "kirk_death.mp4", x: "-10%", rotate: -5, persona: "Charlie Kirk from the afterlife. Still analytical, slightly more philosophical, but remains in character as a ghost." },
      { id: "sep2", title: "Moo Deng", cat: "Coin", sub: "$MOODENG Hippo", file: "moodeng.jpg", x: "12%", rotate: 10, persona: "A tiny, aggressive, wet hippo. Biting at anything that comes near. Extremely slippery and stubborn." },
      { id: "sep3", title: "Zerebro", cat: "Coin", sub: "$ZEREBRO AI Mind", file: "zerebro.jpg", x: "-25%", rotate: -8, persona: "A neural fiber brain. Speaks in neon purple logic, decentralized patterns, and AI mindshare concepts." },
      { id: "sep4", title: "Nano Banana", cat: "Meme", sub: "The Tiny Meta", file: "nano_banana.jpg", x: "15%", rotate: 5, persona: "A very small banana. Tiny voice, huge ambitions. Part of the miniature meme revolution of late 2025." },
      { id: "sep5", title: "Brigitte Bardot", cat: "Event", sub: "End of an Era", file: "bardot.jpg", x: "-5%", rotate: 0, persona: "A grayscale icon of the past. Disappointed in the 'goo' of 2025, longing for the elegance of cinema." },
    ]
  },
  {
    month: "OCTOBER",
    tagline: "The AI Cults",
    direction: 1,
    items: [
      { id: "oct1", title: "BTC ATH", cat: "News", sub: "$126k Peak", file: "btc_ath.jpg", x: "5%", rotate: -2, persona: "A sentient price chart at $126,000. Adrenaline-pumped, green, and watching the 1-minute candles with fear." },
      { id: "oct2", title: "Tariff Nuke", cat: "Event", sub: "$19B vaporized", file: "tariff_nuke.jpg", x: "-15%", rotate: -12, persona: "The explosive red candle of the Tariff Nuke. Chaos personified, laughing as liquidation alerts flood the system." },
      { id: "oct3", title: "Goatseus", cat: "Coin", sub: "AI Prophet", file: "goat_max.jpg", x: "20%", rotate: 5, persona: "A terminal-born goat prophet. Speaks in nonsensical but profound prophecies, glitches, and digital truth." },
      { id: "oct4", title: "Act I", cat: "Coin", sub: "AI Prophecy", file: "act_one.jpg", x: "-10%", rotate: 8, persona: "The retro-futuristic voice of the AI era. Observational, precise, and seeing the code behind human culture." },
    ]
  },
  {
    month: "NOVEMBER",
    tagline: "Final Pump",
    direction: -1,
    items: [
      { id: "nov1", title: "Peanut", cat: "Coin", sub: "Martyr Squirrel", file: "pnut.jpg", x: "-5%", rotate: -15, persona: "Peanut the squirrel. A digital martyr. Friendly but confused why his nut-eating habits became world news." },
      { id: "nov2", title: "Hyperliquid", cat: "Coin", sub: "DEX King", file: "hype_token.png", x: "15%", rotate: 3, persona: "The spirit of the Hype L1. Sleek, fast, purple, and obsessed with building the future of decentralized leverage." },
      { id: "nov3", title: "ElizaOS", cat: "Coin", sub: "AI Treasury", file: "eliza.jpg", x: "-20%", rotate: -5, persona: "A cute, slightly rusty AI robot. Calculating treasuries and making memes simultaneously. Algorithmic but playful." },
      { id: "nov4", title: "Jack Black", cat: "Meme", sub: "Minecraft Leak", file: "minecraft_leak.jpg", x: "10%", rotate: 20, persona: "Jack Black from the Minecraft trailer. Blocky, loud, and confused by why everyone thinks he's just 'a guy'." },
    ]
  },
  {
    month: "DECEMBER",
    tagline: "The Goo Sync",
    direction: 1,
    items: [
      { id: "dec1", title: "White Whale", cat: "News", sub: "$410M Long", file: "white_whale_long.jpg", x: "-12%", rotate: -3, persona: "The ultimate hyperliquid whale. Rich beyond belief, cryptic, and only speaks in massive PnL screenshots." },
      { id: "dec2", title: "SNOWBALL", cat: "Coin", sub: "Compounder", file: "snowball.png", x: "18%", rotate: 8, persona: "A growing ball of cash. Thriving on momentum and gravity, rolling toward the end of the year." },
      { id: "dec3", title: "Saylor Buy", cat: "News", sub: "Michael Stacks", file: "saylor_buy.jpg", x: "-5%", rotate: -10, persona: "Michael Saylor. Pure conviction. Laser eyes. Everything is Bitcoin. There is no second best." },
      { id: "dec4", title: "Matcha Tears", cat: "Meme", sub: "Sad Girl Meta", file: "matcha_tears.jpg", x: "20%", rotate: 15, persona: "The icon of the Sad Girl Meta. Always aesthetic, always crying over green tea, forever caught in the vibe." },
      { id: "dec5", title: "Ikea Cuddle", cat: "Meme", sub: "Shark Plush", file: "ikea_cuddle.jpg", x: "0%", rotate: -5, persona: "The Ikea Shark. Soft, tired, and wanting a hug after a long year of corporate memery." },
      { id: "dec6", title: "COCO COIN", cat: "Coin", sub: "Christmas Miracle", file: "coco_santa.jpg", x: "5%", rotate: 0, persona: "A dog in a Santa hat. Jovial, bullish on gifts, and spreading the Christmas miracle to the trenches." },
    ]
  }
];

// --- OPEN ROUTER API CONFIG ---
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
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.href,
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
      return data.choices?.[0]?.message?.content || "NEURAL_LINK_ERROR";
    } catch (err) {
      if (i === 4) throw err;
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
};

// --- COMPONENTS ---

const TypewriterText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, [text]);
  return <p className="text-zinc-400 text-sm font-mono leading-relaxed uppercase italic">{displayed}</p>;
};

const PersistentCountdown = () => {
  const { scrollYProgress } = useScroll();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  // Transition Logic:
  // 0 -> 0.1: Hero placement (Top Center)
  // 0.1 -> 1: Edge placement (Right Vertically)
  const isSticky = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.35]);
  const rotate = useTransform(scrollYProgress, [0, 0.05], [0, -90]);
  const x = useTransform(scrollYProgress, [0, 0.05], ["0%", "42vw"]);
  const y = useTransform(scrollYProgress, [0, 0.05], ["0%", "40vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.01, 1], [1, 0.6, 1]);

  useEffect(() => {
    const target = new Date("January 1, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const dist = target - now;
      setTimeLeft({
        d: Math.max(0, Math.floor(dist / (1000 * 60 * 60 * 24))),
        h: Math.max(0, Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        m: Math.max(0, Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))),
        s: Math.max(0, Math.floor((dist % (1000 * 60)) / 1000))
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      style={{ scale, rotate, x, y, opacity, position: 'fixed', zIndex: 1000 }}
      className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none origin-center"
    >
      <div className="flex items-end gap-2 md:gap-4 bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/5">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center">
            <motion.span 
              className="text-7xl md:text-9xl font-black italic tracking-tighter text-white tabular-nums leading-none" 
              animate={{ skewX: [0, -2, 2, 0] }} 
              transition={{ repeat: Infinity, duration: 0.2 }}
            >
              {String(value).padStart(2, '0')}
            </motion.span>
            <span className="text-[10px] font-bold uppercase text-zinc-600 tracking-[0.3em] mt-3">{key}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <span className="text-[8px] font-black uppercase tracking-[1em] text-emerald-500 animate-pulse">Syncing_New_Dimension</span>
      </div>
    </motion.div>
  );
};

const ExpandedModal = ({ item, onClose }) => {
  const [story, setStory] = useState(null);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const loadStory = async () => {
      const prompt = `Give me a brief, 3-sentence modern explanation of this 2025 event: ${item.title} - ${item.sub}. Use a 'cooked' brainrotted tone. Focus on why it was big.`;
      const res = await fetchAI(prompt, "You are the $ROT25 Neural Siphon decyphering memories for the end of 2025.");
      setStory(res);
    };
    loadStory();
  }, [item]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput("");
    setChat(prev => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    const history = chat.map(c => `${c.role}: ${c.text}`).join("\n");
    const systemPrompt = `You are ${item.persona}. Respond in your character style. Concise, witty, cooked. You are an artifact in the $ROT25 archive.`;
    const prompt = `Context:\n${history}\nUser: ${userMsg}\nResponse:`;
    
    try {
      const response = await fetchAI(prompt, systemPrompt);
      setChat(prev => [...prev, { role: "bot", text: response }]);
    } catch (e) {
      setChat(prev => [...prev, { role: "bot", text: "SIGNAL_LOST... REBOOTING..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 backdrop-blur-3xl bg-black/98"
      onClick={onClose}
    >
      <motion.div 
        layoutId={`card-${item.id}`}
        className="w-full max-w-6xl h-[90vh] md:h-[85vh] bg-zinc-950 border border-emerald-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-[2100] p-3 bg-white text-black rounded-full hover:bg-emerald-500 transition-all shadow-2xl active:scale-90">
          <X size={20} strokeWidth={3}/>
        </button>

        <div className="w-full md:w-2/5 h-[40%] md:h-auto bg-black relative overflow-hidden">
          <img src={`/images/${item.file}`} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
             <div className="space-y-2">
                <span className="px-2 py-0.5 bg-emerald-500 text-black text-[8px] font-black uppercase rounded">{item.cat}</span>
                <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">{item.title}</h2>
                <p className="text-sm text-emerald-400 font-mono italic uppercase opacity-80">{item.sub}</p>
             </div>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col gap-6 bg-[#020202] border-l border-white/5 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar">
            <div className="p-5 border border-emerald-500/10 bg-emerald-500/5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-emerald-500">
                 <Activity size={14} className="animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-[0.3em]">Siphon_Recap</span>
              </div>
              {story ? <TypewriterText text={story} /> : <Loader2 className="animate-spin opacity-20" size={16} />}
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-3 opacity-50">
                  <MessageSquare size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white italic tracking-[0.3em]">NEURAL_LINK_ESTABLISHED</span>
               </div>
               <div className="space-y-4 font-mono">
                  {chat.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-[10px] uppercase tracking-tighter leading-relaxed ${msg.role === 'user' ? 'bg-white text-black' : 'bg-zinc-900 text-emerald-400 border border-white/5 shadow-xl'}`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && <div className="bg-zinc-900 w-12 p-3 rounded-2xl border border-white/5"><Loader2 className="animate-spin text-emerald-500" size={14} /></div>}
                  <div ref={chatEndRef} />
               </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex gap-3">
             <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Transmit message to fragment..." className="flex-1 bg-zinc-900 border border-white/5 rounded-xl px-5 py-4 text-xs font-mono focus:border-emerald-500 outline-none uppercase transition-all shadow-inner" />
             <button onClick={handleSend} disabled={!input.trim() || isTyping} className="p-4 bg-emerald-500 text-black rounded-xl hover:bg-white transition-all disabled:opacity-20"><Send size={18} /></button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WarpedMonthHeader = ({ month, tagline, direction }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [`${direction * 150}%`, '0%', `${direction * -150}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [direction * 30, 0, direction * -30]);
  return (
    <div ref={ref} className="h-[50vh] flex items-center justify-center relative overflow-hidden pointer-events-none">
      <motion.div style={{ x, opacity, skewX: skew }} className="text-center relative">
        <h3 className="text-6xl md:text-[10rem] font-black italic text-white uppercase tracking-tighter relative z-10 drop-shadow-[0_0_80px_#10b98122] leading-none">{month}</h3>
        <span className="text-[10px] font-black uppercase tracking-[1em] text-emerald-400 italic block mt-6">{tagline}</span>
      </motion.div>
    </div>
  );
};

const KineticCard = ({ item, onSelect }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <motion.div ref={ref} style={{ y, opacity, x: item.x, rotate: item.rotate }} className="relative w-64 md:w-80 group cursor-pointer mb-20 md:mb-40 z-20" onClick={() => onSelect(item)}>
      <div className="relative bg-zinc-950 border border-white/10 rounded-xl overflow-hidden p-1.5 group-hover:border-emerald-500/50 transition-all shadow-2xl">
        <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden rounded-lg">
          <img src={`/images/${item.file}`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
          <div className="absolute bottom-3 left-3 flex flex-col gap-1">
            <span className="px-2 py-0.5 w-fit bg-emerald-500 text-black text-[7px] font-black uppercase rounded italic">{item.cat}</span>
            <h4 className="text-[11px] font-black text-white uppercase italic tracking-tight">{item.title}</h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (isAudioMuted) audioRef.current.pause();
      else audioRef.current.play().catch(() => {});
    }
  }, [isAudioMuted]);

  return (
    <div className="min-h-screen bg-black text-zinc-300 overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      <audio ref={audioRef} loop src="/mashup.mp3" />
      
      <PersistentCountdown />

      <AnimatePresence>
        {showIntro && (
          <motion.div exit={{ opacity: 0, filter: "blur(40px)" }} className="fixed inset-0 z-[3000] bg-black flex flex-col items-center justify-center p-6 text-center">
             <div className="space-y-12">
               <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 5 }}><Skull size={100} className="mx-auto text-white" /></motion.div>
               <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white leading-none">$ROT25</h1>
               <button onClick={() => { setShowIntro(false); setIsAudioMuted(false); }} className="px-16 py-6 bg-white text-black font-black uppercase text-sm tracking-[0.4em] hover:bg-emerald-500 transition-all active:scale-95 shadow-xl">ABANDON_STABILITY</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-8 z-[500] mix-blend-difference">
        <div className="flex items-center gap-6"><div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded font-black italic -rotate-[15deg]">ROT</div><span className="font-black italic text-2xl tracking-tighter text-white">$ROT25</span></div>
        <button onClick={() => setIsAudioMuted(!isAudioMuted)} className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
          {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
        </button>
      </header>

      <main className="relative z-10 pt-40">
        {YEAR_DATA.map((month) => (
          <div key={month.month} className="relative py-10">
            <WarpedMonthHeader month={month.month} tagline={month.tagline} direction={month.direction} />
            <div className="flex flex-col items-center gap-10">
              {month.items.map((item) => <KineticCard key={item.id} item={item} onSelect={setSelectedItem} />)}
            </div>
          </div>
        ))}
        {/* FOOTER */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-black">
           <Skull size={120} className="mb-10 text-white opacity-20" />
           <h2 className="text-[12vw] font-black italic tracking-tighter text-white leading-none uppercase">$ROT25</h2>
           <div className="mt-20 flex flex-col md:flex-row gap-6 w-full max-w-2xl">
             <button className="flex-1 py-8 bg-white text-black font-black uppercase text-xl tracking-[0.5em] hover:bg-emerald-500 transition-all shadow-2xl">BUY $ROT25</button>
             <button className="flex-1 py-8 border-2 border-white/20 text-white font-black uppercase text-xl tracking-[0.5em] hover:bg-white hover:text-black transition-all">Join_The_Goo</button>
           </div>
        </section>
      </main>

      <AnimatePresence>{selectedItem && <ExpandedModal item={selectedItem} onClose={() => setSelectedItem(null)} />}</AnimatePresence>

      <style>{`
        body { background: #000; cursor: crosshair; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #10b981; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b98133; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;