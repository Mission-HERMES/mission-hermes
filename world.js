// --- Dimensions de la carte ---
const COLS = 20;
const ROWS = 12;

// --- Propriétaires ---
const PLAYER = 1;
const AI = 2;
const NEUTRAL = 0;

// --- Grille principale (cases = objets) ---
let grid = [];

// --- Création d'une case ---
function createCell() {
  return {
    owner: NEUTRAL,        // joueur / IA / neutre
    hp: 10,                // points de vie de base
    maxHp: 10,             // utile pour la barre de vie
    terrain: randomTerrain().id, // type de terrain (land, forest, mountain, water)
    building: null,        // "factory", "port", "base", etc.
    unit: null             // unité présente (optionnel)
  };
}

// --- Génération de la carte ---
function initMap() {
  grid = [];

  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];
    for (let x = 0; x < COLS; x++) {
      grid[y][x] = createCell();
    }
  }

  // --- Position de départ du joueur ---
  const py = Math.floor(ROWS / 2);
  grid[py][2].owner = PLAYER;
  grid[py][2].hp = 15;
  grid[py][2].maxHp = 15;
  grid[py][2].building = "base";

  // --- Position de départ de l'IA ---
  const ay = Math.floor(ROWS / 2);
  grid[ay][COLS - 3].owner = AI;
  grid[ay][COLS - 3].hp = 15;
  grid[ay][COLS - 3].maxHp = 15;
  grid[ay][COLS - 3].building = "base";
}

// --- Vérifie si une position est dans la carte ---
function inBounds(x, y) {
  return x >= 0 && x < COLS && y >= 0 && y < ROWS;
}

// --- Récupère une case ---
function getCell(x, y) {
  if (!inBounds(x, y)) return null;
  return grid[y][x];
}
