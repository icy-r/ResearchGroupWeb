# Kaduna.lk research website

A standalone, responsive research showcase for **Kaduna.lk — R26-SE-026**, built with plain HTML, CSS, and JavaScript. It has no npm dependencies or build step.

## Open locally

Clone the repository and start the local preview with Node.js installed:

```powershell
git clone https://github.com/samudithTharindaka/ResearchGroupWeb.git
cd ResearchGroupWeb
npm start
```

Open **http://127.0.0.1:4173**. To use another port in PowerShell, set `$env:PORT = '4174'` before starting. The server binds only to this computer and serves the website's public files. Stop it with Ctrl+C.

You can also open `index.html` directly. All images, fonts, styles, scripts, and documents are local. The enquiry composer has a manual-copy fallback when clipboard access is unavailable.

## Repository structure

```text
index.html       Page structure and static content
styles.css       Visual design and responsive layouts
content.js       Editable research, timeline, document, and team data
script.js        Navigation, research tabs, filters, dialogs, and enquiry composer
assets/          Images, portraits, local font, and font license
documents/       Four proposal PDFs and two presentation PDFs
scripts/serve.mjs Local preview server
```

The website includes all 13 deadlines from the 2026 research project schedule, document search, presentation downloads, team profiles, and a contact draft form.

## Update the content

Most changing content is in **`content.js`**:

- `components`: component descriptions, methods, researchers, and proposal links.
- `research`: the six research tabs.
- `milestones`: all 13 deadlines from the supplied 2026 regular batch schedule. Update display dates and ISO `startDate` / `endDate` together. Date ranges are inclusive, and “Due today” / “Upcoming” are calculated in Asia/Colombo. These are schedule labels, not completion claims. Unknown mark allocations remain `null`.
- `documents`: report titles, authors, and file paths. Add the file under `documents/`, then replace `file: null` with its path.
- `presentations`: slide links, dates, and slide counts.
- `team`: names, student IDs, local portraits, and emails.
- `contactEmail`: set to the confirmed team email. Until then, the form copies an enquiry for later use. Once set, it opens a mail draft for the visitor to review and send. It never submits to a server or stores visitor information.

The header, overview, supervisors, contact location, and footer are in **`index.html`**. Design tokens and responsive layouts are in **`styles.css`**. Interactions are in **`script.js`**. Resource URLs should be local paths or HTTPS links; do not add confidential documents.

## Content that still needs confirmation

- Team and supervisor email addresses; a general contact email and optional phone number.
- Assessment mark allocations and actual completion or submission status. The 13 deadline dates now come from the supplied 2026 RP project timeline. Dates shown on document cards describe the materials rather than submission timestamps.
- Project charter, completed checklists, research paper, approved final reports, poster, Progress Presentation II, and final presentation.
- Final evaluation results, supervisor portraits, optional demo video, and any app-store links.

Pending materials are marked as coming soon. Final reports should be linked after they are reviewed and ready for sharing.

## Source materials and asset credits

- Timeline: the user-supplied image titled “2026 Regular Batch - Timeline of the RP Project”; all 13 deadlines are transcribed, including multi-day windows.
- Content: the team's four individual proposal PDFs and proposal / Progress I presentations, with component ownership and supervisor details from the main research project's documentation.
- The four proposal downloads are exact copies of the supplied PDFs.
- Presentation downloads are PDF exports of the supplied PowerPoint files. Embedded video and slide animations do not play in a PDF. The original decks are maintained separately by the research team.
- Team portraits: embedded artwork from slide 2 of the supplied Progress I presentation; associated with names by their positions on that slide.
- Logo: the research team's existing Kaduna.lk logo.
- Road photograph: [Venti Views on Unsplash](https://unsplash.com/photos/NliTYm_jD5o). Decorative road imagery; it is not identified as a Sri Lankan road.
- Manrope: [Google Fonts / Manrope](https://fonts.google.com/specimen/Manrope), SIL Open Font License; license included in `assets/`.
- Structural references: [Focus](https://www.thefocusapp.site/), [Coral Revive](https://coral-revive-research-website.vercel.app/), and the supplied Website.pdf. Copy and design are specific to Kaduna.lk.

Hero status cards and the platform flow are conceptual illustrations, not live telemetry or measured research outcomes. This is a research website, not an emergency dispatch service.

## Checks and packaging

```powershell
npm run check
```

Serve or upload `index.html`, `styles.css`, `content.js`, `script.js`, `assets/`, and `documents/` together. Hosting can use the repository root as a static website with no build command. Repository storage and website deployment are separate steps; no deployment is configured here.
