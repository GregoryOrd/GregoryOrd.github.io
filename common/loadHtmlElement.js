function loadHtmlElement( htmlFile, id )
{
    return fetch(htmlFile)
        .then(response => response.text())
        .then(data => { document.getElementById(id).innerHTML = data; });
}