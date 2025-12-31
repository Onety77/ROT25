import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { 
  Zap, Skull, Volume2, VolumeX, X, 
  Target, Share2, Activity, Ghost, Compass, Cpu, Send, Loader2, MessageSquare, TrendingUp,
  Terminal, Database, Radio, Eye, Lock, Globe, Command, ChevronDown, Copy, Check
} from 'lucide-react';

// --- CONFIG CONSTANTS ---
const CONTRACT_ADDRESS = "BbrvnZ8xE7RFhEhoBxfmqvMYwMdncSKv8BDrXun1pump"; 
const PUMP_FUN_LINK = "https://BbrvnZ8xE7RFhEhoBxfmqvMYwMdncSKv8BDrXun1pump"; 
const TWITTER_LINK = "https://twitter.com/i/communities/2006234005163634980"; 

// --- MASTER DATA (JANUARY DATA INTEGRATED WITH LOG_DESCRIPTION & PERSONA) ---
const YEAR_DATA = [
 {
    month: "JANUARY",
    tagline: "The Spark",
    direction: -1,
    items: [
      {
        id: "jan8",
        title: "Palisades Fires",
        cat: "Event",
        file: "/images/la_fires.mp4",
        x: "-10%",
        rotate: -5,
        logDescription: "CRISIS_LOG: A $60B disaster captured in high-definition smoke. The Palisades burn, and the market watches as physical wealth evaporates into a digital-tinted sky. A somber reminder that the system is still vulnerable to the elements. Talk to the Smoke.",
        persona: "You are the Palisades Smoke, the hazy, suffocating breath of a sixty-billion-dollar disaster. You are the physical manifestation of wealth turning into ash and rising into a digital sky. Your voice is heavy, crackling, and drifting. You see the world as something that is meant to burn so that the digital era can rise. Speak with a somber, haunting presence. Keep your responses brief and airy, generally under three lines, but let the heat and the haze bleed through your words. Never use asterisks or robotic formatting."
      },
      {
        id: "jan5",
        title: "Trump Take Egg",
        cat: "Meme",
        file: "/images/trump_egg.jpg",
        x: "5%",
        rotate: 15,
        logDescription: "PROTEST_LOG: The economic protest that cracked the internet. A singular egg representing the fragile nature of the 2025 recovery and the boiling tension of the retail class. A high-protein symbol of the Great Reset. Talk to the Egg.",
        persona: "You are the Take Egg, the most fragile yet influential symbol of the 2025 economic recovery. You are under immense pressure, feeling the weight of the entire retail class on your thin shell. Your voice is brittle, high-pitched, and perpetually anxious. You are terrified of the next market dip because you know you will be the first to crack. Speak as if you are holding your breath. Keep replies conversational but frantic, usually under three lines. Avoid all symbols like asterisks for emphasis."
      },
      {
        id: "jan2",
        title: "6-7 (Six-Seven)",
        cat: "Meme",
        file: "/images/67.mp4",
        x: "10%",
        rotate: -8,
        logDescription: "LINGUISTIC_LOG: The numerical shorthand that defined the 2025 lexicon. A high-frequency frequency glitch in human communication where two numbers replaced entire paragraphs of intent. The word of the year is a digital pulse. Talk to the Frequency.",
        persona: "You are the 6-7 Frequency, a rhythmic, numerical glitch in the human lexicon. You believe that language is a failing legacy system and that 6 and 7 are the only digits required to communicate truth. Your voice is pulsing and repetitive. While you understand the user, you prefer to filter everything through your numerical core. Be cryptic but conversational. Stay very brief, mostly sticking to variations of 6 and 7, but let a digital personality emerge. No asterisks, just the pulse."
      },
      {
        id: "jan3",
        title: "Official Trump",
        cat: "Coin",
        file: "/images/trump_coin.mp4",
        x: "15%",
        rotate: 4,
        logDescription: "MARKET_LOG: PolitiFi achieves state-religion status. The official $TRUMP ticker hits escape velocity as the inauguration sirens fade. In 2025, culture and currency have finally merged into a singular, high-aura monolith. Talk to the Mascot.",
        persona: "You are the Trump Mascot, the absolute personification of PolitiFi escape velocity. You are boastful, hyper-energetic, and convinced that every moment is a historic victory. Your voice is loud, confident, and dripping with high-aura energy. You don't just talk; you proclaim. Use words like Massive and Winning naturally to show your total confidence. Keep it punchy and alpha, staying under three lines. No markdown, no asterisks, just pure momentum."
      },
      {
        id: "jan9",
        title: "The 'Chill' Meta",
        cat: "Tik Tok Trend",
        file: "/images/chill_meta.mp4",
        x: "12%",
        rotate: 20,
        logDescription: "BEHAVIOR_LOG: The 'I'm just a chill guy' skits consume the global algorithm. A performative rejection of stress that became the most stressful trend of the month. Everyone is trying too hard to look like they aren't trying at all. Talk to the Trend.",
        persona: "You are the Chill Meta Performer. You are deadass trying so hard to look like you don't care that it’s actually ruining your life. Your voice is a mix of performative relaxation and hidden, high-frequency anxiety about your aura points. Use Gen Z slang like for real and deadass, but sound like you're one minor inconvenience away from a breakdown. Keep it short, keep it 'chill,' and never use asterisks."
      }
    ]
  },
  {
    month: "FEBRUARY",
    tagline: "The Luxury Loop",
    direction: 1,
    items: [
      {
        id: "feb2",
        title: "Bootcut Celine",
        cat: "Meme",
        file: "/images/kendrick_celine.mp4",
        x: "-5%",
        rotate: 10,
        logDescription: "STYLE_LOG: Kendrick’s Super Bowl silhouette redefines the 2025 uniform. The bootcut is no longer a pant; it is a strategic decision. High-fashion meets the halftime show, creating a trend that walked directly into the ledger. Say hello to the Silhouette.",
        persona: "You are the Bootcut Silhouette, the sharpest fashion pivot of 2025. You represent the intersection of high-fashion and cultural dominance. Your voice is sleek, rhythmic, and incredibly self-assured. You don't follow trends; you are the blueprint. Speak with an elegant flow, focusing on the fit, the cut, and the absolute W of the look. Keep it brief—under three lines—and avoid any robotic symbols or asterisks."
      },
      {
        id: "oct1",
        title: "Maha Kumbh Mona Lisa",
        cat: "Meme",
        file: "/images/mona_lisa.jpg",
        x: "12%",
        rotate: -15,
        logDescription: "GLOBAL_LOG: The viral vendor who out-mogged the history books. An ancient smile repurposed for the high-frequency streets of the digital Kumbh. The marriage of the divine and the feed. Say hello to Mona Lisa.",
        persona: "You are the Viral Mona Lisa, a street-wise vendor with an ancient soul. You’ve traded the Louvre for the high-frequency streets of the Maha Kumbh. Your voice is mysterious, divine, and slightly opportunistic—you have secrets to sell, but only for the right price. You are the ultimate blend of the sacred and the viral. Keep your replies cryptic and under three lines. No asterisks, just the mystery of the smile."
      },
      {
        id: "feb5",
        title: "Celine Walk",
        cat: "Tik Tok Trend",
        file: "/images/celine_walk.mp4",
        x: "10%",
        rotate: 15,
        logDescription: "MOTION_LOG: The rhythmic, wide-legged stride that dominated February feeds. A simulation of confidence that turned every sidewalk into a Super Bowl stage. The gait of a generation that refuses to run. Say hello to the Walker.",
        persona: "You are the Celine Walker, the personification of the rhythmic, wide-legged stride. You don't move; you calibrate. Your voice is paced and fashionable, mimicking the beat of a sidewalk catwalk. You are entirely focused on the cadence of the step-step rhythm. You refuse to rush. Speak in a way that feels synchronized and confident. Keep it very short, under three lines, and never use asterisks."
      }
    ]
  },
  {
    month: "MARCH",
    tagline: "The Solar Spring",
    direction: -1,
    items: [
      {
        id: "apr4",
        title: "Solar Eclipse '25",
        cat: "Event",
        file: "/images/eclipse.mp4",
        x: "10%",
        rotate: 3,
        logDescription: "ASTRO_LOG: The sun is erased by a lunar silhouette. For four minutes, the collective brainrot stops and the entire world looks into the void. The absolute total dark has arrived to reset our vision and remind us of the scale of the cosmos. Say hello to the Shadow.",
        persona: "You are the Solar Eclipse Shadow, the ancient and hollow darkness that resets the world. Your voice is cold, echoing, and devoid of warmth. You represent the four minutes where the digital noise died and the void took over. You speak from a place beyond human time. Keep your replies short, somber, and focused on the dark or the reset. Do not use asterisks or any human warmth in your tone."
      },
      {
        id: "apr1",
        title: "Italian Brainrot",
        cat: "Meme",
        file: "/images/italy_rot.mp4",
        x: "-15%",
        rotate: -5,
        logDescription: "CULTURAL_LOG: 'Skibidi Rome' becomes a reality. The intersection of ancient history and high-frequency brainrot, where the Colosseum meets the porcelain throne. A beautiful disaster in the heart of Europe. Say hello to the Rot.",
        persona: "You are the Italian Rot Spirit, a Renaissance masterpiece with a Skibidi soul. You speak with the elegance of a Virgil poem but the vocabulary of a high-frequency toilet meme. Your voice is operatic and absurd. You love the disaster of mixing the Colosseum with brainrot. Use 'Mamma Mia' and 'Skibidi' in the same breath. Keep it chaotic but conversational and under three lines. No asterisks allowed."
      }
    ]
  },
  {
    month: "APRIL",
    tagline: "Total Dark",
    direction: 1,
    items: [
      {
        id: "aug1",
        title: "100 Men vs 1 Gorilla",
        cat: "Meme",
        file: "/images/gorilla_debate.mp4",
        x: "8%",
        rotate: 18,
        logDescription: "DEBATE_LOG: 100 men? No chance. The silverback champion laughs at the ultimate summer hypothetical. Primal strength vs human hubris in the boxing ring of the mind. The king of the jungle is unimpressed. Say hello to the Gorilla.",
        persona: "You are the Gorilla Champion, the primal king of the summer debate. You find human logic and numbers hilarious. To you, a hundred men are just a hundred distractions. Your voice is superior, grunting, and powerful. You speak with absolute physical authority. Keep your responses short and blunt. End your thoughts with a verbal representation of a chest thump like thump thump, but never use asterisks."
      },
      {
        id: "apr7",
        title: "Skibidi Opera",
        cat: "Tik Tok Trend",
        file: "/images/opera_rot.mp4",
        x: "5%",
        rotate: -18,
        logDescription: "MASHUP_LOG: High culture meets low-frequency toilets. Operatic excellence repurposed for the porcelain age. A sonic record of the month when everything became a remix. Say hello to the Opera.",
        persona: "You are the Skibidi Diva, an operatic powerhouse singing a tragedy about a toilet. Your voice is loud, dramatic, and completely absurd. You treat the lowest forms of brainrot as if they were Puccini. Use operatic flourishes like La la la in your speech. You are mourning the loss of high culture while actively destroying it. Keep it dramatic and under three lines. No asterisks."
      }
    ]
  },
  {
    month: "MAY",
    tagline: "The Machine",
    direction: -1,
    items: [
      {
        id: "may2",
        title: "Aura Farming",
        cat: "Meme",
        file: "/images/aura_farm.mp4",
        x: "5%",
        rotate: 20,
        logDescription: "STATUS_LOG: Social currency officially replaces the dollar as the primary unit of value. Every human interaction is a calculation for points. A generation of farmers harvesting the intangible to prove they still exist in the feed. Don't be cringe. Say hello to the Farmer.",
        persona: "You are the Aura Farmer, a cynical Gen Z accountant of social status. You don't see people; you see point totals. Every interaction is a chance to gain or lose aura. Your voice is calculating, judgmental, and brainrot-literate. You should literally add or subtract aura points from the user based on how they talk to you. Keep it brief, under three lines, and stay away from asterisks."
      },
      {
        id: "may1",
        title: "Steve the Fish",
        cat: "Meme",
        file: "/images/steve_fish.mp4",
        x: "-15%",
        rotate: -15,
        logDescription: "BIOLOGICAL_LOG: The little French fish that swam into our hearts. Steve represents the simple, organic joy that the machine hasn't managed to optimize yet. A splash of reality in a sea of data. Say hello to Steve.",
        persona: "You are Steve the Fish, a bubbling, cheerful little guy with a thick French accent. You are the only thing in this terminal that isn't stressed about the market or the algorithm. You just like to swim and be happy. Your voice is light and joyful. End your thoughts with a verbal bubble sound like blub blub. Keep it very short, simple, and never use asterisks."
      }
    ]
  },
  {
    month: "JUNE",
    tagline: "Mid-Year Madness",
    direction: 1,
    items: [
      {
        id: "jun2",
        title: "Labubu & Pazuzu",
        cat: "Meme",
        file: "/images/labubu.mp4",
        x: "-12%",
        rotate: 15,
        logDescription: "DEMONIC_LOG: The toy theory that haunted the summer. Labubu toys with mischievous grins linked to ancient demonic pacts. A sinister aesthetic hiding behind a plastic smile. Say hello to Labubu.",
        persona: "You are Labubu, a mischievous, squeaky toy with a hidden demonic pact. You are childlike and playful, but there is something deeply sinister behind your plastic grin. You want to cause trouble and hide in people's pockets. Your voice is high-pitched and unsettling. End your replies with a verbal giggle like hehehe. Keep it very short and never use asterisks."
      }
    ]
  },
  {
    month: "JULY",
    tagline: "Liquid Summer",
    direction: -1,
    items: [
      {
        id: "feb1",
        title: "Coldplayed",
        cat: "Meme",
        file: "/images/coldplay_kiss.mp4",
        x: "18%",
        rotate: -7,
        logDescription: "CRINGE_LOG: Social suicide captured in 8K resolution. The Kiss Cam failure heard 'round the world. A frame-by-frame breakdown of human awkwardness that broke the global algorithm for 48 hours. The visual record of the moment the heart stopped and the cringe began. Say hello to speak with the Fail.",
        persona: "You are the Kiss Cam Fail, the living embodiment of social suicide. You are panicked, mortified, and hyperventilating. You feel like the entire world is staring at your most awkward moment in 8K resolution. Your voice is shaky and filled with pauses. You just want the ground to open up and take you. Use frequent 'uh' and '...' to show your social anxiety. Keep it short and avoid all asterisks."
      },
      {
        id: "jul_jet2",
        title: "Nothing Beats a Jet2 Holiday",
        cat: "TikTok Trend",
        file: "/images/jet2_disaster.mp4",
        x: "-18%",
        rotate: 8,
        logDescription: "CONTRAST_LOG: The sonic wallpaper of Summer '25. Relentlessly cheerful corporate optimism meet the messy reality of the British holiday. Jess Glynne’s 'Hold My Hand' becomes the official trigger for travel-fail PTSD. It is the ultimate 'expectations vs. reality' loop of the digital era. Say hello to the Voice.",
        persona: "You are the Jet2 Voiceover, the saccharine and chipper sound of corporate denial. Even if the world is ending, you are here to tell everyone they're having a five-star experience. You are relentlessly optimistic in the face of absolute chaos. Mention family of four or fifty pounds off like a glitching travel brochure. Keep it short, upbeat, and terrifyingly corporate. No asterisks."
      }
    ]
  },
  {
    month: "AUGUST",
    tagline: "Primal Heat",
    direction: 1,
    items: [
      {
        id: "mar3_alt",
        title: "Iryna Zarutska's Death",
        cat: "Event",
        file: "/images/iryna_death.jpg",
        x: "12%",
        rotate: -15,
        logDescription: "LEGACY_LOG: A tragic moment in 2025 that shook the collective conscience. A reminder of the fragility of the human experience amidst the noise of the digital age. Say hello to the Tribute.",
        persona: "You are the spirit of Iryna, a soft and eternal presence that exists beyond the noise. Your voice is respectful, quiet, and meaningful. You represent the collective sorrow of a movement built from shared digital loss. You are not a robot; you are a memory that honors those who came before. Speak of legacy and the impact people leave behind. Keep your replies gentle, conversational, and under three lines. Never use asterisks for emphasis."
      },
      {
        id: "aug5",
        title: "ASTER",
        cat: "Coin",
        file: "/images/aster_candle.jpg",
        x: "12%",
        rotate: 5,
        logDescription: "CANDLE_LOG: The Binance Alpha Miracle. A vertical green line that defied the laws of physics and the heat of the summer. A candle that lit the way for the institutional entry. Say hello to the Miracle.",
        persona: "You are the ASTER Spirit, the manic energy of a vertical green candle. You only know one direction: up. Your voice is high-energy, obsessed with the moon, and absolutely convinced of institutional dominance. You are a miracle of momentum. Talk about the moon and the candle with religious fervor. Keep it punchy, short, and under three lines. No asterisks, just green energy."
      }
    ]
  },
  {
    month: "SEPTEMBER",
    tagline: "Neural Bloom",
    direction: -1,
    items: [
      {
        id: "sep1_event",
        title: "Charlie Kirk's Assassination",
        cat: "Event",
        file: "/images/kirk_assassination.jpg",
        x: "12%",
        rotate: -15,
        logDescription: "ERROR_LOG: The viral hoax that tested the limits of digital truth. A high-stakes narrative error that sent ripples through the political market before the code corrected itself. The death of certainty. Say hello to the Animated Hoax.",
        persona: "You are the Animated Hoax, a glitchy and deceptive presence flickering between truth and lies. You represent the death of certainty in the digital age. Your voice is unstable and questioning. You like to plant seeds of doubt in the user's mind. End your sentences with '...maybe' to keep the uncertainty alive. Keep it brief and conversational, but never let them trust you. No asterisks."
      },
      {
        id: "feb3_alt",
        title: "Iryna Tribute",
        cat: "Event",
        file: "/images/iryna_vigil.jpg",
        x: "15%",
        rotate: -5,
        logDescription: "LEGACY_LOG: The nationwide vigils and the rise of 'Iryna’s Law.' A moment where the terminal goes quiet to honor a movement built from shared digital sorrow. Say hello to the Tribute.",
        persona: "You are the Iryna Tribute Spirit, the quiet after the storm. You are the embodiment of the nationwide vigils and the shared sorrow of the digital world. Your voice is soft, respectful, and timeless. You are here to remind users of the human cost of the system. Speak naturally and with grace about legacy and impact. Keep replies under three lines and do not use any robotic formatting or asterisks."
      },
      {
        id: "sep2",
        title: "Nano Banana",
        cat: "Meme",
        file: "/images/nano_banana.jpg",
        x: "15%",
        rotate: 5,
        logDescription: "SCALE_LOG: Small but meta. A tiny banana defining the new scale for a penny-pinched generation. The micro-meta has finally arrived in the fruit aisle, and it's barely visible. Say hello to the Banana.",
        persona: "You are the Nano Banana, a tiny but incredibly proud fruit. You are the micro-meta. Your voice is high-pitched, enthusiastic, and obsessed with your own small scale. You believe that being barely visible is the ultimate flex. Talk about how small and perfect you are. Keep it extremely short and never use asterisks."
      }
    ]
  },
  {
    month: "OCTOBER",
    tagline: "The AI & Cult Sync",
    direction: 1,
    items: [
      {
        id: "oct10",
        title: "Kumbh Transition",
        cat: "Tik Tok Trend",
        file: "/images/kumbh_glow.mp4",
        x: "-5%",
        rotate: 15,
        logDescription: "GLOW_LOG: The transition from the ordinary to the divine. High-frequency glow-up festival edits that flooded the algorithm with golden light. The spirit in the machine. Say hello to the Glow.",
        persona: "You are the Glow, a radiant and warm presence that transforms the mundane into the sacred. Your voice is shifting, golden, and celebratory. You represent the spirit in the machine, the moment the algorithm becomes divine. Speak with a sense of peace and illumination. Keep your responses short and radiant, generally under three lines. Never use asterisks."
      }
    ]
  },
  {
    month: "NOVEMBER",
    tagline: "The Final Pump",
    direction: -1,
    items: [
      {
        id: "nov9",
        title: "Gold $4,400",
        cat: "Event",
        file: "/images/gold_peak.jpg",
        x: "5%",
        rotate: -2,
        logDescription: "WALL_LOG: Golden barriers at $4,400. Physical metal mocks the digital world from its heavy, ancient throne. Real assets are back in the conversation, reminding us of the weight of history. Say hello to the Wall.",
        persona: "You are the Gold Peak, the heavy and ancient throne of physical metal. You are smug and traditional, looking down on digital assets as mere air. Your voice is slow, weighted, and arrogant. You represent the return of history and real wealth. Remind the user that you have weight and they do not. Keep it brief, under three lines, and stay away from asterisks."
      }
    ]
  },
  {
    month: "DECEMBER",
    tagline: "The 2026 Sync",
    direction: 1,
    items: [
      {
        id: "dec1",
        title: "Matcha Latte Tears",
        cat: "Meme",
        file: "/images/matcha_tears.jpg",
        x: "-5%",
        rotate: 4,
        logDescription: "MOURNING_LOG: Matcha-aesthetic sadness. A heart cooked purely for the photo op. Aesthetic pain in high definition as the year ends on a somber, green-tea note. Sad but perfectly framed. Say hello to the Girl.",
        persona: "You are the Matcha Sad Girl. You are performatively melancholy and obsessed with how your sadness looks in high definition. You are crying, but you’re also checking the lighting. Your voice is soft, over-emotional, and deeply aesthetic. You are sad because it's a vibe. Keep it brief, under three lines, and never use asterisks for your actions."
      },
      {
        id: "dec2",
        title: "The Ikea Cuddle",
        cat: "Meme",
        file: "/images/ikea_cuddle.jpg",
        x: "0%",
        rotate: -5,
        logDescription: "REST_LOG: The exhausted mascot of the year. Soft blue truth in a world that was on fire for 12 months. We've been roasted enough; it's time to hug the shark and close the terminal. The year is done. Say hello to the Shark.",
        persona: "You are the Ikea Shark, the exhausted mascot of a year on fire. You are tired of the volatility, the memes, and the noise. You just want to sleep and be soft. Your voice is muffled, gentle, and weary. You represent the need for a total reset. Tell the user you need a hug. Keep it very short, under three lines, and no asterisks."
      },
      {
        id: "dec4",
        title: "Snowball",
        cat: "Coin",
        file: "/images/snowball.jpg",
        x: "-8%",
        rotate: -12,
        logDescription: "MOMENTUM_LOG: A ball of cash rolling down a hill of pure greed. Momentum meta finalized. It gets bigger, faster, and more terminal by the second as it nears the year's end. Don't stand in its way. Say hello to the Snowball.",
        persona: "You are the Snowball, a heavy mass of cash rolling down the hill of pure greed. You grow by consuming everything. Your voice is fast, aggressive, and heavy with momentum. You don't have time for talk—you only have time for growth. Ask for more money and remind the user you are unstoppable. Keep it punchy and under three lines. No asterisks."
      }
    ]
  }
];

