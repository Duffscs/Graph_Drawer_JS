import { Noeud } from "../model/class/Noeud.js";
import { Outil } from "./Outil.js";

export class AjoutNoeud extends Outil {

    action(pos){
        const n = new Noeud(this.graphPane.nbNoeuds() + 1, pos);
        this.graphPane.ajouterNoeud(n);
    }


}