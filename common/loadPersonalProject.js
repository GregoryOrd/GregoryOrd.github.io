function loadPersonalProject( projName )
{
    fetch(projName + "/" + projName + ".html")
        .then(response => response.text())
        .then(data => { document.getElementById(projName).innerHTML = data; });
}

loadPersonalProject("AirMonitorMCPServer")
loadPersonalProject("ReceiptReader")
loadPersonalProject("PiHoleAccessPoint")
loadPersonalProject("GSMessaging")
loadPersonalProject("GregWatch")
loadPersonalProject("GregBuild")
loadPersonalProject("HelpingHandsRoutines")
loadPersonalProject("HelpingHandsCafe")
loadPersonalProject("DinosInspire")
loadPersonalProject("PythonTextingApp")