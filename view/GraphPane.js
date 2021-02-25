import { Noeud } from "../model/class/Noeud.js";
import { Position } from "../model/class/Position.js";
import { Arrow } from "./Arrow.js";

export class GraphPane {

    /** @type {Noeud[]} */noeuds

    constructor(canvas, gc, oriente=true) {
        this.noeuds = new Array();
        this.canvas = canvas;
        this.gc = gc;
        this.oriente = oriente;
        this.clear();
    }

    nbNoeuds() {
        return this.noeuds.length;
    }

    /** @param {Noeud} n */
    ajouterNoeud(n) {
        if (n.pos == null) {
            n.pos = new Position(0, 0);
        } else {
            if (this.estHorsCanvas(n.bordureGauche(), n.bordureDroite(), n.bordureHaut(), n.bordureBas())) return;
            if (this.possitionOccuper(n.pos)) return;
        }

        for (const noeud of this.noeuds) {
            noeud.successeurs.push(0);
            n.successeurs.push(0);
        }
        this.noeuds.push(n);
        n.successeurs.push(0);
    }

    /** @param {Noeud} n */
    dessinerNoeud(n) {
        this.gc.strokeStyle = 'BLACK';
        this.gc.fillStyle = 'LIGHTGRAY';
        this.gc.beginPath();
        this.gc.arc(n.centerX(), n.centerY(), n.width, 0, 2 * Math.PI, false);
        this.gc.stroke();
        this.gc.arc(n.centerX(), n.centerY(), n.width, 0, 2 * Math.PI, false);
        this.gc.fill();
        this.gc.strokeText(n.number, n.centerX() - 4 * ("" + n.number).length, n.centerY() + 5);
        this.gc.closePath();
    }

    /**
     * @param {Noeud} n1 
     * @param {Noeud} n2 
     */
    ajouterArrete(n1, n2) {
        n1.successeurs[n2.number - 1] = 1;
    }

    ajouterArreteNumber(n1, n2){
        this.noeuds[n1-1].successeurs[n2-1] = 1;
    }


    /**
     * @param {Noeud} noeud1 
     * @param {Noeud} noeud2 
     * @param {number} arrowHeadSize 
     */
    dessinerArrete(noeud1, noeud2, arrowHeadSize = 20) {
        const a = new Arrow(arrowHeadSize, this.gc, this.oriente);
        if (noeud1 == noeud2) {
            a.drawCircularArrow(noeud1.pos, noeud1.width);
        } else {
            a.drawArrow(noeud1.pos, noeud2.pos, noeud1.width);
        }
    }

    dessinerGraph() {
        this.clear();
        for (const n of this.noeuds) {
            this.dessinerNoeud(n);
            for (const n2 of this.noeuds) {
                if (n.successeurs[n2.number - 1] != 0) this.dessinerArrete(n, n2);
            }
        }
    }

    clear() {
        this.gc.clearRect(0, 0, 10000, 10000);
    }

    /**
     * @param {number} bordureGauche 
     * @param {number} bordureDroite 
     * @param {number} bordureHaut 
     * @param {number} bordureBas 
     */
    estHorsCanvas(bordureGauche, bordureDroite, bordureHaut, bordureBas) {
        return !(0 < bordureGauche && bordureDroite < this.canvas.width && 0 < bordureHaut && bordureBas < this.canvas.height)
    }

    /** @param {Position} pos */
    noeudSelected(pos) {
        if (pos == undefined) return undefined;
        return this.noeuds.find(x => x.superposition(pos));
    }

    possitionOccuper(pos) {
        return this.noeudSelected(pos) != undefined;
    }

    getNoeud(index) {
        return this.noeuds[index];
    }

    /** @param {number} n */
    definirNombreDeNoeud(n) {
        for (let i = 0; i < n; i++)
            this.ajouterNoeud(new Noeud(i + 1, null, 15));
    }
}
