import { useDesktop } from '../../context/DesktopContext';
import { DesktopIcon } from '../Icons/DesktopIcon';
import { Window } from '../Window/Window';
import { AboutApp } from '../apps/AboutApp';
import { CVApp } from '../apps/CVApp';
import { LinksApp } from '../apps/LinksApp';

const APP_MAP = {
  'about-window': AboutApp,
  'cv-window': CVApp,
  'links-window': LinksApp,
};

const ICONS = [
  { id: 'about-window', label: 'About Me', emoji: '🖥️', defaultPos: { x: 24, y: 24 } },
  { id: 'cv-window',    label: 'My CV',    emoji: '📄', defaultPos: { x: 24, y: 120 } },
  { id: 'links-window', label: 'Links',    emoji: '🔗', defaultPos: { x: 24, y: 216 } },
];

export function Desktop() {
  const { windows } = useDesktop();

  return (
    <div
      className="desktop"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at center, #0a0a1a 60%, #000005 100%)',
        overflow: 'hidden',
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
