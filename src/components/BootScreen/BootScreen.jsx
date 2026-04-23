import { useState, useEffect } from 'react';
import { config } from '../../config';

const BOOT_LINES = [
  'BIOS v2.0  Copyright (C) 1998',
  'Checking memory... 640K OK',
  `Loading ${config.name.toUpperCase()} OS...`,
  'Initializing drivers... OK',
  'Starting desktop environment...',
];

export function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 500);
        }, 600);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 8000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem 3rem',
        fontFamily: "'VT323', monospace",
        fontSize: '1.2rem',
        color: '#33ff33',
        transition: 'opacity 0.5s ease',
        opacity: done ? 0 : 1,
      }}
      aria-live="polite"
      aria-label="Boot screen"
    >
      {lines.map((line, idx) => (
        <p key={idx} style={{ margin: '0.2rem 0' }}>
          {line}
        </p>
      ))}
      {lines.length === BOOT_LINES.length && (
        <p style={{ marginTop: '1rem', color: '#ffb000', animation: 'crt-flicker 0.5s infinite' }}>
          █
        </p>
      )}
    </div>
  );
}
