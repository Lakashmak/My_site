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

const img = new Image();
img.crossOrigin = "anonymous";
img.src = "assets/img/custom/avatar.jpg";

img.onload = () => {
    const c = document.createElement("canvas");
    const s = Math.min(img.naturalWidth, img.naturalHeight);
    c.width = c.height = s;

    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, 0, 0, s, s);

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = 'image/jpeg';
    //const link = document.getElementById("linkicon");
    link.href = c.toDataURL("image/png");
    document.head.appendChild(link);
};