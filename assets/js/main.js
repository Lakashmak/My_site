fetch('components/header.html').then(r => r.text()).then(html => {
    document.getElementById('header').innerHTML = html;
});

fetch('components/footer.html').then(r => r.text()).then(html => {
    document.getElementById('footer').innerHTML = html;
});

let height = window.innerHeight;

const elements = document.querySelectorAll('.bg');

elements.forEach(el => {
    el.style.minHeight = height + 'px';
});