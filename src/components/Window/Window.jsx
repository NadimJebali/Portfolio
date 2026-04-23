import { Rnd } from 'react-rnd';
import { useDesktop } from '../../context/DesktopContext';

export function Window({ id, title, children, zIndex, position, size }) {
  const { closeWindow, minimizeWindow, bringToFront, updateWindow } = useDesktop();

  return (
    <Rnd
      default={{ x: position.x, y: position.y, width: size.width, height: size.height }}
      minWidth={240}
      minHeight={160}
      bounds="parent"
      style={{ zIndex, position: 'absolute' }}
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
      <div className="window" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button
              aria-label={`Minimize ${title}`}
              onClick={() => minimizeWindow(id)}
            />
            <button
              aria-label={`Maximize ${title}`}
            />
            <button
              aria-label={`Close ${title}`}
              onClick={() => closeWindow(id)}
            />
          </div>
        </div>
        <div
          className="window-body"
          style={{ flex: 1, overflow: 'auto', margin: 0, padding: '8px' }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
}
