/**
 * Daily zodiac prompt generator with AsyncStorage caching
 * Generates fresh prompts daily based on horoscope data
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ZodiacSign } from './zodiac';
import { HoroscopeData, getDailyHoroscope } from '@/services/horoscope';

const DAILY_PROMPT_KEY = '@zodiac_daily_prompt';
const LAST_UPDATE_KEY = '@zodiac_last_update';

interface CachedPrompt {
  prompt: string;
  note: string;
  date: string;
  sign: ZodiacSign;
}

/**
 * Gets today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate a fresh prompt based on horoscope data
 * Uses mood, color, and zodiac traits to create unique daily prompts
 */
function generatePromptFromHoroscope(
  sign: ZodiacSign,
  horoscope: HoroscopeData
): { prompt: string; note: string } {
  const mood = horoscope.mood.toLowerCase();
  const color = horoscope.color.toLowerCase();

  // Zodiac personality-driven prompt templates
  const templates = getPromptTemplates(sign);

  // Select template based on mood
  let template: string;
  if (mood.includes('adventurous') || mood.includes('energetic') || mood.includes('active')) {
    template = templates.adventurous[Math.floor(Math.random() * templates.adventurous.length)];
  } else if (mood.includes('romantic') || mood.includes('sensitive') || mood.includes('tender')) {
    template = templates.romantic[Math.floor(Math.random() * templates.romantic.length)];
  } else if (mood.includes('confident') || mood.includes('bold') || mood.includes('powerful')) {
    template = templates.bold[Math.floor(Math.random() * templates.bold.length)];
  } else {
    template = templates.playful[Math.floor(Math.random() * templates.playful.length)];
  }

  // Replace {color} placeholder with lucky color
  const prompt = template.replace('{color}', color);

  // Generate zodiac note
  const note = getZodiacNote(sign, mood);

  return { prompt, note };
}

/**
 * Prompt templates for each zodiac sign (organized by mood type)
 */
