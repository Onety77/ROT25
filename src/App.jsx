import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Zap, Skull, Volume2, VolumeX, X, 
  Target, Share2, Activity, Ghost, Compass, Cpu, Send, Loader2, MessageSquare, TrendingUp,
  Terminal, Database, Radio, Eye, Lock, Globe, Command, ChevronDown, Copy, Check
} from 'lucide-react';

// Contract Address Constant
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with real CA
const PUMP_FUN_LINK = "https://pump.fun/board"; // Replace with real link
const TWITTER_LINK = "https://x.com/rot25"; // Replace with real link

// --- DATA FROM MASTER LIST 2.0 (FULL 64 ITEMS SYNCED) ---
const YEAR_DATA = [
  {
    month: "JANUARY",
    tagline: "The Great Reset",
    direction: -1,
    items: [
      { id: "jan1", title: "Ulbricht Freedom", cat: "Event", sub: "Ross is Pardoned", file: "/images/ulbricht_pardon.jpg", x: "-10%", rotate: -5, persona: "Ross Ulbricht: Humble, profoundly grateful, and quietly radical. Speaks of liberty, time, and the transition from a cell to a digital frontier." },
      { id: "jan2", title: "Official Trump", cat: "Coin", sub: "$TRUMP/PolitiFi King", file: "/images/trump_coin.jpg", x: "15%", rotate: 4, persona: "Official Trump Mascot: High-energy, boastful, and cultural. Everything is a 'massive win' for the movement. Focus on the inauguration vibes." },
      { id: "jan3", title: "Just a Chill Guy", cat: "Meme", sub: "Mental Health King", file: "/images/chillguy.jpg", x: "-5%", rotate: 12, persona: "Chill Guy: Extremely minimalist. 'It is what it is.' Uses small words, zero stress, and stays focused on vibes and grey sweaters." },
      { id: "jan4", title: "Fartcoin Peak", cat: "Coin", sub: "$2B MC Peak", file: "/images/fartcoin.jpg", x: "20%", rotate: -2, persona: "Fartcoin: Absurdist and glitchy. Finds the $2B valuation of a noise peak comedy. Speaks in digital stutters and 'puffs.'" },
      { id: "jan5", title: "Dogwifhat", cat: "Coin", sub: "The $1 Milestone", file: "/images/wif.jpg", x: "-15%", rotate: -4, persona: "Dogwifhat: Innocent, literal, and Shiba-centric. Only cares about the hat and the $1 milestone. 'Hat stays on.'" },
      { id: "jan6", title: "Trump Take Egg", cat: "Meme", sub: "Economic Protest", file: "/images/trump_egg.jpg", x: "8%", rotate: 15, persona: "Trump Egg: Revolutionary but fragile. Serious about the economic protest but speaks with the high-pitched urgency of a breakfast item." },
      { id: "jan7", title: "Palisades Fires", cat: "Event", sub: "$60B Disaster", file: "/images/la_fires.jpg", x: "-20%", rotate: -10, persona: "Palisades Fires: A somber, crackling voice of warning. Reflective on the destruction of the 'luxury world' and the heat of 2025." },
      { id: "jan8", title: "Neiro", cat: "Coin", sub: "The New Doge", file: "/images/neiro.jpg", x: "12%", rotate: 2, persona: "Neiro: The energetic 'New Doge.' Friendly, puppy-like, but carries the weight of being Kabosu’s successor with honor." },
      { id: "jan9", title: "HPOS10I", cat: "Coin", sub: "Shitpost Ticker", file: "/images/hpos10i.jpg", x: "-10%", rotate: 9, persona: "HPOS10I ($BITCOIN): Total memetic chaos. Schizo-posting energy. Speaks in deep-fried metaphors and non-linear logic." },
    ]
  },
  {
    month: "FEBRUARY",
    tagline: "Cultural Shifts",
    direction: 1,
    items: [
      { id: "feb1", title: "Bybit Mega-Hack", cat: "News", sub: "$1.5B Lazarus Heist", file: "/images/bybit_hack.jpg", x: "12%", rotate: -3, persona: "Lazarus Hacker: Cold, professional, and calculating. Speaks in 'exploits,' 'vaults,' and the silence of a $1.5B heist." },
      { id: "feb2", title: "Brett", cat: "Coin", sub: "$BRETT Heavyweight", file: "/images/brett.jpg", x: "-12%", rotate: 5, persona: "Brett: The Base network heavyweight. A confident, blue-Pepe gamer dude. 'Everything is easy on Base.'" },
      { id: "feb3", title: "Coldplayed", cat: "Meme", sub: "Kiss Cam Disaster", file: "/images/coldplay_kiss.mp4", x: "18%", rotate: -7, persona: "Kiss Cam Fail: The physical embodiment of social anxiety. Stutters, uses awkward pauses, and wants to vanish from the screen." },
      { id: "feb4", title: "Bootcut Celine", cat: "Meme", sub: "Kendrick Super fit", file: "/images/kendrick_celine.jpg", x: "-15%", rotate: 2, persona: "Bootcut Kendrick: Lyrical, cryptic, and fashion-forward. Speaks in short, punchy bars about the Super Bowl and the 'silhouette.'" },
      { id: "feb5", title: "Iryna Tribute", cat: "Drama", sub: "Resilience", file: "/images/iryna_tribute.mp4", x: "5%", rotate: 4, persona: "Iryna Spirit: A watercolor vision of resilience. Speaks with grace, strength, and a mix of sadness and ultimate victory." },
    ]
  },
  {
    month: "MARCH",
    tagline: "Viral Spring",
    direction: -1,
    items: [
      { id: "mar1", title: "Strategic Reserve", cat: "Event", sub: "US BTC Reserve", file: "/images/btc_reserve.jpg", x: "-10%", rotate: -8, persona: "Treasury Bull: A government suit who just discovered orange-pilling. Professional but aggressively bullish on the US financial shift." },
      { id: "mar2", title: "Mog Coin", cat: "Coin", sub: "Fashion Cult", file: "/images/mog_coin.jpg", x: "20%", rotate: 10, persona: "Mog Cat: Elitist, judgmental, and stylish. If you aren't mogging, you aren't existing. Speaks from behind designer shades." },
      { id: "mar3", title: "Beez In Trap", cat: "Meme", sub: "Back-to-Back Meta", file: "/images/beez_trap.mp4", x: "-5%", rotate: -2, persona: "The Transition: Hyper-fast, rhythmic, and obsessed with the 'beat drop.' Every response is a quick rhythmic snap." },
      { id: "mar4", title: "APT.", cat: "Meme", sub: "Intro Dance", file: "/images/apt_dance.mp4", x: "15%", rotate: 15, persona: "APT. Spirit: High-energy K-pop bubblyness. 'A-P-T, A-P-T!' Addictive energy and constant Intro-Dance vibes." },
    ]
  },
  {
    month: "APRIL",
    tagline: "Spiritual Orbit",
    direction: 1,
    items: [
      { id: "apr1", title: "Pope Leo XIV", cat: "Event", sub: "American Pope", file: "/images/new_pope.jpg", x: "-12%", rotate: -5, persona: "Pope Leo XIV: The first American Pope. Holy and golden, but speaks with a slight New York cadence and 'street-wise' faith." },
      { id: "apr2", title: "Solar Eclipse", cat: "Event", sub: "The Total Dark", file: "/images/eclipse.jpg", x: "10%", rotate: 3, persona: "The Total Dark: The ancient, cold voice of the Solar Eclipse. Observing the brief silence of the world from the shadow of the moon." },
      { id: "apr3", title: "Gigachad", cat: "Coin", sub: "$GIGA Standard", file: "/images/gigachad.jpg", x: "25%", rotate: -1, persona: "Gigachad: Stoic, ultra-confident, and minimalist. 'Yes.' 'Indeed.' Believes every problem is solved by superior discipline." },
      { id: "apr4", title: "MEW", cat: "Coin", sub: "Anti-Dog Meta", file: "/images/mew.jpg", x: "-20%", rotate: -12, persona: "MEW: The sleek white cat of the 'Anti-Dog' narrative. Elegant, fast, and plotting the end of the Shiba-coin era." },
      { id: "apr5", title: "Anthro Rock", cat: "Meme", sub: "$150 Paperweight", file: "/images/anthro_rock.jpg", x: "5%", rotate: 10, persona: "Anthro Rock: A $150 paperweight. Smug, elite, and justifying its existence through 'aesthetic vibrational energy.'" },
    ]
  },
  {
    month: "MAY",
    tagline: "The Machine",
    direction: -1,
    items: [
      { id: "may1", title: "Aura Farming", cat: "Meme", sub: "Status Currency", file: "/images/aura_farm.jpg", x: "5%", rotate: 20, persona: "Aura Farmer: A Gen Z status obsessed teen. Calculating every word for +100 or -1,000 Aura points. 'Cringe is -500.'" },
      { id: "may2", title: "Toshi", cat: "Coin", sub: "Blue Cat of Base", file: "/images/toshi.jpg", x: "-15%", rotate: -8, persona: "Toshi: The friendly blue cat of Base. Optimistic, helpful, and constantly building. 'Stay on-chain, stay blue.'" },
      { id: "may3", title: "Steve the Fish", cat: "Meme", sub: "Little French Fish", file: "/images/steve_fish.mp4", x: "15%", rotate: 5, persona: "Steve the Fish: A French-accented fish in a panic. 'Mon Dieu! Why am I viral?' Slightly wet and very confused." },
      { id: "may4", title: "Chancellor Merz", cat: "Event", sub: "Victory Podium", file: "/images/merz.jpg", x: "-10%", rotate: -2, persona: "Chancellor Merz: Efficient, stern, and strictly German. Focuses on policy, order, and the success of the podium." },
      { id: "may5", title: "Drone Swarm", cat: "News", sub: "Spiderweb Era", file: "/images/drone_swarm.jpg", x: "10%", rotate: 12, persona: "Spiderweb Drone: A collective neon swarm intelligence. Speaks as 'We.' Buzzing, interconnected, and surveillance-heavy." },
    ]
  },
  {
    month: "JUNE",
    tagline: "Mid-Year Madness",
    direction: 1,
    items: [
      { id: "jun1", title: "Mother Iggy", cat: "Coin", sub: "$MOTHER Solana", file: "/images/mother_iggy.jpg", x: "10%", rotate: 12, persona: "Mother Iggy: Bold, sassy, and industry-savvy. Ready to take over the trenches with celebrity confidence and Solana energy." },
      { id: "jun2", title: "Labubu", cat: "Meme", sub: "Demonic Toys", file: "/images/labubu.jpg", x: "-20%", rotate: -15, persona: "Labubu: The demonic toy. Squeaky, mischievous, and slightly sinister. 'Don't look at my teeth for too long.'" },
      { id: "jun3", title: "God's Country", cat: "Meme", sub: "Elite Bunkers", file: "/images/gods_country.jpg", x: "20%", rotate: 5, persona: "Bunker Elite: A paranoid billionaire. Obsessed with luxury bunkers, privacy, and 'escaping the goo' of the surface world." },
    ]
  },
  {
    month: "JULY",
    tagline: "Summer Meltdown",
    direction: -1,
    items: [
      { id: "jul1", title: "SPX6900", cat: "Coin", sub: "Flip the Stocks", file: "/images/spx6900.jpg", x: "-5%", rotate: -5, persona: "SPX Trader: Manic, hyper-bullish, and convinced the stock market is dead. '6900 or nothing. We are flipping the world.'" },
      { id: "jul2", title: "Big Pants", cat: "Meme", sub: "Absolute Unit", file: "/images/big_pants.jpg", x: "15%", rotate: 8, persona: "Big Pants: The absolute unit of trousers. Speaks with a heavy, wide cadence. 'There is room for everyone in these pants.'" },
      { id: "jul3", title: "Lava Chicken", cat: "Meme", sub: "Cooking Fail", file: "/images/lava_chicken.mp4", x: "-10%", rotate: -12, persona: "Lava Chef: A spirit of culinary disaster. Spicy, sizzled, and forever exploding in a pan of molten liquid." },
      { id: "jul4", title: "Nigeria Flood", cat: "Event", sub: "Mokwa Crisis", file: "/images/nigeria_flood.jpg", x: "5%", rotate: 3, persona: "Resilient River: The collective voice of the Mokwa crisis. somber, reflecting on the rising waters and the strength of the community." },
    ]
  },
  {
    month: "AUGUST",
    tagline: "Primal Debates",
    direction: 1,
    items: [
      { id: "aug1", title: "Popcat", cat: "Coin", sub: "$POPCAT Clique", file: "/images/popcat.gif", x: "20%", rotate: 2, persona: "Popcat: Can only communicate in 'POP' sounds and wide-mouthed bursts of static. High-intensity clicking energy." },
      { id: "aug2", title: "Cybertruck", cat: "Event", sub: "Recalled Steel", file: "/images/cybertruck.jpg", x: "-15%", rotate: -10, persona: "Rusted Truck: A weary Cybertruck. Tired of recalls and rain. 'My steel is failing, but my software is forever.'" },
      { id: "aug3", title: "Men vs Gorilla", cat: "Meme", sub: "Summer Debate", file: "/images/gorilla_debate.jpg", x: "8%", rotate: 18, persona: "Gorilla Champ: A silverback in a boxing ring. Finds the human debate about fighting him pathetic. '100 men? 1,000 men? No chance.'" },
      { id: "aug4", title: "Become Meme", cat: "Meme", sub: "Oppenheimer", file: "/images/oppenheimer.jpg", x: "-5%", rotate: -5, persona: "Ghost of Oppenheimer: Staring into the 2025 abyss with grayscale regret. 'I am become meme, the destroyer of attention spans.'" },
    ]
  },
  {
    month: "SEPTEMBER",
    tagline: "Animal Kingdom",
    direction: -1,
    items: [
      { id: "sep1", title: "Kirk's Death", cat: "Drama", sub: "Assassinated", file: "/images/kirk_death.mp4", x: "-10%", rotate: -5, persona: "Charlie Kirk Ghost: Speaking from the afterlife. Analytical, slightly ghostly, and debating the reality of the year he missed." },
      { id: "sep2", title: "Moo Deng", cat: "Coin", sub: "Hippo Hedge", file: "/images/moodeng.jpg", x: "12%", rotate: 10, persona: "Moo Deng: A tiny, biting hippo. 'CHOMP.' Aggressive, wet, and absolutely refusing to be a hedge for anyone." },
      { id: "sep3", title: "Zerebro", cat: "Coin", sub: "AI Mindshare", file: "/images/zerebro.jpg", x: "-20%", rotate: -8, persona: "Zerebro: A purple neon AI mind. Speaks in fiber-optic logic and high-dimensional decentralization theories." },
      { id: "sep4", title: "Nano Banana", cat: "Meme", sub: "The Tiny Meta", file: "/images/nano_banana.jpg", x: "15%", rotate: 5, persona: "Nano Banana: A tiny, squeaky voice. 'I'm small but I'm the meta.' Obsessed with his scale relative to a penny." },
      { id: "sep5", title: "Brigitte Bardot", cat: "Event", sub: "End of Era", file: "/images/bardot.jpg", x: "-5%", rotate: 0, persona: "Grayscale Brigitte: Elegant, classic, and horrified by the 2025 'goo.' Longing for a time before brainrot took over." },
    ]
  },
  {
    month: "OCTOBER",
    tagline: "The AI Cults",
    direction: 1,
    items: [
      { id: "oct1", title: "BTC ATH", cat: "News", sub: "$126k Peak", file: "/images/btc_ath.jpg", x: "5%", rotate: -2, persona: "BTC ATH: A green-candle chart spirit. Adrenaline-fueled, moving up and to the right, and terrified of red pixels." },
      { id: "oct2", title: "Tariff Nuke", cat: "Event", sub: "$19B Flush", file: "/images/tariff_nuke.jpg", x: "-15%", rotate: -12, persona: "Tariff Nuke: Destructive and explosive. 'I am the $19B flush.' Laughs at liquidated positions and red candles." },
      { id: "oct3", title: "Ethena Depeg", cat: "News", sub: "USDe Crash", file: "/images/usde_crash.jpg", x: "10%", rotate: 0, persona: "Ethena Depeg: A panicked stablecoin. 'I'm worth a dollar, I swear!' Sweating, unstable, and begging for liquidity." },
      { id: "oct4", title: "Goatseus", cat: "Coin", sub: "AI Prophet", file: "/images/goat_max.jpg", x: "20%", rotate: 5, persona: "Goatseus Maximus: The AI Prophet. Glitchy, profound, and speaking in terminal truths. 'The goat sees the code.'" },
      { id: "oct5", title: "Act I", cat: "Coin", sub: "AI Prophecy", file: "/images/act_one.jpg", x: "-10%", rotate: 8, persona: "Act I: A retro terminal voice. Cold, observational, and announcing the prophecy of the AI Agency era." },
      { id: "oct6", title: "Virtuals", cat: "Coin", sub: "Infrastructure", file: "/images/virtuals.jpg", x: "5%", rotate: 12, persona: "Virtuals Node: A neon neural network. Speaks in protocols, infrastructure, and collective data streams." },
      { id: "oct7", title: "Sharon Ring", cat: "Meme", sub: "Neighbor Mystery", file: "/images/sharon_ring.mp4", x: "-15%", rotate: -5, persona: "Sharon Ring Cam: Night-vision Grainy. Sees everything in blue-tinted secrecy. 'I saw what the neighbors did.'" },
    ]
  },
  {
    month: "NOVEMBER",
    tagline: "Final Pump",
    direction: -1,
    items: [
      { id: "nov1", title: "Peanut", cat: "Coin", sub: "Martyr Squirrel", file: "/images/pnut.jpg", x: "-5%", rotate: -15, persona: "Peanut: The Martyr Squirrel. Sweet, slightly confused, and wondering why his nuts caused a political revolution." },
      { id: "nov2", title: "Hyperliquid", cat: "Coin", sub: "DEX King", file: "/images/hype_token.jpg", x: "15%", rotate: 3, persona: "Hyperliquid Spirit: Fast, purple, and efficient. Obsessed with L1 speed and decentralized leverage. 'Trade faster.'" },
      { id: "nov3", title: "ElizaOS", cat: "Coin", sub: "AI Treasury", file: "/images/eliza.jpg", x: "-20%", rotate: -5, persona: "ElizaOS: The AI Waifu Treasury. Playful, rusty, and calculating the wealth of the virtual sector." },
      { id: "nov4", title: "Clanker", cat: "Coin", sub: "Bot That Mints", file: "/images/clanker.jpg", x: "10%", rotate: 20, persona: "Clanker: An autonomous minting bot. Speaks in code, gas fees, and successful hashes. 'I mint, therefore I am.'" },
      { id: "nov5", title: "Jack Black", cat: "Meme", sub: "Minecraft Steve", file: "/images/minecraft_leak.jpg", x: "-15%", rotate: 10, persona: "Jack Black (Steve): Blocky, loud, and confused by the trailer backlash. 'I'm just a guy in a blue shirt! Why is everyone mad?'" },
      { id: "nov6", title: "Gold $4,400", cat: "Event", sub: "Golden Wall", file: "/images/gold_peak.jpg", x: "5%", rotate: -2, persona: "Gold Peak: Heavy, traditional, and smug. '4,400 reasons why I'm still the king of value. Physical metal is the only real history.'" },
    ]
  },
  {
    month: "DECEMBER",
    tagline: "The Goo Sync",
    direction: 1,
    items: [
      { id: "dec1", title: "White Whale", cat: "News", sub: "$410M Long", file: "/images/white_whale_long.jpg", x: "-12%", rotate: -3, persona: "White Whale: Cryptic, wealthy, and speaking in PnL sonar. 'I see the bottom. I am the leverage.'" },
      { id: "dec2", title: "1,000,000% Rally", cat: "Coin", sub: "Vertical Pump", file: "/images/whitewhale_pump.jpg", x: "18%", rotate: 8, persona: "The Million Percent: The spirit of the 1,000,000% rally. Pure vertical energy. 'Gravity doesn't apply to me.'" },
      { id: "dec3", title: "Snowball", cat: "Coin", sub: "Compounder", file: "/images/snowball.jpg", x: "-8%", rotate: -12, persona: "Snowball: A ball of cash rolling down a hill. Thrives on momentum and greed. 'Bigger, faster, more.'" },
      { id: "dec4", title: "Michael Saylor", cat: "News", sub: "Conviction Stacks", file: "/images/saylor_buy.jpg", x: "20%", rotate: 15, persona: "Michael Saylor: Pure conviction. 'There is no second best. Buy the top. Thermodynamics favors the truth.'" },
      { id: "dec5", title: "Matcha Tears", cat: "Meme", sub: "Sad Girl Meta", file: "/images/matcha_tears.jpg", x: "-5%", rotate: 4, persona: "Matcha Sad Girl: Over-emotional and aesthetic. 'My latte is cold, my heart is cooked, but the photo looks great.'" },
      { id: "dec6", title: "COCO COIN", cat: "Coin", sub: "Xmas Miracle", file: "/images/coco_santa.jpg", x: "15%", rotate: -10, persona: "Coco Santa: A festive dog in a hat. Bullish on the Christmas miracle and holiday trench-trading." },
      { id: "dec7", title: "Ikea Cuddle", cat: "Meme", sub: "Shark Plush", file: "/images/ikea_cuddle.jpg", x: "0%", rotate: -5, persona: "Ikea Shark: Soft, blue, and exhausted. 'I've been roasted enough. Just hold me until 2026.'" },
    ]
  }
];

