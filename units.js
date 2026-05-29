// --- Liste des unités disponibles ---
const UNITS = {
  infantry: {
    id: "infantry",
    name: "Infanterie",
    hp: 10,
    attack: 4,
    range: 1,
    move: 1,
    cost: 5,
    allowedTerrain: ["land", "forest", "mountain"],
    icon: "infantry"
  },

  tank: {
    id: "tank",
    name: "Char",
    hp: 20,
    attack: 7,
    range: 1,
    move: 2,
    cost: 12,
    allowedTerrain: ["land", "forest"],
    icon: "tank"
  },

  ship: {
    id: "ship",
    name: "Navire",
    hp: 18,
    attack: 6,
    range: 2,
    move: 3,
    cost: 15,
    allowedTerrain: ["water"],
    icon: "ship"
  },

  plane: {
    id: "plane",
    name: "Avion",
    hp: 12,
    attack: 5,
    range: 3,
    move: 4,
    cost: 20,
    allowedTerrain: ["land", "forest", "mountain", "water"],
    icon: "plane"
  }
};

// --- Créer une unité sur une case ---
function createUnit(x, y, type, owner) {
  const cell = getCell(x, y);
  if (!cell) return false;

  const unit = UNITS[type];
  if (!unit) return false;

  // Vérifie que le terrain est compatible
  if (!unit.allowedTerrain.includes(cell.terrain)) return false;

  // Vérifie que la case appartient au joueur/IA
  if (cell.owner !== owner) return false;

  // Vérifie qu'il n'y a pas déjà une unité
  if (cell.unit !== null) return false;

  // Vérifie le coût (géré par engine.js)
  cell.unit = {
    type: type,
    owner: owner,
    hp: unit.hp,
    maxHp: unit.hp
  };

  return true;
}

// --- Déplacement d'une unité ---
function moveUnit(fromX, fromY, toX, toY) {
  const from = getCell(fromX, fromY);
  const to = getCell(toX, toY);

  if (!from || !to) return false;
  if (!from.unit) return false;

  const unit = UNITS[from.unit.type];

  // Vérifie la distance
  const dist = Math.abs(fromX - toX) + Math.abs(fromY - toY);
  if (dist > unit.move) return false;

  // Vérifie le terrain
  if (!unit.allowedTerrain.includes(to.terrain)) return false;

  // Vérifie que la case est libre
  if (to.unit !== null) return false;

  // Déplacement
  to.unit = from.unit;
  from.unit = null;

  return true;
}

// --- Attaque d'une unité ---
function unitAttack(ax, ay, tx, ty) {
  const attackerCell = getCell(ax, ay);
  const targetCell = getCell(tx, ty);

  if (!attackerCell || !targetCell) return false;
  if (!attackerCell.unit) return false;

  const unit = UNITS[attackerCell.unit.type];

  // Vérifie la portée
  const dist = Math.abs(ax - tx) + Math.abs(ay - ty);
  if (dist > unit.range) return false;

  // Impossible d'attaquer une case vide
  if (targetCell.unit === null && targetCell.owner === attackerCell.unit.owner)
    return false;

  // Si la case contient une unité ennemie → combat unité vs unité
  if (targetCell.unit && targetCell.unit.owner !== attackerCell.unit.owner) {
    targetCell.unit.hp -= unit.attack;

    if (targetCell.unit.hp <= 0) {
      targetCell.unit = null;
    }

    return "hit-unit";
  }

  // Sinon → attaque la case (combat.js)
  return attackCell(ax, ay, tx, ty);
}
