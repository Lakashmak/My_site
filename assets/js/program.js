const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const content = document.getElementById("content");

var programs;

fetch('data/db.json').then(r => r.json()).then(data => {
	programs = data.programs;
	main();
});

function main() {
	const p = programs.find(p => p.id == id);
	
	if (!p) window.location.href = "https://lakashmak.github.io/My_site/void_page.html";
	else {
		var html = "";
		
		html += `<div class="namehead">`;
		if(p.icon)
		    html += `<img src="${p.icon}" class="icon">`;
		html += `    <h1 class="name">${p.name}</h1>`;
		html += `</div>`;
		html += `<div class="proginfo">`;
		if(p.screenshot)
		    html += `<img src="${p.screenshot}" class="screenshot">`;
		html += `    <div class="info">`;
		html += `        <h3>Информация</h3>`;
		html += `        <div>`;
		html += `            <p>создано: ${p.date}</p>`;
		html += `            <p>язык: ${p.language}</p>`;
		html += `            <p>платформа: ${p.platform}</p>`;
		html += `            <p>статус: ${p.status}</p>`;
		if(p.exception)
		    html += `        <p>(${p.exception})</p>`;
		if(p.platform == "WEB")
		    html += `        <a href="${p.link}">запустить</a><br>`;
		else if(p.link)
		    html += `        <a href="${p.link}">скачать</a><br>`;
		if(p.github)
		    html += `        <a href="${p.github}">ссылка на репозиторий</a><br>`;
		html += `        </div>`;
		html += `    </div>`;
		html += `    <p>${p.description}</p>`;
		html += `</div>`;
		
		content.innerHTML = html;
		
		const name = document.querySelectorAll('.name');
		let width = window.innerWidth;
		let fs = width / p.name.length / 1; if(fs > 24) fs = 24;
		name.forEach(el => { el.style.fontSize = fs + "pt"; });
		
		/*const namehead = document.querySelectorAll('.namehead');
		const icon = document.querySelectorAll('.icon');
		const headWidth = namehead.clientWidth;
		const nameWidth = name.offsetWidth;
		const iconWidth = icon ? icon.offsetWidth : 0;
		
		namehead.style.paddingLeft = Math.max(0, (width - nameWidth - iconWidth) / 2) + "px";*/
	}
}