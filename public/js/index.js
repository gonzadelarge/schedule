document.addEventListener('DOMContentLoaded', ()=> {
    buttonMenu();
    colorBackgroundCard();
    listenForm();
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

function listenForm() {

    if(document.body.contains(document.getElementById('delete-form'))) {

    const form = document.getElementById('delete-form');

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        const modal = document.querySelectorAll('.b-modal');
        const buttonClose = document.querySelectorAll('.b-modal__close');

        const deleteBtn = document.getElementById('btn-detele');
        const saveBtn = document.getElementById('btn-save');

        
        modal.forEach( modal => {
            modal.classList.toggle('active');

            buttonClose.forEach( button => {
                button.addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            });

            saveBtn.addEventListener('click', () => modal.classList.remove('active'));
            deleteBtn.addEventListener('click', () => form.submit());
        });
    })
    }
}