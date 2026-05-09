const content = document.getElementById("content");
const textBox1 = document.getElementById("textBox1");
const button1 = document.getElementById("button1");

button1.addEventListener('click', () => { this.search(); });
textBox1.addEventListener("keydown", (e) => { if(e.key === "Enter") this.search(); });

var programs;
var statuses;

fetch('data/db.json').then(r => r.json()).then(data => {
	programs = data.programs;
	statuses = data.statuses;
	main();
});

function main() {
	programs.sort((a, b) => new Date(b.date) - new Date(a.date));
	
	var sPrograms = [];
	for(let i = 0; i < statuses.length; i++) sPrograms.push([]);
	for(let i = 0; i < programs.length; i++) sPrograms[programs[i].status-1].push(programs[i]);
	
	var html = "";
	//for(let i = 0; i < programs.length; i++) html += get_html(programs[i]);
	
	for(let i = 0; i < sPrograms.length; i++) {
		if(sPrograms[i].length != 0) {
			const s = statuses[i];
			html += `<h1 class="name">${s.name}</h1>`;
			html += `<div class="category">`;
			for(let j = 0; j < sPrograms[i].length; j++) html += get_html(sPrograms[i][j]);
			html += `</div>`;
		}
	}
	
	content.innerHTML = html;
}

function search() {
	content.innerHTML = `<h1 class="name">Загрузка...</h1>`;
	const request = textBox1.value;
	if(request == "") {
		main();
		return;
	}
	
	var words = []; 
	var word = "";
	for(let i = 0; i < request.length; i++) {
		if(request[i] != ' ') word += request[i];
		else {
			if(word != "") words.push(word);
			word = "";
		}
	}
	if(word != "") words.push(word);
	word = "";
	if(words.length == 0) {
		content.innerHTML = `<h1 class="name">Задан пустой запрос!</h1>`;
		return;
	}
	
	var priority = []; for(let i = 0; i < words.length; i++) priority.push([]);
	let quantity = 0;
	
	for(let i = 0; i < programs.length; i++) {
		const p = programs[i];
		let matchs = 0;
		for(let j = 0; j < words.length; j++) 
			if(it_match(words[j], p.name)) matchs++; //name id smiley description
		if(matchs > 0) {
			priority[priority.length - matchs].push(p);
			quantity++;
		}
	}
	if(quantity == 0) {
		content.innerHTML = `<h2 class="name">Не удалось ничего найти 😔</h2>`;
		return;
	}
	
	var html = "";
	
	html += `<h2 class="name">Результаты поиска (${quantity}):</h2>`;
	html += `<div class="category">`;
	for(let i = 0; i < priority.length; i++) 
		for(let j = 0; j < priority[i].length; j++)
			html += get_html(priority[i][j]);
	html += `</div>`;
	
	content.innerHTML = html;
}

function it_match(word, fieldValue) {
	word = word.toLowerCase();
	fieldValue = fieldValue.toLowerCase();
	for(let i = 0; i + word.length - 1 < fieldValue.length; i++) {
		let match = true;
		for(let j = 0; j < word.length && match; j++) if(word[j] != fieldValue[i+j]) match = false;
		if(match == true) return true;
	}
	return false;
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