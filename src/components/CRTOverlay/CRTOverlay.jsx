export function CRTOverlay() {
  return (
    <div
      aria-hidden="true"
      className="crt-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        // Scanlines
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
        // Vignette on top of scanlines via a pseudo approach — we use a second box-shadow
        boxShadow: "inset 0 0 120px 40px rgba(0,0,0,0.75)",
        // Flicker animation
        animation: "crt-flicker 0.12s infinite",
      }}
    />
  );
}
