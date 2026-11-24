import { useState } from "react";
import { Link } from "react-router-dom";
import Spotlight from "../components/Spotlight.jsx";
import { monsterStore } from "../services/monsterStore.js";

export default function Home() {
  const [monsters] = useState(() => monsterStore.all().slice(0, 8)); // newest first
  const [index, setIndex] = useState(0);

  if (monsters.length === 0) {
    return (
      <section className="py-16">
        <h1 className="font-display text-6xl">No monsters yet</h1>
        <p className="mt-3 text-mute">Create the first one and it will show up here.</p>
        <Link to="/monsters/new" className="mt-6 inline-block bg-blood px-6 py-3 text-white">Create a monster</Link>
      </section>
    );
  }

  const current = monsters[index];
  const nextIndex = (index + 1) % monsters.length;

  return (
    <Spotlight
      monster={current}
      next={monsters.length > 1 ? monsters[nextIndex] : null}
      onNext={() => setIndex(nextIndex)}
      total={monsters.length}
      index={index}
      onSelect={setIndex}
      footer={
        <Link to={`/monsters/${current.id}`} className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4 hover:text-blood">
          View full stat block
        </Link>
      }
    />
  );
}
