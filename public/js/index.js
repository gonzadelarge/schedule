document.addEventListener('DOMContentLoaded', ()=> {
    buttonMenu();
})

function buttonMenu() {
    const button = document.getElementById('btn-menu');
    const menu = document.getElementById('menu');

    button.onclick = () => {
        menu.classList.toggle('active');
    }
}