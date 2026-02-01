
# Plan: Remove "You're Now a Digital Detective!" Slide

## Summary
Remove slide index 12 ("You're Now a Digital Detective!") from the training flow, so users go directly from the "Additional Tools for Detecting AI Content" slide (index 11) to the "Congratulations, Digital Detective!" slide.

## Changes Required

### 1. Update `src/data/trainingContent.ts`
- **Remove the entire slide object** at current index 12 (the "You're Now a Digital Detective!" debrief slide with Key Detection Signs Recap and Final Protocols)
- This will shift the "Congratulations, Digital Detective!" slide from index 13 to index 12

### 2. Update `src/pages/Training.tsx`
After removing the slide from the data file, the slide indexes will shift. Need to update:

- **Remove the debrief rendering block** for `currentSlide === 12` (lines ~381-464) - this renders the Key Detection Signs Recap and Final Protocols that are being removed
- **Update navigation button logic** - references to slide 12 and 13 need to be adjusted:
  - Back button text logic (line ~583)
  - Next button text logic (line ~587) - remove the `currentSlide === 12 ? 'Claim Your Badge!'` condition
  - Case indicator visibility (line ~108)
- **The final slide** will now be at `totalSlides - 1` (index 12 instead of 13), so the existing `currentSlide === totalSlides - 1` logic will automatically handle it
- **Optionally remove unused imports** if `seniorDetectiveMagnifying` is no longer used elsewhere

## New Slide Structure

| Index | Title |
|-------|-------|
| 0 | Greetings, recruit! It's training day. |
| 1 | What is AI? |
| 2 | The Good and The Bad of AI |
| 3 | Spotting AI-Generated Text |
| 4 | Test Your Knowledge: AI Text |
| 5 | Spotting AI-Generated Images |
| 6 | Test Your Knowledge: AI Images |
| 7 | Case #3: Spotting AI-Generated Audio |
| 8 | Test Your Knowledge: AI Audio |
| 9 | Spotting Deepfake Videos |
| 10 | Test Your Knowledge: Deepfake Videos |
| 11 | Additional Tools for Detecting AI Content |
| **12** | **Congratulations, Digital Detective!** (final slide) |

Total slides: 13 (reduced from 14)
