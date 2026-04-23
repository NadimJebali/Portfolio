import { config } from "../../config";
import { useDesktop } from "../../context/DesktopContext";

export function LinksApp() {
  const { openBrowserWindow } = useDesktop();

  return (
    <div style={{ padding: "0.5rem" }}>
      {Object.entries(config.links).map(([label, url]) => (
        <button
          key={label}
          aria-label={`Open ${label}`}
          onClick={() => openBrowserWindow(url, label.toUpperCase())}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            color: "#0000cc",
            fontFamily: "'VT323', monospace",
            fontSize: "1.2rem",
            textDecoration: "none",
            padding: "0.3rem 0",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          &gt; {label.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
