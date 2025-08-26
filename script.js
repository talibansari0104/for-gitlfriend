let highestZ = 1;

class Paper {
    holdingPaper = false;
    prevX = 0;
    prevY = 0;

    currentX = 0;
    currentY = 0;

    init(paper) {
        // Common function to start drag
        const startDrag = (x, y) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;
            this.prevX = x;
            this.prevY = y;
        };

        // Common function to move
        const moveDrag = (x, y) => {
            if (this.holdingPaper) {
                const dx = x - this.prevX;
                const dy = y - this.prevY;

                this.currentX += dx;
                this.currentY += dy;

                this.prevX = x;
                this.prevY = y;

                paper.style.transform =
                    `translate(${this.currentX}px, ${this.currentY}px)`;
            }
        };

        // Mouse events
        paper.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
        window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
        window.addEventListener('mouseup', () => this.holdingPaper = false);

        // Touch events
        paper.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
        });

        window.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            moveDrag(touch.clientX, touch.clientY);
        });

        window.addEventListener('touchend', () => this.holdingPaper = false);
    }
}

const papers = document.querySelectorAll('.paper');
papers.forEach(paper => {
    new Paper().init(paper);
});
