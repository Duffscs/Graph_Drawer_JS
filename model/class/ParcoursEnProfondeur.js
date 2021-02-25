import { CANVAS, GC } from "../../Const.js"
import { GraphPane } from "../../view/GraphPane.js"
import { ListeDAdjacence } from "./ListeDAdjacence.js"
import { Position } from "./Position.js"

export class ParcoursEnProfondeur {

    /** @type {ListeDAdjacence} */ l
    /** @type {number[]} */ noeudExplore
    /** @type {number} */ niveauActuel
    /** @type {GraphPane} */ graph
    /** @type {number} */ verticalMax

    constructor(listeDAdjacence) {
        this.l = listeDAdjacence;
        this.noeudExplore = Array();
        this.niveauActuel = 0;
        this.noeudExplore.push(-1);
        this.noeudExplore.push(this.l.listePointeur.length);
        this.graph = new GraphPane(CANVAS[1],GC[1], false);
        this.graph.definirNombreDeNoeud(this.l.nombreNoeuds());
        this.verticalMax = 0;
    }

    tracerArbre(sommet) {
        while (sommet != -1) {
            this.explorerDepuisNoeud(sommet, this.verticalMax + 1);
            sommet = this.premierNoeudNonExplore();
        }
        this.graph.dessinerGraph();
        console.log(this.l);
    }

    explorerDepuisNoeud(noeud, vertical) {
        this.niveauActuel++;
        vertical = this.ajouterUnNoeud(noeud, vertical);
        this.noeudExplore.push(noeud);
        let prochain = this.prochainSucesseur(noeud);
        while (prochain > -1) {
            this.explorerDepuisNoeud(prochain, vertical);
            this.graph.ajouterArreteNumber(noeud + 1, prochain + 1);
            vertical++;
            prochain = this.prochainSucesseur(noeud);
        }
        this.niveauActuel--;
    }

    ajouterUnNoeud(noeud, vertical) {
        const pos = new Position(50.0 * this.niveauActuel, 50.0 * vertical);
        vertical = this.trouverUnePositionLibre(vertical, pos);
        this.graph.getNoeud(noeud).pos = pos;
        if (vertical > this.verticalMax)
            this.verticalMax = vertical;
        return vertical;
    }

    prochainSucesseur(noeud) {
        let start = 0;
        if (noeud != 0)
            start = this.l.getPointeur(noeud - 1);
        for (let i = start; i < this.l.getPointeur(noeud); i++) {
            if (!this.noeudExplore.includes(this.l.getNoeud(i) - 1))
                return this.l.getNoeud(i) - 1;
        }
        return -1;
    }

    premierNoeudNonExplore() {
        for (let i = 0; i < this.l.nombreNoeuds(); i++) {
            if (!this.noeudExplore.includes(i))
                return i;
        }
        return -1;
    }

    trouverUnePositionLibre(vertical, pos) {
        while (this.graph.noeudSelected(pos) != null) {
            pos.setXY(50.0 * this.niveauActuel, 50.0 * vertical);
            vertical++;
        }
        return vertical;
    }
}
