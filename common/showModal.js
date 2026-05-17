function ShowModal(titleMessage, bodyMessage) {
    document.getElementById("ModalText").innerHTML = bodyMessage;
    document.getElementById("ModalTitle").innerHTML = titleMessage;

    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
}

function ShowModalFromFile(filePath) {
//From the file, get the title from the <head> and get the bodyMessage from the <body>
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const titleMessage = doc.querySelector("head > title").innerText;
            const bodyMessage = doc.querySelector("body").innerHTML;
            ShowModal(titleMessage, bodyMessage);
        });
}

function PopulatePreModalTitle(filePath, tableDataId) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const titleMessage = doc.querySelector("head > title").innerText;
            document.getElementById(tableDataId).innerHTML = titleMessage;
        });
}