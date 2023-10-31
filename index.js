let joueurs = document.querySelectorAll('.joueur');
let offset = { x: 0, y: 0 };

// Charger les positions des joueurs à partir du localStorage
joueurs.forEach((joueur) => {
    let pos = localStorage.getItem(joueur.id);
    if (pos) {
        pos = JSON.parse(pos);
        joueur.style.left = pos.x + 'px';
        joueur.style.top = pos.y + 'px';
    }
});

joueurs.forEach((joueur) => {
    joueur.addEventListener('dragstart', (e) => {
        offset.x = e.offsetX;
        offset.y = e.offsetY;
        e.dataTransfer.setData('text/plain', joueur.id);
    });
});

document.body.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.body.addEventListener('drop', (e) => {
    e.preventDefault();
    let id = e.dataTransfer.getData('text/plain');
    let joueur = document.getElementById(id);
    joueur.style.left = (e.clientX - offset.x) + 'px';
    joueur.style.top = (e.clientY - offset.y) + 'px';

    // Sauvegarder la position du joueur dans le localStorage
    localStorage.setItem(id, JSON.stringify({ x: e.clientX - offset.x, y: e.clientY - offset.y }));
});