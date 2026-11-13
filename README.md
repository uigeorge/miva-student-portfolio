# Ubong George · Student Portfolio

A responsive multi-page academic portfolio for the Miva Open University web development assessment. It uses plain HTML, CSS, and JavaScript and can be published as a GitHub Pages site.

## Pages

- `index.html`: welcome, profile, selected projects, and a silent project video.
- `about.html`: education, career goal, skills, and interests.
- `projects.html`: three project examples with screenshots and live/source links.
- `planner.html`: add, complete, and delete study tasks; data stays in local browser storage.
- `contact.html`: JavaScript required-field, email, and digits-only phone validation; valid messages open as a draft to the Miva email address.

## Run locally

Open `index.html` directly, or serve this folder with any static file server. The site has no build step or external runtime dependencies.

## Publish on GitHub Pages

Create a repository containing this folder's contents and push the `main` branch. The included `.github/workflows/pages.yml` deploys the repository root to GitHub Pages. In repository **Settings → Pages**, select **GitHub Actions** as the build and deployment source. The site will be available at `https://<account>.github.io/<repository>/`.

## Notes

The contact form validates locally and launches the visitor's configured email app. GitHub Pages is static hosting, so direct message delivery would require a separate form service or backend. Planner entries are stored only in that browser and device.
