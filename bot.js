// --- Tour de l'IA ---
function aiTurn() {
  const choices = [];

  // Cherche toutes les cases capturables par l'IA
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {

      // L'IA peut capturer : neutre ou joueur
      if (grid[y][x] !== AI) {
        if (isAdjacentTo(x, y, AI)) {
          choices.push({ x, y });
        }
      }
    }
  }

  // Si aucune case possible → IA ne joue pas
  if (choices.length === 0) return;

  // Choix aléatoire parmi les cases adjacentes
  const pick = choices[Math.floor(Math.random() * choices.length)];

  // Capture
  grid[pick.y][pick.x] = AI;
}
