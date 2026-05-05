const webLinks = document.getElementById("webLinks");
const androidLinks = document.getElementById("androidLinks");
const windowsLinks = document.getElementById("windowsLinks");

var programs;

fetch('data/db.json').then(r => r.json()).then(data => {
	programs = data.programs;
	main();
});

function main() {
	var webProgs = [];
	var androProgs = [];
	var winProgs = [];
	var lastProgs = [];
	
	programs.forEach(p => {
		if(p.posted && p.exception === null) {
			if(p.platform === "WEB") webProgs.push(p);
			if(p.platform === "Android") androProgs.push(p);
			if(p.platform === "Windows") winProgs.push(p);
		} else if(p.posted) lastProgs.push(p);
	});
	
	lastProgs.forEach(p => {
		if(p.platform === "WEB") webProgs.push(p);
		if(p.platform === "Android") androProgs.push(p);
		if(p.platform === "Windows") winProgs.push(p);
	});
	
	webLinks.innerHTML = get_html(webProgs);
	androidLinks.innerHTML = get_html(androProgs);
	windowsLinks.innerHTML = get_html(winProgs);
}

function get_html(progs) {
	var html = "";
	for(let i = 0; i < progs.length; i++) {
		let p = progs[i];
		if(i != 0) html += "<br>\n";
		if(!p.exception) html += `<a href="${p.link}">${p.name} ${p.smiley}</a>`;
		else html += `<a href="${p.link}">${p.name} (${p.exception}) ${p.smiley}</a>`;
	}
	return html;
}