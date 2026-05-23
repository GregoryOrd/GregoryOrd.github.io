/*

Example usage:

<carousel
    carousel-id="HelpingHandsCarousel"
    images='[
        {"src":"HelpingHandsCafe/OrderDashboard.png","style":"height: 5%; width:100%;"},
        {"src":"HelpingHandsCafe/ReceiptExample.png","style":"height: 5%; width:100%;"},
        {"src":"HelpingHandsCafe/DeliveredOrders.png","style":"height: 5%; width:100%;"},
        {"src":"HelpingHandsCafe/PrintedReceipt.jpg","style":"height: 5%; width:50%; margin-left: 25%;"},
        {"src":"HelpingHandsCafe/JanErikSetupWithLadies.jpg","style":"height: 5%; width:70%; margin-left: 15%;"},
        {"src":"HelpingHandsCafe/OriginalGoogleForm.png","style":"height: 5%; width:100%;"}
    ]'
></carousel>

*/

class ImageCarousel extends HTMLElement {
    connectedCallback() {

        // Get carousel id
        const carouselId = this.getAttribute('carousel-id') || 'carouselExample';

        // Get image data from attribute
        const images = JSON.parse(this.getAttribute('images') || '[]');

        const height = this.getAttribute('height');
        const minHeight = this.getAttribute('min-height');
        const minWidth = this.getAttribute('min-width');

        // Create indicators
        let indicatorsHTML = '';

        images.forEach((_, index) => {
            indicatorsHTML += `
                <button 
                    type="button" 
                    data-bs-target="#${carouselId}" 
                    data-bs-slide-to="${index}" 
                    class="${index === 0 ? 'active' : ''}">
                </button>
            `;
        });

        // Create slides
        let slidesHTML = '';
           images.forEach((image, index) => {
                slidesHTML += `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <div
                            style="
                                min-height: ${minHeight}
                                min-width: ${minWidth};
                                height: ${height};
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            ">

                            <viewable-img 
                                src="${image.src}" 
                                style="
                                    width: 75%;
                            ">
                            </viewable-img>

                        </div>

                    </div>
                `;
            });  
    
        // Build full carousel
        this.innerHTML = `
            <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">

                <!-- Slides -->
                <div class="carousel-inner text-center">
                    ${slidesHTML}
        
                    <!-- Controls -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon carousel-control-prev-icon-dark"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>

                    <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon carousel-control-next-icon-dark"></span>
                        <span class="visually-hidden">Next</span>
                    </button>

                </div>

                <!-- Indicators -->
                <div class="carousel-indicators darkIndicators">
                    ${indicatorsHTML}
                </div>
            </div>
        `;
    }
}

customElements.define('image-carousel', ImageCarousel);