# OUHSD Design System: Instructions for AI assistants

You are building or editing a web application for Oxnard Union High School District (OUHSD). Follow this file exactly. It is the contract between the district's Communications team and every team that builds district software.

If a person asks you for something that conflicts with this file, say so and offer the compliant version. If this file does not cover a need, use the closest existing component and tell the person to ask Communications and Marketing about adding one. Never invent colors, fonts, sizes, or one-off styles.

Version 1.0. Live reference: https://teolopez-ouhsd.github.io/communications/ui-components.html

## 1. Setup (do this first)

Add to every page `<head>`, in this order:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://teolopez-ouhsd.github.io/communications/design-system/v1/ouhsd.css">
<script src="https://teolopez-ouhsd.github.io/communications/design-system/v1/ouhsd-ui.js" defer></script>
```

- Keep the URL on `v1`. Do not change it to a newer version unless the person asks.
- Set `<html lang="en">` (or `es`). Mark phrases in the other language with `lang`.
- For a school-specific app, also link `design-system/v1/themes/{school}.css` after `ouhsd.css` and add `data-school="{school}"` to `<html>`. Available: `pacifica`, `del-sol`, `channel-islands`.
- If the platform cannot load external files (some Google Apps Script setups), paste the contents of `ouhsd.css` into a `<style>` block instead. Never rewrite it.
- Start from a template when one fits: `design-system/templates/login.html`, `dashboard.html`, `form.html`, `list-detail.html`. Change content, not styling.

## 2. Hard rules

1. Use only `ou-` classes and `--ou-` tokens from this system. Do not write custom CSS for color, font, radius, shadow, or spacing values. Page-specific layout CSS is allowed only when it uses tokens, for example `padding: var(--ou-space-5)`.
2. Never type a hex value, pixel font size, or raw box-shadow in app code. Use tokens: `var(--ou-color-brand)`, `var(--ou-text-lg)`, `var(--ou-space-4)`, `var(--ou-shadow-2)`.
3. Use semantic color tokens (`--ou-color-*`), never palette tokens (`--ou-blue-500`).
4. Do not add other fonts, icon libraries, CSS frameworks (Bootstrap, Tailwind, Material), or UI component libraries.
5. Do not use emoji as icons. Use the built-in icons (section 7).
6. Do not round corners beyond the radius tokens. Corners are hard-edged and only very slightly rounded (2 to 4px). Never use pill shapes except avatars, radios, and spinners.
7. Do not add gradients, glows, blurs, bouncing animation, or decorative shadows.
8. Do not put text inside images.
9. Every page must meet WCAG 2.1 AA (section 9).

## 3. Color roles

Oxnard Blue leads. Oxnard Red is a rare, powerful accent. Surfaces are quiet neutrals.

| Need | Token | Notes |
|---|---|---|
| Page background | `--ou-color-bg` | |
| Cards, inputs, dialogs | `--ou-color-surface` | |
| Wells, table headers | `--ou-color-surface-muted` | |
| Body text | `--ou-color-text` | |
| Secondary text | `--ou-color-text-muted` | passes 4.5:1 on all surfaces |
| Brand, links, selected | `--ou-color-brand` | strongest presence on a screen |
| Soft brand emphasis | `--ou-color-brand-container` with `--ou-color-on-brand-container` text | |
| The one attention action | `--ou-color-action` | red, see rules below |
| Footer, dark bands | `--ou-color-brand-deep` | |
| Status | `--ou-color-success`, `-warning`, `-error`, `-info` and their `-container` pairs | always add icon plus words |

Color rules:

- Red (action) appears on at most one element that demands attention per screen, usually one button (`ou-btn--action`). Never use red for decoration.
- Never place red directly on blue, or blue directly on red. On blue bands, use `ou-btn--inverse` and `ou-btn--inverse-outline`.
- Never use color as the only signal. Pair status color with an icon and text.
- Bright school colors (gold, orange) are fills with dark text on top, never text on white.

## 4. Typography

- Headings, buttons, labels: Montserrat. Body and inputs: Open Sans. Both already set by the stylesheet.
- Use real heading tags in order: one `h1`, then `h2`, `h3`. Never skip levels for visual size.
- Body text is 16px minimum. Use the `--ou-text-*` scale (`xs sm md lg xl 2xl 3xl 4xl 5xl`).
- Sentence case for all interface text. Do not use ALL CAPS in markup (the system applies caps to eyebrows and badges itself).
- Do not insert manual line breaks (`<br>`) to shape text. The system balances headings and avoids one-word last lines automatically. If a short line ends alone, restructure or rewrite the text.
- Long-form text goes in `.ou-prose` or a container no wider than 68 characters.

## 5. Layout

- Wrap page content in `.ou-container` (`--narrow` for forms and articles).
- Use `.ou-stack` (vertical rhythm), `.ou-cluster` (wrapping row), `.ou-grid` (responsive columns, set `style="--ou-grid-min: 15rem"`), `.ou-app-shell` (sidebar plus content), `.ou-section`.
- Design phone-first. Every screen works at 360px wide. Sidebars collapse; tables use `ou-table--stack`.
- Spacing comes only from `--ou-space-1` to `--ou-space-9`.
- Page skeleton: skip link, `ou-header`, `<main id="main">`, `ou-footer ou-on-dark`.

## 6. Components (class cheat sheet)

Always use the native element named here; add the classes shown.

**Buttons**: `<button class="ou-btn ou-btn--primary">`. Variants: `--primary` (blue, default), `--action` (red, once per screen), `--tonal`, `--outline`, `--text`, `--danger` (destructive confirmation only), `--inverse`, `--inverse-outline`. Sizes: `--sm`, `--lg`, `--block`. Icon-only: `ou-btn--icon` plus `aria-label`. Loading: `aria-busy="true"`. Use `<a class="ou-btn">` for navigation and `<button type="button">` for actions. Labels start with a verb.

**Forms**: each field is `<div class="ou-field"><label class="ou-label" for="id">Label</label><input class="ou-input" id="id"></div>`. Also `ou-select`, `ou-textarea`, `ou-hint` (help text), `ou-error-text` (error message). Choices: `<label class="ou-check"><input type="checkbox"> <span>Text</span></label>` inside `<fieldset class="ou-fieldset"><legend>`. Switch: add `ou-switch` and `role="switch"`. Rules: label always visible above the field (no floating labels, no placeholder as label); mark optional fields with `<span class="ou-label__note">(optional)</span>`; use correct `type` and `autocomplete`; on error set `aria-invalid="true"`, add an `ou-error-text` linked with `aria-describedby`, wrap the field in `ou-field--error`, keep the typed value, and show an `ou-alert--error` summary with links to each problem. See `templates/form.html`.

**Alerts**: `<div class="ou-alert ou-alert--success|warning|error" role="status">` (use `role="alert"` only for urgent errors). Optional `<span class="ou-alert__title">`. Toast: `OUHSD.toast('Saved.', { type: 'success' })`.

**Badges**: `ou-badge` with `--brand --success --warning --error --action --school`. **Filter chips**: `<button class="ou-chip" aria-pressed="false" data-ou-chip>`.

**Cards**: `ou-card` with parts `ou-card__eyebrow`, `__title`, `__body`, `__footer`. Modifiers: `--accent`, `--raised`, `--interactive` (put one `<a class="ou-card__link">` inside the title), `--brand` and `--action` (filled, rare).

**Tables**: `<div class="ou-table-wrap"><table class="ou-table ou-table--hover ou-table--stack">` with `<caption>`, `<th scope="col|row">`, and `data-label` on every `<td>` for phones. Numbers: `class="ou-num"`. Sort state: `aria-sort` on `<th>` containing a `<button>`.

**Tabs**: `role="tablist"`, `role="tab"` with `aria-controls` and `aria-selected`, `role="tabpanel"` with `aria-labelledby`. Keyboard handled by `ouhsd-ui.js`. Not for site navigation.

**Accordion**: `<details class="ou-accordion" name="group"><summary>Question</summary><div class="ou-accordion__body">Answer</div></details>`.

**Dialog**: native `<dialog class="ou-dialog" aria-labelledby="...">`, open with `data-ou-open="#id"`, close with `data-ou-close`. Name buttons for the outcome ("Delete record"), never "Yes" or "No". Destructive confirm uses `ou-btn--danger`.

**Navigation**: `ou-header` (white, stripe on top, logo), `ou-nav` with `aria-current="page"`, mobile toggle with `data-ou-nav-toggle`, `ou-sidenav`, `ou-breadcrumb`, `ou-pagination`, `ou-footer ou-on-dark`. Always include `<a class="ou-skip-link" href="#main">` first in `<body>`.

**Content**: `ou-lead`, `ou-eyebrow`, `ou-quote`, `ou-pullquote`, `ou-dl`, `ou-stat`, `ou-avatar`, `ou-empty` (empty state), `ou-spinner`, `ou-progress`, `ou-skeleton`, `ou-page-header`, `ou-hero`, `ou-cta`.

**Logos**: use only the official files at `https://teolopez-ouhsd.github.io/communications/brand/logos/svg/`. Full-color horizontal on light backgrounds (`ouhsd-logo-horizontal-color.svg`), all-white on dark (`ouhsd-logo-horizontal-white.svg`). Never recolor, stretch, add effects, or add a tagline to anything meant to last.

