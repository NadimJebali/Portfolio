import { config } from '../../config';

export function AboutApp() {
  return (
    <div style={{ fontFamily: "'VT323', monospace", color: '#33ff33', lineHeight: 1.6 }}>
      <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.75rem', marginBottom: '1rem' }}>
        {config.name}
      </h2>
      <p>{config.title}</p>
      <p>
        <a href={`mailto:${config.email}`} style={{ color: '#ffb000' }}>
          {config.email}
        </a>
      </p>
      <hr style={{ borderColor: '#33ff3340', margin: '0.75rem 0' }} />
      <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
        Welcome to my retro portfolio. Use the desktop icons to explore.
      </p>
    </div>
  );
}
