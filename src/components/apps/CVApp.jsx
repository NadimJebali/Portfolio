import { Suspense, lazy } from 'react';
import { config } from '../../config';

// Lazy-load react-pdf since it is heavy
const PDFViewer = lazy(() =>
  import('react-pdf').then((mod) => {
    mod.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
    return { default: mod.Document };
  })
);

export function CVApp() {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Suspense
        fallback={
          <p style={{ fontFamily: "'VT323', monospace", color: '#33ff33', padding: '1rem' }}>
            Loading CV...
          </p>
        }
      >
        <PDFViewer file={config.cv}>
          {/* Pages rendered by consumer once react-pdf API is fully wired */}
        </PDFViewer>
      </Suspense>
    </div>
  );
}
