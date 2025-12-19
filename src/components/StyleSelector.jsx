import { useState } from "react";

const STYLES = [
  {
    value: "fact",
    label: "Fact-Checked",
    desc: "Maximum accuracy, no guessing",
    color: "#d32f2f",
  },
  {
    value: "balanced",
    label: "Balanced",
    desc: "Best overall responses",
    color: "#1976d2",
  },
  {
    value: "creative",
    label: "Creative",
    desc: "Exploratory & imaginative",
    color: "#7b1fa2",
  },
];

export default function StyleSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const current = STYLES.find((s) => s.value === value) || STYLES[1];

  return (
    <div className="style-selector">
      <div
        className="style-selected soft-card"
        onClick={() => setOpen(!open)}
      >
        <span className="dot" style={{ background: current.color }} />
        <div>
          <strong>{current.label}</strong>
          <div className="style-desc">{current.desc}</div>
        </div>
      </div>

      {open && (
        <div className="style-dropdown soft-card">
          {STYLES.map((s) => (
            <div
              key={s.value}
              className="style-option"
              onClick={() => {
                onChange(s.value);
                setOpen(false);
              }}
            >
              <span className="dot" style={{ background: s.color }} />
              <div>
                <strong>{s.label}</strong>
                <div className="style-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
