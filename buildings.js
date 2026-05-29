// --- Liste des bâtiments disponibles ---
const BUILDINGS = {
  base: {
    id: "base",
    name: "Base",
    hpBonus: 10,
    income: 1,       // +1 or par tour
    icon: "base"
  },

  factory: {
    id: "factory",
    name: "Usine",
    hpBonus: 5,
    income: 2,       // +2 or par tour
    icon: "factory"
  },

  port: {
    id: "port",
    name: "Port",
    hpBonus: 3,
    income: 1,
    icon: "port"
  }
};

// --- Construire un bâtiment sur une case ---
function buildBuilding(x, y, type, owner) {
  const cell = getCell(x, y);
  if (!cell) return false;

  // Case doit appartenir au joueur ou à l'IA
  if (cell.owner !== owner) return false;

  // Pas de construction sur l'eau
  if (cell.terrain === "water") return false;

  // Pas de double bâtiment
  if (cell.building !== null) return false;

  const building = BUILDINGS[type];
  if (!building) return false;

  // Construction
  cell.building = type;
  cell.maxHp += building.hpBonus;
  cell.hp = cell.maxHp;

  return true;
}

// --- Détruit un bâtiment (appelé par combat.js) ---
function destroyBuilding(x, y) {
  const cell = getCell(x, y);
  if (!cell || !cell.building) return;

  const building = BUILDINGS[cell.building];

  // Retire le bonus HP
  cell.maxHp -= building.hpBonus;
  if (cell.hp > cell.maxHp) cell.hp = cell.maxHp;

  // Supprime le bâtiment
  cell.building = null;
}

// --- Production automatique des bâtiments ---
function updateBuildingsEconomy() {
  let income = 0;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = grid[y][x];

      if (cell.owner === PLAYER && cell.building) {
        income += BUILDINGS[cell.building].income;
      }
    }
  }

  return income; // engine.js ajoutera cet income à l’or du joueur
}
