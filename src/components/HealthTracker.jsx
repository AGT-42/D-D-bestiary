import { useState } from "react";
import { getHp, setHp } from "../services/hpStore.js";

const label = "text-[11px] font-semibold uppercase tracking-[0.18em]";
const whiteFocus = { outlineColor: "#fff" }; // default focus ring is red, invisible on the red column

export default function HealthTracker({ scope, monsterId, maxHp }) {
  const [current, setCurrent] = useState(() => getHp(scope, monsterId, maxHp));
  const [amount, setAmount] = useState("1");

  const apply = (next) => {
    const value = Math.max(0, Math.min(maxHp, next));
    setCurrent(value);
    setHp(scope, monsterId, value);
  };

  const n = Math.max(0, parseInt(amount, 10) || 0);
  const percent = maxHp > 0 ? (current / maxHp) * 100 : 0;
  const status = current === 0 ? "Down" : current <= maxHp / 2 ? "Bloodied" : "Healthy";

  return (
    <div className="text-center">
      <p className={`${label} text-white/75`}>Hit points</p>
      <p className="font-display text-6xl leading-none">
        {current}
        <span className="text-3xl text-white/70"> / {maxHp}</span>
      </p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={maxHp}
        aria-valuenow={current}
        className="mx-auto mt-3 h-2 w-full max-w-xs bg-white/25"
      >
        <div className="h-full bg-white transition-[width]" style={{ width: `${percent}%` }} />
      </div>
      <p className={`mt-2 ${label} text-white/75`}>{status}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply(current - n); // Enter key = damage
        }}
        className="mt-4 flex items-stretch justify-center gap-2"
      >
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-label="Amount"
          style={whiteFocus}
          className="w-20 border border-white/40 bg-transparent px-3 py-2 text-center text-white"
        />
        <button type="submit" style={whiteFocus} className={`bg-ink px-4 py-2 text-paper hover:brightness-125 ${label}`}>
          Damage
        </button>
        <button type="button" onClick={() => apply(current + n)} style={whiteFocus} className={`bg-white px-4 py-2 text-blood hover:brightness-95 ${label}`}>
          Heal
        </button>
      </form>

      <button type="button" onClick={() => apply(maxHp)} style={whiteFocus} className={`mt-3 text-white/75 underline underline-offset-4 hover:text-white ${label}`}>
        Reset to full
      </button>
    </div>
  );
}
