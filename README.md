# OUHSD Brand Toolkit

Self-contained tools and reference pages for keeping Oxnard Union High School District materials consistent:

- **`brand-guidelines.html`** — logo variations and usage, clear space, "how not to alter the logo," color palette (with copy-to-clipboard hex/RGB/CMYK), typography, accessibility/contrast guidance, the tagline, AI-prompting guidance, and a built-in "Ask a branding question" helper.
- **`email-signature-generator.html`** — staff enter their name, title, department (dropdown, division-aware), phone, and email, optionally upload a photo, and copy a ready-to-paste Gmail signature. Photos are embedded as data URIs (the same mechanism Google Docs uses), so they won't break like a typical copy-pasted image link would.
- **`ui-components.html`** — the shared UI/style-guide reference: color roles, type scale, headings, lists, tables, quotes, buttons, text fields, cards, chips, tabs, and accordions, all built from the same design tokens as the rest of the toolkit. Meant for anyone (or any AI tool) building a new OUHSD page, so it starts from these components instead of one-off styling.
- **`website-survey.html`** — a landing page for the district website redesign survey, with an English/Spanish language toggle and separate calls to action for students, parents/guardians, and staff, each linking out to its own Google Form (in the matching language).
- **`website-migration-project.html`** — the one-stop-shop hub for the FinalSite-to-Wix migration project: overview, why Wix, project goals, DOJ/WCAG 2.1 AA accessibility compliance, a link to the live project timeline, and a link to the survey.
- **`index.html`** — a landing page linking to all of the above, plus a roadmap of what's coming next (school site branding, website content standards, social media guidelines, templates).

Every file is a single, self-contained HTML page — no build step, no server, no external backend. They only reach out to the internet for Google Fonts (Montserrat/Open Sans) and, on `website-survey.html` and `website-migration-project.html`, the linked Google Forms and project timeline page; everything else (logos, colors, code) is baked into the file itself.

All pages share the same design system: Material Design–style color roles, a sharper-but-still-rounded shape scale, subtle elevation shadows on cards, and ripple/hover feedback on buttons and chips — built from OUHSD's red and blue.

## Hosting on GitHub Pages

1. Create a new GitHub repository (public, or private if your org's GitHub plan supports Pages on private repos).
2. Upload these files (`index.html`, `brand-guidelines.html`, `email-signature-generator.html`, `ui-components.html`, `website-survey.html`, `website-migration-project.html`) to the root of the repository — via the GitHub web UI ("Add file" → "Upload files") or `git push`.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set **Branch** to `main` (or whichever branch you uploaded to) and folder to `/ (root)`, then **Save**.
6. GitHub will publish the site at a URL like `https://<your-username-or-org>.github.io/<repo-name>/` within a minute or two. `index.html` becomes the homepage automatically.

To use a custom domain (e.g. `brand.oxnardunion.org`), add a `CNAME` file with that domain in the repo root and point a DNS `CNAME` record at `<your-username-or-org>.github.io` — GitHub's Pages docs walk through the exact DNS records.

## Updating content later

Because everything is self-contained in the HTML files, updates (new logo files, palette tweaks, department list changes, copy edits) mean editing and re-uploading the relevant `.html` file — there's no database or CMS involved.
