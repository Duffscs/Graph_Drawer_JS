export class Position {

    /** @type {number}*/ x
    /** @type {number}*/ y

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    /** @param {Position} pos */
    angleRad(pos) {
        return Math.atan2(pos.y - this.y, pos.x - this.x);
    }

    /** @param {Position} pos */
    angleDeg(pos) {
        return this.angleRad(pos) * 180 / Math.PI
    }

    /** @param {Position} pos */
    longueur(pos) {
        return Math.sqrt(Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2))
    }
}
