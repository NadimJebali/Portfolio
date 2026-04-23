import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { config } from "../../config";

// Configure worker once at module level
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const monoStyle = {
  fontFamily: "'VT323', monospace",
  color: "#111111",
  padding: "1rem",
};

export function CVApp() {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setError(null);
  }

  function onLoadError(err) {
    setError(err.message ?? "Failed to load PDF.");
  }

  if (error) {
    return (
      <div style={monoStyle}>
        <p style={{ color: "#ff4444" }}>Error: {error}</p>
        <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
          Make sure <strong>{config.cv}</strong> exists in the{" "}
          <code>public/</code> folder.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        background: "#f0f0f0",
      }}
    >
      {!numPages && <p style={monoStyle}>Loading CV...</p>}
      <Document
        file={config.cv}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={<p style={monoStyle}>Loading CV...</p>}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              width={580}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
      </Document>
    </div>
  );
}
