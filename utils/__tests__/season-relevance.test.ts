/**
 * Tests for season relevance scoring
 * Run these to understand how the scoring system works
 */

import {
  getCurrentSeason,
  parseSeasonFromString,
  isNostalgicQuery,
  getSeasonRelevanceScore,
  getRecencyScore,
  calculateCombinedScore,
} from '../season-relevance';

// Example test cases to demonstrate the scoring

console.log('=== Current Season ===');
console.log('Current season:', getCurrentSeason());

console.log('\n=== Season Parsing ===');
console.log('Fall 2019:', parseSeasonFromString('Fall 2019'));
console.log('Spring/Summer 2023:', parseSeasonFromString('Spring/Summer 2023'));
console.log('Winter 2020:', parseSeasonFromString('Winter 2020'));

console.log('\n=== Nostalgic Query Detection ===');
console.log('blazer jeans boots:', isNostalgicQuery('blazer jeans boots')); // false
console.log('vintage blazer:', isNostalgicQuery('vintage blazer')); // true
console.log('90s grunge look:', isNostalgicQuery('90s grunge look')); // true
console.log('y2k fashion:', isNostalgicQuery('y2k fashion')); // true

console.log('\n=== Season Relevance Scoring ===');
// These scores will vary based on current season
console.log('Fall 2023 score:', getSeasonRelevanceScore('Fall 2023'));
console.log('Spring 2023 score:', getSeasonRelevanceScore('Spring 2023'));
console.log('Winter 2024 score:', getSeasonRelevanceScore('Winter 2024'));

console.log('\n=== Recency Scoring (Generic Query) ===');
console.log('2023 (generic):', getRecencyScore(2023, false));
console.log('2019 (generic):', getRecencyScore(2019, false));
console.log('2010 (generic):', getRecencyScore(2010, false));
console.log('1995 (generic):', getRecencyScore(1995, false));

console.log('\n=== Recency Scoring (Nostalgic Query) ===');
console.log('2023 (nostalgic):', getRecencyScore(2023, true));
console.log('2005 (nostalgic):', getRecencyScore(2005, true));
console.log('1995 (nostalgic):', getRecencyScore(1995, true));
console.log('1985 (nostalgic):', getRecencyScore(1985, true));

console.log('\n=== Combined Scoring Examples ===');
console.log('Recent Fall item (generic query):');
console.log(calculateCombinedScore(0.8, 'Fall 2023', 'blazer jeans'));

console.log('\nOlder item (generic query):');
console.log(calculateCombinedScore(0.8, 'Fall 2010', 'blazer jeans'));

console.log('\n90s item (nostalgic query):');
console.log(calculateCombinedScore(0.8, 'Fall 1995', '90s grunge blazer'));

console.log('\nRecent item (nostalgic query):');
console.log(calculateCombinedScore(0.8, 'Fall 2023', 'vintage blazer'));
