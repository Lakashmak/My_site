const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const content = document.getElementById("content");

var programs;
var statuses;
var languages;

fetch('data/db.json').then(r => r.json()).then(data => {
	programs = data.programs;
	statuses = data.statuses;
	languages = data.languages;
	main();
});

function main() {
	const p = programs.find(p => p.id == id);
	
	if (!p) window.location.href = "https://lakashmak.github.io/My_site/void_page.html";
	else {
		document.title = p.name;
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
		html += `            <p>создано: ${get_date(p.date)}</p>`;
		html += `            <p>язык: ${get_language(p.language)}</p>`;
		html += `            <p>платформа: ${p.platform}</p>`;
		if(p.platform != "WEB")
		    html += `        <p>тип: ${get_type(p.type)}</p>`;
		html += `            <p>категория: ${get_status(p.status)}</p>`;
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

function get_status(id) {
	/*for(let i = 0; i < statuses.length; i++) {
		if(statuses[i].id == id) return statuses[i].name;
	}*/
	if(id-1 < statuses.length) return statuses[id-1].name;
	return null;
}

function get_language(ids) {
	var str = "";
	for(let i = 0; i < ids.length; i++) {
		/*for(let j = 0; j < languages.length; j++) {
			if(languages[j].id == ids[i]) {
				if(str == "") str += languages[j].name;
				else str += ", " + languages[j].name;
				break;
			}
		}*/
		if(i != 0) str += ", ";
		if(ids[i]-1 < languages.length) str += languages[ids[i]-1].name;
	}
	return str;
}

function get_type(type) {
	if(type == "window") return "оконное приложение";
	else return "консольное приложение";
}

function get_date(str) {
	var str2 = "";
	
	var nums = [];
	var num = "";
	for(let i = 0; i < str.length; i++) {
		if(str[i] != '-') num += str[i];
		else {
			if(num != "") nums.push(num);
			num = "";
		}
	}
	if(num != "") nums.push(num);
	
	if(nums[2][0] == '0') str2 += nums[2][1] + " ";
	else str2 += nums[2] + " ";
	
	if(parseInt(nums[1]) == 1) str2 += "января ";
	if(parseInt(nums[1]) == 2) str2 += "февраля ";
	if(parseInt(nums[1]) == 3) str2 += "марта ";
	if(parseInt(nums[1]) == 4) str2 += "апреля ";
	if(parseInt(nums[1]) == 5) str2 += "мая ";
	if(parseInt(nums[1]) == 6) str2 += "июня ";
	if(parseInt(nums[1]) == 7) str2 += "июля ";
	if(parseInt(nums[1]) == 8) str2 += "августа ";
	if(parseInt(nums[1]) == 9) str2 += "сентября ";
	if(parseInt(nums[1]) == 10) str2 += "октября ";
	if(parseInt(nums[1]) == 11) str2 += "ноября ";
	if(parseInt(nums[1]) == 12) str2 += "декабря ";
	
	str2 += nums[0] + " года";
	
	return str2;
}