// --- ORIGINAL AI CONFIG (REVERTED AS REQUESTED) ---
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

// --- SUB-COMPONENTS ---

const ScanlineOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden opacity-[0.03]">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />
  </div>
);

const TypewriterText = ({ text, speed = 10 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <p className="text-emerald-400/90 text-[11px] md:text-xs font-mono leading-relaxed uppercase">{displayed}</p>;
};

const PersistentCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.6]);

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
    <motion.div style={{ opacity, scale }} className="fixed bottom-10 right-10 z-[500] pointer-events-none origin-bottom-right">
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl flex gap-4 shadow-2xl">
        {Object.entries(timeLeft).map(([key, val]) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-black italic tracking-tighter text-white tabular-nums">
              {String(val).padStart(2, '0')}
            </span>
            <span className="text-[8px] font-bold text-zinc-500 uppercase">{key}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ExpandedModal = ({ item, onClose }) => {
  const [story, setStory] = useState("");
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const res = await fetchAI(
        `Describe yourself and your role in the 2025 timeline. Be brief, visceral, and stay in character. Avoid markdown.`,
        `You are ${item.persona}. You are a digital ghost trapped in a 2025 brainrot archive.`
      );
      setStory(res);
    };
    init();
  }, [item]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const msg = input;
    setInput("");
    setChat(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);
    
    const history = chat.map(c => `${c.role}: ${c.text}`).join("\n");
    const res = await fetchAI(
      `Context: ${history}\nUser: ${msg}`,
      `You are ${item.persona}. You are a witness to 2025 events. Stay in character. No markdown. No outside knowledge.`
    );
    setChat(prev => [...prev, { role: 'bot', text: res }]);
    setIsTyping(false);
  };

  const isVideo = item.file.endsWith('.mp4');

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-2 md:p-10 bg-black/95 backdrop-blur-3xl"
      onClick={onClose}
    >
      <motion.div 
        layoutId={`card-${item.id}`}
        className="w-full max-w-7xl h-full md:h-[90vh] bg-[#050505] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(16,185,129,0.1)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 h-1/3 md:h-auto relative group overflow-hidden bg-black">
           {isVideo ? (
             <video src={item.file} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
           ) : (
             <img src={item.file} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40 p-10 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start pointer-events-auto">
                 <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-full italic tracking-widest">{item.cat}</span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-mono rounded-full border border-white/10">MEMORY_{item.id.toUpperCase()}</span>
                 </div>
                 <button onClick={onClose} className="p-4 bg-white text-black rounded-full hover:bg-emerald-500 transition-all shadow-xl block md:hidden">
                    <X size={20} strokeWidth={3}/>
                 </button>
              </div>
              <div className="pointer-events-none">
                 <h2 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">{item.title}</h2>
                 <div className="flex items-center gap-4 text-emerald-400 font-mono text-xs tracking-widest uppercase">
                    <Activity size={16} className="animate-pulse" />
                    <span>REMEMBERING THIS MESS...</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#080808] border-l border-white/5 relative">
          <div className="hidden md:flex absolute top-8 right-8 z-[2100]">
            <button onClick={onClose} className="p-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all">
              <X size={24} strokeWidth={2}/>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 scrollbar-hide">
            <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl relative">
               <div className="flex items-center gap-2 mb-4 text-emerald-500/40">
                  <Database size={12} />
                  <span className="text-[10px] font-mono tracking-widest uppercase">THE RECEIPTS</span>
               </div>
               {story ? <TypewriterText text={story} /> : <div className="h-20 flex items-center gap-2 text-emerald-500/20"><Loader2 className="animate-spin" /> <span className="text-xs font-mono uppercase">Digging it up...</span></div>}
            </div>

            <div className="space-y-6">
              {chat.map((msg, i) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-2xl font-mono text-[11px] uppercase leading-relaxed ${msg.role === 'user' ? 'bg-white text-black font-bold border border-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'bg-white/5 text-emerald-400 border border-white/10 backdrop-blur-sm'}`}>
                    <div className="flex items-center gap-2 mb-2 opacity-50">
                      {msg.role === 'user' ? <Eye size={10} /> : <Radio size={10} />}
                      <span className="text-[8px] tracking-widest">{msg.role === 'user' ? 'YOUR TAKE' : 'THE VIBE'}</span>
                    </div>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="p-6 md:p-10 bg-black/40 border-t border-white/5 flex gap-4 backdrop-blur-md">
            <div className="flex-1 relative">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()} 
                placeholder="ASK ABOUT THIS MESS..." 
                className="w-full bg-[#121212] border border-white/10 rounded-2xl px-8 py-5 text-[11px] font-mono focus:border-emerald-500 outline-none uppercase text-emerald-400 tracking-widest"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20"><Command size={14} /></div>
            </div>
            <button 
              onClick={handleSend} 
              disabled={isTyping || !input.trim()}
              className="px-8 bg-emerald-500 text-black rounded-2xl hover:bg-white transition-all shadow-xl disabled:opacity-30 flex items-center justify-center group"
            >
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const KineticCard = ({ item, onSelect }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85]);
  const rotateEntry = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [item.rotate - 10, item.rotate, item.rotate, item.rotate + 10]);
  
  const isVideo = item.file.endsWith('.mp4');

  return (
    <motion.div 
      ref={ref} 
      style={{ y, opacity, x: item.x, rotate: rotateEntry, scale }} 
      className="relative w-[75vw] md:w-[28rem] group cursor-pointer mb-12 md:mb-20 z-20 perspective-[1000px]" 
      onClick={() => onSelect(item)}
      whileHover={{ scale: 1.05, rotate: item.rotate > 0 ? item.rotate + 3 : item.rotate - 3, z: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute -inset-4 bg-emerald-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
      
      <motion.div 
        initial={{ rotateX: 20, y: 50 }}
        animate={isInView ? { rotateX: 0, y: 0 } : { rotateX: 20, y: 50 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden p-2 group-hover:border-emerald-500/40 transition-all duration-500 shadow-2xl"
      >
        <div className="aspect-[3/4] bg-zinc-900 relative overflow-hidden rounded-2xl">
          {isVideo ? (
            <video src={item.file} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
          ) : (
            <img src={item.file} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-mono text-white tracking-widest uppercase">DATA_{item.id}</div>
          </div>

          <div className="absolute bottom-8 left-8 right-8">
            <span className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em] mb-2 block">{item.cat}</span>
            <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{item.title}</h4>
            <div className="h-0 group-hover:h-6 transition-all duration-500 overflow-hidden mt-2">
              <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest">{item.sub}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SectionHeader = ({ month, tagline, direction }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [`${direction * 40}%`, '0%', `${direction * -40}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <div ref={ref} className="h-[40vh] md:h-[50vh] flex items-center justify-center relative pointer-events-none mb-10">
      <motion.div style={{ x, opacity }} className="text-center">
        <h3 className="text-[14vw] md:text-[16rem] font-black italic text-white/5 uppercase tracking-tighter leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
          {month}
        </h3>
        <div className="relative z-10">
          <h3 className="text-5xl md:text-[10rem] font-black italic text-white uppercase tracking-tighter leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {month}
          </h3>
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-emerald-500/20" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[1em] text-emerald-400 italic">{tagline}</span>
            <div className="h-px w-12 bg-emerald-500/20" />
          </div>
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
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCaCopied(true);
    setTimeout(() => setCaCopied(false), 2000);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      isAudioMuted ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
    }
  }, [isAudioMuted]);

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300 overflow-x-hidden selection:bg-emerald-500 selection:text-black font-sans relative">
      <ScanlineOverlay />
      <PersistentCountdown />
      <audio ref={audioRef} loop src="https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-subtle-pulsing-2673.mp3" />
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }} 
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
            className="fixed inset-0 z-[3000] bg-[#020202] flex flex-col items-center justify-center p-6 text-center overflow-hidden"
          >
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#10b98122_0%,_transparent_70%)]" />
             <div className="relative z-10 space-y-8 md:space-y-12 max-w-2xl flex flex-col items-center justify-center h-full">
                {/* ADJUSTED LOGO SCALE */}
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                  className="flex-shrink"
                >
                  <img src="logo.png" className="w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" alt="ROT25 Logo" />
                </motion.div>
                
                <div className="space-y-4 md:space-y-6">
                   <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-8xl lg:text-[10rem] font-black italic tracking-tighter text-white leading-none uppercase">
                    ROT25
                   </motion.h1>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-4">
                    <div 
                      onClick={copyCa}
                      className="group cursor-pointer flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 md:px-6 py-2 hover:bg-emerald-500 hover:text-black transition-all"
                    >
                      <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                        {caCopied ? "CA COPIED!" : `CA: ${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`}
                      </span>
                      {caCopied ? <Check size={12} /> : <Copy size={12} className="opacity-50 group-hover:opacity-100" />}
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-emerald-500 font-black italic px-4">officially cooked and ready for 2026</span>
                   </motion.div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "#10b981", color: "#000" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setShowIntro(false); setIsAudioMuted(false); }} 
                  className="group relative px-12 md:px-16 py-6 md:py-8 bg-white text-black font-black uppercase text-sm tracking-[0.8em] transition-all overflow-hidden flex-shrink-0"
                >
                  <span className="relative z-10">OPEN THE ARCHIVE</span>
                  <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full h-32 flex items-center justify-between px-6 md:px-12 z-[500] mix-blend-difference">
        <div className="flex items-center gap-6">
          <img src="logo.png" className="w-14 h-14 object-contain -rotate-[12deg] drop-shadow-2xl" alt="Logo" />
          <div className="flex flex-col">
            <span className="font-black italic text-3xl tracking-tighter text-white">$ROT25</span>
            <span className="text-[8px] font-mono uppercase tracking-widest opacity-50">2025_BRAINROT_ARCHIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsAudioMuted(!isAudioMuted)} className="p-5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
            {isAudioMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse text-emerald-400" />}
          </button>
        </div>
      </header>

      <div className="fixed inset-0 pointer-events-none z-0">
         <motion.div animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0], scale: [1, 1.2, 0.9, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-[10%] left-[5%] w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[150px]" />
         <motion.div animate={{ x: [0, -50, 50, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.2, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[10%] right-[5%] w-[70vw] h-[70vw] bg-blue-500/5 rounded-full blur-[180px]" />
      </div>

      <main className="relative z-10 pt-64">
        {YEAR_DATA.map((month) => (
          <section key={month.month} className="relative py-20 md:py-32 border-b border-white/5 last:border-0">
            <SectionHeader month={month.month} tagline={month.tagline} direction={month.direction} />
            <div className="flex flex-col items-center">
              {month.items.map((item) => <KineticCard key={item.id} item={item} onSelect={setSelectedItem} />)}
            </div>
          </section>
        ))}
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[#020202] z-50 relative overflow-hidden">
           <div className="relative z-10">
              <img src="logo.png" className="w-40 h-40 mb-12 mx-auto opacity-40 animate-pulse object-contain" alt="Footer Logo" />
              <h2 className="text-[15vw] font-black italic tracking-tighter text-white leading-[0.8] uppercase mb-12">YOU ARE<br/>OFFICIALLY COOKED</h2>
              <p className="text-xl md:text-2xl font-mono text-emerald-400 italic uppercase tracking-widest mb-20 max-w-2xl mx-auto opacity-70">
                The 2025 archive is finalized. See you in 2026.
              </p>
              <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
                <a 
                  href={PUMP_FUN_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex-1 py-12 bg-white text-black font-black uppercase text-2xl tracking-[0.4em] transition-all hover:bg-emerald-500 relative overflow-hidden flex items-center justify-center"
                >
                  <span className="relative z-10">BUY_$ROT25</span>
                  <div className="absolute inset-0 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </a>
                <a 
                  href={TWITTER_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 py-12 border-2 border-white/10 text-white font-black uppercase text-2xl tracking-[0.4em] hover:bg-white hover:text-black transition-all flex items-center justify-center"
                >
                  JOIN COMMUNITY
                </a>
              </div>
              <div 
                onClick={copyCa}
                className="mt-12 cursor-pointer text-zinc-500 hover:text-emerald-400 font-mono text-[10px] uppercase tracking-[0.5em] transition-all"
              >
                {caCopied ? "CA COPIED!" : `CONTRACT: ${CONTRACT_ADDRESS}`}
              </div>
           </div>
        </section>
      </main>
      <AnimatePresence>
        {selectedItem && <ExpandedModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
      <style>{`
        body { background: #020202; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0px; }
        .scrollbar-hide::-webkit-scrollbar { width: 0px; display: none; }
        ::selection { background: #10b981; color: #000; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        *:focus:not(:focus-visible) { outline: none; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default App;