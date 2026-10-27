# OUHSD Design System changelog

Versions follow major.minor.patch. Apps link to a major version folder (`v1`), so a major change never reaches a live app until its team moves.

## 1.0.0

First release. Rebuilt from the earlier UI Components and Style Guide page.

Changed from the earlier guide:
- Oxnard Blue is now the default filled button and the strongest presence. Oxnard Red is `ou-btn--action`, for one attention action per screen.
- Corners are hard-edged and only very slightly rounded (2 to 4px). The earlier scale reached 12px.
- Floating labels replaced by persistent labels above fields.
- Tabs, accordion, and chips rebuilt on accessible markup (roles, `aria-*`, native `details`, keyboard support).
- Table header is a quiet neutral with a blue rule instead of a solid red bar.
- Class prefix changed from `m-` to `ou-`; all values moved to `--ou-*` tokens.
- Header is white with a 4px stripe so the full-color logo always sits on a light background.

Added:
- `tokens.css` and generated `tokens.json` (spacing, radius, shadow, motion, z-index, layout tokens)
- `components.css`: buttons, forms, checks, switch, alerts, toast, progress, spinner, skeleton, empty state, header, nav, sidenav, breadcrumb, pagination, tabs, footer, cards, badges, chips, tables (sortable, stacked), accordion, dialog, quote, definition list, stat, avatar, page header, hero, call to action
- 27 built-in icons (CSS masks)
- `ouhsd-ui.js` (tabs keyboard support, dialog helpers, toast, mobile menu, chips, copy)
- School themes: Pacifica, Del Sol, Channel Islands, plus a template
- Page templates: sign in, dashboard, form, list and detail
- `DESIGN.md` instructions for AI assistants
- Team guide page

Planned for 1.1: dropdown menu, combobox, date picker, stepper, tooltip, selectable data table, optional dark mode.
