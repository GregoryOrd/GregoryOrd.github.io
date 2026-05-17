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

function ShowImageModal(imgSrc, touchRotationEnabled=false) {
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

        touches = [];
        initialDistance = 0;
        initialAngle = 0;
        initialScale = 1;
        initialRotation = 0;
        lastX = 0;
        lastY = 0;

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

    // Touch controls
    let touches = [];
    let initialDistance = 0;
    let initialAngle = 0;
    let initialScale = 1;
    let initialRotation = 0;
    let lastX = 0;
    let lastY = 0;

    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function getAngle(touch1, touch2) {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.atan2(dy, dx) * (180 / Math.PI);
    }

    function handleTouchStart(e) {
        touches = Array.from(e.touches);
        
        if (touches.length === 1) {
            lastX = touches[0].clientX;
            lastY = touches[0].clientY;
        } else if (touches.length === 2) {
            initialDistance = getDistance(touches[0], touches[1]);
            initialAngle = getAngle(touches[0], touches[1]);
            initialScale = scale;
            initialRotation = rotation;
        }
    }

    function handleTouchMove(e) {
        e.preventDefault();
        touches = Array.from(e.touches);
        
        if (touches.length === 1) {
            // Pan: single finger drag
            const deltaX = touches[0].clientX - lastX;
            const deltaY = touches[0].clientY - lastY;
            
            translateX += deltaX;
            translateY += deltaY;
            
            lastX = touches[0].clientX;
            lastY = touches[0].clientY;
            
            updateTransform();
        } else if (touches.length === 2) {
            // Pinch-to-zoom and rotation: two finger gesture
            const currentDistance = getDistance(touches[0], touches[1]);
            const currentAngle = getAngle(touches[0], touches[1]);
            
            // Zoom: scale based on distance change
            const scaleFactor = currentDistance / initialDistance;
            scale = Math.max(0.5, Math.min(initialScale * scaleFactor, 5));
            
            if(touchRotationEnabled) {
                // Rotation: angle change between fingers
                const angleDelta = currentAngle - initialAngle;
                rotation = initialRotation + angleDelta;
            }
            
            updateTransform();
        }
    }

    function handleTouchEnd(e) {
        touches = Array.from(e.touches);
        
        if (touches.length === 0) {
            initialDistance = 0;
            initialAngle = 0;
        }
    }

    modalEl.addEventListener('touchstart', handleTouchStart, false);
    modalEl.addEventListener('touchmove', handleTouchMove, false);
    modalEl.addEventListener('touchend', handleTouchEnd, false);

    if (isTouchOnlyDevice()) {
        const controlButtons = Array.from(document.getElementsByClassName("controlButton"));
        controlButtons.forEach(el => el.remove());
    } else {
        // attach controls
        makeRepeatingButton('imgZoomIn', zoomIn);
        makeRepeatingButton('imgZoomOut', zoomOut);
        makeRepeatingButton('imgRotateRight', rotateRight);
        makeRepeatingButton('imgRotateLeft', rotateLeft);
        makeRepeatingButton('imgRight', translateRight);
        makeRepeatingButton('imgLeft', translateLeft);
        makeRepeatingButton('imgUp', translateUp);
        makeRepeatingButton('imgDown', translateDown);
    }

    document.getElementById('imgReset').onclick = resetView;

    imgEl.src = safeSrc;
    imgEl.onload = () => {
        resetView();
    };

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}