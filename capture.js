// --- Tentative de capture d'une case (sans unité) ---
// Le joueur clique sur une case ennemie adjacente
function playerTryCapture(x, y, targetX, targetY) {
  const attacker = getCell(x, y);
  const defender = getCell(targetX, targetY);

  if (!attacker || !defender) return false;

  // Doit appartenir au joueur
  if (attacker.owner !== PLAYER) return false;

  // Doit être adjacent
  if (!isAdjacent(x, y, targetX, targetY)) return false;

  // Impossible d'attaquer l'eau
  if (defender.terrain === "water") return false;

  // Si la case est déjà à nous → rien
  if (defender.owner === PLAYER) return false;

  // On utilise le système de combat
  const result = attackCell(x, y, targetX, targetY);

  return result;
}

// --- Capture forcée (utilisée par l'IA ou scripts) ---
function forceCapture(x, y, newOwner) {
  const cell = getCell(x, y);
  if (!cell) return false;

  cell.owner = newOwner;
  cell.hp = cell.maxHp;

  // Détruit le bâtiment si existant
  if (cell.building) {
    destroyBuilding(x, y);
  }

  return true;
}

// --- Vérifie si une case est capturable (utile pour IA) ---
function isCapturable(x, y, owner) {
  const cell = getCell(x, y);
  if (!cell) return false;

  // Pas capturable si déjà à nous
  if (cell.owner === owner) return false;

  // Pas capturable si eau
  if (cell.terrain === "water") return false;

  return true;
}