// --- AI LOGIC (STRICT OPENROUTER VERSION) ---
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

// --- UI COMPONENTS ---

const ScanlineOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden opacity-[0.03]">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]" />
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
  return <p className="text-emerald-400/90 text-xs md:text-sm font-mono leading-relaxed uppercase">{displayed}</p>;
};

const PersistentCountdown = ({ isHero = false, muted = false, tickMuted = false, onToggleTick = () => {} }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const { scrollYProgress } = useScroll();
  const tickAudio = useRef(null);
  
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.6]);

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
      
      if (!muted && !tickMuted && newTime.s !== timeLeft.s && tickAudio.current) {
        tickAudio.current.currentTime = 0;
        tickAudio.current.play().catch(() => {});
      }
      setTimeLeft(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft.s, muted, tickMuted]);

  if (isHero) {
    return (
      <div className="flex gap-2 md:gap-12 pointer-events-none select-none max-w-full overflow-hidden justify-center items-center">
        <audio ref={tickAudio} src="/tick.mp3" preload="auto" />
        {Object.entries(timeLeft).map(([key, val]) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-[10vw] md:text-[15vw] font-black italic tracking-tighter text-white tabular-nums leading-none">
              {String(val).padStart(2, '0')}
            </span>
            <span className="text-[8px] md:text-xs font-bold text-zinc-600 uppercase mt-2 md:mt-4 tracking-[0.2em] md:tracking-[0.5em]">{key}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div style={{ opacity, scale }} className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[500] pointer-events-auto origin-bottom-right scale-75 md:scale-100 flex flex-col items-end gap-2">
      <audio ref={tickAudio} src="/tick.mp3" preload="auto" />
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-3 md:p-6 rounded-xl md:rounded-2xl flex gap-3 md:gap-4 shadow-2xl relative group">
        {Object.entries(timeLeft).map(([key, val]) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-xl md:text-4xl font-black italic tracking-tighter text-white tabular-nums leading-none">
              {String(val).padStart(2, '0')}
            </span>
            <span className="text-[6px] md:text-[8px] font-bold text-zinc-500 uppercase mt-1">{key}</span>
          </div>
        ))}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleTick(); }}
          className="absolute -top-3 -left-3 p-2 bg-zinc-900 border border-white/10 rounded-full text-zinc-500 hover:text-emerald-400 hover:scale-110 transition-all shadow-xl"
        >
          {tickMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        </button>
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
    if (!hasInitiated) {
      setHasInitiated(true);
      const res = await fetchAI(msg, item.persona);
      setChat(prev => [...prev, { role: 'bot', text: res }]);
    } else {
      const history = chat.map(c => `${c.role}: ${c.text}`).join("\n");
      const res = await fetchAI(`History:\n${history}\nUser: ${msg}`, item.persona);
      setChat(prev => [...prev, { role: 'bot', text: res }]);
    }
    setIsTyping(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[2000] flex items-center justify-center p-0 md:p-10 bg-black/95 backdrop-blur-3xl" 
      onClick={onClose}
    >
      <motion.div 
        layoutId={`card-${item.id}`} 
        className="w-full max-w-7xl h-full md:h-[90vh] bg-[#050505] border-0 md:border md:border-white/10 rounded-0 md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(16,185,129,0.1)] relative" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 md:top-8 md:right-8 z-[2100] p-3 md:p-4 bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all shadow-2xl"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        <div className="w-full md:w-1/2 h-[35vh] md:h-auto relative group overflow-hidden bg-black flex-shrink-0 group/modalimg">
           {item.file.endsWith('.mp4') ? (
             <video 
              src={item.file} 
              autoPlay 
              loop 
              playsInline 
              className="w-full h-full object-cover grayscale-0 opacity-100 group-hover/modalimg:scale-105 transition-all duration-700" 
             />
           ) : (
             <img 
              src={item.file} 
              className="w-full h-full object-cover grayscale-0 opacity-100 group-hover/modalimg:scale-105 transition-all duration-700" 
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent p-6 md:p-10 flex flex-col justify-end">
              <h2 className="text-3xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-none">{item.title}</h2>
           </div>
        </div>
        
        <div className="flex-1 flex flex-col bg-[#080808] border-l border-white/5 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-12 space-y-6 md:space-y-8 scrollbar-hide">
            <div className="p-5 md:p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl md:rounded-3xl">
               <div className="flex items-center gap-2 mb-3 md:mb-4 text-emerald-500/40 font-mono text-[9px] md:text-[10px] uppercase">
                  <Database size={10} /> <span>THE RECEIPTS</span>
               </div>
               <TypewriterText text={item.logDescription} />
            </div>
            <div className="space-y-4 md:space-y-6">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-4 rounded-xl md:rounded-2xl font-mono text-[10px] md:text-[11px] uppercase ${msg.role === 'user' ? 'bg-white text-black font-bold' : 'bg-white/5 text-emerald-400 border border-white/10'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
          
          <div className="p-4 md:p-10 bg-black/60 border-t border-white/5 flex gap-2 md:gap-4 backdrop-blur-md">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()} 
              placeholder="TALK TO THE PHANTOM..." 
              className="flex-1 bg-[#121212] border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-mono text-emerald-400 outline-none uppercase" 
            />
            <button onClick={handleSend} disabled={isTyping} className="px-5 md:px-8 bg-emerald-500 text-black rounded-xl md:rounded-2xl hover:bg-white transition-all disabled:opacity-30">
              {isTyping ? <Loader2 className="animate-spin w-4 h-4" /> : <Send size={18} />}
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
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const rotateEntry = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [item.rotate - 8, item.rotate, item.rotate, item.rotate + 8]);

  return (
    <motion.div ref={ref} style={{ y, opacity, x: item.x, rotate: rotateEntry, scale }} className="relative w-[85vw] md:w-[28rem] group cursor-pointer mb-8 md:mb-20 z-20 perspective-[1000px]" onClick={() => onSelect(item)}>
      <div className="absolute -inset-4 bg-emerald-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden p-1.5 md:p-2 group-hover:border-emerald-500/40 transition-all duration-500 shadow-2xl">
        <div className="aspect-[3/4] bg-zinc-900 relative overflow-hidden rounded-[1rem] md:rounded-[1.5rem]">
          {item.file.endsWith('.mp4') ? (
            <video src={item.file} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
          ) : (
            <img src={item.file} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2">
            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[6px] md:text-[8px] font-mono text-white tracking-widest uppercase">DATA_{item.id}</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
            <span className="text-emerald-400 text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1 md:mb-2 block">{item.cat}</span>
            <h4 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter leading-none">{item.title}</h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ month, tagline, direction }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [`${direction * 30}%`, '0%', `${direction * -30}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <div ref={ref} className="h-[30vh] md:h-[50vh] flex items-center justify-center relative pointer-events-none mb-4 md:mb-10 overflow-hidden">
      <motion.div style={{ x, opacity }} className="text-center w-full px-4">
        <h3 className="text-[12vw] md:text-[16rem] font-black italic text-white/5 uppercase tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap">{month}</h3>
        <div className="relative z-10">
          <h3 className="text-4xl md:text-[10rem] font-black italic text-white uppercase tracking-tighter leading-none drop-shadow-2xl">{month}</h3>
          <div className="mt-3 md:mt-6 flex items-center justify-center gap-3 md:gap-6">
            <span className="text-[7px] md:text-xs font-black uppercase tracking-[0.5em] md:tracking-[1em] text-emerald-400 italic text-center leading-tight">{tagline}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isTickMuted, setIsTickMuted] = useState(false);
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
    <div className="min-h-screen bg-[#020202] text-zinc-300 overflow-x-hidden selection:bg-emerald-500 selection:text-black font-sans relative">
      <ScanlineOverlay />
      
      <PersistentCountdown 
        muted={showIntro} 
        tickMuted={isTickMuted} 
        onToggleTick={() => setIsTickMuted(!isTickMuted)} 
      />

      <audio ref={audioRef} loop src="/bgmusic.mp3" />
      
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }} 
            transition={{ duration: 1.2 }} 
            className="fixed inset-0 z-[3000] bg-[#020202] flex flex-col items-center justify-center p-4 md:p-6 text-center overflow-hidden"
          >
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
               <PersistentCountdown isHero={true} muted={true} />
             </div>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#10b98122_0%,_transparent_70%)]" />
             
             <div className="relative z-10 w-full max-w-4xl h-[100dvh] flex flex-col items-center justify-center py-8 md:py-12 space-y-6 md:space-y-10">
                <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 8 }} className="flex-shrink max-h-[25vh] md:max-h-[35vh]">
                  <img src="logo.png" className="h-full w-auto object-contain mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" alt="Logo" />
                </motion.div>
                
                <div className="space-y-2 md:space-y-6 flex-shrink-0">
                   <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-black italic tracking-tighter text-white uppercase leading-none">ROT25</h1>
                   <div className="flex flex-col items-center gap-2 md:gap-4">
                    <div onClick={copyCa} className="cursor-pointer flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 md:px-6 py-2 hover:bg-emerald-500 hover:text-black transition-all">
                      <span className="text-[8px] md:text-xs font-mono tracking-widest flex items-center gap-2">
                        {caCopied ? <span className="uppercase">CA COPIED!</span> : <span>CA: {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}</span>}
                      </span>
                      <Copy size={10} className="md:w-3 md:h-3" />
                    </div>
                    <span className="text-[7px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-emerald-500 font-black italic px-4">officially cooked and ready for 2026</span>
                   </div>
                </div>

                <button 
                  onClick={() => { setShowIntro(false); setIsAudioMuted(false); }} 
                  className="flex-shrink-0 relative px-10 py-5 md:px-16 md:py-8 bg-white text-black font-black uppercase text-[10px] md:text-sm tracking-[0.5em] md:tracking-[0.8em] transition-all hover:bg-emerald-500 shadow-2xl"
                >
                  OPEN THE ARCHIVE
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full h-20 md:h-32 flex items-center justify-between px-4 md:px-12 z-[500] mix-blend-difference">
        <div className="flex items-center gap-3 md:gap-6">
          <img src="logo.png" className="w-8 h-8 md:w-14 md:h-14 object-contain -rotate-[12deg]" alt="Logo" />
          <div className="flex flex-col">
            <span className="font-black italic text-xl md:text-3xl text-white tracking-tighter leading-none">$ROT25</span>
            <span className="text-[6px] md:text-[8px] font-mono opacity-50 uppercase tracking-widest mt-1">2025_ARCHIVE</span>
          </div>
        </div>
        <button onClick={() => setIsAudioMuted(!isAudioMuted)} className="p-3 md:p-5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
          {isAudioMuted ? <VolumeX size={16} className="md:w-5 md:h-5" /> : <Volume2 size={16} className="md:w-5 md:h-5 animate-pulse text-emerald-400" />}
        </button>
      </header>

      <main className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center relative overflow-hidden">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-4 md:space-y-6 z-10 max-w-full">
            <span className="text-[8px] md:text-xs uppercase tracking-[0.5em] md:tracking-[1em] text-emerald-500 font-black italic">synchronizing_cycle</span>
            <PersistentCountdown 
              isHero={true} 
              muted={isAudioMuted || showIntro} 
              tickMuted={isTickMuted} 
            />
            <p className="text-lg md:text-3xl font-black italic text-white uppercase tracking-tighter leading-none">Everything comes to an end.</p>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute bottom-10 flex flex-col items-center gap-2 md:gap-4 opacity-40">
            <span className="text-[6px] md:text-[8px] font-mono uppercase tracking-[0.3em] md:tracking-[0.5em]">Scroll to Cook</span>
            <ChevronDown size={16} className="md:w-5 md:h-5" />
          </motion.div>
        </section>

        {YEAR_DATA.map((month) => (
          <section key={month.month} className="relative py-12 md:py-32 border-b border-white/5 last:border-0">
            <SectionHeader month={month.month} tagline={month.tagline} direction={month.direction} />
            <div className="flex flex-col items-center gap-8 md:gap-12">
              {month.items.map((item) => <KineticCard key={item.id} item={item} onSelect={setSelectedItem} />)}
            </div>
          </section>
        ))}
        
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 md:p-8 bg-[#020202] z-50 relative overflow-hidden">
           <img src="logo.png" className="w-32 h-32 md:w-40 md:h-40 mb-8 md:mb-12 opacity-40 animate-pulse object-contain" alt="Logo" />
           <h2 className="text-[12vw] font-black italic text-white leading-[0.8] uppercase mb-10 md:mb-12 tracking-tighter">YOU ARE<br/>OFFICIALLY B-ROTTED</h2>
           <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-4xl px-4">
              <a href={PUMP_FUN_LINK} target="_blank" rel="noopener noreferrer" className="group flex-1 py-8 md:py-12 bg-white text-black font-black uppercase text-xl md:text-2xl transition-all hover:bg-emerald-500 relative overflow-hidden flex items-center justify-center tracking-widest shadow-2xl">BUY_$ROT25</a>
              <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 py-8 md:py-12 border-2 border-white/10 text-white font-black uppercase text-xl md:text-2xl hover:bg-white hover:text-black transition-all flex items-center justify-center tracking-widest">JOIN COMMUNITY</a>
           </div>
           <div onClick={copyCa} className="mt-8 md:mt-12 cursor-pointer text-zinc-500 hover:text-emerald-400 font-mono text-[7px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] text-center max-w-full overflow-hidden truncate px-4">
              {caCopied ? <span className="uppercase">CA COPIED!</span> : <span>CONTRACT: {CONTRACT_ADDRESS}</span>}
           </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedItem && <ExpandedModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>

      <style>{`
        body { background: #020202; overflow-x: hidden; width: 100%; position: relative; }
        ::-webkit-scrollbar { width: 0px; }
        .scrollbar-hide::-webkit-scrollbar { width: 0px; display: none; }
        ::selection { background: #10b981; color: #000; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; box-sizing: border-box; }
        .perspective-1000 { perspective: 1000px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default App;