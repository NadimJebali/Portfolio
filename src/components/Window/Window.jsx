import { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { useDesktop } from "../../context/DesktopContext";

export function Window({ id, title, children, zIndex, position, size }) {
  const { closeWindow, minimizeWindow, bringToFront, updateWindow } =
    useDesktop();
  const [isMaximized, setIsMaximized] = useState(false);
  // Store pre-maximize geometry so we can restore it
  const preMaximize = useRef(null);
  const rndRef = useRef(null);

  function handleMaximize() {
    if (isMaximized) {
      // Restore
      if (rndRef.current && preMaximize.current) {
        rndRef.current.updatePosition(preMaximize.current.position);
        rndRef.current.updateSize(preMaximize.current.size);
        updateWindow(id, preMaximize.current);
      }
      setIsMaximized(false);
    } else {
      // Save current state then go full
      preMaximize.current = { position, size };
      const maxW = window.innerWidth;
      const maxH = window.innerHeight - 36; // leave taskbar space
      if (rndRef.current) {
        rndRef.current.updatePosition({ x: 0, y: 0 });
        rndRef.current.updateSize({ width: maxW, height: maxH });
        updateWindow(id, {
          position: { x: 0, y: 0 },
          size: { width: maxW, height: maxH },
        });
      }
      setIsMaximized(true);
    }
  }

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
      }}
      minWidth={240}
      minHeight={160}
      bounds="parent"
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      style={{ zIndex, position: "absolute" }}
      dragHandleClassName="title-bar"
      onMouseDown={() => bringToFront(id)}
      onDragStop={(_, d) => updateWindow(id, { position: { x: d.x, y: d.y } })}
      onResizeStop={(_, __, ref, ___, pos) =>
        updateWindow(id, {
          size: { width: ref.offsetWidth, height: ref.offsetHeight },
          position: pos,
        })
      }
    >
      <div
        className="window"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div
            className="title-bar-controls"
            style={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              paddingRight: "4px",
            }}
          >
            {/* Minimize */}
            <button
              aria-label={`Minimize ${title}`}
              onClick={() => minimizeWindow(id)}
              style={{
                width: "16px",
                height: "16px",
                background: "#c0c0c0",
                border: "2px solid",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: "bold",
                padding: 0,
                lineHeight: 1,
              }}
            >
              −
            </button>
            {/* Maximize / Restore */}
            <button
              aria-label={
                isMaximized ? `Restore ${title}` : `Maximize ${title}`
              }
              onClick={handleMaximize}
              style={{
                width: "16px",
                height: "16px",
                background: "#c0c0c0",
                border: "2px solid",
                borderColor: "#ffffff #808080 #808080 #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "9px",
                padding: 0,
                lineHeight: 1,
              }}
            >
              {isMaximized ? "❐" : "□"}
            </button>
            {/* Close */}
            <button
              aria-label={`Close ${title}`}
              onClick={() => closeWindow(id)}
              style={{
                width: "16px",
                height: "16px",
                background: "#cc0000",
                border: "2px solid",
                borderColor: "#ff6666 #880000 #880000 #ff6666",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "10px",
                fontWeight: "bold",
                padding: 0,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>
        <div
          className="window-body"
          style={{ flex: 1, overflow: "auto", margin: 0, padding: "8px" }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
}
