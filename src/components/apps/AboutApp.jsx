import { config } from "../../config";

export function AboutApp() {
  return (
    <div
      style={{
        fontFamily: "'VT323', monospace",
        color: "#111111",
        lineHeight: 1.6,
        fontSize: "1.3rem",
      }}
    >
      <h2
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      >
        {config.name}
      </h2>
      <p style={{ fontSize: "1.2rem" }}>{config.title}</p>
      <p>
        <a
          href={`mailto:${config.email}`}
          style={{ color: "#0000cc", fontSize: "1.2rem" }}
        >
          {config.email}
        </a>
      </p>
      <hr style={{ borderColor: "#cccccc", margin: "0.75rem 0" }} />
      <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
        Welcome to my retro portfolio. Use the desktop icons to explore.
      </p>
    </div>
  );
}
