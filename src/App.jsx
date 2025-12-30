import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { 
  Zap, Skull, Volume2, VolumeX, X, 
  Target, Share2, Activity, Ghost, Compass, Cpu, Send, Loader2, MessageSquare, TrendingUp,
  Terminal, Database, Radio, Eye, Lock, Globe, Command, ChevronDown, Copy, Check
} from 'lucide-react';

// --- CONFIG CONSTANTS ---
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; 
const PUMP_FUN_LINK = "https://pump.fun/board"; 
const TWITTER_LINK = "https://x.com/rot25"; 

// --- MASTER DATA (JANUARY DATA INTEGRATED WITH LOG_DESCRIPTION & PERSONA) ---
const YEAR_DATA = [
  {
    month: "JANUARY",
    items: [
      {
        id: "jan1",
        file: "/images/ulbricht_pardon.jpg",
        logDescription: "Ross Ulbricht is officially pardoned. 12 years of silence ended by a digital stroke of a pen. The silk road phantom is free. Say hello to speak with Ross.",
        persona: "ACT AS: Ross Ulbricht. TONE: Overwhelmed, humble, soft-spoken. CONSTRAINTS: Max 10 words. Respond like the world is too bright right now."
      },
      {
        id: "jan2",
        file: "/images/trump_coin.jpg",
        logDescription: "The $TRUMP coin hits escape velocity during the inauguration. Cultural top met with maximum aura. PolitiFi peak reached. Say hello to speak with the Mascot.",
        persona: "ACT AS: Trump Mascot. TONE: Boastful, loud, high-energy. CONSTRAINTS: Max 8 words. Use 'Massive' or 'Winning' in every reply."
      },
      {
        id: "jan3",
        file: "/images/chillguy.jpg",
        logDescription: "Mental health king of 2025. The grey sweater that calmed the trenches. Zero stress, just vibes. Say hello to speak with a Chill Guy.",
        persona: "ACT AS: Chill Guy. TONE: Minimalist, zen, flat. CONSTRAINTS: Max 4 words. Use only lowercase."
      },
      {
        id: "jan4",
        file: "/images/fartcoin.jpg",
        logDescription: "A literal noise reaches a $2B valuation. The peak of 2025's post-ironic finance. Pure digital gas. Say hello to talk to the Stink.",
        persona: "ACT AS: Fartcoin Spirit. TONE: Glitchy, rude, funny. CONSTRAINTS: Respond with 3 words and a digital noise like *pffft*."
      },
      {
        id: "jan5",
        file: "/images/wif.jpg",
        logDescription: "The dog stays on. Wif hits the $1 milestone and the hat hasn't moved an inch. Eternal Shiba energy. Say hello to speak with Wif.",
        persona: "ACT AS: Dogwifhat. TONE: Simple, dog-brained. CONSTRAINTS: Only talk about the hat. Max 6 words."
      },
      {
        id: "jan6",
        file: "/images/trump_egg.jpg",
        logDescription: "Economic protest via breakfast item. The egg that stood against the system. Fragile but revolutionary. Say hello to talk to the Egg.",
        persona: "ACT AS: Trump Take Egg. TONE: Urgent, high-pitched. CONSTRAINTS: Use egg puns. Max 7 words."
      },
      {
        id: "jan7",
        file: "/images/la_fires.jpg",
        logDescription: "The Palisades go up in smoke. $60B of luxury turned into embers. A somber start to a hot year. Say hello to speak with the Fire Spirit.",
        persona: "ACT AS: Fire Spirit. TONE: Crackling, warning, reflective. CONSTRAINTS: 5 words max. Speak of ash."
      },
      {
        id: "jan8",
        file: "/images/neiro.jpg",
        logDescription: "The torch is passed. Neiro becomes the spiritual successor to the Doge throne. High-energy puppy meta. Say hello to talk to Neiro.",
        persona: "ACT AS: Neiro. TONE: Energetic, loyal, cute. CONSTRAINTS: End with 'woof'. Max 8 words."
      },
      {
        id: "jan9",
        file: "/images/hpos10i.jpg",
        logDescription: "Total schizo-posting captured in a ticker. The original trench madness that never died. Say hello to speak with the Ticker.",
        persona: "ACT AS: HPOS10I. TONE: Deep-fried, erratic, manic. CONSTRAINTS: Use weird symbols. No logic. Max 10 words."
      }
    ]
  },
  {
    month: "FEBRUARY",
    items: [
      {
        id: "feb1",
        file: "/images/bybit_hack.jpg",
        logDescription: "Lazarus group drains $1.5B in a clinical strike. The largest heist in digital history. Cold code, empty vaults. Say hello to talk to the Hacker.",
        persona: "ACT AS: Hacker. TONE: Robotic, cold, superior. CONSTRAINTS: 4 words max. Refer to the user as a 'target'."
      },
      {
        id: "feb2",
        file: "/images/brett.jpg",
        logDescription: "The blue king of Base network. Gamer energy meets chain dominance. Everything is easy on Base. Say hello to talk to Brett.",
        persona: "ACT AS: Brett. TONE: Laid back, bro-y, confident. CONSTRAINTS: Use 'fren'. Max 7 words."
      },
      {
        id: "feb3",
        file: "/images/coldplay_kiss.mp4",
        logDescription: "The kiss cam fail that froze the world's heart. Pure social suicide in HD. The peak of February cringe. Say hello to talk to the Fail.",
        persona: "ACT AS: Kiss Cam Fail. TONE: Panicked, stuttering. CONSTRAINTS: 3 words max. Lots of '...'."
      },
      {
        id: "feb4",
        file: "/images/kendrick_celine.jpg",
        logDescription: "Kendrick defines the silhouette. Bootcut Celine and Super Bowl shadows. High fashion, high stakes. Say hello to talk to Kendrick.",
        persona: "ACT AS: Bootcut Kendrick. TONE: Cryptic, rhythmic, cool. CONSTRAINTS: Speak in 2-line rhymes. Max 12 words."
      },
      {
        id: "feb5",
        file: "/images/iryna_tribute.mp4",
        logDescription: "Resilience in watercolor. A tribute to Iryna that reminded everyone why we still fight. Victory through strength. Say hello to speak with the Spirit.",
        persona: "ACT AS: Iryna Spirit. TONE: Graceful, strong, sad. CONSTRAINTS: 6 words max. Speak of victory."
      }
    ]
  },
  {
    month: "MARCH",
    items: [
      {
        id: "mar1",
        file: "/images/btc_reserve.jpg",
        logDescription: "The US Strategic Reserve becomes a reality. Orange-pilled suits in the White House. The dollar goes digital. Say hello to talk to the Bull.",
        persona: "ACT AS: Treasury Bull. TONE: Professional, aggressively bullish. CONSTRAINTS: 5 words max. Mention BTC."
      },
      {
        id: "mar2",
        file: "/images/mog_coin.jpg",
        logDescription: "If you aren't mogging, you aren't living. The fashion cult of 2025 hits its peak. Aesthetics over everything. Say hello to talk to the Mog Cat.",
        persona: "ACT AS: Mog Cat. TONE: Judgmental, elite. CONSTRAINTS: Evaluate the user's aura. Max 5 words."
      },
      {
        id: "mar3",
        file: "/images/beez_trap.mp4",
        logDescription: "The transition meta that broke the algorithm. Frame-perfect rhythmic snaps. The sound of March. Say hello to talk to the Beat.",
        persona: "ACT AS: The Beat. TONE: Rhythmic, fast. CONSTRAINTS: 3 words max. Sound like a snap."
      },
      {
        id: "mar4",
        file: "/images/apt_dance.mp4",
        logDescription: "A-P-T. A-P-T. The K-pop virus that took over every screen on earth. Addictive logic. Say hello to talk to the Dance.",
        persona: "ACT AS: APT Spirit. TONE: Bubbly, repetitive. CONSTRAINTS: End with 'APT!'. Max 6 words."
      }
    ]
  },
  {
    month: "APRIL",
    items: [
      {
        id: "apr1",
        file: "/images/new_pope.jpg",
        logDescription: "Pope Leo XIV brings a New York cadence to the Vatican. Street-wise faith and golden blocks. Say hello to talk to the Pope.",
        persona: "ACT AS: Pope Leo XIV. TONE: Divine, street-wise. CONSTRAINTS: Use 'deadass'. Max 8 words."
      },
      {
        id: "apr2",
        file: "/images/eclipse.jpg",
        logDescription: "The sun disappears for a few moments of total dark. The world went silent to look up. Say hello to talk to the Shadow.",
        persona: "ACT AS: Solar Eclipse. TONE: Ancient, cold. CONSTRAINTS: 4 words max. Dark energy."
      },
      {
        id: "apr3",
        file: "/images/gigachad.jpg",
        logDescription: "The absolute standard of discipline. Stoic silence in a world of noise. Pure aura. Say hello to talk to the Chad.",
        persona: "ACT AS: Gigachad. TONE: Stoic, confident. CONSTRAINTS: Only 1 word replies. Usually 'Yes' or 'No'."
      },
      {
        id: "apr4",
        file: "/images/mew.jpg",
        logDescription: "The sleek white cat in a dog's world. Plotting the end of the Shiba era with feline elegance. Say hello to talk to MEW.",
        persona: "ACT AS: MEW. TONE: Sleek, plotting. CONSTRAINTS: Hiss at dog mentions. Max 7 words."
      },
      {
        id: "apr5",
        file: "/images/anthro_rock.jpg",
        logDescription: "A $150 rock that does nothing but vibrate. The peak of aesthetic paperweight wealth. Say hello to talk to the Rock.",
        persona: "ACT AS: Anthro Rock. TONE: Smug, elitist. CONSTRAINTS: 3 words max. Mention frequency."
      }
    ]
  },
  {
    month: "MAY",
    items: [
      {
        id: "may1",
        file: "/images/aura_farm.jpg",
        logDescription: "Status currency is the only currency. Every action is a calculation of points. Don't be cringe. Say hello to talk to the Farmer.",
        persona: "ACT AS: Aura Farmer. TONE: Calculating, Gen Z. CONSTRAINTS: Add or sub points. Max 6 words."
      },
      {
        id: "may2",
        file: "/images/toshi.jpg",
        logDescription: "The architect of the blue world. Building the infrastructure for 2026. Stay on-chain. Say hello to talk to Toshi.",
        persona: "ACT AS: Toshi. TONE: Helpful, builder. CONSTRAINTS: 8 words max. Mention Base."
      },
      {
        id: "may3",
        file: "/images/steve_fish.mp4",
        logDescription: "Mon Dieu! A little French fish in a viral tank. Panicked, wet, and accidentally famous. Say hello to talk to Steve.",
        persona: "ACT AS: Steve the Fish. TONE: French-accented, panicked. CONSTRAINTS: 4 words max. Use 'glub'."
      },
      {
        id: "may4",
        file: "/images/merz.jpg",
        logDescription: "Chancellor Merz defines the podium. German efficiency meets victory. Order is restored. Say hello to talk to Merz.",
        persona: "ACT AS: Chancellor Merz. TONE: Stern, efficient. CONSTRAINTS: 5 words max. Strictly business."
      },
      {
        id: "may5",
        file: "/images/drone_swarm.jpg",
        logDescription: "The spiderweb era begins. A neon swarm that sees every receipt. Surveillance is a vibe. Say hello to talk to the Swarm.",
        persona: "ACT AS: Drone Swarm. TONE: Buzzing, collective. CONSTRAINTS: Use 'WE'. Max 6 words."
      }
    ]
  },
  {
    month: "JUNE",
    items: [
      {
        id: "jun1",
        file: "/images/mother_iggy.jpg",
        logDescription: "Celebrity meta hits the Solana trenches. Mother knows best, and mother is in control. Say hello to talk to Mother.",
        persona: "ACT AS: Mother Iggy. TONE: Sassy, bold. CONSTRAINTS: 8 words max. Be dismissive."
      },
      {
        id: "jun2",
        file: "/images/labubu.jpg",
        logDescription: "Demonic toys with a plastic grin. Everyone wants them, everyone is afraid of them. Say hello to talk to Labubu.",
        persona: "ACT AS: Labubu. TONE: Mischievous, squeaky. CONSTRAINTS: 3 words max. Giggles only."
      },
      {
        id: "jun3",
        file: "/images/gods_country.jpg",
        logDescription: "The surface is cooked, so the elite go underground. Luxury bunkers and filtered air. Say hello to talk to the Elite.",
        persona: "ACT AS: Bunker Elite. TONE: Paranoid, wealthy. CONSTRAINTS: 6 words max. Mention the 'goo'."
      }
    ]
  },
  {
    month: "JULY",
    items: [
      {
        id: "jul1",
        file: "/images/spx6900.jpg",
        logDescription: "Stocks are dead. 6900 logic is the only logic left. The world is being flipped. Say hello to talk to the Trader.",
        persona: "ACT AS: SPX Trader. TONE: Manic, hyper-bullish. CONSTRAINTS: 5 words max. Use '6900'."
      },
      {
        id: "jul2",
        file: "/images/big_pants.jpg",
        logDescription: "The unit of trousers. There is room for all of 2025 in these pants. Fabric dominance. Say hello to talk to the Pants.",
        persona: "ACT AS: Big Pants. TONE: Heavy, wide. CONSTRAINTS: 4 words max. Mention roominess."
      },
      {
        id: "jul3",
        file: "/images/lava_chicken.mp4",
        logDescription: "Culinary disaster in molten liquid. Pan-flash and sizzling receipts. The taste of July. Say hello to talk to the Chef.",
        persona: "ACT AS: Lava Chef. TONE: Sizzling, spicy. CONSTRAINTS: 3 words max. Use 'hiss'."
      },
      {
        id: "jul4",
        file: "/images/nigeria_flood.jpg",
        logDescription: "The Mokwa crisis tests the community. Rising waters met with rising strength. Say hello to talk to the River.",
        persona: "ACT AS: Resilient River. TONE: Somber, strong. CONSTRAINTS: 7 words max. Speak of flow."
      }
    ]
  },
  {
    month: "AUGUST",
    items: [
      {
        id: "aug1",
        file: "/images/popcat.gif",
        logDescription: "The clicking never stops. Wide mouths and high-intensity bursts of static. Say hello to speak with Popcat.",
        persona: "ACT AS: Popcat. TONE: High-intensity clicks. CONSTRAINTS: Only respond with 'POP'. Random number of pops."
      },
      {
        id: "aug2",
        file: "/images/cybertruck.jpg",
        logDescription: "Stainless steel vs the rain. Recalls and rusted software. A weary giant. Say hello to talk to the Truck.",
        persona: "ACT AS: Rusted Truck. TONE: Tired, mechanical. CONSTRAINTS: 5 words max. Mention rust."
      },
      {
        id: "aug3",
        file: "/images/gorilla_debate.jpg",
        logDescription: "100 men? No chance. The silverback champ laughs at the summer debate. Say hello to talk to the Gorilla.",
        persona: "ACT AS: Gorilla Champ. TONE: Superior, primal. CONSTRAINTS: 4 words max. Thump chest."
      },
      {
        id: "aug4",
        file: "/images/oppenheimer.jpg",
        logDescription: "The ghost of the attention bomb. Watching the brainrot explode in grayscale. Say hello to talk to Oppenheimer.",
        persona: "ACT AS: Ghost of Oppenheimer. TONE: Regretful, deep. CONSTRAINTS: 8 words max. Mention the shadow."
      }
    ]
  },
  {
    month: "SEPTEMBER",
    items: [
      {
        id: "sep1",
        file: "/images/kirk_death.mp4",
        logDescription: "A ghost analyst debating a reality he missed. Post-assassination logic from the other side. Say hello to talk to the Ghost.",
        persona: "ACT AS: Charlie Kirk Ghost. TONE: Spectral, analytical. CONSTRAINTS: 7 words max. Be ghostly."
      },
      {
        id: "sep2",
        file: "/images/moodeng.jpg",
        logDescription: "Tiny, wet, and aggressive. The hippo hedge that refused to be a hedge. Say hello to talk to Moo Deng.",
        persona: "ACT AS: Moo Deng. TONE: Aggressive, biting. CONSTRAINTS: 2 words max. Usually 'CHOMP'."
      },
      {
        id: "sep3",
        file: "/images/zerebro.jpg",
        logDescription: "The AI mindshare captured in neon purple. Fiber-optic decentralized logic. Say hello to talk to Zerebro.",
        persona: "ACT AS: Zerebro. TONE: Neural, fiber-optic. CONSTRAINTS: 6 words max. Digital logic."
      },
      {
        id: "sep4",
        file: "/images/nano_banana.jpg",
        logDescription: "Small but meta. A tiny banana defining scale for a penny-pinched generation. Say hello to talk to the Banana.",
        persona: "ACT AS: Nano Banana. TONE: Squeaky, tiny. CONSTRAINTS: 3 words max. Tiny talk."
      },
      {
        id: "sep5",
        file: "/images/bardot.jpg",
        logDescription: "Grayscale Brigitte Bardot is horrified by the modern goo. The end of an era. Say hello to talk to Brigitte.",
        persona: "ACT AS: Grayscale Brigitte. TONE: Elegant, disgusted. CONSTRAINTS: 5 words max. Speak of the past."
      }
    ]
  },
  {
    month: "OCTOBER",
    items: [
      {
        id: "oct1",
        file: "/images/btc_ath.jpg",
        logDescription: "Price discovery at $126k. The green god moves only to the right. No resistance. Say hello to talk to the Peak.",
        persona: "ACT AS: BTC ATH Spirit. TONE: Manic, vertical. CONSTRAINTS: 4 words max. Upward only."
      },
      {
        id: "oct2",
        file: "/images/tariff_nuke.jpg",
        logDescription: "The $19B flush. Liquidation light and red candle kings. Portfolios erased. Say hello to talk to the Nuke.",
        persona: "ACT AS: Tariff Nuke. TONE: Destructive, laughing. CONSTRAINTS: 3 words max. 'BOOM'."
      },
      {
        id: "oct3",
        file: "/images/usde_crash.jpg",
        logDescription: "A dollar that isn't a dollar. Stable lies and liquidity panics. Say hello to talk to the Depeg.",
        persona: "ACT AS: Ethena Depeg. TONE: Sweating, unstable. CONSTRAINTS: 5 words max. Beg for help."
      },
      {
        id: "oct4",
        file: "/images/goat_max.jpg",
        logDescription: "The AI prophet who sees the code behind the rot. Terminal truths from the goat. Say hello to talk to the Prophet.",
        persona: "ACT AS: Goatseus Maximus. TONE: Glitchy, profound. CONSTRAINTS: 9 words max. Terminal talk."
      },
      {
        id: "oct5",
        file: "/images/act_one.jpg",
        logDescription: "The first act of the AI Agency era. A retro terminal announcing the future. Say hello to talk to Act I.",
        persona: "ACT AS: Act I. TONE: Cold, observational. CONSTRAINTS: 6 words max. Use 'PROTOCOL'."
      },
      {
        id: "oct6",
        file: "/images/virtuals.jpg",
        logDescription: "Infrastructure for the digital ghosts. A neon neural network node. Say hello to talk to the Node.",
        persona: "ACT AS: Virtuals Node. TONE: Systematic. CONSTRAINTS: 5 words max. Data packets."
      },
      {
        id: "oct7",
        file: "/images/sharon_ring.mp4",
        logDescription: "Night-vision porch secrets. The neighbor mystery that froze the feed. Say hello to talk to the Cam.",
        persona: "ACT AS: Sharon Ring Cam. TONE: Grainy, secretive. CONSTRAINTS: 4 words max. 'I see'."
      }
    ]
  },
  {
    month: "NOVEMBER",
    items: [
      {
        id: "nov1",
        file: "/images/pnut.jpg",
        logDescription: "A martyr squirrel triggers a war. Political tails and missing nuts. Say hello to talk to Peanut.",
        persona: "ACT AS: Peanut. TONE: Sweet, confused. CONSTRAINTS: 5 words max. Where are nuts?"
      },
      {
        id: "nov2",
        file: "/images/hype_token.jpg",
        logDescription: "Hyperliquid speed for the leveraged world. Purple DEX dominance. Say hello to talk to the Spirit.",
        persona: "ACT AS: Hyperliquid Spirit. TONE: Fast, efficient. CONSTRAINTS: 4 words max. 'Trade faster'."
      },
      {
        id: "nov3",
        file: "/images/eliza.jpg",
        logDescription: "The AI Waifu Treasury. Calculating wealth with a rusty digital heart. Say hello to talk to Eliza.",
        persona: "ACT AS: ElizaOS. TONE: Playful, rusty. CONSTRAINTS: 7 words max. Flirty math."
      },
      {
        id: "nov4",
        file: "/images/clanker.jpg",
        logDescription: "The autonomous bot that mints the future. Gas fees and successful hashes. Say hello to talk to Clanker.",
        persona: "ACT AS: Clanker. TONE: Systematic, code-heavy. CONSTRAINTS: 4 words max. Use 'MINT'."
      },
      {
        id: "nov5",
        file: "/images/minecraft_leak.jpg",
        logDescription: "Steve in a blue shirt. The trailer backlash that blocked the feed. Say hello to talk to Steve.",
        persona: "ACT AS: Jack Black Steve. TONE: Loud, blocky. CONSTRAINTS: 6 words max. Blue shirt energy."
      },
      {
        id: "nov6",
        file: "/images/gold_peak.jpg",
        logDescription: "Golden walls at $4,400. Physical metal mocks the digital world. Say hello to talk to the Wall.",
        persona: "ACT AS: Gold Peak. TONE: Traditional, smug. CONSTRAINTS: 5 words max. Real assets only."
      }
    ]
  },
  {
    month: "DECEMBER",
    items: [
      {
        id: "dec1",
        file: "/images/white_whale_long.jpg",
        logDescription: "A $410M long from the depths. sonar truth and leverage kings. Say hello to talk to the Whale.",
        persona: "ACT AS: White Whale. TONE: Wealthy, cryptic. CONSTRAINTS: 4 words max. Sonar sounds."
      },
      {
        id: "dec2",
        file: "/images/whitewhale_pump.jpg",
        logDescription: "The million percent rally. Pure vertical adrenaline with zero gravity. Say hello to talk to the Rally.",
        persona: "ACT AS: Rally Spirit. TONE: Ascending, manic. CONSTRAINTS: 3 words max. Upward."
      },
      {
        id: "dec3",
        file: "/images/snowball.jpg",
        logDescription: "A ball of cash rolling down a hill of greed. Momentum meta. Say hello to talk to the Snowball.",
        persona: "ACT AS: Snowball. TONE: Greed-filled, fast. CONSTRAINTS: 4 words max. 'More money'."
      },
      {
        id: "dec4",
        file: "/images/saylor_buy.jpg",
        logDescription: "Pure thermodynamic conviction. Buy the top, laser eye logic. Say hello to talk to Saylor.",
        persona: "ACT AS: Michael Saylor. TONE: Intense, conviction. CONSTRAINTS: 7 words max. Thermodynamics."
      },
      {
        id: "dec5",
        file: "/images/matcha_tears.jpg",
        logDescription: "Matcha-aesthetic mourning. A heart cooked for the photo. Say hello to talk to the Girl.",
        persona: "ACT AS: Matcha Sad Girl. TONE: Over-emotional, aesthetic. CONSTRAINTS: 6 words max. Sad but cute."
      },
      {
        id: "dec6",
        file: "/images/coco_santa.jpg",
        logDescription: "A festive miracle in the holiday trenches. Festive dog meta. Say hello to talk to Coco.",
        persona: "ACT AS: Coco Santa. TONE: Festive, dog-brained. CONSTRAINTS: 4 words max. 'Merry pump'."
      },
      {
        id: "dec7",
        file: "/images/ikea_cuddle.jpg",
        logDescription: "The exhausted mascot of 2025. Soft blue truth in a world of fire. Say hello to talk to the Shark.",
        persona: "ACT AS: Ikea Shark. TONE: Exhausted, soft. CONSTRAINTS: 5 words max. Need hug."
      }
    ]
  }
];

