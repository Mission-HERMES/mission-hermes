/* ================================
   SIDEBAR RÉTRACTABLE
================================ */
const sidebar   = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const content   = document.getElementById("content");

if (toggleBtn && sidebar && content) {
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        content.classList.toggle("shift");
    });
}

/* ================================
   LOUPE + BOÎTE DE RECHERCHE
================================ */
const searchToggle = document.getElementById("searchToggle");
const searchBox    = document.getElementById("searchBox");
const searchInput  = document.getElementById("searchInput");

if (searchToggle && searchBox && searchInput) {
    searchToggle.addEventListener("click", () => {
        const visible = searchBox.style.display === "block";
        searchBox.style.display = visible ? "none" : "block";
        if (!visible) searchInput.focus();
    });

    function searchSite() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        const pageText = document.body.innerText.toLowerCase();
        if (pageText.includes(query)) {
            alert("Résultat trouvé sur cette page !");
        } else {
            alert("Aucun résultat trouvé sur cette page.");
        }
    }

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchSite();
    });
}

/* ================================
   THEMES (dark / light / proxima)
================================ */
const themeButtons = document.querySelectorAll(".theme-btn");

if (themeButtons.length > 0) {
    themeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const theme = btn.dataset.theme;
            document.body.classList.remove("theme-dark", "theme-light", "theme-proxima");
            document.body.classList.add(`theme-${theme}`);

            themeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}

/* ================================
   TRANSITION DE PAGE + SCAN
================================ */
window.addEventListener("load", () => {
    const c = document.getElementById("content");
    if (c) c.classList.add("visible");

    const scanLine = document.getElementById("scanLine");
    if (scanLine) {
        scanLine.style.animation = "none";
        void scanLine.offsetWidth;
        scanLine.style.animation = "scanMove 2.5s linear";
    }
});

// fondu lors du changement de page
document.querySelectorAll("a[href$='.html']").forEach(link => {
    link.addEventListener("click", (e) => {
        const url = link.getAttribute("href");
        if (!url || url.startsWith("#")) return;
        e.preventDefault();
        const c = document.getElementById("content");
        if (!c) {
            window.location.href = url;
            return;
        }
        c.classList.remove("visible");
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    });
});

/* ================================
   ÉTOILES FILANTES
================================ */
const shootingStar = document.getElementById("shootingStar");

function launchShootingStar() {
    if (!shootingStar) return;
    shootingStar.style.animation = "none";
    void shootingStar.offsetWidth;
    shootingStar.style.animation = "shoot 2.5s linear";
}

setInterval(() => {
    if (Math.random() < 0.35) launchShootingStar();
}, 8000);

/* ================================
   CARTE INTERACTIVE (base.html)
================================ */
const baseInfo = document.getElementById("baseInfo");
const zones    = document.querySelectorAll(".base-map .zone");

if (baseInfo && zones.length > 0) {
    const zoneDescriptions = {
        "Habitat": "Zone de vie pressurisée pour les astronautes, avec modules de repos et de travail.",
        "Serre": "Production de nourriture, recyclage de l’air et expérimentation sur les plantes.",
        "Laboratoire": "Recherche scientifique, analyses d’échantillons et expériences en micro‑gravité.",
        "Sas": "Zone de transition pour les sorties extravéhiculaires et la logistique."
    };

    zones.forEach(zone => {
        zone.addEventListener("mouseenter", () => {
            const label = zone.dataset.label;
            baseInfo.textContent = zoneDescriptions[label] || "";
        });
        zone.addEventListener("mouseleave", () => {
            baseInfo.textContent = "Survolez une zone pour voir sa description.";
        });
    });
}

/* ================================
   ASSISTANT IA (ia.html)
================================ */
const aiOutput   = document.getElementById("aiOutput");
const aiQuestion = document.getElementById("aiQuestion");
const aiAskBtn   = document.getElementById("aiAskBtn");

