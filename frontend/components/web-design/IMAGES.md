# Reka Website Landing Page — Image Inventory

This is the image placeholder inventory for `/website`. Everything in this page is one of:

- **Inline SVG** (no replacement needed)
- **Lucide React icon** (no replacement needed)
- **Unsplash placeholder** (replace with the real asset before launch)

Swap each Unsplash URL in the file listed below for your own hosted image. Recommended format: WebP, ~800px wide, lazy-loaded (the `<img>` tags already set `loading="lazy"`).

---

## 1. Hero — `components/web-design/Hero.tsx`

- Hero illustration: **inline SVG** via `HeroIllustration.tsx` (laptop + bar chart). No replacement needed; edit the SVG directly if you want brand-specific art.
- Avatar dots in trust-strip: gradient circles, no images.

## 2. Problem — `components/web-design/Problem.tsx`

- Uses Lucide icons: `Turtle`, `Smartphone`, `TrendingDown`. No images.

## 3. Solution — `components/web-design/Solution.tsx`

- Supporting visual: **inline SVG** inside the same file (`SolutionIllustration`). Edit directly or swap for a real screenshot.
- Benefit icons: Lucide `Check`.

## 4. Services — `components/web-design/Services.tsx`

- All Lucide icons: `Compass`, `Palette`, `Code2`, `Smartphone`, `Search`, `LifeBuoy`. No images.

## 5. Process — `components/web-design/Process.tsx`

- All Lucide icons: `Phone`, `FileText`, `Brush`, `Rocket`. No images.

## 6. Portfolio — `components/web-design/Portfolio.tsx` ⚠️ **Unsplash placeholders — replace before launch**

| # | Client | Current Unsplash URL | What to replace with |
|---|---|---|---|
| 1 | Kopi Mak Long | `https://images.unsplash.com/photo-1559925393-8be0ec4767c8` | Real screenshot of Kopi Mak Long website |
| 2 | Klinik Sihat Sejahtera | `https://images.unsplash.com/photo-1576091160550-2173dba999ef` | Screenshot of the clinic site |
| 3 | Butik Aisyah | `https://images.unsplash.com/photo-1490481651871-ab68de25d43d` | Screenshot of the e-commerce site |
| 4 | Akademi Hafiz | `https://images.unsplash.com/photo-1523240795612-9a054b0db644` | Screenshot of the academy site |
| 5 | Setia Properties | `https://images.unsplash.com/photo-1560518883-ce09059eeffa` | Screenshot of the property site |
| 6 | Pak Abu Catering | `https://images.unsplash.com/photo-1555244162-803834f70033` | Screenshot of the catering site |

**Also**: Client names, challenges, and results are placeholders — edit the `projects` array in `Portfolio.tsx` with real case-study copy.

## 7. Testimonials — `components/web-design/Testimonials.tsx` ⚠️ **Unsplash placeholders — replace before launch**

Avatar images (60×60 rendered):

| # | Name | Current Unsplash URL | What to replace with |
|---|---|---|---|
| 1 | Aina Rashid | `https://images.unsplash.com/photo-1544005313-94ddf0286df2` | Real photo of the client |
| 2 | Hafiz Zulkifli | `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d` | Real photo of the client |
| 3 | Dr. Siti Khadijah | `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2` | Real photo of the client |

**Also**: Quotes, names, roles are all placeholders. Client-logo strip is currently **text-only** (styled pills). Replace the `logos` array with real `<img>` logo assets (ideally greyscale SVG/WebP) when available — the wrapper already applies `grayscale` and hover-color.

## 8. Pricing — `components/web-design/Pricing.tsx`

- Lucide `Check`, `Sparkles`. No images.

## 9. FAQ — `components/web-design/FAQ.tsx`

- Lucide `Plus`. No images.

## 10. Final CTA — `components/web-design/FinalCTA.tsx`

- No images. Pure gradient background + Lucide `MessageCircle` + `Send` in form.

## Floating WhatsApp Button — `components/web-design/WhatsAppFloat.tsx`

- Lucide `MessageCircle`. No image. **Update `WA_NUMBER` constant** with the live number if different from `601110019843`.

---

## Before Launch Checklist

- [ ] Replace all 6 Unsplash portfolio thumbnails with real project screenshots (WebP, ~800px wide)
- [ ] Replace all 3 Unsplash testimonial avatars with real client photos (160×160 minimum)
- [ ] Replace text-pill client logos in `Testimonials.tsx` with actual SVG/WebP logos
- [ ] Edit `projects` array in `Portfolio.tsx` with real case-study copy (client name, industry, challenge, result)
- [ ] Edit `testimonials` array in `Testimonials.tsx` with real quotes + names
- [ ] Confirm `WA_NUMBER` in `WhatsAppFloat.tsx` and `FinalCTA.tsx`
- [ ] Add Google Analytics: replace the `(window as any).gtag(...)` calls are already in place; just install `gtag.js` in the root layout with your GA4 measurement ID
- [ ] Optional: flip `metadata.robots.index` to `true` in `app/(site)/website/layout.tsx` if you want Google to index this funnel page