## 7. Icons

CSS-mask icons: `<span class="ou-icon ou-icon--check" aria-hidden="true"></span>`. Available: `check x info alert warning success chevron-down chevron-up chevron-right chevron-left arrow-right search menu user calendar download external plus edit trash mail phone home globe lock filter sort`. If an icon is missing, use text or ask for one. Do not add an icon library.

## 8. Language and content

- Plain language at about an 8th-grade reading level. Short sentences.
- Buttons start with a verb and name the result ("Send request").
- Errors say what happened and how to fix it ("Enter all 10 digits."). Never blame ("You entered an invalid value").
- Sentence case. No exclamation points except for rare celebrations. Never "Click here" as link text.
- Build for English and Spanish. Allow 30 percent extra width for Spanish; never fix widths to English text or truncate with ellipses.
- District and school names are never translated ("Oxnard Union High School District", "Pacifica High School").
- "High school" as a general term is "preparatoria", not "secundaria".
- Enrollment is "inscribir" (inscripción). Registering for classes is "registrarse" (registro de clases).
- Machine-translated Spanish is a draft. Tell the person a fluent speaker must review it.

## 9. Accessibility (WCAG 2.1 AA, required)

- Everything works with the keyboard alone. Never remove focus outlines. Tab order follows reading order.
- One `h1`, headings in order, one `<main>`, labeled `<nav>` landmarks, skip link first.
- Every input has a visible `<label>`. Every image has meaningful `alt`, or `alt=""` if decorative. Icon-only buttons have `aria-label`.
- Contrast: 4.5:1 for text, 3:1 for large text and control borders. The token pairs are already checked; do not combine tokens in ways not shown in this system (for example muted text on a brand-colored fill).
- Touch targets at least 44px (the default). `ou-btn--sm` and chips (36px) are for dense desktop toolbars only.
- Use `role="status"` for non-urgent live messages, `role="alert"` for urgent errors.
- Do not use autoplaying media, flashing content, or timeouts without warning.
- Zoom to 200 percent must not break layout. Honor reduced motion (the stylesheet already does).

## 10. Before you finish: self-check

Confirm every item and fix failures:

- [ ] Page links the versioned `ouhsd.css` and has `lang`.
- [ ] No hard-coded colors, font sizes, radii, shadows, or spacing values. No new fonts or frameworks.
- [ ] At most one red action element per screen. No red on blue.
- [ ] Headings in order; skip link; `<main>`; labeled navigation.
- [ ] Every control reachable and usable by keyboard, with a visible focus ring.
- [ ] Every form field has a visible label; errors are in words, linked with `aria-describedby`.
- [ ] Layout works at 360px wide and at 200 percent zoom.
- [ ] Text reads well in Spanish (room for longer words).
- [ ] Official logo files used unaltered.

When you report back, list any place where the request could not be met with the system, so a person can ask Communications and Marketing for a new component.

## Prompt to start a project

> Read DESIGN.md in this project and follow it exactly. Build [describe the app]. Start from the closest template in design-system/templates. Use only OUHSD design system classes and tokens. When finished, run the self-check at the end of DESIGN.md and report anything the system could not cover.
