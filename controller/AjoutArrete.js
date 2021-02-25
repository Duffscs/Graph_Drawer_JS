import { Position } from "../model/class/Position.js";
import { Outil } from "./Outil.js";

export class AjoutArrete extends Outil {
    previousNoeud

    constructor(graphPane){
        super(graphPane);
        this.previousNoeud = undefined;
    }

    /**
     * @param {Position} pos 
     */
    action(pos){
        const n = this.graphPane.noeudSelected(pos);
        if (this.previousNoeud == undefined || n == undefined)
            this.previousNoeud = n;
        else {
            this.graphPane.ajouterArrete(this.previousNoeud, n);
            this.previousNoeud = undefined;
        }
    }


}