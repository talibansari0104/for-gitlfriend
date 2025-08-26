let highestZ = 1;

class Paper {
    holdingPaper = false;
    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    velocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        // Mouse down
        paper.addEventListener('mousedown', (e) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;
            this.prevMouseX = e.clientX;
            this.prevMouseY = e.clientY;
        });

        // Touch start (finger down)
        paper.addEventListener('touchstart', (e) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;
            const touch = e.touches[0];
            this.prevMouseX = touch.clientX;
            this.prevMouseY = touch.clientY;
        });

        // Mouse move
        window.addEventListener('mousemove', (e) => {
            if (this.holdingPaper) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;

                this.velocityX = this.mouseX - this.prevMouseX;
                this.velocityY = this.mouseY - this.prevMouseY;

                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform =
                    `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
            }
        });

        // Touch move (finger drag)
        window.addEventListener('touchmove', (e) => {
            if (this.holdingPaper) {
                const touch = e.touches[0];
                this.mouseX = touch.clientX;
                this.mouseY = touch.clientY;

                this.velocityX = this.mouseX - this.prevMouseX;
                this.velocityY = this.mouseY - this.prevMouseY;

                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform =
                    `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
            }
        });

        // Mouse up
        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
        });

        // Touch end (finger lifted)
        window.addEventListener('touchend', () => {
            this.holdingPaper = false;
        });
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
