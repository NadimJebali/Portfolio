import { config } from "../../config";

const linkStyle = {
  display: "block",
  color: "#0000cc",
  fontFamily: "'VT323', monospace",
  fontSize: "1.2rem",
  textDecoration: "none",
  padding: "0.3rem 0",
};

export function LinksApp() {
  return (
    <div style={{ padding: "0.5rem" }}>
      {Object.entries(config.links).map(([label, url]) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          aria-label={`Open ${label} profile`}
        >
          &gt; {label.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
