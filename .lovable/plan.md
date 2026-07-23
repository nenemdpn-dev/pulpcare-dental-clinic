
# Pulpcare — Image, Copy & Favicon Correction Pass

Goal: fix every wrong or off-brand image the client flagged, apply the copy corrections captured from his voice note and Telegram messages, and replace the Lovable favicon with the Pulpcare mark — leaving the site export-ready for cPanel.

---

## 1. Image swaps

Approach: for the photos the client shot at the clinic, use them as-is. For the shots he sent as Google/Telegram screenshots, crop out the phone status bar, browser chrome and Google Lens icon in a Python/PIL pass so we ship a clean image — no AI generation, no extra credits.

New assets will be written into `src/assets/` (and their old files removed), then referenced from the pages below.

**Real Pulpcare / African patient photos (use as-is):**

| New asset | Source upload | Used on |
| --- | --- | --- |
| `dr-chris-scan.jpg` | photo_2026-07-23_18-35-48 (Dr. Chris intraoral scan) | About → "Meet the Team" (replaces `dentist-patient.jpg`) |
| `dr-chris-procedure.jpg` | photo_2026-07-23_18-35-58 (Dr. Chris in blue scrubs) | General Dentistry service page + Home "Meet Dr. Chris" area |
| `dr-chris-office.jpg` | photo_2026-07-23_18-36-11 (Dr. Chris at chair with X-ray) | About hero background (replaces `clinic-reception.jpg`) + Home hero |
| `whitening-patient.jpg` | photo_2026-07-23_18-36-04 (in-clinic laser whitening) | Teeth Whitening service page |
| `veneers-result.jpg` | photo_2026-07-23_18-35-54 (real veneers close-up) | Cosmetic Dentistry service page (primary), Home "smile" slot |
| `braces-patient.jpg` | photo_2026-07-23_18-36-40 (pink braces close-up) | Cosmetic Dentistry (orthodontics/aligners block) |
| `emergency-pain.jpg` | photo_2026-07-23_18-35-37 (Black man holding jaw) | Emergency Dental Care service page |

**Screenshot references — cropped to clean images (no generation):**

| New asset | Source upload | Used on |
| --- | --- | --- |
| `paediatric-care.jpg` | photo_2026-07-23_18-35-40 (crop to the top child-dentist tile) | Paediatric Dentistry service page |
| `aligners-vs-braces.jpg` | photo_2026-07-23_18-35-52 (crop off Google Lens badge) | Cosmetic Dentistry — "clear aligners vs braces" block |
| `clear-aligners.jpg` | photo_2026-07-23_18-36-21 (crop off iOS status bar + Lens icon) | Cosmetic Dentistry sidebar / clear-aligner mention |
| `tooth-extraction.jpg` | photo_2026-07-23_18-36-18 (crop to main extraction photo only) | Tooth Extraction service page |
| `dental-cleaning.jpg` | photo_2026-07-23_18-36-29 (crop off Lens icon) | Dental Cleaning service page |
| `root-canal.jpg` | photo_2026-07-23_18-36-32 (crop to circular illustration) | Root Canal Treatment service page |

**Old assets removed after references are gone:** `dentist-patient.jpg`, `patient-smile.jpg`, `dental-procedure.jpg` (and any others that end up with zero imports after the swap). `clinic-reception.jpg`, `clinic-waiting-room.jpg`, `clinic-treatment.jpg`, `hero-dental.jpg`, `dental-pattern.jpg` stay — they're neutral interior/atmosphere shots, not faces.

**ServiceDetail wiring change:** the current 4-key `imageMap` (`dentist / procedure / treatment / smile`) is too coarse for the client's per-service corrections. Replace it with a per-service image, so each slug gets the exact photo he requested:

```text
general-dentistry     → dr-chris-procedure.jpg
dental-cleaning       → dental-cleaning.jpg
tooth-extraction      → tooth-extraction.jpg
teeth-whitening       → whitening-patient.jpg
paediatric-dentistry  → paediatric-care.jpg
root-canal            → root-canal.jpg
cosmetic-dentistry    → veneers-result.jpg   (+ aligners-vs-braces.jpg / braces-patient.jpg in the body)
emergency-dental-care → emergency-pain.jpg
```

Cosmetic Dentistry page also gets a small in-body gallery (2–3 images side by side) as the client asked in Telegram — veneers + aligners-vs-braces + braces.

---

## 2. Copy & content corrections (from voice note + screenshots)

- **About page — expertise sentence:** replace "expertise in veneers, orthodontics, and Invisalign treatments" with "expertise in root canal treatments, crown and bridges, orthodontics, clear aligners, and other advanced dental treatments."
- **About page — team highlights list:** change "Specialists in Veneers, Orthodontics & Invisalign" → "Specialists in Root Canal, Endodontics, Veneers, Orthodontics & Clear Aligners".
- **Site-wide branding fix:** every remaining "Invisalign" → "clear aligner" / "clear aligners" (Services list, ServiceDetail cosmetic-dentistry copy, Header service menu, Index page).
- **Hero location:** "Lagos" → "Lagos, Nigeria" on Home hero H1 and About hero subhead.
- **Working hours (Contact page):** update to
  - Monday – Friday: 8:00 AM – 7:00 PM
  - Saturday: 9:00 AM – 6:00 PM
  - Sunday: 12:00 PM – 4:00 PM
- **WhatsApp link check:** confirm the floating WhatsApp button and Contact page link both point to `https://wa.me/2348139994755` (they already do — will re-verify in build).

No layout/component structure changes beyond the cosmetic-dentistry mini-gallery.

---

## 3. Favicon

Replace the Lovable favicon with the Pulpcare mark using the existing `src/assets/pulpcare-logo.png` (the fresh `pulpcare-dental-logo.png` upload came through as an empty file, so we reuse the logo already in the repo — same brand mark).

Steps:
1. `cp src/assets/pulpcare-logo.png public/favicon.png`
2. `rm public/favicon.ico`
3. Update `index.html` — replace `<link rel="icon" href="/favicon.ico" type="image/x-icon" />` with `<link rel="icon" href="/favicon.png" type="image/png" />`.

While in `index.html`, also set a real `<title>` and matching OG/Twitter titles: **"Pulpcare Dental Clinic — Trusted Dental Care in Surulere, Lagos"** (description stays as-is).

---

## Technical notes

- Cropping is done once via a short Python + PIL script in `/tmp/` that reads each screenshot, crops the pixel ranges listed above, and writes the JPG straight into `src/assets/`. No new npm deps.
- After swaps, run `bun run build` to confirm no dead imports remain, then delete any now-orphaned images from `src/assets/`.
- No routing, data model, or component API changes — this is a content/asset pass only, safe to export as a static build for cPanel.

---

## Out of scope

- No AI image generation (per your credit constraint).
- No new pages, no design/theme changes, no backend work.
- The empty `pulpcare-dental-logo.png` upload is ignored — say the word if you want to re-upload a cleaner logo file and I'll swap the favicon to that version in a follow-up.
