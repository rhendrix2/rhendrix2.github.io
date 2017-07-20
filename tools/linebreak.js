function remove()
{
	var data = document.getElementById("editor").value;
	data = data.replace(/\n/g, " ");
	data = data.replace(/\r/g, "");
	document.getElementById("editor").value = data;
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
function save() 
{
	var data = document.getElementById("editor").value;
	var filename = document.getElementById("filename").value;
	if(filename.trim() == '') filename = "default.txt";
	var type = "text/plain";

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else 
	{
        var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
