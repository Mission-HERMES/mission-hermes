// --- Sélecteurs ---
const menuEl = document.getElementById("menu");
const gameContainer = document.getElementById("game");

// --- Affiche le menu principal ---
function showMenu() {
  menuEl.style.display = "flex";
  gameContainer.style.display = "none";
  hudRoot.style.display = "none";
}

// --- Lance une nouvelle partie ---
function startNewGame() {
  initMap();     // recrée la carte
  gold = 10;     // reset économie
  turn = 1;      // reset tour

  menuEl.style.display = "none";
  gameContainer.style.display = "grid";
  hudRoot.style.display = "block";

  render();      // affiche la carte
}

// --- Continuer la partie (si déjà lancée) ---
function continueGame() {
  menuEl.style.display = "none";
  gameContainer.style.display = "grid";
  hudRoot.style.display = "block";

  render();
}

// --- Quitter = revenir au menu ---
function quitToMenu() {
  showMenu();
}

// --- Brancher les boutons du menu ---
function initMenuButtons() {
  document.getElementById("btn-new").onclick = startNewGame;
  document.getElementById("btn-continue").onclick = continueGame;
  document.getElementById("btn-quit").onclick = quitToMenu;
}

// --- Initialisation du menu au chargement ---
initMenuButtons();
showMenu();
