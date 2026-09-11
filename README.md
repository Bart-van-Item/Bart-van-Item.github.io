# Portfolio – Bart van Item

Live at [bart-van-item.github.io](https://bart-van-item.github.io/).

## Set-up

Serve the repo root and open `/`, for example with the **Live Server** extension in VS Code
(right-click `index.html` → *Open with Live Server*).

Opening `index.html` straight from disk does not work: every asset is referenced with an
absolute path (`/css/style.css`, `/js/script.js`), which a `file://` page resolves against
the drive root instead of the project. Any static server will do — GitHub Pages serves the
repo root the same way.

## Structure

```
index.html              main page — the whole portfolio is one scrolling page
css/
  style.css             all site styling (themes, layout, sections)
  icons.css             shared .icon rules — currently not linked anywhere
js/
  script.js             age, theme toggle, language toggle, scroll nav
  i18n.js               translation loader
  easteregg.js          hidden route to the experimental page
components/
  footer/               footer markup + styling, injected at runtime
pages/
  home/translations/    nl.json + en.json for the main page
  experimental/         scratch page, linked from nowhere in the UI
assets/
  icons/                svg icons (github, linkedin, mail)
  audio/  video/        media used by the experimental modules
```

## How it works

**Language.** `i18n.js` fetches `/pages/<page>/translations/<lang>.json` and fills every element
carrying a `data-i18n="key"` attribute with the matching value. `script.js` sets `currentPage`
to `"home"`, so the main page reads from `pages/home/translations/`. Adding a page means adding
a `translations/` folder next to it. The chosen language is kept in `localStorage` under `lang`
and defaults to `nl`.

**Theme.** Light/dark is a class on `<body>`, stored in `localStorage` under `theme`, defaulting
to light. The toggle button's own label is translated in `script.js` rather than through a JSON
file, because it changes with both the theme and the language.

**Age.** The "about" text shows an age derived at page load from the birth date in `script.js`,
so it never goes stale.

**Footer.** `components/footer/footer.html` is fetched and injected into `#footer-placeholder`
at the bottom of `index.html`, so it stays in one place once more pages exist. If the fetch
fails the placeholder is removed rather than left empty.

**Experimental page.** Nothing links to it. Click the big hero title five times, less than 600 ms
apart, and `easteregg.js` sends you to `pages/experimental/experimental.html`. That page loads
its own modules (`modules/audio.html`, `modules/video.html`) the same way the footer is loaded.
It is a scratch area — things there are expected to be half-finished.

## Contact

If you spot anything broken on the portfolio or just want to get in touch:

**bart_vi@yahoo.com**  
[github.com/Bart-van-Item](https://github.com/Bart-van-Item)
