import { Position } from "../model/class/Position.js";

export class Arrow {

    arrowHeadSize

    constructor(arrowHeadSize, gc, head) {
        this.gc = gc;
        this.arrowHeadSize = arrowHeadSize;
        this.head = head;
    }

    /**
     * @param {Position} start 
     * @param {Position} end 
     * @param {number} width 
     */
    drawArrow(start, end, width) {
        const debut = this.getPointBetweenCircle(start, end, width);
        const fin = this.getPointBetweenCircle(end, start, width);
        const aWidth = 5;
        const aLength = 10;
        const angle = debut.angleRad(fin);
        const length = debut.longueur(fin);

        this.draw(debut, angle, length, aLength, aWidth);
    }

    /**
     * @param {Position} circleStart 
     * @param {Position} circleEnd 
     * @param {number} radius 
     */
    getPointBetweenCircle(circleStart, circleEnd, radius) {
        return this.getPointOnCircle(circleStart, circleStart.angleRad(circleEnd), radius)
    }
    /**
     * 
     * @param {Position} circle 
     * @param {number} angle 
     * @param {number} radius 
     */
    getPointOnCircle(circle, angle, radius) {
        const x = radius * Math.cos(angle) + circle.x;
        const y = radius * Math.sin(angle) + circle.y;
        return new Position(x, y);
    }


    /**
     * @param {Position} start 
     * @param {number} width 
     */
    drawCircularArrow(start, width) {
        this.arrowHeadSize = 10;
        const ray = 10;
        const c1 = this.getPointOnCircle(start, 1.75 * Math.PI, width);
        let angle1 = 0.3 * Math.PI;
        let angle2 = 1.2 * Math.PI;
        const arPos = this.getPointOnCircle(c1, 0.3 * Math.PI, ray);
        this.gc.beginPath();
        this.gc.arc(c1.x, c1.y, ray, angle1, angle2, true);
        this.gc.stroke();
        this.gc.closePath();

        const aWidth = 3.75;
        const aLength = 7.5;
        const angle = 0.75 * Math.PI;
        const length = 0;

        this.draw(arPos, angle, length, aLength, aWidth);
    }

    /**
     * Permet de tracer la fleche a partir de toute ces infos
     * @param {Position} arPos 
     * @param {number} angle 
     * @param {number} length 
     * @param {number} aLength 
     * @param {number} aWidth 
     */
    draw(arPos, angle, length, aLength, aWidth) {
        if(!this.head) {
            aLength = 0;
            aWidth = 0;
        }
        this.gc.save();

        this.gc.translate(arPos.x, arPos.y);
        this.gc.rotate(angle);

        this.gc.beginPath();
        this.gc.moveTo(0, 0);
        this.gc.lineTo(length, 0);
        this.gc.moveTo(length - aLength, -aWidth);
        this.gc.lineTo(length, 0);
        this.gc.lineTo(length - aLength, aWidth);
        this.gc.fillStyle = 'BLACK';
        this.gc.closePath();

        this.gc.stroke();
        this.gc.fill();

        this.gc.restore();
    }
}
