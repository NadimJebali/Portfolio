import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDesktop } from "../../context/DesktopContext";
import { config } from "../../config";

const { iconSize = 52, iconFontSize = "1rem" } = config.desktop;
const containerWidth = iconSize + 20;

const STORAGE_KEY = (id) => `icon-pos-${id}`;

function loadPos(id) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(id));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function DesktopIcon({ id, label, icon, emoji, defaultPos }) {
  const { openWindow } = useDesktop();
  const nodeRef = useRef(null);
  const saved = loadPos(id);
  const [pos] = useState(saved ?? defaultPos);

  function handleStop(_, data) {
    localStorage.setItem(
      STORAGE_KEY(id),
      JSON.stringify({ x: data.x, y: data.y }),
    );
  }

  function handleDoubleClick() {
    openWindow(id);
  }

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={pos} onStop={handleStop}>
      <div
        ref={nodeRef}
        className="desktop-icon"
        role="button"
        tabIndex={0}
        aria-label={`Open ${label}`}
        onDoubleClick={handleDoubleClick}
        onKeyDown={(e) => e.key === "Enter" && handleDoubleClick()}
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          cursor: "default",
          userSelect: "none",
          width: `${containerWidth}px`,
        }}
      >
        {icon ? (
          <img
            src={icon}
            alt={label}
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              objectFit: "contain",
              imageRendering: "pixelated",
            }}
          />
        ) : (
          <span style={{ fontSize: `${iconSize * 0.7}px`, lineHeight: 1 }}>
            {emoji}
          </span>
        )}
        <span
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: iconFontSize,
            color: "#d0ffd0",
            textAlign: "center",
            textShadow: "0 0 6px #00ff00aa",
            background: "rgba(0,0,0,0.4)",
            padding: "0 3px",
          }}
        >
          {label}
        </span>
      </div>
    </Draggable>
  );
}
