import { useState } from "react";
import { newKey } from "../services/campaignStore.js";

const label = "text-[10px] font-semibold uppercase tracking-[0.16em]";
const EMPTY = { round: 1, active: null, init: {}, players: [] };
const hasValue = (v) => v !== "" && v != null && !Number.isNaN(Number(v));

// combatants: [{ key, name, dexMod }]  = only the monsters whose card has "Combat" switched on.
// Players are added here by the DM.
export default function InitiativeTracker({ tracker, combatants, onChange, onEndCombat }) {
  const t = { ...EMPTY, ...tracker };
  const [playerName, setPlayerName] = useState("");
  const [playerInit, setPlayerInit] = useState("");

  const rows = [
    ...combatants.map((c) => ({ key: c.key, name: c.name, kind: "monster", value: t.init[c.key] ?? "" })),
    ...t.players.map((p) => ({ key: p.key, name: p.name, kind: "player", value: p.init ?? "" })),
  ];
  const ranked = rows.filter((r) => hasValue(r.value)).sort((a, b) => Number(b.value) - Number(a.value)); // stable for ties
  const ordered = [...ranked, ...rows.filter((r) => !hasValue(r.value))];
  const activeKey = ranked.some((r) => r.key === t.active) ? t.active : null;

  const save = (patch) => onChange({ ...t, ...patch });

  const setInit = (row, value) => {
    if (row.kind === "player") save({ players: t.players.map((p) => (p.key === row.key ? { ...p, init: value } : p)) });
    else save({ init: { ...t.init, [row.key]: value } });
  };

  const start = () => save({ round: 1, active: ranked[0]?.key ?? null });

  const next = () => {
    if (ranked.length === 0) return;
    const i = ranked.findIndex((r) => r.key === activeKey);
    if (i === -1) return save({ round: 1, active: ranked[0].key });
    const wrap = i + 1 >= ranked.length;
    save({ active: ranked[wrap ? 0 : i + 1].key, round: wrap ? t.round + 1 : t.round });
  };

  const rollMonsters = () => {
    const init = { ...t.init };
    combatants.forEach((c) => {
      init[c.key] = Math.floor(Math.random() * 20) + 1 + c.dexMod;
    });
    save({ init });
  };

  const clearInit = () =>
    save({ round: 1, active: null, init: {}, players: t.players.map((p) => ({ ...p, init: "" })) });

  const addPlayer = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    save({ players: [...t.players, { key: newKey(), name: playerName.trim(), init: playerInit }] });
    setPlayerName("");
    setPlayerInit("");
  };

  const btn = `px-2 py-2 ${label}`;

  return (
    <div className="border border-line bg-white p-3">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-xl text-ink">Initiative</h3>
        <p className={`${label} text-blood`}>Round {t.round}</p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <button onClick={rollMonsters} disabled={combatants.length === 0} className={`border border-ink hover:bg-ink hover:text-paper disabled:opacity-40 ${btn}`}>Roll</button>
        <button onClick={start} disabled={ranked.length === 0} className={`border border-ink hover:bg-ink hover:text-paper disabled:opacity-40 ${btn}`}>Start</button>
        <button onClick={next} disabled={ranked.length === 0} className={`col-span-2 bg-blood text-white hover:brightness-110 disabled:opacity-40 ${btn}`}>Next turn</button>
        <button onClick={clearInit} className={`text-mute hover:text-ink ${btn}`}>Clear</button>
        <button onClick={onEndCombat} className={`text-mute hover:text-blood ${btn}`}>End combat</button>
      </div>

      <ol className="mt-3 flex flex-col gap-1.5">
        {ordered.map((r) => {
          const active = r.key === activeKey;
          return (
            <li key={r.key} className={`flex items-center gap-2 border px-2 py-1.5 text-sm ${active ? "border-ink bg-ink text-paper" : "border-line"}`}>
              <input
                type="number"
                value={r.value}
                onChange={(e) => setInit(r, e.target.value)}
                aria-label={`Initiative for ${r.name}`}
                placeholder="--"
                className={`w-12 border px-1 py-0.5 text-center ${active ? "border-white/40 bg-transparent text-white" : "border-line bg-white text-ink"}`}
              />
              <span className="min-w-0 flex-1 truncate" title={r.name}>{r.name}</span>
              {(active || r.kind === "player") && (
                <span className={`${label} ${active ? "text-white/75" : "text-mute"}`}>{active ? "Turn" : "PC"}</span>
              )}
              {r.kind === "player" && (
                <button
                  onClick={() => save({ players: t.players.filter((p) => p.key !== r.key) })}
                  aria-label={`Remove ${r.name}`}
                  className="px-0.5 text-lg leading-none opacity-60 hover:opacity-100"
                >
                  ×
                </button>
              )}
            </li>
          );
        })}
        {ordered.length === 0 && <li className="text-sm text-mute">Press <b>Combat</b> on a stat block to add it here.</li>}
      </ol>

      <form onSubmit={addPlayer} className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
        <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Player name" aria-label="Player name" className="w-full border border-line bg-white px-2 py-1.5 text-sm" />
        <input type="number" value={playerInit} onChange={(e) => setPlayerInit(e.target.value)} placeholder="Init" aria-label="Player initiative" className="w-14 border border-line bg-white px-2 py-1.5 text-sm" />
        <button className={`flex-1 bg-ink text-paper hover:bg-blood ${btn}`}>Add player</button>
      </form>
    </div>
  );
}
