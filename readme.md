# JARVIS AI – Landing Page

A responsive, single-page website for **JARVIS AI**, an AI automation studio that builds assistants for small businesses in Bangladesh. The assistants reply to customers in Bangla and English, capture orders and bookings, and automate routine tasks.

Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

## Features

- **Fully responsive**: mobile hamburger menu, stacked hero on tablets, two-column hero on desktop
- **Light and dark mode** with a toggle that remembers the visitor's choice and follows the system setting by default
- **Bangla / English language switch** that translates the whole page, including the tools, form and messages, and remembers the visitor's choice
- **Polish**: scroll progress bar, reveal-on-scroll animations, highlighted current section in the menu, floating WhatsApp button and back-to-top button
- **Services and "Why us"** sections explaining what the business offers and what makes it different
- **Interactive demo**: example customer chats for an online shop, a clinic and a restaurant
- **Free tools for visitors**:
  - Time calculator that estimates the cost of repeat customer questions
  - AI readiness checklist with a score
  - Starter FAQ template with a copy button
- **Free learning**: AI glossary in plain words and ready-to-use prompts
- **Packages** (Starter, Growth, Custom) with feature cards and a comparison table
- **Offers and delivery** information, FAQ and a reviews section
- **Contact form** that opens WhatsApp with the message pre-filled, plus WhatsApp, call and email buttons
- Accessible markup: labelled form fields, keyboard-friendly menu and tabs, reduced-motion support

## Project structure

```
.
├── index.html     # page content
├── css/
│   └── style.css  # all styles, including light and dark themes
├── js/
│   ├── i18n.js    # Bangla translations
│   └── script.js  # language switch, menu, theme, tabs, tools, reviews, form
└── README.md
```

## Run locally

No installation needed. Open `index.html` in your browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy with GitHub Pages

1. Push the files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Customize

| What                   | Where                                                                            |
| ---------------------- | -------------------------------------------------------------------------------- |
| Business name and text | `index.html`                                                                     |
| Package prices         | The `.price` elements in the `#pricing` section                                  |
| Phone, email, WhatsApp | The `#contact` section in `index.html`, and the `wa.me` number in `js/script.js` |
| Customer reviews       | The `REVIEWS` array in `js/script.js`                                            |
| Bangla translations    | `js/i18n.js` (each key is the exact English text on the page)                    |
| Colors and theme       | CSS variables at the top of `style.css`                                          |

To add a real review, edit the `REVIEWS` array in `js/script.js`:

```js
var REVIEWS = [
  { name: "Customer Name", biz: "Business type", text: "Their feedback here." },
];
```

## Tech

HTML5 · CSS3 (custom properties, grid, flexbox) · Vanilla JavaScript · Google Fonts (Space Grotesk, Inter, Noto Sans Bengali)

## Contact

Built by Redwan. Email: redwanhasancse@gmail.com
