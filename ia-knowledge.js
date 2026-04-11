function askBaseAI() {
    const input = document.getElementById("ai-input").value.toLowerCase();
    const chat = document.getElementById("ai-chat");

    const responses = [
        // MÉTÉO
        { keys: ["température", "dehors", "froid", "chaud"], text: "La température extérieure est de –63°C. L’exposition directe est déconseillée." },
        { keys: ["tempête", "météo", "temps"], text: "Aucune tempête détectée dans un rayon de 12 km." },
        { keys: ["vent"], text: "Vent faible, 14 km/h, direction nord‑est." },
        { keys: ["radiation", "rayonnement"], text: "Radiation solaire modérée. Combinaison renforcée recommandée." },
        { keys: ["pression"], text: "Pression atmosphérique instable, sortie extravéhiculaire non autorisée." },

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

    let response = "Je ne possède pas ces informations dans ma base de données.";

    for (let r of responses) {
        if (r.keys.some(k => input.includes(k))) {
            response = r.text;
            break;
        }
    }

    chat.innerHTML += `<p><b>Vous :</b> ${input}</p>`;
    chat.innerHTML += `<p><b>HERMES AI :</b> ${response}</p>`;
    chat.scrollTop = chat.scrollHeight;

    document.getElementById("ai-input").value = "";
}
