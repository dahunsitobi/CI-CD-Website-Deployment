# Oluwatobi Dahunsi — Portfolio

A single-page portfolio site with an automated GitHub Actions deployment pipeline.

## Files

```
index.html                        Page structure and content
style.css                         Design system (colours, type, layout, motion)
script.js                         Nav behaviour, scroll reveals, count-up stats, contact form
.github/workflows/deploy.yml      CI/CD: deploys to GitHub Pages on every push to main
```

## Upload to GitHub

1. Push these files to the root of your `CI-CD-Website-Deployment` repository (or a repo of your choice),
   keeping the `.github/workflows/deploy.yml` path exactly as-is.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab). The site will build and deploy
   automatically — no manual build step required.

## Editing content later

- Text and section content: `index.html`
- Colours, fonts, spacing: the `:root` variables at the top of `style.css`
- Behaviour (typing effect, stat count-up, form handling): `script.js`

## Contact form note

The form currently opens the visitor's email client with a pre-filled message addressed to
`dahunsitobi@gmail.com` — this works with zero backend on GitHub Pages. If you'd rather collect
submissions directly (e.g. via Formspree or a similar service), swap the `fetch`/`mailto` logic in the
`contactForm` submit handler in `script.js` for that service's endpoint.
