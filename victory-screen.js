// --- Sélecteur de l'écran de victoire ---
const victoryScreen = document.getElementById("victory-screen");

// --- Vérifie si le joueur ou l'IA a gagné ---
function checkVictory() {
  let playerHasBase = false;
  let aiHasBase = false;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = getCell(x, y);

      if (cell.building === "base") {
        if (cell.owner === PLAYER) playerHasBase = true;
        if (cell.owner === AI) aiHasBase = true;
      }
    }
  }

  if (!playerHasBase) {
    showVictoryScreen("Défaite");
    return true;
  }

  if (!aiHasBase) {
    showVictoryScreen("Victoire !");
    return true;
  }

  return false;
}

// --- Affiche l'écran de victoire/défaite ---
function showVictoryScreen(text) {
  victoryScreen.style.display = "flex";
  victoryScreen.innerHTML = `
    <div>${text}</div>
    <button class="victory-btn" id="btn-restart">Rejouer</button>
    <button class="victory-btn" id="btn-menu">Menu principal</button>
  `;

  document.getElementById("btn-restart").onclick = () => {
    victoryScreen.style.display = "none";
    startNewGame();
  };

  document.getElementById("btn-menu").onclick = () => {
    victoryScreen.style.display = "none";
    showMenu();
  };
}

// --- À appeler à chaque tour dans gameLoop() ---
function victoryCheckLoop() {
  if (checkVictory()) {
    // Stoppe la boucle de jeu si tu veux
    // clearInterval(gameInterval);
  }
}
