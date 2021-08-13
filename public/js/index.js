document.addEventListener('DOMContentLoaded', ()=> {
    buttonMenu();
    colorBackgroundCard();
})

function buttonMenu() {
    const button = document.getElementById('btn-menu');
    const menu = document.getElementById('menu');

    button.onclick = () => {
        menu.classList.toggle('active');
    }
}

function colorBackgroundCard() {
    const card = document.querySelectorAll('.b-card');
    card.forEach( card => {
        card.onmouseover = () => {
            card.classList.add('bg-4');
        }
        card.onmouseout = () => {
            card.classList.remove('bg-4');
        }
    })
}