//ToArray functions
function delimiterToArray(colD, rowD, data)
{
	data = data.replace("\r\n", "\n");
	var array = data.split(rowD);
	for(var i=0;i<array.length;i++)
	{
		array[i] = array[i].split(colD);
	}
	return array;
}

//arrayTo functions
function arrayToCSV(array)
{
	var text = "";
	for(var i=0;i<array.length;i++)
	{
		for(var j=0;j<array[i].length;j++)
		{
			text += array[i][j] + ",";
		}
		text = text.substring(0, text.length-1);
		text += "\n";
	}
	text = text.substring(0, text.length-1);
	return text;
}

function arrayToHTML(array)
{
	var text = "<table>\n";
	for(var i=0;i<array.length;i++)
	{
		text += "\t<tr>\n";
		for(var j=0;j<array[i].length;j++)
		{
			text += "\t\t<td>" + array[i][j] + "</td>\n";
		}
		text += "\t</tr>\n";
	}
	text += "</table>"
	return text;
}

function arrayToLatex(array)
{
	var text = "\\begin{tabular}{|" 
	for(var i=0;i<array.length;i++)
	{
		text += " c |";
	}
	text += "}\n";
	for(var i=0;i<array.length;i++)
	{
		text += "\t\\hline\n\t";
		for(var j=0;j<array[i].length;j++)
		{
			text += array[i][j] + " & ";
		}
		text = text.substring(0, text.length-2);
		text += "\\\\\n";
	}
	text += "\t\\hline\n";
	text += "\\end{tabular}" 
	return text;
}

function convert()
{
	var arr;
	var data = document.getElementById("editor").value;
	var to = document.getElementById("to").value;
	console.log(to);

	//get array from original data
	var colD = document.getElementById("colD").value;
	var rowD = document.getElementById("rowD").value;
	arr = delimiterToArray(colD, rowD, data);

	document.getElementById("editor").value = "";

	//get new data from array
	var newData;
	switch(to)
	{
		case "csv":
			newData = arrayToCSV(arr);
			break;
		case "html":
			newData = arrayToHTML(arr);
			break;
		case "latex":
			newData = arrayToLatex(arr);
			break;
		default:
			break;
	}

	//convert array to new format
	document.getElementById("editor").value = newData;
}

function handleFileSelect(e)
{
	var file = e.target.files[0];
	fr = new FileReader();
	fr.onload = onFileLoad;
	fr.readAsText(file);
}

function onFileLoad(e)
{
	document.getElementById("editor").value = e.target.result;
}
