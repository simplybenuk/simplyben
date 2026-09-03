# CV portfolio change

Status: READY FOR HUMAN TESTING

## Objective

Add a fast, accessible CV and portfolio at `/cv/` without changing the
point-and-click homepage or the existing game chapters. Keep the downloadable
CV files and the public page aligned on the role history and project status.

## Confirmed decisions

- `/cv/` is the canonical route.
- `/portfolio/` redirects to `/cv/` and is not indexed as a second page.
- Download links use `../public/cv/` because the live GitHub Pages site uses
  its legacy repository-root source; this resolves to the files' published
  URLs under `/public/cv/`.
- The page is standalone HTML and CSS so it adds no runtime dependency or
  client-side data flow to the game.
- The Vite build explicitly includes the existing homepage, chapter pages,
  legacy Iris page, CV page, and portfolio redirect.
- Product Mole is described as live and in use at Kahootz as part of AI and
  product work.
- Kahootz copy stays at public-safe product-leadership level. Internal product
  details from the source CV draft are not included. The role also notes the
  wider remit across support, security, ISMS management, ISO 27001, Cyber
  Essentials, and Senior Leadership Team membership.
- NHS England is listed as Senior Product Manager from October 2016 to
  February 2023.
- FutureNHS is presented as NHS Futures (formerly FutureNHS), with a link to
  the current NHS Futures site.
- Wolds Record focuses on the live app and WCCRM, described as a solo-built
  SaaS product built with AI.
- BWH Agent Toolkit and BenOS are included as public projects with GitHub
  links and clear status labels.
- SourList has been removed from the page and downloads because it is no
  longer live. This change does not delete the external service or repository.

## Assumptions to review

- The supplied WCCRM URL currently returns 404 to an unauthenticated check.
  Confirm that the repository is public and the URL is correct before final
  publication.
- The Wolds Record, BWH Agent Toolkit, BenOS, and The Guide descriptions are
  intentionally factual and restrained, based on the supplied links and
  public repository metadata.
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
  public toolkit/project, experiment, and interactive work.
- The existing homepage and chapter routes remain available in the build.
- `npm run build` passes before the PR is opened.

## Validation evidence

- `npm run build` passes. The existing legacy `iris.html` warning about a
  missing `style.css` remains unchanged and is outside this change.
- The point-and-click homepage loads, five avatar clicks reach `/chapter1/`,
  and the existing chapter pages are included in `dist/`.
- Browser checks pass at 1440px and 390px widths. The CV has content at both
  sizes, the mobile document width is 390px with no horizontal overflow, and
  the updated project/status content is present.
- Browser axe check reports zero violations on `/cv/`, and the first Tab stop
  is the visible skip link with a 3px outline.
- `/portfolio/` resolves to `/cv/`, and the canonical link points to
  `https://simplyben.co.uk/cv/`.
- The homepage, CV, portfolio alias, chapter routes, PDF, and DOCX all return
  HTTP 200 from the local preview. Browser downloads match the served final
  PDF and DOCX; the PDF has three pages and the DOCX passes an archive
  integrity check.
- The DOCX render was inspected page by page. Its accessibility audit and
  table geometry audit both report zero findings.

## Agent review

Verdict: READY FOR HUMAN TESTING

- No blocking or should-fix findings remain within this change.
- Human output testing should confirm the WCCRM repository URL and visibility,
  the short project descriptions, and the role dates, titles, and quantified
  outcomes against the working CV.
- After successful human output testing, hand the accepted change to the
  archive step. If content review finds changes, return the work to
  development.
