document.addEventListener('DOMContentLoaded', function() {

    const template = `
    <body>
        <div class="section">
            <div class="navbar">
                <div class="content-area">
                    <div class="navbar-inner">
                        <div class="navbar-title">
                        <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="1.2em" viewBox="0 0 24 24" width="1.2em" fill="#e8eaed">
                        <g><rect fill="none" height="24" width="24"/></g><g><path d="M19.8,18.4L14,10.67V6.5l1.35-1.69C15.61,4.48,15.38,4,14.96,4H9.04C8.62,4,8.39,4.48,8.65,4.81L10,6.5v4.17L4.2,18.4 C3.71,19.06,4.18,20,5,20h14C19.82,20,20.29,19.06,19.8,18.4z"/></g>
                        </svg>
                        Syntask Lab
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="content-area">
                <div id="main"></div>
            </div>
        </div>

        <div class="section spacer-flex-grow">
        </div>

        <div class="section">
            <div class="content-area">
                <div class="footer">
                    <p>© Isaac Neumann</p>
                </div>
            </div>
        </div>
    </body>
    `;

    // Replace the content of the body with the template, then move the old body content to the main div
    const oldContent = document.body.innerHTML;
    document.body.innerHTML = template;
    const main = document.getElementById('main');
    main.innerHTML = oldContent;

        // Add a copy code button to all code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.textContent = 'Copy code';
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(block.textContent);
                button.style.width = `${button.offsetWidth}px`;
                button.textContent = 'Copied!';
                // Highlight/select the text
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(block);
                selection.removeAllRanges();
                selection.addRange(range);
                // Unhighlight/unselect the text after 1 second
    
                setTimeout(() => {
                    selection.removeAllRanges();
                }, 100);
    
                setTimeout(() => {
                    button.textContent = 'Copy code';
                    button.style.width = '';
                }, 1000);
            });
            block.parentElement.appendChild(button);
        });
});