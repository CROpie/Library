const toggle = document.querySelector('#toggle-form');
const formdiv = document.querySelector('#form');

function testFunc() {
    if (formdiv.style.display === 'none') {
        formdiv.style.display = 'block';
    } else if (formdiv.style.display === 'block') {
        formdiv.style.display = 'none';
    }
}

toggle.addEventListener('click', testFunc);
