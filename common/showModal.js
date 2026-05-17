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

    function updateTransform() {
        imgEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`;
    }

    function zoomIn(zoomFactor = 1.2) {
        scale = scale * zoomFactor;
        updateTransform();
    }

    function zoomOut(zoomFactor = 1.2) {
        scale = scale / zoomFactor;
        updateTransform();
    }

    function rotateRight(rotationSize = 10) {
        rotation = (rotation + rotationSize) % 360; 
        updateTransform();
    }

    function rotateLeft(rotationSize = 10) {
        rotation = (rotation - rotationSize) % 360; 
        updateTransform();
    }

    function translateRight(translationSize = 20) {
        translateX -= translationSize;
        updateTransform();
    }

    function translateLeft(translationSize = 20) {
        translateX += translationSize;
        updateTransform();
    }

    function translateUp(translationSize = 20) {
        translateY += translationSize;
        updateTransform();
    }

    function translateDown(translationSize = 20) {
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

    function makeRepeatingButton(buttonId, action, repeatDelay = 100) {
        const btn = document.getElementById(buttonId);
        let interval = null;
        
        btn.onmousedown = () => {
            action();
            interval = setInterval(action, repeatDelay);
        };
        
        btn.onmouseup = () => {
            clearInterval(interval);
            interval = null;
        };
        
        btn.onmouseleave = () => {
            clearInterval(interval);
            interval = null;
        };
    }

    function isTouchOnlyDevice() {
        return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }

    if (isTouchOnlyDevice()) {
        const controlButtons = Array.from(document.getElementsByClassName("controlButton"));
        controlButtons.forEach(el => el.remove());
    } else {
        // attach controls
        makeRepeatingButton('imgZoomIn', zoomIn);
        makeRepeatingButton('imgZoomOut', zoomOut);
        makeRepeatingButton('imgReset', resetView);
        makeRepeatingButton('imgRotateRight', rotateRight);
        makeRepeatingButton('imgRotateLeft', rotateLeft);
        makeRepeatingButton('imgRight', translateRight);
        makeRepeatingButton('imgLeft', translateLeft);
        makeRepeatingButton('imgUp', translateUp);
        makeRepeatingButton('imgDown', translateDown);
    }

    imgEl.src = safeSrc;
    imgEl.onload = () => {
        resetView();
    };

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}