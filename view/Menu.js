import { AjoutArrete } from "../controller/AjoutArrete.js";
import { AjoutNoeud } from "../controller/AjoutNoeud.js";
import { GraphPane } from "./GraphPane.js";

export class Menu {
    outil

    /**
     * 
     * @param { GraphPane } graphPane 
     */
    constructor(graphPane) {
        this.outil = new AjoutNoeud(graphPane);

        document.getElementById('dessinerNoeud')
            .addEventListener('click', () => this.outil = new AjoutNoeud(graphPane));

        document.getElementById('dessinerArrete')
            .addEventListener('click', () => this.outil = new AjoutArrete(graphPane));
        document.getElementById('extraireMatrice')
            .addEventListener('click', () => {
                const txtArea = document.getElementById('texte');
                txtArea.innerHTML = "";
                for (const n of graphPane.noeuds)
                    txtArea.innerHTML = txtArea.innerHTML.concat((n.successeurs.toString() + "\n"));
            });
    }

}