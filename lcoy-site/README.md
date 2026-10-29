# LCOY Rwanda 2026 — standalone site

The public site for LCOY Rwanda 2026, served on its own domain from Namecheap
cPanel hosting. Static HTML, no build step.

Everything in this folder is published. Everything outside it is not — the
concept notes, the logo archives and the main WFF site stay in the repo but
never reach the LCOY domain.

## Layout

```
index.html          home page
reports.html        field reports from Climate Month, newest first
assets/site.css     shared styles for both pages
assets/site.js      menu, live status and date-aware programme, report filter
images/             logos and photography used by the pages
images/partners/    co-organizing partner logos
images/reports/     photos from the field reports (resized, metadata removed)
.htaccess           Apache config: security headers, caching, HTTPS redirect
```

The live status in the hero and the done / happening now labels on the
programme are worked out in the browser from today's date in Kigali time,
so they update on their own without a redeploy.

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
| `FTP_USERNAME` | full FTP username, e.g. `LCOY@kigaliclimateactionweek.org`     |
| `FTP_PASSWORD` | that account's password                           |

The server is a mirror of this folder, so never edit files through cPanel
File Manager — a later deploy will overwrite them.

## Troubleshooting deploys

`530 Login authentication failed` — the FTP server rejected the credentials.
The username must be the **full** address (`LCOY@kigaliclimateactionweek.org`),
not just the local part. Check also that the three values sit under
*Repository secrets* rather than *Environment secrets*: environment secrets
resolve to empty here, because this job declares no environment.

If a deploy succeeds but the live site doesn't change, the FTP account is
rooted somewhere other than the domain's document root. In cPanel > FTP
Accounts its Path must be exactly `/home/<cpanel-user>/public_html`.

The host is Pure-FTPd advertising `AUTH TLS` on port 21, so `protocol: ftps`
(explicit TLS) is correct. Port 990 is closed — do not switch to
`ftps-legacy`.

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
