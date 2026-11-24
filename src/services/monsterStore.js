import { createStore } from "./storage.js";

// Table 2: monsters  { id, name, size, type, cr, ac, hp, speed, str..cha, description, actions }
const seed = [
  { id: "seed-1", createdAt: "2026-01-01T00:00:00.000Z",
    name: "Gloomcap Ogre", size: "Large", type: "Giant", cr: "3", ac: 13, hp: 59, speed: "40 ft.",
    str: 19, dex: 8, con: 16, int: 5, wis: 7, cha: 7,
    description: "A moss-draped brute that sleeps in cave mouths and hurls mushrooms that burst into choking spores.",
    actions: "Greatclub. +6 to hit, 13 (2d8+4) bludgeoning damage.\nSpore Toss. Range 30 ft., DC 13 Con save or poisoned for 1 minute." },
  { id: "seed-2", createdAt: "2026-01-01T00:00:00.000Z",
    name: "Candlewick Wraith", size: "Medium", type: "Undead", cr: "5", ac: 14, hp: 67, speed: "fly 50 ft.",
    str: 6, dex: 18, con: 12, int: 11, wis: 14, cha: 16,
    description: "The ghost of a lamplighter who still drifts through halls snuffing out every flame.",
    actions: "Life Drain. +7 to hit, 21 (4d8+3) necrotic damage; max HP reduced by the same amount.\nSnuff. Magical light within 30 ft. is dispelled." },
];

export const monsterStore = createStore("mb:monsters", seed);
