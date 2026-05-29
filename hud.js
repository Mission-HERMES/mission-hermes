// --- Référence HUD ---
const hudRoot = document.getElementById("hud");

// Dernière case cliquée (mise à jour dans handleClick)
let lastSelectedCell = null;

// --- Mise à jour complète du HUD ---
function renderHUD() {
  if (!hudRoot) return;

  let info = "";

  // Infos globales
  info += `<div><b>Or :</b> ${gold}</div>`;
  info += `<div><b>Tour :</b> ${turn}</div>`;
  info += `<hr style="margin:8px 0; opacity:0.4;">`;

  if (lastSelectedCell) {
    const { x, y } = lastSelectedCell;
    const cell = getCell(x, y);
    if (cell) {
      info += `<div><b>Case :</b> (${x}, ${y})</div>`;
      info += `<div><b>Terrain :</b> ${cell.terrain}</div>`;
      info += `<div><b>Propriétaire :</b> ${
        cell.owner === PLAYER ? "Joueur" : cell.owner === AI ? "IA" : "Neutre"
      }</div>`;
      info += `<div><b>HP :</b> ${cell.hp} / ${cell.maxHp}</div>`;

      // Bâtiment
      if (cell.building) {
        info += `<div><b>Bâtiment :</b> ${cell.building}</div>`;
      }

      // Unité
      if (cell.unit) {
        const u = UNITS[cell.unit.type];
        info += `<div><b>Unité :</b> ${u.name}</div>`;
        info += `<div><b>Attaque :</b> ${u.attack}</div>`;
        info += `<div><b>Portée :</b> ${u.range}</div>`;
        info += `<div><b>Mouvement :</b> ${u.move}</div>`;
      }
    }
  } else {
    info += `<div>Aucune case sélectionnée.</div>`;
  }

  hudRoot.innerHTML = info;
}

// --- À appeler quand le joueur clique sur une case ---
function hudSelectCell(x, y) {
  lastSelectedCell = { x, y };
  renderHUD();
}
