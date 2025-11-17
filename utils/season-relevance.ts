/**
 * Determines season relevance and recency scoring for Vogue archive results
 */

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

/**
 * Get the current season based on the month
 */
export function getCurrentSeason(): Season {
  const month = new Date().getMonth(); // 0-11

  if (month >= 2 && month <= 4) return 'spring'; // Mar-May
  if (month >= 5 && month <= 7) return 'summer'; // Jun-Aug
  if (month >= 8 && month <= 10) return 'fall'; // Sep-Nov
  return 'winter'; // Dec-Feb
}

/**
 * Parse season from string like "Fall 2019" or "Spring/Summer 2020"
 */
export function parseSeasonFromString(seasonStr: string): { season: Season | null; year: number | null } {
  if (!seasonStr) return { season: null, year: null };

  const lowerStr = seasonStr.toLowerCase();

  // Extract year (4 digits)
  const yearMatch = seasonStr.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? parseInt(yearMatch[0], 10) : null;

  // Extract season
  let season: Season | null = null;
  if (lowerStr.includes('spring')) season = 'spring';
  else if (lowerStr.includes('summer')) season = 'summer';
  else if (lowerStr.includes('fall') || lowerStr.includes('autumn')) season = 'fall';
  else if (lowerStr.includes('winter')) season = 'winter';
  // For combined seasons like "Spring/Summer", prefer the first one
  else if (lowerStr.includes('spring')) season = 'spring';

  return { season, year };
}

/**
 * Check if a query mentions nostalgic or decade-related terms
 */
export function isNostalgicQuery(query: string): boolean {
  const lowerQuery = query.toLowerCase();

  const nostalgicTerms = [
    'vintage', 'retro', 'classic', 'throwback', 'nostalgic',
    '90s', '80s', '70s', '60s', '50s', '40s', '30s', '20s',
    'nineties', 'eighties', 'seventies', 'sixties', 'fifties',
    'y2k', 'grunge', 'mod', 'disco', 'victorian', 'edwardian',
    'old school', 'timeless', 'heritage', 'archive',
  ];

  return nostalgicTerms.some(term => lowerQuery.includes(term));
}

/**
 * Calculate a season relevance score (0-1)
 * Higher score = more relevant to current season
 */
export function getSeasonRelevanceScore(itemSeason: string): number {
  const { season, year } = parseSeasonFromString(itemSeason);
  const currentSeason = getCurrentSeason();
  const currentYear = new Date().getFullYear();

  if (!season) return 0.5; // Neutral score if no season info

  // Perfect match: same season
  if (season === currentSeason) return 1.0;

  // Adjacent seasons get partial credit
  const seasonOrder: Season[] = ['spring', 'summer', 'fall', 'winter'];
  const currentSeasonIndex = seasonOrder.indexOf(currentSeason);
  const itemSeasonIndex = seasonOrder.indexOf(season);

  const seasonDiff = Math.min(
    Math.abs(currentSeasonIndex - itemSeasonIndex),
    Math.abs(currentSeasonIndex - itemSeasonIndex + 4),
    Math.abs(currentSeasonIndex - itemSeasonIndex - 4)
  );

  if (seasonDiff === 1) return 0.7; // Adjacent season (e.g., Summer when it's Fall)
  if (seasonDiff === 2) return 0.4; // Opposite season

  return 0.5; // Default
}

/**
 * Calculate a recency score (0-1)
 * Higher score = more recent
 * Adjusts behavior for nostalgic queries
 */
export function getRecencyScore(itemYear: number, isNostalgic: boolean): number {
  const currentYear = new Date().getFullYear();
  const yearDiff = currentYear - itemYear;

  if (isNostalgic) {
    // For nostalgic queries, older is better (up to a point)
    // Sweet spot is 20-40 years ago
    if (yearDiff >= 20 && yearDiff <= 40) return 1.0;
    if (yearDiff >= 15 && yearDiff <= 50) return 0.8;
    if (yearDiff >= 10 && yearDiff <= 60) return 0.6;
    return 0.4;
  } else {
    // For generic queries, bias towards recent (last 5 years)
    if (yearDiff <= 2) return 1.0; // Last 2 years
    if (yearDiff <= 5) return 0.9; // Last 5 years
    if (yearDiff <= 10) return 0.7; // Last decade
    if (yearDiff <= 20) return 0.5; // Last 20 years
    return 0.3; // Older than 20 years
  }
}

/**
 * Calculate combined score for sorting results
 * Combines semantic similarity, season relevance, and recency
 */
export function calculateCombinedScore(
  semanticScore: number,
  itemSeason: string,
  query: string
): number {
  const { year } = parseSeasonFromString(itemSeason);
  const isNostalgic = isNostalgicQuery(query);

  // Weight factors
  const SEMANTIC_WEIGHT = 0.6; // Semantic similarity is most important
  const SEASON_WEIGHT = 0.25; // Season relevance
  const RECENCY_WEIGHT = 0.15; // Recency/vintage preference

  const seasonScore = getSeasonRelevanceScore(itemSeason);
  const recencyScore = year ? getRecencyScore(year, isNostalgic) : 0.5;

  const combinedScore =
    (semanticScore * SEMANTIC_WEIGHT) +
    (seasonScore * SEASON_WEIGHT) +
    (recencyScore * RECENCY_WEIGHT);

  return combinedScore;
}
