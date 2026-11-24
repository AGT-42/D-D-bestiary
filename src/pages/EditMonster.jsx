import { useParams, useNavigate } from "react-router-dom";
import MonsterForm from "../components/MonsterForm.jsx";
import NotFound from "./NotFound.jsx";
import { monsterStore } from "../services/monsterStore.js";

export default function EditMonster() {
  const { id } = useParams();
  const navigate = useNavigate();
  const monster = monsterStore.get(id);

  if (!monster) return <NotFound />;

  return (
    <section>
      <h1 className="mb-6 font-display text-5xl text-ink">Edit {monster.name}</h1>
      <MonsterForm
        initial={monster}
        submitLabel="Save changes"
        onSubmit={(data) => {
          monsterStore.update(id, data);
          navigate(`/monsters/${id}`);
        }}
      />
    </section>
  );
}
