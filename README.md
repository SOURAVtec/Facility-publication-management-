# Alumni Main Themed — Light/Dark Mode Toggle (GSSoC Feature)

## Demo-https://alumni-main-themed-ow5gcy3fr-04shubham7s-projects.vercel.app/

## 🚀 Feature Overview

This repository implements a **responsive light/dark mode toggle** as part of a GSSoC (GirlScript Summer of Code) issue/feature. The toggle is accessible, mobile-friendly, and easy to extend for future contributors.

---

## ✨ What’s Included

- **Modern, fixed toggle switch** at the top-right of every page
- **Responsive design**: works on all devices (desktop, tablet, mobile)
- **Accessible**: keyboard and screen reader friendly
- **Remembers user preference** with `localStorage`
- **Auto-detects system theme** on first load
- **Easy to customize** via CSS variables and modular code

---

## 📁 Project Structure

```
Alumni-main-themed/
├── assets/
│   ├── css/         # All CSS files (including theme toggle styles)
│   ├── images/      # All images used in the site
│   └── js/          # All JavaScript files (including theme toggle logic)
├── Alumni_home.html # Main homepage
├── donation.html    # Donation page
├── jobportal.html   # Job portal page
├── login.html       # Login page
└── README.md        # This file
```

---

## 🌗 How the Light/Dark Toggle Works

- The toggle is implemented in `assets/js/theme-toggle.js` and styled in `assets/css/theme-toggle-fab.css`.
- The switch is a horizontal slider: left (moon) for light, right (sun) for dark.
- The toggle is injected automatically on every page that includes the script.
- Theme colors are managed with CSS variables in each CSS file (`:root` for light, `body.dark` for dark).
- The toggle is accessible (keyboard, screen reader, and touch support).
- The user's choice is saved in `localStorage` and respected on reload.
- The initial theme matches the user's system preference (`prefers-color-scheme`).

---

## 🛠️ How to Use or Extend This Feature

### To use the toggle on a new page:

1. **Copy an existing HTML file** as a template.
2. **Add this line before `</body>`:**
   ```html
   <script src="assets/js/theme-toggle.js"></script>
   ```
3. **Reference your CSS/JS/Images** using the `assets/` path.

### To customize the toggle:

- **Edit `assets/css/theme-toggle-fab.css`** for position, size, or animation.
- **Edit CSS variables** in your main CSS files to change theme colors.
- **Change icons**: The toggle uses Font Awesome 5 (CDN loaded automatically).

### To add new themeable pages:

- Use CSS variables for all colors.
- Add the toggle script as above.
- Test on both light and dark mode.

---


If you have questions, suggestions, or want to contribute, please open an issue or submit a pull request!
