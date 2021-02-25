import { CANVAS, GC } from "./Const.js";
import { Menu } from "./view/Menu.js";
import { Position } from "./model/class/Position.js";
import { GraphPane } from "./view/GraphPane.js";
import { Lecture } from "./model/Lecture.js";
import { ParcoursEnProfondeur } from "./model/class/ParcoursEnProfondeur.js";

const graphPane = new GraphPane(CANVAS[0], GC[0]);
const menu = new Menu(graphPane);

document.addEventListener('click', e => {
    if (e.target != CANVAS[0]) return;
    menu.outil.action(new Position(e.offsetX, e.offsetY));
    graphPane.dessinerGraph();
});

document.getElementById('parcourir').addEventListener('click', e => {
    const sommetDepart = parseInt(document.getElementById('sommetDepart').value);
    const listAdjacence = new Lecture().lectureMatrice();
    if(listAdjacence == undefined || isNaN(sommetDepart) || sommetDepart < 0 || listAdjacence.nombreNoeuds() < sommetDepart) return;
    new ParcoursEnProfondeur(listAdjacence).tracerArbre(sommetDepart-1);
})