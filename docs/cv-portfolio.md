# CV portfolio change

Status: READY FOR HUMAN TESTING

## Objective

Add a fast, accessible CV and portfolio at `/cv/` without changing the
point-and-click homepage or the existing game chapters. Keep the downloadable
CV files and the public page aligned on the role history and project status.

## Confirmed decisions

- `/cv/` is the canonical route.
- `/portfolio/` redirects to `/cv/` and is not indexed as a second page.
- The page is standalone HTML and CSS so it adds no runtime dependency or
  client-side data flow to the game.
- The Vite build explicitly includes the existing homepage, chapter pages,
  legacy Iris page, CV page, and portfolio redirect.
- Product Mole is described as Kahootz AI/product work that is building, in
  progress, and not shipped.
- Kahootz copy stays at public-safe product-leadership level. Internal product
  details from the source CV draft are not included.
- NHS England is listed as Senior Product Manager from October 2016 to
  February 2023.

## Assumptions to review

- A direct public SourList repository URL was not present in the current public
  GitHub profile, so the page links to the profile's repository list and calls
  that out in the review note.
- The short Wolds Record and The Guide descriptions are intentionally factual
  and restrained, based on the public repository names and metadata. Confirm
  the preferred wording before final publication.
- The downloadable CV uses the supplied working draft as its factual source,
  with the same public-safe Kahootz wording and the selected work section
  added.
- Role dates, titles, and quantified outcomes are flagged for a final
  comparison with the supplied working draft. No new metrics or achievements
  were invented.

## Acceptance criteria

- The page works at `/cv/` on mobile and desktop, with visible keyboard focus,
  semantic headings, accessible download links, and no required JavaScript.
- PDF and DOCX downloads are present at the canonical route.
- Public project links and status labels are visible and distinguish live,
  building, repository, experiment, and interactive work.
- The existing homepage and chapter routes remain available in the build.
- `npm run build` passes before the PR is opened.

## Validation evidence

- `npm run build` passes. The existing legacy `iris.html` warning about a
  missing `style.css` remains unchanged and is outside this change.
- The point-and-click homepage loads, the avatar interaction reaches
  `/chapter1/`, and the existing chapter pages are included in `dist/`.
- Browser checks pass at 1440px and 390px widths. The CV has content at both
  sizes and no horizontal overflow.
- Browser axe check reports zero violations on `/cv/`.
- `/portfolio/` resolves to `/cv/`, and the canonical link points to
  `https://simplyben.co.uk/cv/`.
- The served PDF returns HTTP 200 and renders as a three-page PDF. The served
  DOCX returns HTTP 200 and passes an archive integrity check.
- The DOCX render was inspected page by page. Its accessibility audit and
  table geometry audit both report zero findings.
