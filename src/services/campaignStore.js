import { createStore } from "./storage.js";

// Table 3: campaigns
//   { id, name, description, createdAt,
//     members: [{ key, monsterId, label?, cr? }],   // one entry per individual creature (duplicates allowed)
//     tracker: { round, active, init: { [memberKey]: n }, players: [{ key, name, init }] } }
const store = createStore("mb:campaigns");

export const newKey = () => crypto.randomUUID();

// Older saves stored a flat monsterIds list; turn each into an individual member once.
export const campaignStore = {
  ...store,
  all: () => {
    const rows = store.all();
    const old = rows.filter((r) => !r.members);
    if (old.length === 0) return rows;
    old.forEach((r) =>
      store.update(r.id, { members: (r.monsterIds ?? []).map((monsterId) => ({ key: newKey(), monsterId })), monsterIds: undefined })
    );
    return store.all();
  },
};
