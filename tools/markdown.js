function tick()
{
	var md = document.getElementById("editor").value;
	console.log(md);
	console.log(marked(md));
	document.getElementById("display").innerHTML = marked(md);
}

setInterval(tick, 2500);
