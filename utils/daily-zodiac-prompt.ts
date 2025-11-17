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
        "Clash three patterns. The weirder the combination, the better. {color} must be involved.",
        "Wear your most impractical shoes to do mundane errands. Power move.",
        "Athletic wear, but make it absolutely feral. {color} accessories that scream chaos.",
        "Today you're cosplaying as someone who doesn't check their bank account. Dress accordingly.",
        "Leather jacket over a ball gown over combat boots. I'm not asking.",
        "Wear something that would make your teenage self proud and your mother concerned.",
        "Channel the energy of a spy who's really bad at blending in. {color} is your cover.",
      ],
      romantic: [
        "Layer three different textures. Velvet against denim against {color} silk.",
        "Wear the piece you bought because you loved it, not because it was practical. Today is its day.",
        "That vintage find from the back of your closet? Pair it with something aggressively modern.",
        "Soft {color} but with an edge sharp enough to cut glass. Think romantic assassin.",
        "Dress like you're going to write poetry in a café and mean every word.",
        "Flowing fabrics that move when you do. You're not walking, you're floating. In {color}.",
        "Lace, but make it threatening. Delicate violence in {color}.",
      ],
      bold: [
        "All black, but add one completely unhinged {color} accessory.",
        "Wear something that makes you feel like you could walk into any room and belong.",
        "Red lips, {color} shoes, and the confidence of someone who's never second-guessed anything.",
        "Dress like you're about to deliver devastating news but make it fashion.",
        "Power suit energy even if you're wearing pajamas. It's about the attitude.",
        "Monochrome from head to toe, then ruin it perfectly with one {color} statement piece.",
        "Wear something that makes strangers step aside on the sidewalk.",
      ],
      playful: [
        "Dress like you're about to have tea with the Queen, then rob a bank.",
        "Ignore the weather. Wear what you want.",
        "Mix your gym clothes with your fanciest piece. Make it make NO sense.",
        "Dress like a cartoon character came to life and decided to attend a gallery opening.",
        "Wear something that makes people ask if you're going somewhere. You're not.",
        "Channel 'unhinged art teacher on sabbatical in {color}.'",
        "That thing you thought was too weird to wear? Today's the day. Double down on it.",
      ],
    },
    taurus: {
      adventurous: [
        "Wear something that makes noise when you move. Jangle, swish, rustle in {color}.",
        "Layer three different textures. Velvet against denim against silk — fight me.",
        "Cashmere and leather. Soft and sharp. Make them coexist in {color}.",
        "Wear your most luxurious piece with your rattiest jeans. High-low forever.",
        "That designer thing you're 'saving'? Stop saving it. Wear it to Target.",
        "Gold jewelry. All of it. Layer until you look like you robbed a dragon.",
        "Silk pajamas as outerwear. Add {color} boots and don't explain yourself.",
        "Channel 'wealthy hermit who only leaves the house for art openings.'",
      ],
      romantic: [
        "Today is a velvet day. I don't care if it's summer. {color} velvet.",
        "{color} silk against your skin. Because you deserve it.",
        "Wear the piece you bought because you loved it, not because it was practical. Today is its day.",
        "Soft knits that feel like a hug. But make the silhouette devastating.",
        "Dress like you're the subject of a Pre-Raphaelite painting. Flowing, dramatic, timeless.",
        "Linen that wrinkles beautifully. Imperfection is the luxury. {color} preferred.",
        "Wear something that smells good. Fabric softener counts. Sensory experience matters.",
        "Channel 'garden party but make it decadent.' Think champagne and {color} florals.",
      ],
      bold: [
        "Pile on the necklaces like you're a Renaissance painting. {color} jewels mandatory.",
        "Wear every ring you own. Yes, all of them. Fingers are real estate.",
        "Head-to-toe {color}. Not a single other shade. Commit fully.",
        "That statement coat you've been too nervous to wear? Today is its debut.",
        "Dress like old money with new ideas. Classic silhouette, unhinged accessories.",
        "Wear something so expensive-looking people assume you're lying about where you got it.",
      ],
      playful: [
        "Linen, but make it louche. Wrinkled is the point. {color} linen if possible.",
        "Find something in your closet you forgot you loved. Wear it like an apology.",
        "Pajamas, but style them like you meant to do this. {color} slippers optional but encouraged.",
        "Dress like a Victorian ghost who discovered online shopping.",
        "Wear the coziest thing you own and dare anyone to comment. Comfort is power.",
        "Mix athleisure with evening wear. Velvet sweatpants. {color} ballgown hoodie. Go wild.",
      ],
    },
    gemini: {
      adventurous: [
        "How many patterns can you wear at once? I'm thinking minimum three. One must be {color}.",
        "A scarf is not just a scarf — it's a headband, a belt, a bracelet. Prove it.",
        "Wear two completely different aesthetics at once. Goth meets preppy meets {color}.",
        "Change your accessories halfway through the day. New vibe, who dis?",
        "Layer a turtleneck under a summer dress. Make winter and summer coexist.",
        "Stripes AND polka dots AND plaid. Chaos is the point. {color} ties it together somehow.",
        "Dress like you're going to three different events. Because maybe you are?",
        "Commit to the bit: wear your shoes on the wrong feet. Just kidding. Unless?",
      ],
      romantic: [
        "Button-down shirt, but make it strange. Backwards? Belted? Only half-tucked? Your choice.",
        "Wear an outfit that would confuse your mother but delight a stranger.",
        "Mix hard and soft. Leather and lace. Metal and silk. {color} everywhere.",
        "Dress like you're starring in two different movies at once and nailing both roles.",
        "That piece everyone says 'doesn't go' with everything? Make it go. Force it.",
        "Wear something that makes you feel like you're keeping a delightful secret.",
      ],
      bold: [
        "Mix boardroom and beach. Blazer and flip-flops in {color}. I'm not joking.",
        "Wear something that requires you to explain your outfit. Twice.",
        "Clash two vibes so hard they create a third, better vibe. {color} is the mediator.",
        "Dress like you're about to quit your job but you're not sure which one yet.",
        "Power suit with sneakers. Corporate rebellion in {color}.",
        "Wear something that makes people say 'I could never pull that off.' You can and you will.",
      ],
      playful: [
        "Combine punk and prairie. Safety pins meet gingham meet {color}.",
        "Dress like you're about to seduce a librarian or BE a seductive librarian. Either works.",
        "Mismatched socks, but make it a statement. {color} must appear on at least one foot.",
        "Channel 'chaos coordinator on their day off.' What does that even look like? Exactly.",
        "Wear your clothes slightly wrong on purpose. One sleeve pushed up. Belt off-center. Vibes.",
        "Dress like a different decade from the waist up vs. waist down. Time traveler chic.",
      ],
    },
    cancer: {
      adventurous: [
        "Wear something you haven't touched in six months. It's been waiting.",
        "That impulse buy from 2019? Its moment has arrived. Wear it today.",
        "Dig through your childhood photos. Dress like that vibe, updated for now.",
        "Wear something that belonged to someone you love. Make it yours.",
        "That piece with a story? Today's the day to tell it. {color} for emphasis.",
        "Soft on the outside, armored on the inside. Fluffy sweater, fierce boots.",
      ],
      romantic: [
        "Wear something that reminds you of your grandmother. Not in a costume way — in a talisman way.",
        "Find something in your closet you forgot you loved. Wear it like an apology.",
        "{color} linen, but make it louche. Wrinkled is the point.",
        "Dress like you're in a memory you want to create. Soft, intentional, meaningful.",
        "Wear something that feels like coming home. Whatever that means to you.",
        "Channel 'main character in a period drama' but make it subtle. {color} undertones.",
        "Layer delicate pieces until you look like a beautiful, complex contradiction.",
      ],
      bold: [
        "Put on something that makes you feel like you're getting away with something.",
        "Wear the outfit you thought you needed a special occasion for? This is it. Tuesday is special enough.",
        "That sentimental piece you're too nervous to wear? Protect it with confidence, not a closet.",
        "Dress like you're hosting a dinner party where everyone's a little bit in love with you.",
        "Soft colors, hard attitude. {color} pastels with an edge.",
      ],
      playful: [
        "Channel a Victorian ghost haunting a modern art gallery. Lace, yes, but make it angry. {color} lace.",
        "You're a retired ballerina opening a flower shop in Paris. Dress accordingly.",
        "Wear something cozy enough to cry in but chic enough to run into your ex in.",
        "Dress like the main character in a movie where nothing happens but the vibes are immaculate.",
        "Channel 'emotionally intelligent witch with impeccable taste in {color}.'",
      ],
    },
    leo: {
      adventurous: [
        "{color} sunglasses indoors. I don't care. Do it.",
        "Wear your biggest, most ridiculous earrings. The ones that make you tilt your head.",
        "Sequins before noon. This is not a drill. {color} sparkle mandatory.",
        "Dress like you just won an award you weren't nominated for. Confidence level: delusional.",
        "That statement piece everyone says is 'too much'? They're wrong. Wear it.",
        "Gold everything. Earrings, bracelets, shoes. You're not overdoing it, you're glowing.",
        "Wear a full face of makeup to walk the dog. Because you can.",
        "Channel 'off-duty celebrity who still looks better than everyone else in {color}.'",
      ],
      romantic: [
        "Channel the album cover of Fleetwood Mac's 'Rumours' — drama, silk, and unresolved tension.",
        "Put on 'Life on Mars?' by Bowie and let it dictate your silhouette — otherworldly, theatrical, unmissable.",
        "Dress like you're the love interest in a movie where you definitely don't end up with the boring guy.",
        "Silk, velvet, or something that catches the light. You're the main character. Act like it.",
        "Wear something that makes you feel like royalty. Because you basically are.",
        "Old Hollywood glamour but make it modern. {color} gown energy in a casual fit.",
      ],
      bold: [
        "Today, you're wearing a hat. Not a baseball cap — a HAT. In {color}.",
        "Wear {color} lipstick like it's armor.",
        "Dress like you've just inherited a castle.",
        "All eyes on you. Literally. That's the outfit. {color} and unapologetic.",
        "Wear something that makes you the best-dressed person in every room you enter.",
        "Channel 'CEO of looking good.' Power, glamour, intimidation. {color} details.",
        "Dress like you're about to be photographed. At all times. By everyone.",
      ],
      playful: [
        "Dress like the 1950s housewife who's secretly writing a scandalous novel.",
        "Wear something that makes people ask 'where are you going?' Answer: 'nowhere special.'",
        "Feathers, fringe, or anything that moves dramatically when you walk.",
        "Dress like you're in a music video directed by someone with too much budget.",
        "Maximalist everything. More is more. {color} is just the beginning.",
        "Channel 'theatrical costume designer's wildest dream in {color}.'",
      ],
    },
    virgo: {
      adventurous: [
        "1990s minimalism, but add one absolutely feral {color} accessory.",
        "Wear striped socks. With everything else deliberately serious.",
        "Clean lines, perfect tailoring, then ruin it with one chaotic {color} element.",
        "Monochrome, but make the fit so perfect people ask if it's custom.",
        "Wear something with too many pockets. Organization is sexy.",
        "Channel 'librarian who moonlights as an art thief.' Precise but dangerous.",
      ],
      romantic: [
        "Monochrome from head to toe, but make one piece scream. A {color} shoe. A {color} bag.",
        "Put on an outfit that requires you to stand up straighter.",
        "Every detail considered. Every seam intentional. Perfection in {color}.",
        "Dress like you're in a French film where nothing happens but everything matters.",
        "Minimal jewelry, but make it meaningful. Quality over quantity in {color}.",
        "Neutral tones with one unexpected {color} accent. Subtle chaos.",
      ],
      bold: [
        "All black, but add one completely unhinged {color} accessory.",
        "Dress like you're the most interesting person at a party you're not even attending.",
        "Crisp white shirt. Perfect black pants. {color} shoes that cost too much.",
        "Understated luxury. If you know, you know. {color} lining.",
        "Wear something so well-tailored it makes people uncomfortable.",
      ],
      playful: [
        "Wear something that makes you feel like you're in on the joke.",
        "Athletic wear, but make it Edwardian. {color} accents.",
        "Dress like a very organized witch. Everything labeled, color-coded in {color}, immaculate.",
        "Intentionally imperfect. One element slightly off. It's on purpose. Promise.",
        "Channel 'uptight character who's about to have a breakdown (but fashionably) in {color}.'",
      ],
    },
    libra: {
      adventurous: [
        "Orange and pink together. The 1970s were right about this.",
        "Wear at least four shades of the same color. Depth, darling, depth.",
        "Mix pastels with neon. Make it work through sheer force of aesthetic will.",
        "That color combination everyone says clashes? Prove them wrong. {color} is involved.",
        "Symmetrical outfit. Balanced proportions. Aesthetically perfect. Slightly unhinged.",
        "Wear something so beautiful it makes people stop mid-conversation.",
      ],
      romantic: [
        "Imagine you're a character in a Wes Anderson film. Symmetry, pastels, and deadpan expressions.",
        "Channel a 1960s Italian film star buying cigarettes at 3am.",
        "Soft {color} everything. But with edges. Perfect balance of sweet and sharp.",
        "Dress like art come to life. Painting yourself into the day.",
        "Flowing, romantic, but structured. Chaos contained by beauty.",
        "Wear something that looks effortless but took 45 minutes to style.",
      ],
      bold: [
        "Wear {color} like it's your job. Your only job.",
        "Wear something blue — not navy, not safe. BLUE. Electric, royal, shocking.",
        "Perfectly balanced outfit. Then add something slightly off. Calculated imperfection.",
        "Dress like a diplomat who's too beautiful to take seriously. Use it to your advantage.",
        "Harmonious colors, devastating silhouette. {color} ties it together.",
      ],
      playful: [
        "Dress like a diplomat from a country that doesn't exist. What does their fashion look like?",
        "Combine textures no one told you could coexist. Prove them wrong.",
        "Mirror your outfit. Left side matches right side. Symmetry as performance art.",
        "Channel 'aesthetically perfect person having an aesthetically perfect crisis in {color}.'",
        "Wear something so well-coordinated it's almost aggressive.",
      ],
    },
    scorpio: {
      adventurous: [
        "Leather and lace. Not sexy — surreal. {color} leather or {color} lace.",
        "Wear something that makes you walk differently. Slower, more deliberate.",
        "All black everything, but make it feel dangerous. {color} undertones.",
        "Dress like you're hiding a secret. A really good one. {color} hints at the mystery.",
        "Sharp silhouettes. No softness. All edges. {color} for emphasis.",
        "Channel 'person you don't want to cross but absolutely want to be friends with.'",
      ],
      romantic: [
        "All black, but add one completely unhinged {color} accessory.",
        "Channel a 1960s Italian film star buying cigarettes at 3am.",
        "Dark romance. Think gothic but make it fashion. {color} silk details.",
        "Wear something that feels like a secret being whispered. Intimate, intense.",
        "Layer sheer over opaque. Reveal and conceal simultaneously in {color}.",
        "Dress like the mysterious stranger everyone wants to know. Don't explain yourself.",
      ],
      bold: [
        "Dress like you know something no one else knows.",
        "Wear the thing that makes you feel dangerous. In a good way.",
        "Power through intimidation. {color} accessories sharp enough to cut.",
        "Monochrome intensity. Black on black on {color}. Unreadable energy.",
        "Dress like you're about to end an argument you haven't started yet.",
        "Channel 'villain in a movie where they're actually right about everything.'",
      ],
      playful: [
        "Dress as if you're about to have tea with the Queen, then rob a bank.",
        "Sunglasses that never come off. Mystery is the point.",
        "Wear something so dark it's almost funny. Committed goth in {color}.",
        "Channel 'cryptid spotted at fashion week.' Unsettling but chic.",
        "Dress like you're perpetually plotting something. It's just grocery shopping, but the vibe is there.",
      ],
    },
    sagittarius: {
      adventurous: [
        "Dress like a cowboy going to the opera. {color} boots mandatory.",
        "Ignore the weather. Dress for a season that isn't happening right now.",
        "Combine punk and prairie. Safety pins meet gingham.",
        "Wear something from three different countries. Fashion passport in {color}.",
        "Athletic gear with fancy jewelry. You just came from somewhere. Or you're about to go somewhere.",
        "Pack your outfit like you're leaving tomorrow. Layers, scarves, {color} everything.",
        "Dress like you're perpetually jet-lagged but make it aspirational.",
        "Channel 'adventurer who accidentally wandered into a cocktail party in {color}.'",
      ],
      romantic: [
        "Pretend you're a diplomat from a country that doesn't exist. What does their fashion look like?",
        "Dress like it's 1973 and you're about to board a plane to somewhere glamorous.",
        "Bohemian but make it expensive. {color} silk scarves, designer denim.",
        "Wear something that looks like you bought it in a foreign market. Eclectic, worldly.",
        "Free-spirited but structured. Wild but intentional. {color} freedom.",
        "Channel 'nomadic artist who's somehow always chic despite living out of a backpack.'",
      ],
      bold: [
        "Wear something that makes people ask where you're going. Say 'adventure.'",
        "Mix prints from different cultures. {color} must appear twice.",
        "Clash patterns from different continents. Make it work through confidence alone.",
        "Wear your travel souvenirs as accessories. Story-telling through {color} style.",
        "Dress like you don't care what anyone thinks. Then add {color} to prove you actually have taste.",
      ],
      playful: [
        "Athletic wear, but make it glamorous. {color} sneakers with everything.",
        "Dress like you're about to quit your job but haven't told anyone yet.",
        "Wear hiking boots with a dress. Practicality meets optimism in {color}.",
        "Channel 'eternal optimist with questionable geographic knowledge dressed in {color}.'",
        "Dress like you're late for a flight that doesn't exist. Chaotic energy, great outfit.",
      ],
    },
    capricorn: {
      adventurous: [
        "1980s power dressing. Yes, even on Zoom. {color} power suit.",
        "Mix boardroom and beach. Blazer and flip-flops. Confidence required.",
        "Structured silhouettes. Sharp lines. {color} means business, literally.",
        "Wear something expensive-looking even if it's not. Fake it till you acquire it.",
        "Channel 'CEO who doesn't need to try hard because they already won.'",
        "Tailored everything. Even your casual wear should look intentional in {color}.",
      ],
      romantic: [
        "Dress like the 1950s housewife who's secretly writing a scandalous novel.",
        "Channel the quiet confidence of someone who just closed a major deal.",
        "Classic silhouettes with {color} modern details. Timeless with a twist.",
        "Dress like old money trying to look relatable. Spoiler: it's not working.",
        "Wear something your grandmother would approve of, then subvert it with {color} edge.",
        "Channel 'person who's too successful to care but still looks impeccable.'",
      ],
      bold: [
        "Dress as if you're about to have tea with the Queen, then rob a bank.",
        "Wear {color} with the authority of someone who makes the rules.",
        "Power suit. Power heels. Power attitude. {color} power moves.",
        "Dress like you're about to buy the company. Even if you're not.",
        "Monochrome authority. Black, white, grey, and one devastating {color} accent.",
        "Channel 'intimidatingly competent in every situation, dressed in {color}.'",
      ],
      playful: [
        "Dress like you're the most interesting person at a party you're not even attending.",
        "Put on something that makes you feel like you've just inherited a castle.",
        "Wear a full suit to do absolutely nothing. Overdressed is a power move.",
        "Channel 'person who's way too put-together for brunch but makes it work in {color}.'",
        "Dress like success, even if you're just getting coffee. Especially then.",
      ],
    },
    aquarius: {
      adventurous: [
        "Athletic wear, but make it Edwardian. {color} futuristic details.",
        "Pretend you're from the future. What does 2050 fashion look like?",
        "Mix eras aggressively. Victorian collar, space-age pants, {color} accessories.",
        "Wear something that makes people ask 'is that fashion?' Yes. Yes it is.",
        "Thrift store finds styled like high fashion. Unconventional in {color}.",
        "Channel 'time traveler who got dressed in the dark but somehow nailed it.'",
        "Asymmetrical everything. Balance is overrated. {color} chaos.",
      ],
      romantic: [
        "Put on 'Life on Mars?' by Bowie and let it dictate your silhouette — otherworldly, theatrical, unmissable.",
        "Dress like you're about to seduce a librarian or BE a seductive librarian. Either works.",
        "Quirky but intentional. Every weird choice is a conscious choice in {color}.",
        "Wear something that makes people think you're either brilliant or confused. You're both.",
        "Channel 'eccentric intellectual with impeccable taste and no filter, dressed in {color}.'",
      ],
      bold: [
        "Preppy, but possessed. Think possessed prep school student in {color}.",
        "Wear something that makes people tilt their heads and squint.",
        "Avant-garde but accessible. Weird but wearable. {color} innovation.",
        "Dress like you're making a statement. What statement? Who knows. But it's bold.",
        "Channel 'person whose fashion choices spark philosophical debates about {color}.'",
      ],
      playful: [
        "Wear the outfit you thought you needed a special occasion for? This is it. Tuesday is special enough.",
        "Dress like you're a character in a sci-fi film. {color} is your accent color.",
        "Mix tech and nature. Metallic fabrics with earth tones in {color}.",
        "Channel 'alien trying to understand human fashion and doing an okay job in {color}.'",
        "Wear something so weird it loops back around to being genius. Commit to it.",
      ],
    },
    pisces: {
      adventurous: [
        "Dig out the piece you thought was 'too much.' It's not. It never was.",
        "Wear something that makes noise when you move. Flow and rustle.",
        "Layer sheer fabrics until you look like a beautiful, confused cloud in {color}.",
        "Wear something that floats when you walk. Physics optional, magic mandatory.",
        "Mix patterns that exist in dreams. Nothing matches, everything flows in {color}.",
        "Channel 'mermaid who traded her tail for a really good wardrobe.'",
      ],
      romantic: [
        "Channel the album cover of Fleetwood Mac's 'Rumours' — drama, {color} silk, and unresolved tension.",
        "What would Stevie Nicks wear to buy groceries? That. In {color}.",
        "You're a retired ballerina opening a flower shop in Paris. Dress accordingly.",
        "Flowing fabrics, soft colors, ethereal vibes. You're not walking, you're drifting in {color}.",
        "Wear something that looks like it was spun from moonlight and good intentions.",
        "Channel 'mystical poet with amazing fashion sense and questionable life choices in {color}.'",
        "Lace, silk, velvet. Soft textures for soft hearts. {color} dreams.",
      ],
      bold: [
        "Channel a Victorian ghost haunting a modern art gallery. Lace, yes, but make it angry.",
        "{color} silk against your skin. Because dreams demand softness.",
        "Dreamy but devastating. Soft exterior, complex interior. {color} layers.",
        "Wear something that makes you feel like you're underwater but in a good way.",
        "Channel 'person whose inner world is far more interesting than reality, dressed in {color}.'",
      ],
      playful: [
        "Dress like you're in a music video from 1985. Commit to the {color} shoulder pads.",
        "Layer three different textures. Make them whisper to each other.",
        "Wear something that looks like you designed it in a fever dream. Artistic chaos in {color}.",
        "Channel 'fairy who discovered vintage stores and went absolutely wild.'",
        "Dress like you're perpetually on the verge of disappearing into a forest. Enchanted vibes in {color}.",
        "Mix reality and fantasy. You're real, the outfit might not be. {color} magic.",
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
