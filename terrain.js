// --- Liste des types de terrains disponibles ---
const TERRAIN_TYPES = {
  land: {
    id: "land",
    name: "Terre",
    moveCost: 1,
    defenseBonus: 0,
    color: "#1f2937"
  },

  forest: {
    id: "forest",
    name: "Forêt",
    moveCost: 2,
    defenseBonus: 2,
    color: "#14532d"
  },

  mountain: {
    id: "mountain",
    name: "Montagne",
    moveCost: 3,
    defenseBonus: 4,
    color: "#3f3f46"
  },

  water: {
    id: "water",
    name: "Mer",
    moveCost: 999, // infranchissable sans bateau
    defenseBonus: 0,
    color: "#1e3a8a"
  }
};

// --- Génère un terrain aléatoire pour une case ---
function randomTerrain() {
  const keys = Object.keys(TERRAIN_TYPES);

  // Pondération simple : plus de terre que de montagnes
  const weighted = [
    "land", "land", "land", "land",
    "forest", "forest",
    "mountain",
    "water"
  ];

  const pick = weighted[Math.floor(Math.random() * weighted.length)];
  return TERRAIN_TYPES[pick];
}

// --- Récupère la couleur d’un terrain ---
function getTerrainColor(terrainId) {
  return TERRAIN_TYPES[terrainId].color;
}

// --- Bonus défensif d’un terrain ---
function getDefenseBonus(terrainId) {
  return TERRAIN_TYPES[terrainId].defenseBonus;
}

// --- Coût de déplacement (pour unités plus tard) ---
function getMoveCost(terrainId) {
  return TERRAIN_TYPES[terrainId].moveCost;
}
