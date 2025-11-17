# Vogue Archive Search Scoring System

The search results are now ranked using a sophisticated multi-signal scoring system that combines semantic similarity, season relevance, and recency.

## How It Works

### 1. **Semantic Similarity** (60% weight)
- The base score from the vector search API
- Measures how well the image matches your search query
- Most important signal

### 2. **Season Relevance** (25% weight)
- Boosts items from the current season
- Examples:
  - **Perfect match (1.0)**: Fall items shown in Fall
  - **Adjacent season (0.7)**: Summer items shown in Fall
  - **Opposite season (0.4)**: Winter items shown in Summer

### 3. **Recency Bias** (15% weight)
- For **generic queries** (e.g., "blazer jeans boots"):
  - Heavily favors recent items (last 2-5 years)
  - Last 2 years: 1.0 score
  - Last 5 years: 0.9 score
  - Last 10 years: 0.7 score
  - 20+ years old: 0.3 score

- For **nostalgic queries** (e.g., "90s grunge", "vintage blazer", "y2k"):
  - Reverses the bias to favor older items
  - 20-40 years old: 1.0 score (sweet spot)
  - 15-50 years old: 0.8 score
  - Very recent items get lower scores

## Nostalgic Query Detection

The system automatically detects when you're looking for vintage/retro items by checking for keywords like:
- Decade terms: "90s", "80s", "70s", "60s", etc.
- Style terms: "vintage", "retro", "classic", "throwback"
- Era terms: "y2k", "grunge", "mod", "disco"
- Other: "nostalgic", "old school", "timeless", "heritage"

## Example Scenarios

### Scenario 1: Current Season, Generic Query
**Query**: "blazer jeans boots cream camel black"
**Current Season**: Fall 2024

**Result ranking** (assuming similar semantic scores):
1. Fall 2023 item → High season match + high recency
2. Fall 2019 item → High season match + medium recency
3. Summer 2023 item → Medium season match + high recency
4. Fall 2010 item → High season match + low recency

### Scenario 2: Nostalgic Query
**Query**: "90s grunge plaid shirt"
**Current Season**: Fall 2024

**Result ranking** (assuming similar semantic scores):
1. Fall 1995 item → High season match + perfect vintage era
2. Fall 1988 item → High season match + good vintage era
3. Fall 2023 item → High season match + low vintage score (too recent)

### Scenario 3: Off-Season Search
**Query**: "summer dress sandals"
**Current Season**: Winter 2024

**Result ranking**:
1. Summer 2023 item → Perfect season match (overrides winter) + recent
2. Summer 2019 item → Perfect season match + medium recency
3. Winter 2023 item → Current season + recent (but wrong garment season)

## Benefits

1. **Seasonal Relevance**: You'll see fall coats in fall, summer dresses in summer
2. **Fresh Results**: Generic searches favor recent runway looks
3. **Smart Vintage**: Searches for "90s" or "vintage" automatically show older items
4. **Cross-Signal Optimization**: No single signal dominates; all factors are balanced

## Technical Details

- Season detection supports formats like "Fall 2019", "Spring/Summer 2020"
- Seasons are mapped: Spring (Mar-May), Summer (Jun-Aug), Fall (Sep-Nov), Winter (Dec-Feb)
- Combined scores are calculated before final ranking
- Console logs show before/after scores for debugging
