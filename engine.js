// --- Sélecteurs principaux ---
const gameEl = document.getElementById("game");
const statsEl = document.getElementById("stats");

// --- Rendu de la carte ---
function render() {
  gameEl.innerHTML = "";

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {

      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Couleur selon propriétaire
      if (grid[y][x] === PLAYER) cell.classList.add("player");
      else if (grid[y][x] === AI) cell.classList.add("ai");
      else cell.classList.add("neutral");

      // Clic du joueur
      cell.onclick = () => {
        if (playerTryCapture(x, y)) {
          render(); // rafraîchit la carte
        }
      };

      gameEl.appendChild(cell);
    }
  }

  // Affichage des stats
  statsEl.textContent = `Or : ${gold}`;
}

// --- Boucle de jeu ---
function gameLoop() {
  updateEconomy(); // économie
  aiTurn();        // IA
  render();        // affichage
}

// --- Initialisation ---
initMap();
render();
setInterval(gameLoop, 800); // 1 tour toutes les 0.8 secondes
