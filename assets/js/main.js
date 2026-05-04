Promise.all([
    fetch('components/header.html').then(r => r.text()),
    fetch('components/footer.html').then(r => r.text()),
]).then(([headerHtml, footerHtml]) => {
    document.getElementById('header').innerHTML = headerHtml;
    document.getElementById('footer').innerHTML = footerHtml;
    
    applyStyles();
});

function applyStyles() {
	const bg = document.querySelectorAll('.bg');
	const nav = document.querySelectorAll('nav');
	
	let height = window.innerHeight;
	let width = window.innerWidth;
	
	bg.forEach(el => { el.style.minHeight = height + 'px'; });
	nav.forEach(el => { el.style.width = width + 'px'; });
}