function getPromptTemplates(sign: ZodiacSign): {
  adventurous: string[];
  romantic: string[];
  bold: string[];
  playful: string[];
} {
  const templates: Record<ZodiacSign, any> = {
    aries: {
      adventurous: [
        "Wear {color} like it's your job. Your only job.",
        "Put on something that makes you walk differently. Confidence is key.",
        "Dress with the energy of someone who just won an argument they weren't even having.",
      ],
      romantic: [
        "Layer three different textures. Velvet against denim against {color} silk.",
        "Wear the piece you bought because you loved it, not because it was practical. Today is its day.",
      ],
      bold: [
        "All black, but add one completely unhinged {color} accessory.",
        "Wear something that makes you feel like you could walk into any room and belong.",
      ],
      playful: [
        "Dress like you're about to have tea with the Queen, then rob a bank.",
        "Ignore the weather. Wear what you want.",
      ],
    },
    taurus: {
      adventurous: [
        "Wear something that makes noise when you move. Jangle, swish, rustle in {color}.",
        "Layer three different textures. Velvet against denim against silk — fight me.",
      ],
      romantic: [
        "Today is a velvet day. I don't care if it's summer. {color} velvet.",
        "{color} silk against your skin. Because you deserve it.",
        "Wear the piece you bought because you loved it, not because it was practical. Today is its day.",
      ],
      bold: [
        "Pile on the necklaces like you're a Renaissance painting. {color} jewels mandatory.",
        "Wear every ring you own. Yes, all of them. Fingers are real estate.",
      ],
      playful: [
        "Linen, but make it louche. Wrinkled is the point. {color} linen if possible.",
        "Find something in your closet you forgot you loved. Wear it like an apology.",
      ],
    },
    gemini: {
      adventurous: [
        "How many patterns can you wear at once? I'm thinking minimum three. One must be {color}.",
        "A scarf is not just a scarf — it's a headband, a belt, a bracelet. Prove it.",
      ],
      romantic: [
        "Button-down shirt, but make it strange. Backwards? Belted? Only half-tucked? Your choice.",
        "Wear an outfit that would confuse your mother but delight a stranger.",
      ],
      bold: [
        "Mix boardroom and beach. Blazer and flip-flops in {color}. I'm not joking.",
        "Wear something that requires you to explain your outfit. Twice.",
      ],
      playful: [
        "Combine punk and prairie. Safety pins meet gingham meet {color}.",
        "Dress like you're about to seduce a librarian or BE a seductive librarian. Either works.",
      ],
    },
    cancer: {
      adventurous: [
        "Wear something you haven't touched in six months. It's been waiting.",
        "That impulse buy from 2019? Its moment has arrived. Wear it today.",
      ],
      romantic: [
        "Wear something that reminds you of your grandmother. Not in a costume way — in a talisman way.",
        "Find something in your closet you forgot you loved. Wear it like an apology.",
        "{color} linen, but make it louche. Wrinkled is the point.",
      ],
      bold: [
        "Put on something that makes you feel like you're getting away with something.",
        "Wear the outfit you thought you needed a special occasion for? This is it. Tuesday is special enough.",
      ],
      playful: [
        "Channel a Victorian ghost haunting a modern art gallery. Lace, yes, but make it angry. {color} lace.",
        "You're a retired ballerina opening a flower shop in Paris. Dress accordingly.",
      ],
    },
    leo: {
      adventurous: [
        "{color} sunglasses indoors. I don't care. Do it.",
        "Wear your biggest, most ridiculous earrings. The ones that make you tilt your head.",
      ],
      romantic: [
        "Channel the album cover of Fleetwood Mac's 'Rumours' — drama, silk, and unresolved tension.",
        "Put on 'Life on Mars?' by Bowie and let it dictate your silhouette — otherworldly, theatrical, unmissable.",
      ],
      bold: [
        "Today, you're wearing a hat. Not a baseball cap — a HAT. In {color}.",
        "Wear {color} lipstick like it's armor.",
        "Dress like you've just inherited a castle.",
      ],
      playful: [
        "Dress like the 1950s housewife who's secretly writing a scandalous novel.",
        "Wear something that makes people ask 'where are you going?' Answer: 'nowhere special.'",
      ],
    },
    virgo: {
      adventurous: [
        "1990s minimalism, but add one absolutely feral {color} accessory.",
        "Wear striped socks. With everything else deliberately serious.",
      ],
      romantic: [
        "Monochrome from head to toe, but make one piece scream. A {color} shoe. A {color} bag.",
        "Put on an outfit that requires you to stand up straighter.",
      ],
      bold: [
        "All black, but add one completely unhinged {color} accessory.",
        "Dress like you're the most interesting person at a party you're not even attending.",
      ],
      playful: [
        "Wear something that makes you feel like you're in on the joke.",
        "Athletic wear, but make it Edwardian. {color} accents.",
      ],
    },
    libra: {
      adventurous: [
        "Orange and pink together. The 1970s were right about this.",
        "Wear at least four shades of the same color. Depth, darling, depth.",
      ],
      romantic: [
        "Imagine you're a character in a Wes Anderson film. Symmetry, pastels, and deadpan expressions.",
        "Channel a 1960s Italian film star buying cigarettes at 3am.",
      ],
      bold: [
        "Wear {color} like it's your job. Your only job.",
        "Wear something blue — not navy, not safe. BLUE. Electric, royal, shocking.",
      ],
      playful: [
        "Dress like a diplomat from a country that doesn't exist. What does their fashion look like?",
        "Combine textures no one told you could coexist. Prove them wrong.",
      ],
    },
    scorpio: {
      adventurous: [
        "Leather and lace. Not sexy — surreal. {color} leather or {color} lace.",
        "Wear something that makes you walk differently. Slower, more deliberate.",
      ],
      romantic: [
        "All black, but add one completely unhinged {color} accessory.",
        "Channel a 1960s Italian film star buying cigarettes at 3am.",
      ],
      bold: [
        "Dress like you know something no one else knows.",
        "Wear the thing that makes you feel dangerous. In a good way.",
      ],
      playful: [
        "Dress as if you're about to have tea with the Queen, then rob a bank.",
        "Sunglasses that never come off. Mystery is the point.",
      ],
    },
    sagittarius: {
      adventurous: [
        "Dress like a cowboy going to the opera. {color} boots mandatory.",
        "Ignore the weather. Dress for a season that isn't happening right now.",
        "Combine punk and prairie. Safety pins meet gingham.",
      ],
      romantic: [
        "Pretend you're a diplomat from a country that doesn't exist. What does their fashion look like?",
        "Dress like it's 1973 and you're about to board a plane to somewhere glamorous.",
      ],
      bold: [
        "Wear something that makes people ask where you're going. Say 'adventure.'",
        "Mix prints from different cultures. {color} must appear twice.",
      ],
      playful: [
        "Athletic wear, but make it glamorous. {color} sneakers with everything.",
        "Dress like you're about to quit your job but haven't told anyone yet.",
      ],
    },
    capricorn: {
      adventurous: [
        "1980s power dressing. Yes, even on Zoom. {color} power suit.",
        "Mix boardroom and beach. Blazer and flip-flops. Confidence required.",
      ],
      romantic: [
        "Dress like the 1950s housewife who's secretly writing a scandalous novel.",
        "Channel the quiet confidence of someone who just closed a major deal.",
      ],
      bold: [
        "Dress as if you're about to have tea with the Queen, then rob a bank.",
        "Wear {color} with the authority of someone who makes the rules.",
      ],
      playful: [
        "Dress like you're the most interesting person at a party you're not even attending.",
        "Put on something that makes you feel like you've just inherited a castle.",
      ],
    },
    aquarius: {
      adventurous: [
        "Athletic wear, but make it Edwardian. {color} futuristic details.",
        "Pretend you're from the future. What does 2050 fashion look like?",
      ],
      romantic: [
        "Put on 'Life on Mars?' by Bowie and let it dictate your silhouette — otherworldly, theatrical, unmissable.",
        "Dress like you're about to seduce a librarian or BE a seductive librarian. Either works.",
      ],
      bold: [
        "Preppy, but possessed. Think possessed prep school student in {color}.",
        "Wear something that makes people tilt their heads and squint.",
      ],
      playful: [
        "Wear the outfit you thought you needed a special occasion for? This is it. Tuesday is special enough.",
        "Dress like you're a character in a sci-fi film. {color} is your accent color.",
      ],
    },
    pisces: {
      adventurous: [
        "Dig out the piece you thought was 'too much.' It's not. It never was.",
        "Wear something that makes noise when you move. Flow and rustle.",
      ],
      romantic: [
        "Channel the album cover of Fleetwood Mac's 'Rumours' — drama, {color} silk, and unresolved tension.",
        "What would Stevie Nicks wear to buy groceries? That. In {color}.",
        "You're a retired ballerina opening a flower shop in Paris. Dress accordingly.",
      ],
      bold: [
        "Channel a Victorian ghost haunting a modern art gallery. Lace, yes, but make it angry.",
        "{color} silk against your skin. Because dreams demand softness.",
      ],
      playful: [
        "Dress like you're in a music video from 1985. Commit to the {color} shoulder pads.",
        "Layer three different textures. Make them whisper to each other.",
      ],
    },
  };

  return templates[sign];
}

