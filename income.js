// --- Ressource principale ---
let gold = 5;

// --- Mise à jour de l'économie ---
function updateEconomy() {
  let playerCells = 0;

  // Compte le nombre de cases contrôlées par le joueur
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === PLAYER) {
        playerCells++;
      }
    }
  }

  // Gain d'or : 1 or pour 5 cases contrôlées
  gold += Math.floor(playerCells / 5);
}
