const CANVAS = document.querySelectorAll('canvas');
const GC = [];
CANVAS.forEach(e => GC.push(e.getContext('2d')))


export {
    CANVAS,
    GC
}