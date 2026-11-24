import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMonsterList, fetchMonster, toLocalMonster } from "../services/dndApi.js";

export default function ImportMonster() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState("");

  useEffect(() => {
    fetchMonsterList()
      .then(setList)
      .catch(() => setError("Couldn't reach the D&D API. Check your connection and refresh."))
      .finally(() => setLoading(false));
  }, []);

  const handleImport = async (index) => {
    setBusy(index);
    setError("");
    try {
      const data = await fetchMonster(index);
      // Open the create form pre-filled so you can tweak it before saving.
      navigate("/monsters/new", { state: { prefill: toLocalMonster(data) } });
    } catch {
      setError("Couldn't load that monster. Try again.");
      setBusy("");
    }
  };

  const matches = list.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section>
      <h1 className="font-display text-5xl text-ink">Import from the SRD</h1>
      <p className="mt-2 max-w-xl text-mute">
        Pick an official monster, then edit it before saving to your bestiary.
      </p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search monsters, e.g. goblin"
        className="mt-6 w-full max-w-sm border border-line bg-white px-3 py-2"
      />

      {error && <p className="mt-4 text-blood">{error}</p>}
      {loading && <p className="mt-4 text-mute">Loading monsters...</p>}

      <ul className="mt-6 divide-y divide-line border border-line">
        {matches.slice(0, 30).map((m) => (
          <li key={m.index} className="flex items-center justify-between px-4 py-2">
            <span>{m.name}</span>
            <button
              onClick={() => handleImport(m.index)}
              disabled={busy === m.index}
              className=" border border-ink px-3 py-1 text-sm text-ink hover:bg-ink hover:text-paper disabled:opacity-50"
            >
              {busy === m.index ? "Importing..." : "Import"}
            </button>
          </li>
        ))}
      </ul>

      {!loading && matches.length > 30 && (
        <p className="mt-3 text-sm text-mute">Showing 30 of {matches.length}. Type to narrow the list.</p>
      )}
      {!loading && !error && matches.length === 0 && (
        <p className="mt-3 text-mute">No monsters match that search.</p>
      )}
    </section>
  );
}
