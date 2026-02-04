

## Plan: Add Top-Left Decorative Cross SVG to Training Slides 1-13

### Summary
Add a new decorative SVG element (blue outline cross with tan accent) to the left side of the training page, positioned between the progress bar and the main content card, visible on slides 1-13.

### Design Reference
Based on the screenshot, the SVG should:
- Be positioned on the **left side** of the page
- Sit **outside** the main content container (partially off-screen on the left)
- Appear **vertically** between the progress bar and the main card
- Only display on slides index 1 through 13 (not on the intro slide)

---

### Technical Implementation

#### Step 1: Create a New Component
Create a new component `DecorativeTopCross.tsx` in `src/components/` that renders the provided SVG:

```tsx
// src/components/DecorativeTopCross.tsx
export const DecorativeTopCross = () => {
  return (
    <div className="fixed top-40 -left-16 pointer-events-none z-0">
      <svg width="180" height="229" viewBox="0 0 180 229" fill="none">
        {/* Blue outline cross */}
        <path d="M63.5 3C86.2977 3..." stroke="#00A5FE" strokeWidth="6"/>
        {/* Tan filled smaller cross */}
        <path d="M112.5 177C106.949 177..." fill="#F8EDD1"/>
      </svg>
    </div>
  );
};
```

**Positioning approach:**
- `fixed` positioning to stay in place relative to viewport
- `top-40` (approximately 160px from top) to sit below the progress bar
- `-left-16` (negative left offset) to position partially off-screen on the left, matching the design

#### Step 2: Integrate into Training.tsx
Add the new component to the training page, displayed conditionally for slides 1-13:

```tsx
// Import
import { DecorativeTopCross } from "@/components/DecorativeTopCross";

// In the render (after line 93)
{currentSlide > 0 && <DecorativeTopCross />}
```

This mirrors the existing `DecorativeShapes` pattern already in the code.

---

### Files Modified

| File | Change |
|------|--------|
| `src/components/DecorativeTopCross.tsx` | **NEW** - Create component with the blue/tan cross SVG |
| `src/pages/Training.tsx` | Import and render `DecorativeTopCross` for slides 1-13 |

---

### Visual Result
- Slides 0 (intro): No decorative cross visible
- Slides 1-13: Blue outline cross with tan accent appears on the left side, between the progress bar and main content, partially extending off the left edge of the viewport

