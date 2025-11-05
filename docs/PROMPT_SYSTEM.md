# Style Horoscope Prompt System

## How It Works

The prompt library uses a sophisticated system to ensure users never see the same prompt twice (until they've seen all prompts).

### Architecture

#### 1. **Prompt Storage** (`constants/fashion-prompts.ts`)
- Contains 70+ unique Diana Vreeland-style fashion prompts
- Covers multiple categories: scenario-based, music-inspired, color directives, etc.
- Can be easily expanded by adding new prompts to the array

#### 2. **Smart Selection Logic** (`utils/daily-prompt.ts`)

The system uses **AsyncStorage** to track prompt history:

```
┌─────────────────────────────────────────┐
│  User opens Style Horoscope page       │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Check: Is there a prompt for today?    │
└─────────────┬───────────────────────────┘
              │
        ┌─────┴─────┐
        │           │
       YES         NO
        │           │
        │           ▼
        │     ┌─────────────────────────┐
        │     │ Load viewing history     │
        │     └─────────┬───────────────┘
        │               │
        │               ▼
        │     ┌─────────────────────────┐
        │     │ Have all been viewed?   │
        │     └─────────┬───────────────┘
        │               │
        │         ┌─────┴─────┐
        │        YES          NO
        │         │            │
        │         ▼            ▼
        │   ┌─────────┐  ┌──────────────┐
        │   │ Reset   │  │ Get unseen   │
        │   │ history │  │ prompts only │
        │   └────┬────┘  └──────┬───────┘
        │        │              │
        │        └──────┬───────┘
        │               │
        │               ▼
        │     ┌─────────────────────────┐
        │     │ Shuffle with date seed  │
        │     └─────────┬───────────────┘
        │               │
        │               ▼
        │     ┌─────────────────────────┐
        │     │ Select first from list  │
        │     └─────────┬───────────────┘
        │               │
        │               ▼
        │     ┌─────────────────────────┐
        │     │ Save to history & cache │
        │     └─────────┬───────────────┘
        │               │
        └───────────────┘
                │
                ▼
      ┌─────────────────────────┐
      │ Display prompt to user  │
      └─────────────────────────┘
```

### Key Features

#### ✅ **No Repeats Within Cycle**
- Tracks every prompt shown to the user
- Won't show a prompt again until all 70+ have been seen
- After completing a cycle, history resets and starts fresh

#### ✅ **Consistent Daily Prompt**
- Same prompt shows all day (midnight-to-midnight)
- Uses date-based seeded shuffle for consistency
- User can check multiple times per day, always sees same prompt

#### ✅ **Deterministic Randomness**
- Uses today's date as a seed for shuffling
- Same date always produces same shuffle order
- But selection is from unseen prompts only

#### ✅ **Persistent Storage**
- Uses AsyncStorage (local device storage)
- Survives app closes and restarts
- Privacy-friendly (all data stored locally)

### Storage Keys

The system uses three AsyncStorage keys:

1. **`@style_horoscope_history`** - Array of prompt indices user has seen
2. **`@style_horoscope_current`** - Today's prompt with metadata
3. **`@style_horoscope_last_update`** - Last date prompt was updated

### Utility Functions

```typescript
// Get today's prompt (main function)
await getDailyPrompt(): Promise<string>

// Get formatted date string
getTodayDateString(): string

// Check progress (how many seen)
await getViewedPromptsCount(): Promise<number>

// Get total available
getTotalPromptsCount(): number

// Reset history (for testing)
await resetPromptHistory(): Promise<void>
```

## Adding New Prompts

To expand the library:

1. Open `constants/fashion-prompts.ts`
2. Add new prompts to the `fashionPrompts` array
3. Follow Diana Vreeland's voice: bold, whimsical, declarative
4. No code changes needed - system automatically adapts

Example:
```typescript
export const fashionPrompts = [
  // ... existing prompts
  "Your new prompt here - make it bold, make it Diana!",
];
```

## Timeline

With 70+ prompts and daily updates:
- **First cycle:** 70+ unique days of content
- **After cycle completes:** History resets, starts fresh rotation
- **Users will never see repeats within a cycle**

## Technical Notes

### Why AsyncStorage?
- Persistent across app sessions
- Fast read/write operations
- Privacy-friendly (local only)
- Standard React Native solution

### Why Date-Based Seeding?
- Ensures same prompt all day
- Deterministic (testable, predictable)
- No server required
- Works offline

### Future Enhancements

Potential improvements:
- Add "viewed X of Y prompts" progress indicator
- Allow users to manually reset history
- Add prompt categories/filters
- Share favorite prompts feature
- Notification reminders for daily check-ins
