# LCOY Rwanda 2026 — standalone site

The public site for LCOY Rwanda 2026, served on its own domain from Namecheap
cPanel hosting. Static HTML, no build step.

Everything in this folder is published. Everything outside it is not — the
concept notes, the logo archives and the main WFF site stay in the repo but
never reach the LCOY domain.

## Layout

```
index.html          the whole page — markup, CSS and JS in one file
images/             logos and photography used by the page
images/partners/    co-organizing partner logos
.htaccess           Apache config: security headers, caching, HTTPS redirect
```

## Deploying

Push anything under `lcoy-site/` to `main` and
`.github/workflows/deploy-lcoy.yml` mirrors this folder into `public_html`
over FTPS. Commits that touch only the rest of the repo do not trigger a
deploy.

The workflow needs three repository secrets
(Settings > Secrets and variables > Actions):

| Secret         | Value                                             |
| -------------- | ------------------------------------------------- |
| `FTP_SERVER`   | cPanel FTP host, e.g. `serverNNN.web-hosting.com` |
| `FTP_USERNAME` | full FTP username, e.g. `lcoy@yourdomain.org`     |
| `FTP_PASSWORD` | that account's password                           |

The server is a mirror of this folder, so never edit files through cPanel
File Manager — a later deploy will overwrite them.

## HTTPS

The HTTPS redirect in `.htaccess` ships commented out. Enable it only once
cPanel > SSL/TLS Status shows an active certificate — redirecting before then
makes the site unreachable.

## Relationship to `lcoy-2026.html`

The page at the repo root is the LCOY page *within* the main WFF site. This
folder is the standalone version for its own domain: nav links point at
on-page sections instead of the main site, and it carries the co-organizing
partners and call-for-applications sections. The two have diverged — edits to
one do not reach the other.
