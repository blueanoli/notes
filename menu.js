function showMenu() {
    if (document.getElementById('overlay').classList.contains('show-overlay-menu')) {
        document.getElementById('overlay').classList.remove('show-overlay-menu');
    } else {
        document.getElementById('overlay').classList.add('show-overlay-menu');
    }
}