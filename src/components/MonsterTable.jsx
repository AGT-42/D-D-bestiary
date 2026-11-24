import { Link } from "react-router-dom";

const cell = "px-4 py-2";

export default function MonsterTable({ monsters, onDelete }) {
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full text-left">
        <thead className="bg-ink text-paper">
          <tr>
            {["Name", "Type", "CR", "AC", "HP", "Actions"].map((h) => (
              <th key={h} className={`${cell} font-bold`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {monsters.map((m) => (
            <tr key={m.id}>
              <td className={cell}>
                <Link to={`/monsters/${m.id}`} className="text-ink hover:text-blood">{m.name}</Link>
              </td>
              <td className={cell}>{m.size} {m.type.toLowerCase()}</td>
              <td className={cell}>{m.cr}</td>
              <td className={cell}>{m.ac}</td>
              <td className={cell}>{m.hp}</td>
              <td className={`${cell} whitespace-nowrap`}>
                <Link to={`/monsters/${m.id}/edit`} className="mr-3 hover:text-blood">Edit</Link>
                <button onClick={() => onDelete(m)} className="text-blood hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
