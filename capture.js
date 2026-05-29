// Vérifie si une position est dans la grille
function inBounds(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS;
}

// Vérifie si une case est adjacente à un territoire donné
function isAdjacentTo(x, y, owner) {
  const dirs = [
    [1, 0], [-1, 0],
    [0, 1], [0, -1]
  ];

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;

    if (inBounds(nx, ny) && grid[ny][nx] === owner) {
      return true;
    }
  }
  return false;
}

// Tentative de capture par le joueur
function playerTryCapture(x, y) {
  // Déjà à toi → inutile
  if (grid[y][x] === PLAYER) return false;

  // Pas adjacent → interdit
  if (!isAdjacentTo(x, y, PLAYER)) return false;

  // Pas assez d'or → impossible
  if (gold < 1) return false;

  // Capture validée
  gold--;
  grid[y][x] = PLAYER;
  return true;
}
