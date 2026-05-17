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

function ShowImageModal(imgSrc) {
    const safeSrc = imgSrc || '';

    const modalEl = document.getElementById('imageModal');
    const imgEl = document.getElementById('ImageModalImg');

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let rotation = 0;

    let zoomFactor = 1.2;
    let rotationSize = 10;
    let translationSize = 20;

    function updateTransform() {
        imgEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`;
    }

    function zoomIn() {
        scale = scale * zoomFactor;
        updateTransform();
    }

    function zoomOut() {
        scale = scale / zoomFactor;
        updateTransform();
    }

    function rotateRight() {
        rotation = (rotation + rotationSize) % 360; 
        updateTransform();
    }

    function rotateLeft() {
        rotation = (rotation - rotationSize) % 360; 
        updateTransform();
    }

    function translateRight() {
        translateX -= translationSize;
        updateTransform();
    }

    function translateLeft() {
        translateX += translationSize;
        updateTransform();
    }

    function translateUp() {
        translateY += translationSize;
        updateTransform();
    }

    function translateDown() {
        translateY -= translationSize;
        updateTransform();
    }

    function resetView() {
        scale = 1; 
        translateX = 0; 
        translateY = 0; 
        rotation = 0; 
        updateTransform();
    }

    // set image src and reset view
    imgEl.src = safeSrc;
    imgEl.onload = () => {
        resetView();
    };

    // attach controls
    document.getElementById('imgZoomIn').onclick = zoomIn;
    document.getElementById('imgZoomOut').onclick = zoomOut;
    document.getElementById('imgReset').onclick = resetView;
    document.getElementById('imgRotateRight').onclick = rotateRight;
    document.getElementById('imgRotateLeft').onclick = rotateLeft;
    document.getElementById('imgRight').onclick = translateRight;
    document.getElementById('imgLeft').onclick = translateLeft;
    document.getElementById('imgUp').onclick = translateUp;
    document.getElementById('imgDown').onclick = translateDown;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}