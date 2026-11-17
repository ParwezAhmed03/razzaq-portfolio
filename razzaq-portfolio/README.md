# Mohammed Abdul Razzaq Siddiqui – Portfolio

A responsive, single-page portfolio built with **HTML, CSS, Bootstrap 5 and vanilla JavaScript**.
No build tools or installs are needed.

## Sections

Hero, About (with education timeline), Skills and Activities, Call-to-action banner, Internship, Gallery (with lightbox), Contact/Enquiry form, final Call-to-action, Footer.

## Folder structure

```
razzaq-portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/images/        <- put your photos here
└── README.md
```

## How to run

### Option 1: Open directly (easiest)
1. Unzip the file.
2. Double-click `index.html`. It opens in your browser.

### Option 2: Local server (recommended, mimics real hosting)
1. Unzip the file and open a terminal inside the `razzaq-portfolio` folder.
2. Run **one** of these:
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve .`
   - VS Code: install the **Live Server** extension, right-click `index.html`, choose **Open with Live Server**.
3. Visit `http://localhost:8000` (or the URL printed in the terminal).

> An internet connection is needed on first load, because Bootstrap, Bootstrap Icons and Google Fonts come from a CDN.

## Add your own photos

Save images in `assets/images/` using these exact names. The page picks them up automatically, and shows a styled placeholder if a file is missing.

| File | Used for |
|------|----------|
| `profile.jpg` | Hero portrait (square or portrait photo works best) |
| `gallery-1.jpg` ... `gallery-6.jpg` | Gallery tiles (landscape, about 1200x900) |

To change gallery captions, edit the `data-title` and `<figcaption>` values in `index.html`.

## Make the contact form really send messages

The form currently validates input and shows a success message (front-end demo). To receive real emails:

1. Create a free form at https://formspree.io and copy your endpoint URL.
2. In `js/main.js`, inside the submit handler, replace the `setTimeout(...)` block with:

```js
fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: message.value
  })
}).then(function () { /* show success + reset, same as the current code */ });
```

## Customising

- Colours: edit the CSS variables at the top of `css/style.css` (`--teal-*`, `--accent`).
- Typing roles in the hero: edit the `roles` array in `js/main.js`.
- Contact details: search `index.html` for the phone and email and update them.

## Deploy for free

Drag the folder onto Netlify Drop (https://app.netlify.com/drop), or push it to GitHub and enable GitHub Pages.
