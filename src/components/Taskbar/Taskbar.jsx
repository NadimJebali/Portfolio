import { useState, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';

function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{ fontFamily: "'VT323', monospace", fontSize: '1.1rem', color: '#d0ffd0', padding: '0 8px' }}
      aria-label="Current time"
    >
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

export function Taskbar() {
  const { windows, openWindow, isMuted, toggleMute } = useDesktop();
  const minimized = windows.filter((w) => w.isOpen && w.isMinimized);

  return (
    <div
      className="taskbar"
      role="toolbar"
      aria-label="Taskbar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '36px',
        background: '#c0c0c0',
        borderTop: '2px solid #ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '0 4px',
        zIndex: 9000,
        boxShadow: 'inset 0 2px 0 #ffffff, inset 0 -2px 0 #808080',
      }}
    >
      {/* Minimized window buttons */}
      <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
        {minimized.map((w) => (
          <button
            key={w.id}
            aria-label={`Restore ${w.title}`}
            onClick={() => openWindow(w.id)}
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: '0.9rem',
              minWidth: '100px',
              height: '26px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {w.title}
          </button>
        ))}
      </div>

      {/* Mute toggle */}
      <button
        aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        onClick={toggleMute}
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: '1.1rem',
          width: '32px',
          height: '26px',
          cursor: 'pointer',
        }}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Clock */}
      <div
        style={{
          background: '#c0c0c0',
          border: '2px inset #808080',
          padding: '0 4px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Clock />
      </div>
    </div>
  );
}