/**
 * Generate zodiac note based on sign and mood
 */
function getZodiacNote(sign: ZodiacSign, mood: string): string {
  const moodNotes: Record<string, Record<ZodiacSign, string>> = {
    adventurous: {
      aries: "Your Aries fire is ready for bold moves.",
      taurus: "Even steady Taurus needs adventure.",
      gemini: "Peak Gemini energy — embrace the chaos.",
      cancer: "Your Cancer intuition says go for it.",
      leo: "Leo thrives on grand gestures.",
      virgo: "Virgo precision meets daring choices.",
      libra: "Balanced Libra finds beauty in the unexpected.",
      scorpio: "Scorpio intensity demands drama.",
      sagittarius: "This is what Sagittarius lives for.",
      capricorn: "Capricorn structure with a wild edge.",
      aquarius: "Aquarius innovation at its finest.",
      pisces: "Dreamy Pisces makes magic happen.",
    },
    romantic: {
      aries: "Even fiery Aries has a soft side.",
      taurus: "Classic Taurus luxury and sensuality.",
      gemini: "Gemini versatility includes romance.",
      cancer: "Your Cancer heart knows the way.",
      leo: "Leo loves a dramatic love story.",
      virgo: "Virgo attention to romantic details.",
      libra: "Peak Libra — beauty and harmony.",
      scorpio: "Scorpio depth and passion showing.",
      sagittarius: "Sagittarius follows the heart.",
      capricorn: "Timeless Capricorn elegance.",
      aquarius: "Aquarius reimagines romance.",
      pisces: "Pure Pisces dream energy.",
    },
    confident: {
      aries: "Your Aries energy loves a power moment.",
      taurus: "Taurus strength is quiet but undeniable.",
      gemini: "Gemini charm at maximum power.",
      cancer: "Cancer confidence comes from within.",
      leo: "This is Leo's natural state.",
      virgo: "Virgo precision equals power.",
      libra: "Libra grace under pressure.",
      scorpio: "Magnetic Scorpio intensity.",
      capricorn: "Peak Capricorn authority.",
      sagittarius: "Sagittarius fearless and free.",
      aquarius: "Aquarius confidence in individuality.",
      pisces: "Pisces strength in softness.",
    },
  };

  // Determine mood category
  let category = 'confident'; // default
  if (mood.includes('adventurous') || mood.includes('energetic') || mood.includes('active')) {
    category = 'adventurous';
  } else if (mood.includes('romantic') || mood.includes('sensitive') || mood.includes('tender')) {
    category = 'romantic';
  }

  return moodNotes[category]?.[sign] || `Today's ${sign} energy is aligned.`;
}

