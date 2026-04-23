---
name: retro-crt-portfolio
description: "Build and extend a React retro CRT PC desktop portfolio. Use when: adding components, windows, desktop icons, apps, CRT effects, taskbar features, sound effects, or wiring state for this portfolio project. Covers CRT overlay rules, window management, desktop icon dragging, React Context state, coding conventions, and aesthetic guidelines for a Windows 95/98-style browser portfolio."
argument-hint: 'Describe the feature or component to build (e.g. "add an About window", "new desktop icon for GitHub")'
---

# Retro CRT PC Portfolio

## When to Use

- Adding a new desktop icon or window/app
- Implementing or modifying the CRT overlay effect
- Wiring up window state, z-index management, or taskbar entries
- Adding sound effects or mute toggling
- Configuring new portfolio content (CV, social links, etc.)
- Enforcing coding conventions for this project

---

## Project Structure

```
src/
├── components/
│   ├── Desktop/         # Main desktop area with icons
│   ├── Taskbar/         # Bottom taskbar: clock, start menu, open apps
│   ├── Window/          # Reusable draggable/resizable window shell (react-rnd)
│   ├── Icons/           # Desktop icon components (react-draggable)
│   ├── CRTOverlay/      # CRT filter layer — NEVER touch pointer-events or z-index
│   └── apps/            # Content rendered inside windows (CV, About, etc.)
├── hooks/               # Custom hooks, prefixed with `use`
├── assets/              # Fonts, sounds, images
├── config.js            # Central config — all personal data lives here
└── App.jsx              # Root — wraps everything in CRTWrapper
```

---

## Procedure: Adding a New Component

1. Identify the correct folder (`components/`, `apps/`, `hooks/`, etc.)
2. Create a **named export** functional component (default export only in `App.jsx`)
3. Use **Tailwind** for layout, **98.css/XP.css** classes for retro UI chrome
4. No inline styles unless the value is dynamically computed (e.g., `style={{ left: x, top: y }}`)
5. Add `aria-label` to every interactive element
6. Confirm the component renders **beneath** the CRT overlay — never above `z-index: 9999`

---

## Procedure: Adding a New Window / App

1. Add a new entry to the global window state in React Context:
   ```js
   {
     id: "my-window",       // kebab-case, unique
     title: "Window Title",
     isOpen: false,
     isMinimized: false,
     position: { x: 120, y: 100 },
     size: { width: 640, height: 480 },
     zIndex: 10
   }
   ```
2. Create the app content component in `src/components/apps/`
3. Render it inside the shared `<Window>` shell (which uses `react-rnd`)
4. Ensure clicking the window calls the z-index promotion handler from Context
5. Minimizing adds the window to the taskbar without unmounting the component
6. Add a desktop icon in `src/components/Icons/` that dispatches `openWindow(id)` on double-click

---

## Procedure: Adding a Desktop Icon

1. Create the icon component in `src/components/Icons/`
2. Wrap it with `react-draggable`
3. Persist position to `localStorage` (key: `icon-pos-<id>`)
4. Restore position from `localStorage` on mount
5. Bind `onDoubleClick` → dispatch `openWindow(id)` from Context
6. Add `aria-label` describing the icon's action

---

## CRT Overlay — Rules (Never Break These)

- The `CRTOverlay` component is a `position: fixed`, `pointer-events: none`, `z-index: 9999` layer
- It must sit on top of **all** content at all times
- **Never** increase any app component's z-index above 9998
- Components: scanlines (`repeating-linear-gradient`), vignette (`radial-gradient`), flicker (`@keyframes` opacity 0.97–1.0), phosphor glow (`filter: brightness/contrast`)
- Respect `prefers-reduced-motion`: disable the flicker animation via a media query

---

## State Management

Global React Context provides:

- `windows` — array of window state objects (shape above)
- `openWindow(id)` / `closeWindow(id)` / `minimizeWindow(id)`
- `bringToFront(id)` — increments zIndex for the target window
- `isMuted` / `toggleMute` — global sound toggle
- `iconPositions` — persisted icon layout

No Redux or external state libraries.

---

## Sound Effects

- Use the `use-sound` hook for all audio
- All sound triggers must check `isMuted` from Context before playing
- Sound files live in `src/assets/`
- Typical events: button click, window open/close, startup jingle

---

## Coding Conventions

| Rule          | Detail                                              |
| ------------- | --------------------------------------------------- |
| Components    | Functional + hooks only — no class components       |
| Exports       | Named exports everywhere; default only in `App.jsx` |
| Hooks         | Live in `/hooks/`, prefixed `use`                   |
| CSS classes   | kebab-case (e.g., `crt-overlay`, `desktop-icon`)    |
| Layout        | Tailwind utilities                                  |
| UI chrome     | `98.css` / `XP.css` classes                         |
| Inline styles | Only for dynamically computed values                |
| Personal data | All in `config.js` — never hardcoded in components  |
| TypeScript    | JS/JSX only unless explicitly requested             |

---

## Aesthetic Guidelines

- **Color palette**: near-black/dark navy/green backgrounds; muted green or amber text; classic grey window chrome
- **Fonts**: `VT323`, `Press Start 2P` (Google Fonts) for desktop elements; monospace everywhere
- **Vibe**: Windows 95/98 nostalgia — slightly eerie, charming, retro
- **Do not** use flat/minimalist UI patterns
- Optional: boot screen animation before the desktop appears

---

## Config-Driven Content

All personal data (name, job title, social links, CV PDF path, email) must be read from `src/config.js`:

```js
// src/config.js
export const config = {
  name: "Your Name",
  title: "Your Title",
  cv: "/assets/cv.pdf",
  links: {
    github: "https://github.com/...",
    linkedin: "https://linkedin.com/in/...",
  },
};
```

---

## Checklist Before Marking a Feature Done

- [ ] Component uses functional style with hooks
- [ ] Named export used (unless `App.jsx`)
- [ ] Renders beneath CRT overlay (z-index ≤ 9998)
- [ ] `aria-label` on all interactive elements
- [ ] No hardcoded personal data — all from `config.js`
- [ ] Sounds check `isMuted` before playing
- [ ] Icon positions written/read from `localStorage`
- [ ] CRT flicker disabled under `prefers-reduced-motion`
- [ ] No inline styles except dynamic values
