function loadHtmlElement( htmlFile, id )
{
    fetch(htmlFile)
        .then(response => response.text())
        .then(data => { document.getElementById(id).innerHTML = data; });
}