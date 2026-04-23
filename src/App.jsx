import { useState, useCallback } from "react";
import { DesktopProvider } from "./context/DesktopContext";
import { CRTOverlay } from "./components/CRTOverlay/CRTOverlay";
import { BootScreen } from "./components/BootScreen/BootScreen";
import { Desktop } from "./components/Desktop/Desktop";
import { Taskbar } from "./components/Taskbar/Taskbar";
import { config } from "./config";

const { taskbarHeight = 42 } = config.desktop;

export default function App() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <DesktopProvider>
      {/* CRT overlay always on top of everything */}
      <CRTOverlay />

      <div
        className="crt-screen"
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!booted && <BootScreen onComplete={handleBootComplete} />}

        {booted && (
          <>
            <div
              style={{
                position: "absolute",
                inset: `0 0 ${taskbarHeight}px 0`,
              }}
            >
              <Desktop />
            </div>
            <Taskbar />
          </>
        )}
      </div>
    </DesktopProvider>
  );
}
