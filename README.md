# neelsck.github.io

Personal site: one command palette that holds everything. Plain HTML, CSS and JavaScript, no build step.

## Files

| File | What it is |
| --- | --- |
| `content.js` | All the words, stats and links. **Most edits happen here.** |
| `index.html` | Page shell: masthead, palette card, no-JavaScript fallback |
| `styles.css` | Colors (light and dark), type, layout, phone layout |
| `palette.js` | Search, keyboard and hover navigation, previews, actions, `#links` |
| `assets/` | Images and files (screenshots, photo, resume) |
| `404.html` | Page shown for unknown URLs |

## Editing content

Open `content.js`. Each project, job, paper or action is one object in `items`. To add one, copy an existing object and change the fields. The comment at the top of the file explains each field.

- **Image:** put the file in `assets/` and set `image: { src: "assets/healthbridge.png", alt: "Healthbridge report editor" }`.
- **Links:** `links: [{ label: "Code", url: "https://github.com/..." }]`. Links without a `url` are not shown.
- **Order:** items show in the order they appear in the file, grouped by `group`. Groups follow the `groups` list.
- **Direct links:** every item can be linked with its `id`, e.g. `https://neelsck.github.io/#healthbridge`.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push to `main`.
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site goes live at `https://neelsck.github.io` within a minute or two. Every later push redeploys it.

## Custom domain (optional)

1. Buy a domain (Cloudflare Registrar, Porkbun, Namecheap and similar charge about $10–15/year for a `.com`).
2. At the registrar, add DNS records pointing to GitHub Pages:
   - For the bare domain (`neelkansara.com`): four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - For `www`: a `CNAME` record to `neelsck.github.io`.
   Check GitHub's "Managing a custom domain for your GitHub Pages site" docs for the current values.
3. In **Settings → Pages → Custom domain**, enter the domain and save. GitHub adds a `CNAME` file to the repo.
4. Once the DNS check passes, tick **Enforce HTTPS**.

## Keyboard

`⌘K` / `Ctrl K` or `/` focuses search · `↑ ↓` move · `↵` opens the item's main link or runs its action · `Esc` clears search.
