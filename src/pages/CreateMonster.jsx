import { useNavigate, useLocation } from "react-router-dom";
import MonsterForm from "../components/MonsterForm.jsx";
import { monsterStore } from "../services/monsterStore.js";

export default function CreateMonster() {
  const navigate = useNavigate();
  const prefill = useLocation().state?.prefill; // set by the SRD import page

  return (
    <section>
      <h1 className="mb-6 font-display text-5xl text-ink">
        {prefill ? `Review ${prefill.name}` : "Create a monster"}
      </h1>
      <MonsterForm
        initial={prefill}
        submitLabel="Save monster"
        onSubmit={(data) => navigate(`/monsters/${monsterStore.create(data).id}`)}
      />
    </section>
  );
}
