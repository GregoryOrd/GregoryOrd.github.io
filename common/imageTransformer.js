export class ImageTransformer {
    static DEFAULT_ZOOM_FACTOR = 1.2;
    static DEFAULT_ROTATION_DEG = 10;
    static DEFAULT_TRANSLATION_PX = 20;

    constructor(imgEl, touchRotationEnabled) 
    {
        this.imgEl = imgEl;
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.rotation = 0;

        // Touch controls
        this.touchRotationEnabled = touchRotationEnabled;
        this.touches = [];
        this.initialDistance = 0;
        this.initialAngle = 0;
        this.initialScale = 1;
        this.initialRotation = 0;
        this.lastX = 0;
        this.lastY = 0;
    }

    updateTransform() {
        this.imgEl.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale}) rotate(${this.rotation}deg)`;
    }

    zoomIn(zoomFactor = ImageTransformer.DEFAULT_ZOOM_FACTOR) {
        this.scale = this.scale * zoomFactor;
        this.updateTransform();
    }

    zoomOut(zoomFactor = ImageTransformer.DEFAULT_ZOOM_FACTOR) {
        this.scale = this.scale / zoomFactor;
        this.updateTransform();
    }

    rotateRight(rotationSize = ImageTransformer.DEFAULT_ROTATION_DEG) {
        this.rotation = (this.rotation + rotationSize) % 360; 
        this.updateTransform();
    }

    rotateLeft(rotationSize = ImageTransformer.DEFAULT_ROTATION_DEG) {
        this.rotation = (this.rotation - rotationSize) % 360; 
        this.updateTransform();
    }

    translateRight(translationSize = ImageTransformer.DEFAULT_TRANSLATION_PX) {
        this.translateX -= translationSize;
        this.updateTransform();
    }

    translateLeft(translationSize = ImageTransformer.DEFAULT_TRANSLATION_PX) {
        this.translateX += translationSize;
        this.updateTransform();
    }

    translateUp(translationSize = ImageTransformer.DEFAULT_TRANSLATION_PX) {
        this.translateY += translationSize;
        this.updateTransform();
    }

    translateDown(translationSize = ImageTransformer.DEFAULT_TRANSLATION_PX) {
        this.translateY -= translationSize;
        this.updateTransform();
    }

    resetView() {
        this.scale = 1; 
        this.translateX = 0; 
        this.translateY = 0; 
        this.rotation = 0; 

        this.touches = [];
        this.initialDistance = 0;
        this.initialAngle = 0;
        this.initialScale = 1;
        this.initialRotation = 0;
        this.lastX = 0;
        this.lastY = 0;

        this.updateTransform();
    }

    getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getAngle(touch1, touch2) {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.atan2(dy, dx) * (180 / Math.PI);
    }

    handleTouchStart(e) {
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 1) {
            this.lastX = this.touches[0].clientX;
            this.lastY = this.touches[0].clientY;
        } else if (this.touches.length === 2) {
            this.initialDistance = getDistance(this.touches[0], this.touches[1]);
            this.initialAngle = getAngle(this.touches[0], this.touches[1]);
            this.initialScale = scale;
            this.initialRotation = rotation;
        }
    }

    handleTouchMove(e) {
        e.preventDefault();
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 1) {
            // Pan: single finger drag
            const deltaX = this.touches[0].clientX - lastX;
            const deltaY = this.touches[0].clientY - lastY;
            
            this.translateX += deltaX;
            this.translateY += deltaY;
            
            this.lastX = this.touches[0].clientX;
            this.lastY = this.touches[0].clientY;
            
            this.updateTransform();
        } else if (this.touches.length === 2) {
            // Pinch-to-zoom and rotation: two finger gesture
            const currentDistance = getDistance(this.touches[0], this.touches[1]);
            const currentAngle = getAngle(this.touches[0], this.touches[1]);
            
            // Zoom: scale based on distance change
            const scaleFactor = currentDistance / this.initialDistance;
            this.scale = Math.max(0.5, Math.min(this.initialScale * scaleFactor, 5));
            
            if(this.touchRotationEnabled) {
                // Rotation: angle change between fingers
                const angleDelta = currentAngle - this.initialAngle;
                this.rotation = this.initialRotation + angleDelta;
            }
            
            this.updateTransform();
        }
    }

    handleTouchEnd(e) {
        this.touches = Array.from(e.touches);
        
        if (this.touches.length === 0) {
            this.initialDistance = 0;
            this.initialAngle = 0;
        }
    }
}