import { useDesktop } from "../../context/DesktopContext";
import { DesktopIcon } from "../Icons/DesktopIcon";
import { Window } from "../Window/Window";
import { AboutApp } from "../apps/AboutApp";
import { CVApp } from "../apps/CVApp";
import { LinksApp } from "../apps/LinksApp";
import { BrowserApp } from "../apps/BrowserApp";
import { config } from "../../config";

const APP_MAP = {
  "about-window": AboutApp,
  "cv-window": CVApp,
  "links-window": LinksApp,
};

const ICONS = config.desktop.icons;

export function Desktop() {
  const { windows } = useDesktop();
  const { wallpaperColor, wallpaperImage } = config.desktop;

  const wallpaperStyle = wallpaperImage
    ? {
        backgroundImage: `url(${wallpaperImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: wallpaperColor,
      }
    : {
        background: `radial-gradient(ellipse at center, ${wallpaperColor} 60%, #000005 100%)`,
      };

  return (
    <div
      className="desktop"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...wallpaperStyle,
      }}
    >
      {/* Desktop icons */}
      {ICONS.map((icon) => (
        <DesktopIcon key={icon.id} {...icon} />
      ))}

      {/* Open windows */}
      {windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .map((w) => {
          // Dynamic browser windows
          if (w.meta?.type === "browser") {
            return (
              <Window
                key={w.id}
                id={w.id}
                title={w.title}
                zIndex={w.zIndex}
                position={w.position}
                size={w.size}
              >
                <BrowserApp url={w.meta.url} />
              </Window>
            );
          }
          const AppContent = APP_MAP[w.id];
          return AppContent ? (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              zIndex={w.zIndex}
              position={w.position}
              size={w.size}
            >
              <AppContent />
            </Window>
          ) : null;
        })}
    </div>
  );
}
