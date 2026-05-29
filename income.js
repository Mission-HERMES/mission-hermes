// --- Ressources du joueur ---
let gold = 10; // or de départ

// --- Coût d'entretien des unités (optionnel) ---
const UNIT_UPKEEP = {
  infantry: 0,
  tank: 1,
  ship: 1,
  plane: 2
};

// --- Calcule l'entretien total des unités ---
function computeUnitUpkeep() {
  let upkeep = 0;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = grid[y][x];

      if (cell.unit && cell.unit.owner === PLAYER) {
        const type = cell.unit.type;
        upkeep += UNIT_UPKEEP[type] || 0;
      }
    }
  }

  return upkeep;
}

// --- Calcule l'or gagné par les cases possédées ---
function computeTerritoryIncome() {
  let income = 0;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = grid[y][x];

      if (cell.owner === PLAYER) {
        income += 1; // +1 or par case contrôlée
      }
    }
  }

  return income;
}

// --- Mise à jour complète de l'économie ---
function updateEconomy() {
  const territoryIncome = computeTerritoryIncome();
  const buildingIncome = updateBuildingsEconomy();
  const upkeep = computeUnitUpkeep();

  const total = territoryIncome + buildingIncome - upkeep;

  gold += total;

  // Empêche l'or de devenir négatif
  if (gold < 0) gold = 0;

  return {
    territory: territoryIncome,
    buildings: buildingIncome,
    upkeep: upkeep,
    total: total
  };
}