if (aiOutput && aiQuestion && aiAskBtn) {
    const aiKnowledge = [
        { key: "énergie",   answer: "La base est alimentée par des panneaux solaires et du stockage d’hélium‑3 pour la fusion." },
        { key: "base",      answer: "La base est semi‑enterrée pour protéger des radiations et imprimée en 3D à partir du régolithe." },
        { key: "vaisseau",  answer: "Le vaisseau HERMES utilise une propulsion à fusion nucléaire pour atteindre Proxima Centauri b." },
        { key: "ia",        answer: "L’IA gère la maintenance, la sécurité, l’optimisation énergétique et l’assistance aux astronautes." },
        { keys: ["température", "dehors", "froid", "chaud"],  answer: "La température extérieure est de –63°C. L’exposition directe est déconseillée." },
        { keys: ["tempête", "météo", "temps"],                answer: "Aucune tempête détectée dans un rayon de 12 km." },
        { keys: ["vent"],                                     answer: "Vent faible, 14 km/h, direction nord‑est." },
        { keys: ["radiation", "rayonnement"],                 answer: "Radiation solaire modérée. Combinaison renforcée recommandée." },
        { keys: ["pression"],                                 answer: "Pression atmosphérique instable, sortie extravéhiculaire non autorisée." },

        // ÉTAT DE LA BASE
        { keys: ["base", "modules", "état"], text: "Tous les modules sont opérationnels." },
        { keys: ["habitation"], text: "Le module d’habitation est stable. Aucun incident signalé." },
        { keys: ["générateur"], text: "Le générateur principal fonctionne à 92% de capacité." },
        { keys: ["serre", "plantes"], text: "La serre hydroponique est en cycle de croissance optimal." },
        { keys: ["sas"], text: "Le sas 2 nécessite une inspection dans les 48 heures." },

        // ÉNERGIE
        { keys: ["batterie", "énergie"], text: "Batteries : 78% de charge. Autonomie estimée : 19 heures." },
        { keys: ["panneaux", "solaires"], text: "Panneaux solaires : rendement actuel 64%." },
        { keys: ["air", "oxygène"], text: "Système de recyclage d’air : fonctionnement normal." },
        { keys: ["réacteur"], text: "Réacteur à fusion : température stable, aucune anomalie." },

        // NAVIGATION / EXTÉRIEUR
        { keys: ["rover"], text: "Le rover est prêt. Autonomie : 32 km." },
        { keys: ["drone"], text: "Drones de reconnaissance : 2 disponibles, 1 en maintenance." },
        { keys: ["mouvement", "extérieur"], text: "Aucun mouvement détecté autour de la base." },
        { keys: ["balise"], text: "La balise de positionnement fonctionne normalement." },

        // MAINTENANCE
        { keys: ["outil", "outils"], text: "Aucun outil critique manquant." },
        { keys: ["bras", "robotique"], text: "Le bras robotique est calibré et opérationnel." },
        { keys: ["filtre"], text: "Filtre à particules du module 3 à remplacer dans 72 heures." },
        { keys: ["panneau"], text: "Inspection thermique recommandée sur le panneau 4." },

        // SANTÉ
        { keys: ["santé", "vital"], text: "Signes vitaux normaux." },
        { keys: ["hydratation"], text: "Hydratation recommandée dans les 30 prochaines minutes." },
        { keys: ["air", "contaminant"], text: "Aucun contaminant détecté dans l’air intérieur." },
        { keys: ["fatigue"], text: "Niveau de fatigue estimé : modéré." },
        { keys: ["combinaison"], text: "Pensez à vérifier l’intégrité de votre combinaison." },

        // SCIENCE
        { keys: ["géologie", "sol"], text: "Analyse du sol : forte concentration en silicates." },
        { keys: ["échantillon"], text: "Les échantillons stockés en laboratoire sont stables." },
        { keys: ["atmosphère"], text: "Les données atmosphériques ont été mises à jour." },

        // RESSOURCES
        { keys: ["eau"], text: "Réserves d’eau : 64%." },
        { keys: ["ration", "nourriture"], text: "Rations alimentaires : autonomie de 41 jours." },
        { keys: ["oxygène"], text: "Oxygène : 82%." },
        { keys: ["carburant"], text: "Carburant du rover : 57%." },

        // URGENCES
        { keys: ["fuite"], text: "Alerte : fuite détectée dans le module 2. Procédure d’isolement enclenchée." },
        { keys: ["pression"], text: "Alerte : pression anormale dans le sas principal." },
        { keys: ["chaud", "température interne"], text: "Alerte : température interne en hausse. Ventilation renforcée." },
        { keys: ["communication"], text: "Alerte : communication externe interrompue. Passage en mode autonome." },
        { keys: ["radiation"], text: "Alerte : radiation élevée. Restez à l’intérieur." }
    ];

    function askAI() {
        const q = aiQuestion.value.toLowerCase().trim();
        if (!q) return;

        let response = "Je n’ai pas encore cette information dans ma base de données locale.";
        for (const item of aiKnowledge) {
            if (q.includes(item.key)) {
                response = item.answer;
                break;
            }
        }
        aiOutput.textContent = response;
        aiQuestion.value = "";
    }

    aiAskBtn.addEventListener("click", askAI);
    aiQuestion.addEventListener("keypress", (e) => {
        if (e.key === "Enter") askAI();
    });
}
function getTodayDate() {
    const date = new Date();
    return "Publié le " + date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

/* ================================
   ACTUALITÉS DYNAMIQUES
================================ */
const newsContainer = document.getElementById("newsContainer");

if (newsContainer) {
    fetch("news.json")
        .then(response => response.json())
        .then(newsList => {
            newsList.forEach(item => {
                const card = document.createElement("div");
                card.style.background = "rgba(255,255,255,0.08)";
                card.style.padding = "16px";
                card.style.borderRadius = "14px";
                card.style.border = "1px solid var(--glass-border)";
                card.style.transition = "0.3s";

                card.innerHTML = `
                    <h3>${item.titre}</h3>
                    <p>${item.texte}</p>
                    <p style="color:var(--text-dim); font-size:0.8rem;">
                        ${getTodayDate()}
                    </p>
                `;

                // Effet hover premium
                card.addEventListener("mouseenter", () => {
                    card.style.transform = "translateY(-6px)";
                    card.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4)";
                });

                card.addEventListener("mouseleave", () => {
                    card.style.transform = "translateY(0)";
                    card.style.boxShadow = "none";
                });

                newsContainer.appendChild(card);
            });
        })
        .catch(err => {
            newsContainer.innerHTML = "<p>Impossible de charger les actualités.</p>";
            console.error(err);
        });
}
