import { useState } from "react";

const btnStyle = {
  fontFamily: "'VT323', monospace",
  fontSize: "0.85rem",
  color: "#333",
  border: "2px outset #c0c0c0",
  padding: "1px 8px",
  background: "#c0c0c0",
  cursor: "pointer",
};

export function BrowserApp({ url }) {
  // "screenshot" | "iframe"
  const [mode, setMode] = useState("screenshot");
  const [imgKey, setImgKey] = useState(0);

  const screenshotSrc = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url&waitForTimeout=2000`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Retro URL / toolbar */}
      <div
        style={{
          background: "#c0c0c0",
          borderBottom: "2px solid #808080",
          padding: "4px 6px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "0.9rem",
            color: "#333",
          }}
        >
          Address:
        </span>
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: "'VT323', monospace",
            fontSize: "0.9rem",
            background: "#fff",
            border: "2px inset #808080",
            padding: "1px 4px",
            color: "#0000cc",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {url}
        </span>
        <button
          style={{
            ...btnStyle,
            background: mode === "screenshot" ? "#a0a0a0" : "#c0c0c0",
          }}
          onClick={() => {
            setMode("screenshot");
            setImgKey((k) => k + 1);
          }}
          aria-label="Show screenshot preview"
          title="Screenshot preview"
        >
          📷
        </button>
        <button
          style={{
            ...btnStyle,
            background: mode === "iframe" ? "#a0a0a0" : "#c0c0c0",
          }}
          onClick={() => setMode("iframe")}
          aria-label="Show live iframe (may be blocked by site)"
          title="Live (may be blocked)"
        >
          🌐
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in real browser"
          style={{ ...btnStyle, textDecoration: "none" }}
          title="Open in browser"
        >
          ↗
        </a>
      </div>

      {/* Viewport */}
      <div
        style={{
          flex: 1,
          position: "relative",
          background: "#fff",
          overflow: "hidden",
        }}
      >
        {mode === "screenshot" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              background: "#e0e0e0",
            }}
          >
            <p
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "0.9rem",
                color: "#555",
                margin: "6px 0 4px",
              }}
            >
              [Screenshot preview via microlink.io]
            </p>
            <img
              key={imgKey}
              src={screenshotSrc}
              alt={`Preview of ${url}`}
              style={{ maxWidth: "100%", border: "1px solid #808080" }}
            />
          </div>
        )}
        {mode === "iframe" && (
          <>
            <iframe
              src={url}
              title={url}
              style={{ width: "100%", height: "100%", border: "none" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                fontFamily: "'VT323', monospace",
                fontSize: "0.8rem",
                background: "rgba(192,192,192,0.9)",
                border: "1px solid #808080",
                padding: "2px 6px",
                color: "#333",
                pointerEvents: "none",
              }}
            >
              Some sites block embedding. Use 📷 or ↗ if blank.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
