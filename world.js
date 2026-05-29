// --- Dimensions de la carte ---
const COLS = 20;
const ROWS = 12;

// --- Identifiants des territoires ---
const PLAYER = 1;
const AI = 2;
const NEUTRAL = 0;

// --- Grille principale ---
let grid = [];

// --- Création de la carte ---
function initMap() {
  grid = [];

  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];
    for (let x = 0; x < COLS; x++) {
      grid[y][x] = NEUTRAL; // tout commence neutre
    }
  }

  // --- Position de départ du joueur ---
  grid[Math.floor(ROWS / 2)][2] = PLAYER;

  // --- Position de départ de l'IA ---
  grid[Math.floor(ROWS / 2)][COLS - 3] = AI;
}
