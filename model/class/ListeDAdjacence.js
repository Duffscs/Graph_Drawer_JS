export class ListeDAdjacence {
    
    /** @type {number[]} */ listePointeur
    /** @type {number[]} */ listeSommet
    
    constructor() {
        this.listePointeur = [];
        this.listeSommet = [];
    }

    afficherListe() {
        console.log(this.listePointeur);
        console.log(this.listeSommet);
    }

    nombreNoeuds() {
        return this.listePointeur.length;
    }

    getNoeud(index) {
        return this.listeSommet[index];
    }

    getPointeur(index) {
        return this.listePointeur[index];
    }
}
