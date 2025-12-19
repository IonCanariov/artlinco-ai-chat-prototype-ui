export default function MemoryPanel() {
  return (
<div className="memory-panel soft-card">
      <div className="memory-title">Artlinco Memory</div>

      <label className="memory-upload">
        <input type="file" multiple hidden />
        <span>📎 Add photos & files</span>
      </label>

      <div className="memory-hint">
        Uploaded files will be used as long-term AI context
      </div>
    </div>
  );
}
