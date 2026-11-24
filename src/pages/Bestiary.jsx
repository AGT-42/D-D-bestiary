import { useState } from "react";
import { Link } from "react-router-dom";
import MonsterTable from "../components/MonsterTable.jsx";
import { monsterStore } from "../services/monsterStore.js";

export default function Bestiary() {
  const [monsters, setMonsters] = useState(monsterStore.all);
  const [query, setQuery] = useState("");

  const handleDelete = (m) => {
    if (!window.confirm(`Delete ${m.name}? This can't be undone.`)) return;
    monsterStore.remove(m.id);
    setMonsters(monsterStore.all());
  };

  const shown = monsters.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-5xl text-ink">Bestiary</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name"
          className="border border-line bg-white px-3 py-2"
        />
      </div>
      {shown.length === 0 ? (
        <p className="text-mute">
          No monsters found. <Link to="/monsters/new" className="text-ink underline">Create one.</Link>
        </p>
      ) : (
        <MonsterTable monsters={shown} onDelete={handleDelete} />
      )}
    </section>
  );
}
