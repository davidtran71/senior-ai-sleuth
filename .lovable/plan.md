
## Plan: Adjust Certificate Download Styling

**Goal**: Remove the top padding (10px) from the "AI FORENSICS TASKFORCE TRAINING" banner **only** in the downloaded PNG image, without affecting the on-screen version.

### Approach

Use a "dynamic style swap" inside the `handleDownloadBadge` function:

1. Before calling `html2canvas`, find the banner `<span>` element and temporarily change its `py-[10px]` padding to only bottom padding (`pb-[10px] pt-0`).
2. Run `html2canvas` to capture the modified version.
3. Restore the original styles immediately after capture.

### Technical Details

In `src/pages/Certificate.tsx`, modify the `handleDownloadBadge` function to:
- Query the banner element inside `certificateRef` (using a data attribute or class selector).
- Add a `data-banner` attribute to the "AI FORENSICS TASKFORCE TRAINING" `<span>` for easy targeting.
- Before capture: set `paddingTop = '0'` on that element.
- After capture (in a `finally` block): restore `paddingTop = '10px'`.

This ensures the on-screen certificate remains visually unchanged while the downloaded image gets the adjusted spacing.
