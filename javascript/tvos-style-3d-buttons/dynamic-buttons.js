function initDynamicButtons(){
    
    const dynamicButtons = document.querySelectorAll('.dynamic-button');
    for (const button of dynamicButtons) {
        button.addEventListener('mouseenter', function() {
            this.classList.add('dynamic-button--hover');
            this.style.transition = 'box-shadow 0.4s';
            const moveableElement = this;
            let originX = moveableElement.getBoundingClientRect().left;
            let originY = moveableElement.getBoundingClientRect().top;

            let offsetX = 0;
            let offsetY = 0;

            let x
            let y

            const onMouseMove = function(e) {
                const rect = moveableElement.getBoundingClientRect();
                x = e.clientX - originX; // X position within the element
                y = e.clientY - originY;  // Y position within the element
        
                const maxXOffset = rect.width / 30; // Maximum offset in pixels
                const maxYOffset = rect.height / 30; // Maximum offset in pixels
        
                let targetOffsetX = (x / rect.width) * maxXOffset - maxXOffset / 2;
                let targetOffsetY = (y / rect.height) * maxYOffset - maxYOffset / 2;

                // Smoothly move the element towards the target position
                offsetX += (targetOffsetX - offsetX) * 0.3;
                offsetY += (targetOffsetY - offsetY) * 0.3;

                offsetXratio = offsetX / maxXOffset;
                offsetYratio = offsetY / maxYOffset;
        
                moveableElement.style.transform = `perspective(20px) rotateX(calc(${offsetYratio} * 1deg)) rotateY(calc(${offsetXratio} * -1deg)) translate(${offsetX}px, ${offsetY}px) scale(1.0)`;

                moveableElement.style.setProperty('--db-highlight-x', `${x}px`);
                moveableElement.style.setProperty('--db-highlight-y', `${y}px`);

                this.style.setProperty('box-shadow', `0 0 24px 0px rgba(0,0,0,0.15)`);
                this.style.setProperty('z-index', '1');

            };
        
            moveableElement.addEventListener('mousemove', onMouseMove);
        
            moveableElement.addEventListener('mouseleave', function() {
                moveableElement.removeEventListener('mousemove', onMouseMove);
                this.style.transition = 'transform 0.4s, box-shadow .4s';
                this.style.transform = `translate(0px, 0px) scale(1.0)`;
                this.style.setProperty('box-shadow', `0 0 16px 0px rgba(0,0,0,0)`);
                this.style.setProperty('z-index', '');
                this.classList.remove('dynamic-button--hover');

                
            });
        });
    }
}