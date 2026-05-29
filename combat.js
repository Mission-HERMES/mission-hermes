// --- Calcul des dégâts infligés ---
function computeDamage(attackerCell, defenderCell) {
  const baseDamage = 5;

  // Bonus défensif du terrain
  const terrainBonus = getDefenseBonus(defenderCell.terrain);

  // Si bâtiment → bonus défensif
  const buildingBonus = defenderCell.building ? 2 : 0;

  // Total défense
  const totalDefense = terrainBonus + buildingBonus;

  // Dégâts finaux
  return Math.max(1, baseDamage - totalDefense);
}

// --- Attaque d'une case ---
function attackCell(ax, ay, dx, dy) {
  const attacker = getCell(ax, ay);
  const defender = getCell(dx, dy);

  if (!attacker || !defender) return false;

  // Impossible d'attaquer la mer
  if (defender.terrain === "water") return false;

  // Impossible d'attaquer sa propre case
  if (attacker.owner === defender.owner) return false;

  // Calcul des dégâts
  const dmg = computeDamage(attacker, defender);

  defender.hp -= dmg;

  // Si la case est détruite → capture
  if (defender.hp <= 0) {
    defender.owner = attacker.owner;
    defender.hp = defender.maxHp;

    // Si un bâtiment existait → détruit
    defender.building = null;

    return "captured";
  }

  return "hit";
}

// --- Vérifie si une case est adjacente ---
function isAdjacent(ax, ay, bx, by) {
  return (
    (Math.abs(ax - bx) === 1 && ay === by) ||
    (Math.abs(ay - by) === 1 && ax === bx)
  );
}

// --- Tentative d'attaque du joueur ---
function playerAttack(x, y, targetX, targetY) {
  const attacker = getCell(x, y);
  const defender = getCell(targetX, targetY);

  if (!attacker || !defender) return false;

  // Doit être adjacent
  if (!isAdjacent(x, y, targetX, targetY)) return false;

  // Doit appartenir au joueur
  if (attacker.owner !== PLAYER) return false;

  return attackCell(x, y, targetX, targetY);
}