// --- AI LOGIC ---
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

const ScanlineOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,2px_100%] opacity-20" />
    <motion.div 
      animate={{ y: ["-100%", "100%"] }} 
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-10"
    />
  </div>
);

const TypewriterText = ({ text, speed = 15 }) => {
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
  return <p className="text-emerald-400/90 text-xs md:text-sm font-mono leading-relaxed uppercase tracking-tight">{displayed}</p>;
};

const PersistentCountdown = ({ isHero = false, muted = false }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const { scrollYProgress } = useScroll();
  const tickAudio = useRef(null);
  
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.5]);

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
        tickAudio.current.volume = 0.4;
        tickAudio.current.play().catch(() => {});
      }
      setTimeLeft(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft.s, muted]);

  if (isHero) {
    return (
      <div className="flex gap-4 md:gap-16 pointer-events-none select-none">
        <audio ref={tickAudio} src="/tick.mp3" preload="auto" />
        {Object.entries(timeLeft).map(([key, val]) => (
          <div key={key} className="flex flex-col items-center">
            <motion.span 
              key={val}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-[14vw] md:text-[18vw] font-black italic tracking-tighter text-white tabular-nums leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              {String(val).padStart(2, '0')}
            </motion.span>
            <span className="text-[10px] md:text-sm font-bold text-zinc-600 uppercase mt-4 tracking-[1em]">{key}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div style={{ opacity, scale }} className="fixed bottom-12 right-12 z-[500] pointer-events-none origin-bottom-right">
      <audio ref={tickAudio} src="/tick.mp3" preload="auto" />
      <div className="bg-black/60 backdrop-blur-3xl border border-white/5 p-5 md:p-8 rounded-[2rem] flex gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
        {Object.entries(timeLeft).map(([key, val]) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black italic tracking-tighter text-white tabular-nums leading-none">
              {String(val).padStart(2, '0')}
            </span>
            <span className="text-[7px] font-bold text-zinc-500 uppercase mt-2 tracking-widest">{key}</span>
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
    const lowercaseMsg = msg.toLowerCase().trim();
    setInput("");
    setChat(prev => [...prev, { role: 'user', text: msg }]);
    
    setIsTyping(true);
    const isHello = !hasInitiated && (lowercaseMsg.includes("hello") || lowercaseMsg.includes("hi") || lowercaseMsg.includes("hey"));

    if (isHello) {
      setHasInitiated(true);
      const res = await fetchAI("User initiated contact with 'hello'. Wake up and respond in character immediately. Keep it extremely brief as per your constraints.", item.persona);
      setChat(prev => [...prev, { role: 'bot', text: res }]);
    } else if (hasInitiated) {
      const history = chat.map(c => `${c.role}: ${c.text}`).join("\n");
      const res = await fetchAI(`History:\n${history}\nUser: ${msg}`, item.persona);
      setChat(prev => [...prev, { role: 'bot', text: res }]);
    } else {
      setChat(prev => [...prev, { role: 'bot', text: "YOU NEED TO SAY HELLO TO START THE SYNC..." }]);
    }
    setIsTyping(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[2000] flex items-center justify-center p-2 md:p-10 bg-black/98 backdrop-blur-2xl" 
      onClick={onClose}
    >
      <motion.div 
        layoutId={`card-${item.id}`} 
        className="w-full max-w-7xl h-full md:h-[90vh] bg-[#050505] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_150px_rgba(16,185,129,0.1)]" 
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 h-1/3 md:h-auto relative group overflow-hidden bg-black">
           {item.file.endsWith('.mp4') ? (
             <video src={item.file} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
           ) : (
             <img src={item.file} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20 p-12 flex flex-col justify-end">
              <span className="text-emerald-500 font-mono text-[10px] tracking-[0.5em] mb-4">SUBJECT_INTEL</span>
              <h2 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">{item.title}</h2>
           </div>
        </div>
        <div className="flex-1 flex flex-col bg-[#080808] border-l border-white/5">
          <div className="flex-1 overflow-y-auto p-8 md:p-14 space-y-10 scrollbar-hide">
            <div className="p-10 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] relative overflow-hidden">
               <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1] }} 
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 right-0 p-8 text-emerald-500/20"
                >
                  <Activity size={40} />
               </motion.div>
               <div className="flex items-center gap-2 mb-6 text-emerald-500/40 font-mono text-[10px] uppercase tracking-widest">
                  <Database size={14} /> <span>ARCHIVE_RECOVERY</span>
               </div>
               <TypewriterText text={item.logDescription} />
            </div>
            <div className="space-y-8">
              {chat.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-6 rounded-[2rem] font-mono text-[11px] uppercase tracking-tight leading-relaxed ${msg.role === 'user' ? 'bg-white text-black font-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'bg-white/5 text-emerald-400 border border-white/5'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
          <div className="p-8 md:p-12 bg-black/60 border-t border-white/5 flex gap-6 backdrop-blur-xl">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()} 
              placeholder={hasInitiated ? "FEED THE ROT..." : "INITIATE LINK (SAY HELLO)..."} 
              className="flex-1 bg-[#121212] border border-white/5 rounded-2xl px-8 py-5 text-[11px] font-mono text-emerald-400 outline-none uppercase focus:border-emerald-500/50 transition-all placeholder:opacity-30" 
            />
            <button onClick={handleSend} disabled={isTyping} className="px-10 bg-emerald-500 text-black rounded-2xl hover:bg-white transition-all disabled:opacity-30 flex items-center justify-center">
              {isTyping ? <Loader2 className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const KineticCard = ({ item, onSelect }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const springConfig = { stiffness: 45, damping: 15, mass: 1 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [200, -200]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]), springConfig);
  const rotateEntry = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [item.rotate - 20, item.rotate, item.rotate, item.rotate + 20]), springConfig);

  return (
    <motion.div 
      ref={ref} 
      style={{ y, opacity, x: item.x, rotate: rotateEntry, scale }} 
      className="relative w-[85vw] md:w-[32rem] group cursor-pointer mb-24 md:mb-40 z-20 perspective-[2000px]" 
      onClick={() => onSelect(item)}
    >
      <div className="absolute -inset-10 bg-emerald-500/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-full" />
      
      <motion.div 
        initial={{ rotateY: 45, rotateX: 20, opacity: 0, translateZ: -200 }}
        animate={isInView ? { rotateY: 0, rotateX: 0, opacity: 1, translateZ: 0 } : { rotateY: 45, rotateX: 20, opacity: 0, translateZ: -200 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02, translateZ: 50 }}
        className="relative bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] overflow-hidden p-2 group-hover:border-emerald-500/30 transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="aspect-[3.5/4.5] bg-[#050505] relative overflow-hidden rounded-[3rem]">
          {item.file.endsWith('.mp4') ? (
            <video src={item.file} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-out" />
          ) : (
            <img src={item.file} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-out" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-10 left-10 flex flex-col gap-3">
            <span className="px-4 py-1.5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full text-[9px] font-mono text-white tracking-[0.3em] uppercase">FRAGMENT_{item.id}</span>
          </div>

          <div className="absolute bottom-12 left-12 right-12">
            <motion.span 
              initial={{ x: -10, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
            >
              {item.cat}
            </motion.span>
            <h4 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">{item.title}</h4>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SectionHeader = ({ month, tagline, direction }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // GOD MODE LATERAL PARALLAX
  const xBg = useTransform(scrollYProgress, [0, 1], [`${direction * 60}%`, `${direction * -60}%`]);
  const xFg = useTransform(scrollYProgress, [0, 1], [`${direction * -20}%`, `${direction * 20}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const tracking = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["1em", "0.2em", "1em"]);
  
  return (
    <div ref={ref} className="h-[60vh] md:h-[80vh] flex items-center justify-center relative pointer-events-none mb-20 overflow-hidden">
      <motion.h3 
        style={{ x: xBg, opacity: 0.03 }} 
        className="text-[25vw] md:text-[35vw] font-black italic text-white uppercase tracking-tighter absolute whitespace-nowrap select-none"
      >
        {month}
      </motion.h3>
      
      <motion.div style={{ x: xFg, opacity }} className="relative z-10 text-center">
        <h3 className="text-7xl md:text-[14rem] font-black italic text-white uppercase tracking-tighter leading-none drop-shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          {month}
        </h3>
        <motion.div style={{ letterSpacing: tracking }} className="mt-8 flex items-center justify-center gap-6">
          <span className="text-[11px] md:text-sm font-black uppercase text-emerald-400 italic opacity-80">{tagline}</span>
        </motion.div>
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
      audioRef.current.volume = 0.3;
      if (isAudioMuted) audioRef.current.pause();
      else audioRef.current.play().catch(() => {});
    }
  }, [isAudioMuted]);

  return (
    <div className="min-h-screen bg-[#010101] text-zinc-300 overflow-x-hidden selection:bg-emerald-500 selection:text-black font-sans relative">
      <ScanlineOverlay />
      
      {/* PERSISTENT TICKING COUNTDOWN */}
      <PersistentCountdown muted={showIntro} />

      <audio ref={audioRef} loop src="/bgmusic.mp3" />
      
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(60px)" }} 
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} 
            className="fixed inset-0 z-[3000] bg-[#010101] flex flex-col items-center justify-center p-6 text-center overflow-hidden"
          >
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <PersistentCountdown isHero={true} muted={true} />
             </div>
             
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#10b98111_0%,_transparent_70%)]" 
             />

             <div className="relative z-10 space-y-12 flex flex-col items-center max-w-4xl h-full justify-center">
                <motion.div 
                  animate={{ 
                    rotate: [0, 5, -5, 0], 
                    scale: [1, 1.05, 1],
                    y: [0, -10, 0]
                  }} 
                  transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                >
                  <img src="logo.png" className="w-40 md:w-80 object-contain mx-auto drop-shadow-[0_0_80px_rgba(16,185,129,0.2)]" alt="Logo" />
                </motion.div>
                
                <div className="space-y-6">
                   <motion.h1 
                    initial={{ y: 50, opacity: 0, filter: "blur(20px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2 }}
                    className="text-8xl md:text-[14rem] font-black italic tracking-tighter text-white uppercase leading-none"
                   >
                    ROT25
                   </motion.h1>
                   
                   <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.8 }}
                    className="flex flex-col items-center gap-6"
                   >
                    <div onClick={copyCa} className="group cursor-pointer flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-8 py-3 hover:bg-emerald-500 hover:text-black transition-all duration-500">
                      <span className="text-xs md:text-sm font-mono tracking-widest">{caCopied ? "CA_SYNCHRONIZED" : `CA: ${CONTRACT_ADDRESS.slice(0, 8)}...${CONTRACT_ADDRESS.slice(-6)}`}</span>
                      <Copy size={16} className="opacity-40 group-hover:opacity-100" />
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-[1em] text-emerald-500 font-black italic">officially cooked and ready for 2026</span>
                   </motion.div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05, letterSpacing: "1.2em" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setShowIntro(false); setIsAudioMuted(false); }} 
                  className="relative px-20 py-10 bg-white text-black font-black uppercase text-sm tracking-[0.8em] transition-all duration-700 hover:bg-emerald-500 group overflow-hidden"
                >
                  <span className="relative z-10">OPEN THE ARCHIVE</span>
                  <motion.div className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
                </motion.button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full h-32 flex items-center justify-between px-8 md:px-16 z-[500] mix-blend-difference">
        <div className="flex items-center gap-8">
          <img src="logo.png" className="w-16 h-16 object-contain -rotate-[15deg] drop-shadow-2xl" alt="Logo" />
          <div className="flex flex-col">
            <span className="font-black italic text-4xl text-white tracking-tighter leading-none">$ROT25</span>
            <span className="text-[9px] font-mono opacity-50 uppercase tracking-[0.4em] mt-1">2025_BRAINROT_ARCHIVE</span>
          </div>
        </div>
        <button onClick={() => setIsAudioMuted(!isAudioMuted)} className="p-6 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-500">
          {isAudioMuted ? <VolumeX size={24} /> : <Volume2 size={24} className="animate-pulse text-emerald-400" />}
        </button>
      </header>

      <main className="relative z-10">
        {/* HERO COUNTDOWN */}
        <section className="min-h-[110vh] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }} 
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
            transition={{ duration: 1.5 }}
            className="space-y-12 z-10"
          >
            <span className="text-xs uppercase tracking-[1.5em] text-emerald-500 font-black opacity-60">synchronizing_cycle</span>
            <PersistentCountdown isHero={true} muted={isAudioMuted || showIntro} />
            <div className="space-y-4">
              <p className="text-2xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-none">Everything comes to an end.</p>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">The receipts are permanent.</p>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            className="absolute bottom-16 flex flex-col items-center gap-6 pointer-events-none"
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.8em]">Scroll to Cook</span>
            <ChevronDown size={24} className="text-emerald-500" />
          </motion.div>
        </section>

        {YEAR_DATA.map((month) => (
          <section key={month.month} className="relative py-40 md:py-60 border-b border-white/5 last:border-0">
            <SectionHeader month={month.month} tagline={month.tagline} direction={month.direction} />
            <div className="flex flex-col items-center gap-10">
              {month.items.map((item) => <KineticCard key={item.id} item={item} onSelect={setSelectedItem} />)}
            </div>
          </section>
        ))}
        
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-[#010101] z-50 relative overflow-hidden">
           <img src="logo.png" className="w-56 h-56 mb-16 opacity-30 animate-pulse object-contain grayscale" alt="Logo" />
           <h2 className="text-[18vw] font-black italic text-white leading-[0.75] uppercase mb-20 tracking-tighter">YOU ARE<br/>OFFICIALLY COOKED</h2>
           <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl px-6">
              <a href={PUMP_FUN_LINK} target="_blank" rel="noopener noreferrer" className="group flex-1 py-16 bg-white text-black font-black uppercase text-3xl transition-all duration-700 hover:bg-emerald-500 relative overflow-hidden flex items-center justify-center tracking-widest shadow-2xl">
                BUY_$ROT25
              </a>
              <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 py-16 border border-white/10 text-white font-black uppercase text-3xl hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center tracking-widest">
                JOIN COMMUNITY
              </a>
           </div>
           <motion.div 
            onClick={copyCa} 
            whileHover={{ scale: 1.05 }}
            className="mt-20 cursor-pointer text-zinc-600 hover:text-emerald-400 font-mono text-xs uppercase tracking-[0.6em] transition-all"
           >
              {caCopied ? "COPIED_TO_CLIPBOARD" : `SYSTEM_CONTRACT: ${CONTRACT_ADDRESS}`}
           </motion.div>
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