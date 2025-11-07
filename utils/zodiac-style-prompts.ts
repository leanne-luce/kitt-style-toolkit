/**
 * Zodiac-based style prompts - playful and simple with a subtle astrological touch
 */

import { ZodiacSign, zodiacSigns } from './zodiac';
import { HoroscopeData } from '@/services/horoscope';

// Simple, fun prompts for each zodiac sign - matching the playful original tone
const zodiacPrompts: Record<ZodiacSign, string[]> = {
  aries: [
    "Wear red like it's your job. Your only job.",
    "Put on something that makes you walk differently.",
    "Dress with the confidence of someone who just quit their job but hasn't told anyone yet.",
    "All black, but add one completely unhinged accessory.",
    "Wear the thing that makes you feel like you could walk into any room and belong.",
  ],
  taurus: [
    "Today is a velvet day. I don't care if it's summer.",
    "Silk against your skin. Because you deserve it.",
    "Wear something that makes noise when you move. Jangle, swish, rustle.",
    "Layer three different textures. Velvet against denim against silk — fight me.",
    "Wear the piece you bought because you loved it, not because it was practical. Today is its day.",
  ],
  gemini: [
    "How many patterns can you wear at once? I'm thinking minimum three.",
    "Button-down shirt, but make it strange. Backwards? Belted? Only half-tucked? Your choice.",
    "Wear an outfit that would confuse your mother.",
    "Mix boardroom and beach. Blazer and flip-flops. I'm not joking.",
    "A scarf is not just a scarf — it's a headband, a belt, a bracelet. Prove it.",
  ],
  cancer: [
    "Wear something that reminds you of your grandmother. Not in a costume way — in a talisman way.",
    "Find something in your closet you forgot you loved. Wear it like an apology.",
    "Wear something you haven't touched in six months. It's been waiting.",
    "Put on something that makes you feel like you're getting away with something.",
    "Linen, but make it louche. Wrinkled is the point.",
  ],
  leo: [
    "Sunglasses indoors. I don't care. Do it.",
    "Today, you're wearing a hat. Not a baseball cap — a HAT.",
    "Wear red lipstick like it's armor.",
    "Wear your biggest, most ridiculous earrings. The ones that make you tilt your head.",
    "Dress like you've just inherited a castle.",
  ],
  virgo: [
    "Monochrome from head to toe, but make one piece scream. A red shoe. A yellow bag. Chaos.",
    "1990s minimalism, but add one absolutely feral accessory.",
    "Wear striped socks. With everything else deliberately serious.",
    "Put on an outfit that requires you to stand up straighter.",
    "All black, but add one completely unhinged accessory.",
  ],
  libra: [
    "Orange and pink together. The 1970s were right about this.",
    "Wear at least four shades of the same color. Depth, darling, depth.",
    "Imagine you're a character in a Wes Anderson film. Symmetry, pastels, and deadpan expressions.",
    "Wear pink like it's your job. Your only job.",
    "Wear something blue — not navy, not safe. BLUE. Electric, royal, shocking.",
  ],
  scorpio: [
    "All black, but add one completely unhinged accessory.",
    "Leather and lace. Not sexy — surreal.",
    "Dress like you know something no one else knows.",
    "Wear something that makes you walk differently.",
    "Channel a 1960s Italian film star buying cigarettes at 3am.",
  ],
  sagittarius: [
    "Dress like a cowboy going to the opera.",
    "Combine punk and prairie. Safety pins meet gingham.",
    "Pretend you're a diplomat from a country that doesn't exist. What does their fashion look like?",
    "Dress for a season that isn't happening right now. Confuse everyone.",
    "Ignore the weather. Wear what you want.",
  ],
  capricorn: [
    "1980s power dressing. Yes, even on Zoom.",
    "Dress like the 1950s housewife who's secretly writing a scandalous novel.",
    "Dress as if you're about to have tea with the Queen, then rob a bank.",
    "Mix boardroom and beach. Blazer and flip-flops. I'm not joking.",
    "Dress like you're the most interesting person at a party you're not even attending.",
  ],
  aquarius: [
    "Athletic wear, but make it Edwardian.",
    "Dress like you're about to seduce a librarian or BE a seductive librarian. Either works.",
    "Preppy, but possessed. Think possessed prep school student.",
    "Wear the outfit you thought you needed a special occasion for? This is it. Tuesday is special enough.",
    "Put on 'Life on Mars?' by Bowie and let it dictate your silhouette — otherworldly, theatrical, unmissable.",
  ],
  pisces: [
    "Channel the album cover of Fleetwood Mac's 'Rumours' — drama, silk, and unresolved tension.",
    "What would Stevie Nicks wear to buy groceries? That.",
    "You're a retired ballerina opening a flower shop in Paris. Dress accordingly.",
    "Channel a Victorian ghost haunting a modern art gallery. Lace, yes, but make it angry.",
    "Dig out the piece you thought was 'too much.' It's not. It never was.",
  ],
};

// Short, subtle zodiac personality notes
const zodiacNotes: Record<ZodiacSign, string> = {
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

/**
 * Generate personalized style horoscope based on zodiac sign
 * Returns a simple prompt + subtle zodiac note
 */
export function generateStyleHoroscope(
  sign: ZodiacSign,
  horoscopeData?: HoroscopeData | null
): { prompt: string; note: string } {
  const prompts = zodiacPrompts[sign];
  const note = zodiacNotes[sign];

  // Pick a random prompt for this sign (or use horoscope mood to influence if available)
  let selectedPrompt: string;

  if (horoscopeData?.mood) {
    // Use mood to influence prompt selection (map moods to prompt vibes)
    const mood = horoscopeData.mood.toLowerCase();
    if (mood.includes('adventurous') || mood.includes('energetic')) {
      selectedPrompt = prompts[0] || prompts[Math.floor(Math.random() * prompts.length)];
    } else if (mood.includes('romantic') || mood.includes('sensitive')) {
      selectedPrompt = prompts[prompts.length - 1] || prompts[Math.floor(Math.random() * prompts.length)];
    } else {
      selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    }
  } else {
    // Random selection
    selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  }

  return {
    prompt: selectedPrompt,
    note: note,
  };
}

/**
 * Get fallback style prompt when horoscope data is unavailable
 */
export function getFallbackStylePrompt(sign: ZodiacSign): { prompt: string; note: string } {
  return generateStyleHoroscope(sign, null);
}
