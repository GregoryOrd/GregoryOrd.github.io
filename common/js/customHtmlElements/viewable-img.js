import { ImageTransformer } from "../imageTransformer.js";

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

function ShowImageModal(imgSrc, touchRotationEnabled=false) {
    const safeSrc = imgSrc || '';

    const modalEl = document.getElementById('imageModal');
    const imgEl = document.getElementById('ImageModalImg');

    let transformer = new ImageTransformer(imgEl, touchRotationEnabled);    

    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        // Touch only device, remove buttons and enable touch controls 
        const controlButtons = Array.from(document.getElementsByClassName("controlButton"));
        controlButtons.forEach(el => el.remove());

        modalEl.addEventListener('touchstart', (e) => transformer.handleTouchStart(e), false);
        modalEl.addEventListener('touchmove', (e) => transformer.handleTouchMove(e), false);
        modalEl.addEventListener('touchend', (e) => transformer.handleTouchEnd(e), false);
    } else {
        // attach controls
        makeRepeatingButton('imgZoomIn', () => transformer.zoomIn());
        makeRepeatingButton('imgZoomOut', () => transformer.zoomOut());
        makeRepeatingButton('imgRotateRight', () => transformer.rotateRight());
        makeRepeatingButton('imgRotateLeft', () => transformer.rotateLeft());
        makeRepeatingButton('imgRight', () => transformer.translateRight());
        makeRepeatingButton('imgLeft', () => transformer.translateLeft());
        makeRepeatingButton('imgUp', () => transformer.translateUp());
        makeRepeatingButton('imgDown', () => transformer.translateDown());
    }

    document.getElementById('imgReset').onclick = () => transformer.resetView();

    imgEl.src = safeSrc;
    imgEl.onload = () => {
        transformer.resetView();
    };

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

class ViewableImage extends HTMLElement {
    connectedCallback() {
        const img = document.createElement('img');

        img.src = this.getAttribute('src');
        img.alt = this.getAttribute('alt') || '';

        // Click behavior
        img.addEventListener('click', () => {
            ShowImageModal(img.src);
        });

        // Add image to custom element
        this.appendChild(img);
    }
}

customElements.define('viewable-img', ViewableImage);