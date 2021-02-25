import { ListeDAdjacence } from "./class/ListeDAdjacence.js";

export class Lecture {

    lectureMatrice() {
        const string = document.getElementById('texte').value;
        if (string == null || string=="") return;

        const numbers = string.match(/\d+/g).map(e => e != 0);
        let nbelem = 0;
        const LA = new ListeDAdjacence();

        const nbsommet = Math.sqrt(numbers.length);
        if (nbsommet != Math.floor(nbsommet)) return;

        for (let i = 1; i < nbsommet + 1; i++) {
            for (let o = 1; o < nbsommet + 1; o++) {
                if (numbers.shift()) {
                    LA.listeSommet.push(o);
                    nbelem++;
                }
            }
            const g = LA.listePointeur.length - 1;
            if (g > 0 && nbelem == LA.listePointeur[g]) {
                nbelem++;
                LA.listePointeur.push(nbelem);
                LA.listeSommet.push(-1);
            } else {
                LA.listePointeur.push(nbelem);
            }
        }
        LA.listeSommet.push(-1);
        LA.afficherListe();
        return LA;
    }
}