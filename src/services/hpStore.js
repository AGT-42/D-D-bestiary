// Remembers each monster's current HP in this browser's localStorage.
// `scope` keeps HP separate per place it's tracked (e.g. each campaign gets its own).
const KEY = "mb:hp";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
};

const slot = (scope, monsterId) => `${scope}:${monsterId}`;

// Returns max HP if nothing was saved yet. Never returns more than max HP.
export const getHp = (scope, monsterId, maxHp) => {
  const saved = read()[slot(scope, monsterId)];
  return saved === undefined ? maxHp : Math.min(saved, maxHp);
};

export const setHp = (scope, monsterId, value) =>
  localStorage.setItem(KEY, JSON.stringify({ ...read(), [slot(scope, monsterId)]: value }));
