// --- Sélecteurs ---
const gameEl = document.getElementById("game");
const hudEl = document.getElementById("hud");

// --- Rendu principal ---
function render() {
  gameEl.innerHTML = "";

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = getCell(x, y);
      const div = document.createElement("div");
      div.classList.add("cell");

      // --- Terrain ---
      div.classList.add(`terrain-${cell.terrain}`);

      // --- Propriétaire ---
      if (cell.owner === PLAYER) div.classList.add("owner-player");
      else if (cell.owner === AI) div.classList.add("owner-ai");
      else div.classList.add("owner-neutral");

      // --- Bâtiment ---
      if (cell.building) {
        const icon = document.createElement("div");
        icon.classList.add("building-icon", cell.building);
        div.appendChild(icon);
      }

      // --- Unité ---
      if (cell.unit) {
        const u = document.createElement("div");
        u.classList.add("unit-icon", cell.unit.type);
        u.style.position = "absolute";
        u.style.left = "6px";
        u.style.top = "6px";
        u.style.width = "20px";
        u.style.height = "20px";
        u.style.opacity = "0.95";
        div.appendChild(u);
      }

      // --- Barre de vie ---
      const hpBar = document.createElement("div");
      hpBar.classList.add("hp-bar");

      const hpFill = document.createElement("div");
      hpFill.classList.add("hp-fill");
      hpFill.style.width = `${(cell.hp / cell.maxHp) * 100}%`;

      hpBar.appendChild(hpFill);
      div.appendChild(hpBar);

      // --- Clic du joueur ---
      div.onclick = () => handleClick(x, y);

      gameEl.appendChild(div);
    }
  }

  updateHUD();
}

// --- HUD ---
function updateHUD() {
  hudEl.innerHTML = `
    <b>Or :</b> ${gold}<br>
    <b>Tour :</b> ${turn}<br>
  `;
}

// --- Gestion des clics ---
let selected = null;

function handleClick(x, y) {
  const cell = getCell(x, y);

  // Sélection d'une unité du joueur
  if (cell.unit && cell.unit.owner === PLAYER) {
    selected = { x, y };
    return;
  }

  // Si une unité est sélectionnée → tentative de déplacement
  if (selected) {
    const moved = moveUnit(selected.x, selected.y, x, y);
    if (moved) {
      selected = null;
      render();
      return;
    }

    // Sinon → tentative d'attaque
    const attacked = unitAttack(selected.x, selected.y, x, y);
    if (attacked) {
      selected = null;
      render();
      return;
    }
  }

  // Attaque directe d'une case (sans unité)
  const attacker = getCell(x, y);
  if (attacker.owner === PLAYER) {
    // Attaque adjacente
    // (ex: clic sur une case ennemie)
  }
}

// --- Boucle de jeu ---
let turn = 1;

function gameLoop() {
  // Économie
  updateEconomy();
  gold += updateBuildingsEconomy();

  // IA
  aiTurn();

  // Rendu
  render();

  turn++;
}

// --- Initialisation ---
initMap();
render();
setInterval(gameLoop, 900);