/**
 * Generate fallback prompt when horoscope API is down
 */
function generateFallbackPrompt(sign: ZodiacSign): { prompt: string; note: string } {
  const templates = getPromptTemplates(sign);
  const allPrompts = [
    ...templates.adventurous,
    ...templates.romantic,
    ...templates.bold,
    ...templates.playful,
  ];

  // Use date to seed selection so it's consistent for the day
  const today = getTodayDate();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % allPrompts.length;
  const prompt = allPrompts[index].replace('{color}', 'your favorite color');

  const notes: Record<ZodiacSign, string> = {
    aries: "Your Aries energy loves a bold move.",
    taurus: "Very Taurus of you to prioritize luxury.",
    gemini: "Peak Gemini behavior — keeping everyone guessing.",
    cancer: "Your Cancer heart knows the power of sentimentality.",
    leo: "Leo approved — dramatic and unforgettable.",
    virgo: "Your Virgo attention to detail shows.",
    libra: "Classic Libra — aesthetically perfect.",
    scorpio: "Mysterious and magnetic. Very Scorpio.",
    sagittarius: "Adventurous and unpredictable. So Sagittarius.",
    capricorn: "Timeless and powerful. Peak Capricorn.",
    aquarius: "Unconventional and ahead of your time. Pure Aquarius.",
    pisces: "Dreamy and artistic. Exactly what a Pisces needs.",
  };

  return { prompt, note: notes[sign] };
}

/**
 * Get daily zodiac prompt - fetches fresh daily or returns cached
 */
export async function getDailyZodiacPrompt(
  sign: ZodiacSign
): Promise<{ prompt: string; note: string }> {
  const today = getTodayDate();

  try {
    // Check if we have a cached prompt for today
    const cachedData = await AsyncStorage.getItem(DAILY_PROMPT_KEY);
    const lastUpdate = await AsyncStorage.getItem(LAST_UPDATE_KEY);

    if (cachedData && lastUpdate === today) {
      const cached: CachedPrompt = JSON.parse(cachedData);
      if (cached.sign === sign) {
        // Return cached prompt for today
        return { prompt: cached.prompt, note: cached.note };
      }
    }

    // Need fresh prompt - fetch horoscope data
    const horoscopeData = await getDailyHoroscope(sign);

    let result: { prompt: string; note: string };

    if (horoscopeData) {
      // Generate prompt from horoscope
      result = generatePromptFromHoroscope(sign, horoscopeData);
    } else {
      // Use fallback
      result = generateFallbackPrompt(sign);
    }

    // Cache the prompt for today
    const cacheData: CachedPrompt = {
      ...result,
      date: today,
      sign,
    };
    await AsyncStorage.setItem(DAILY_PROMPT_KEY, JSON.stringify(cacheData));
    await AsyncStorage.setItem(LAST_UPDATE_KEY, today);

    return result;
  } catch (error) {
    console.error('Error getting daily zodiac prompt:', error);
    // Return fallback
    return generateFallbackPrompt(sign);
  }
}
