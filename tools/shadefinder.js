function padToSix(str) 
{
	var pad = "000000";
	var ans = pad.substring(0, pad.length - str.length) + str;
	return ans;
}

function hexToRGB(hex) 
{
	var bigint = parseInt(hex, 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;
	return [r, g, b];
}

function rgbToHex(rgb) 
{
	rgb = rgb[2] | (rgb[1] << 8) | (rgb[0] << 16);
	return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

function delta(c1, c2, shades)
{
	return Math.round((c2 - c1)/shades);
}

function displayColor(rgb)
{
	hexStr = rgbToHex(rgb);
	var shadeDiv = document.createElement("div");
	shadeDiv.className = "shadeDiv";
	shadeDiv.innerHTML = hexStr;
	var colorDiv = document.createElement("div");
	colorDiv.style.backgroundColor = hexStr;
	colorDiv.style.width = "200px";
	colorDiv.style.height = "50px";
	shadeDiv.append(colorDiv);
	var display = document.getElementById("display");
	display.append(shadeDiv);
	return;
}

function makeShades()
{
	//clear display
	var display = document.getElementById("display");
	display.innerHTML = "";

	//get color to shade
	var color = document.getElementById("color").value;
	color = hexToRGB(color);

	//get number of shades
	var shades = document.getElementById("shades").value;
	shades = parseInt(shades);

	//get black and white
	var black = [0, 0, 0];
	var white = [255, 255, 255];

	//find deltas for dark shades
	var rd = delta(black[0], color[0], shades);
	var gd = delta(black[1], color[1], shades);
	var bd = delta(black[2], color[2], shades);

	//display dark shades
	var current = black;
	var shadeDiv, colorDiv, hexStr;
	for(var i=0;i<shades;i++)
	{
		displayColor(current);

		current[0] += rd;
		current[1] += gd;
		current[2] += bd;
	}

	//display color
	displayColor(color);
	display.lastChild.id = "oriColor";

	//find deltas for lighter shades
	var rd = delta(color[0], white[0], shades);
	var gd = delta(color[1], white[1], shades);
	var bd = delta(color[2], white[2], shades);

	//generate lighter colors
	var current = color;
	for(var i=0;i<shades-1;i++)
	{
		current[0] += rd;
		current[1] += gd;
		current[2] += bd;

		displayColor(current);
	}

	//display white
	displayColor(white);

	return;
}
