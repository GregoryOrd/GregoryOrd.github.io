function loadPersonalProject( projName )
{
    fetch(projName + "/" + projName + ".html")
        .then(response => response.text())
        .then(data => { document.getElementById(projName).innerHTML = data; });
}

loadPersonalProject("GregWatch")
loadPersonalProject("GregBuild")
loadPersonalProject("HelpingHandsRoutines")
loadPersonalProject("HelpingHandsCafe")
loadPersonalProject("DinosInspire")
loadPersonalProject("PythonTextingApp")