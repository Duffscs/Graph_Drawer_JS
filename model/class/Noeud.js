import { Position } from "./Position.js";

export class Noeud {
    /** @type {number} */ number
    /** @type {Position} */ pos
    /** @type {number} */ width
    /** @type {Array} */ successeurs

    constructor(number, pos, width = 25) {
        this.number = number;
        this.pos = pos;
        this.width = width;
        this.successeurs = new Array();
    }

    /**
     * @param {Position} pos 
     */
    positionOccuper(pos) {
        const bordureGauche = this.centerX() - this.width * 2.5;
        const bordureDroit = this.centerX() + this.width * 2.5;
        const bordureHaut = this.centerY() - this.width * 2.5;
        const bordureBas = this.centerY() + this.width * 2.5;
        return bordureGauche < pos.x && pos.x < bordureDroit && bordureHaut < pos.y() && pos.y() < bordureBas;
    }

    /**
     * 
     * @param {Position} pos 
     */
    superposition(pos){
        return this.bordureGauche() < pos.x && pos.x < this.bordureDroite() && this.bordureHaut() < pos.y && pos.y < this.bordureBas();
    }

    centerX() { return this.pos.x; }

    centerY() { return this.pos.y; }

    bordureGauche() { return this.pos.x - this.width; }

    bordureDroite() { return this.pos.x + this.width; }

    bordureHaut() { return this.pos.y - this.width; }

    bordureBas() { return this.pos.y + this.width; }

}
