// --- Tour de l'IA avancée ---
function aiTurn() {
  // 1) Produire des unités si possible
  aiProduceUnits();

  // 2) Attaquer les cibles proches
  aiAttackNearby();

  // 3) Capturer / avancer vers le joueur
  aiMoveTowardsPlayer();
}

// --- Récupère toutes les cases appartenant à l'IA ---
function getAICells() {
  const cells = [];

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = getCell(x, y);
      if (cell.owner === AI) {
        cells.push({ x, y, cell });
      }
    }
  }

  return cells;
}

// --- IA : production d'unités ---
function aiProduceUnits() {
  const aiCells = getAICells();

  for (const { x, y, cell } of aiCells) {
    if (!cell.building) continue;
    if (gold < 5) continue; // IA utilise la même ressource or

    // Base → infanterie
    if (cell.building === "base") {
      const ok = createUnit(x, y, "infantry", AI);
      if (ok) {
        gold -= UNITS.infantry.cost;
      }
    }

    // Usine → chars
    if (cell.building === "factory" && gold >= UNITS.tank.cost) {
      const ok = createUnit(x, y, "tank", AI);
      if (ok) {
        gold -= UNITS.tank.cost;
      }
    }

    // Port → navires
    if (cell.building === "port" && gold >= UNITS.ship.cost) {
      const ok = createUnit(x, y, "ship", AI);
      if (ok) {
        gold -= UNITS.ship.cost;
      }
    }
  }
}

// --- IA : attaque les cases adjacentes intéressantes ---
function aiAttackNearby() {
  const aiCells = getAICells();

  for (const { x, y, cell } of aiCells) {
    // Attaque avec unités d'abord
    if (cell.unit && cell.unit.owner === AI) {
      const targets = getAdjacentEnemyTargets(x, y, AI);

      if (targets.length > 0) {
        const t = targets[Math.floor(Math.random() * targets.length)];
        unitAttack(x, y, t.x, t.y);
      }
    } else {
      // Sinon, attaque de case à case
      const targets = getAdjacentEnemyCells(x, y, AI);

      if (targets.length > 0) {
        const t = targets[Math.floor(Math.random() * targets.length)];
        attackCell(x, y, t.x, t.y);
      }
    }
  }
}

// --- IA : se rapproche des zones du joueur ---
function aiMoveTowardsPlayer() {
  const aiCells = getAICells();

  for (const { x, y, cell } of aiCells) {
    if (!cell.unit || cell.unit.owner !== AI) continue;

    const target = findNearestPlayerCell(x, y);
    if (!target) continue;

    const next = stepTowards(x, y, target.x, target.y);

    if (next && inBounds(next.x, next.y)) {
      moveUnit(x, y, next.x, next.y);
    }
  }
}

// --- Renvoie les cases ennemies adjacentes ---
function getAdjacentEnemyCells(x, y, owner) {
  const res = [];
  const dirs = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 }
  ];

  for (const d of dirs) {
    const nx = x + d.dx;
    const ny = y + d.dy;
    const c = getCell(nx, ny);

    if (c && c.owner !== owner && c.owner !== NEUTRAL && c.terrain !== "water") {
      res.push({ x: nx, y: ny });
    }
  }

  return res;
}

// --- Renvoie les cibles (unités ou cases) adjacentes ennemies ---
function getAdjacentEnemyTargets(x, y, owner) {
  const res = [];
  const dirs = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 }
  ];

  for (const d of dirs) {
    const nx = x + d.dx;
    const ny = y + d.dy;
    const c = getCell(nx, ny);

    if (!c) continue;

    // Unité ennemie
    if (c.unit && c.unit.owner !== owner) {
      res.push({ x: nx, y: ny });
      continue;
    }

    // Case ennemie
    if (c.owner !== owner && c.owner !== NEUTRAL && c.terrain !== "water") {
      res.push({ x: nx, y: ny });
    }
  }

  return res;
}

// --- Trouve la case du joueur la plus proche ---
function findNearestPlayerCell(x, y) {
  let best = null;
  let bestDist = Infinity;

  for (let yy = 0; yy < ROWS; yy++) {
    for (let xx = 0; xx < COLS; xx++) {
      const cell = getCell(xx, yy);
      if (cell.owner === PLAYER) {
        const d = Math.abs(xx - x) + Math.abs(yy - y);
        if (d < bestDist) {
          bestDist = d;
          best = { x: xx, y: yy };
        }
      }
    }
  }

  return best;
}

// --- Calcule un pas vers une cible ---
function stepTowards(x, y, tx, ty) {
  const dx = tx - x;
  const dy = ty - y;

  let nx = x;
  let ny = y;

  if (Math.abs(dx) > Math.abs(dy)) {
    nx += dx > 0 ? 1 : -1;
  } else if (dy !== 0) {
    ny += dy > 0 ? 1 : -1;
  }

  return { x: nx, y: ny };
}
