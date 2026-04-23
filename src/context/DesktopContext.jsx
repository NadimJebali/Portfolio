import { createContext, useContext, useReducer, useCallback } from 'react';

// --- Initial window definitions ---
const initialWindows = [
  {
    id: 'about-window',
    title: 'About Me',
    isOpen: false,
    isMinimized: false,
    position: { x: 80, y: 60 },
    size: { width: 480, height: 340 },
    zIndex: 10,
  },
  {
    id: 'cv-window',
    title: 'My CV',
    isOpen: false,
    isMinimized: false,
    position: { x: 160, y: 100 },
    size: { width: 640, height: 480 },
    zIndex: 10,
  },
  {
    id: 'links-window',
    title: 'Links',
    isOpen: false,
    isMinimized: false,
    position: { x: 240, y: 140 },
    size: { width: 320, height: 260 },
    zIndex: 10,
  },
];

// --- Reducer ---
function desktopReducer(state, action) {
  switch (action.type) {
    case 'OPEN_WINDOW':
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: state.topZ + 1 }
            : w
        ),
      };
    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isOpen: false, isMinimized: false } : w
        ),
      };
    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, isMinimized: true } : w
        ),
      };
    case 'BRING_TO_FRONT':
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, zIndex: state.topZ + 1 } : w
        ),
      };
    case 'UPDATE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, ...action.patch } : w
        ),
      };
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
    default:
      return state;
  }
}

// --- Context ---
const DesktopContext = createContext(null);

export function DesktopProvider({ children }) {
  const [state, dispatch] = useReducer(desktopReducer, {
    windows: initialWindows,
    topZ: 10,
    isMuted: false,
  });

  const openWindow = useCallback((id) => dispatch({ type: 'OPEN_WINDOW', id }), []);
  const closeWindow = useCallback((id) => dispatch({ type: 'CLOSE_WINDOW', id }), []);
  const minimizeWindow = useCallback((id) => dispatch({ type: 'MINIMIZE_WINDOW', id }), []);
  const bringToFront = useCallback((id) => dispatch({ type: 'BRING_TO_FRONT', id }), []);
  const updateWindow = useCallback((id, patch) => dispatch({ type: 'UPDATE_WINDOW', id, patch }), []);
  const toggleMute = useCallback(() => dispatch({ type: 'TOGGLE_MUTE' }), []);

  return (
    <DesktopContext.Provider
      value={{
        windows: state.windows,
        isMuted: state.isMuted,
        openWindow,
        closeWindow,
        minimizeWindow,
        bringToFront,
        updateWindow,
        toggleMute,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error('useDesktop must be used within a DesktopProvider');
  return ctx;
}
