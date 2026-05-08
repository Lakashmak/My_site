const content = document.getElementById("content");

var programs;

fetch('data/db.json').then(r => r.json()).then(data => {
	programs = data.programs;
	main();
});

function main() {
	programs.sort((a, b) => new Date(b.date) - new Date(a.date));
	
	var html = "";
	for(let i = 0; i < programs.length; i++) html += get_html(programs[i]);
	
	content.innerHTML = html;
}

function get_html(p) {
	var html = "";
	html += `<a href="program.html?id=${p.id}" class="card">`;
	if(p.screenshot)
	    html += `<img src="${p.screenshot}" class="screenshot">`;
	else
	    html += `<img src="${p.icon}" class="screenshot">`;
	html += `    <div>`;
	if(p.icon) 
	    html += `    <img src="${p.icon}" class="icon">`;
	html += `        <h3>${p.name}</h3>`;
	html += `    </div>`;
	html += `</a>`;
	return html;
}