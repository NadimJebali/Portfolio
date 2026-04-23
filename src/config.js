// Central config — all personal data lives here. Never hardcode these in components.
export const config = {
  name: "Nadim Jebali",
  title: "Engineer",
  email: "NadimJebali.0@gmail.com",
  cv: "/assets/CV_NADIM_JEBALI_web.pdf",
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
  desktop: {
    wallpaperColor: "#0a0a12", // fallback colour when no image is set
    // Set wallpaperImage to a path in public/ to use a background image, or null for solid colour.
    wallpaperImage: "/assets/windows-wallpaper.jpg",
    // UI sizes
    taskbarHeight: 42, // px — height of the bottom taskbar
    iconSize: 52, // px — width/height of desktop icon images
    iconFontSize: "1rem", // CSS font-size for icon labels
    // Icons: set `icon` to a public path to use an image, or null for emoji fallback.
    icons: [
      {
        id: "about-window",
        label: "About Me",
        icon: "/assets/Infobox_info_icon.svg.png", // e.g. "./assets/about-icon.png"
        emoji: "🖥️",
        defaultPos: { x: 24, y: 24 },
      },
      {
        id: "cv-window",
        label: "My CV",
        icon: null, // e.g. "./assets/cv-icon.png"
        emoji: "📄",
        defaultPos: { x: 24, y: 120 },
      },
      {
        id: "links-window",
        label: "Links",
        icon: null, // e.g. "./assets/links-icon.png"
        emoji: "🔗",
        defaultPos: { x: 24, y: 216 },
      },
    ],
  },
};
