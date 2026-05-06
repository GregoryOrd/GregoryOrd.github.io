function ShowModal(titleMessage, bodyMessage) {
    document.getElementById("ModalText").innerHTML = bodyMessage;
    document.getElementById("ModalTitle").innerHTML = titleMessage;

    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
}