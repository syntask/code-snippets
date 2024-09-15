document.addEventListener('DOMContentLoaded', function() {
    // Awesome Forms
    // Version 1.0.0 (07/20/2024)
    // Made for Webflow
    // Created by Syntask 
    // For custom help text, add an element with the class .af-helptext immediately after the input element

    
    // Locate the submit button
    const submitButton = document.querySelector('input[type="submit"]');

    // Hide any helptext elements
    document.querySelectorAll('.af-helptext').forEach(helptext => {helptext.style.display = 'none';});


    // ----------------------------------------------------------------
    // ------------------- TELEPHONE VALIDATION -----------------------
    // ----------------------------------------------------------------
    const telInputs = document.querySelectorAll('input[type="tel"]');

    function validateTel(element){
        let input = element.value;
        let required = element.hasAttribute('required');
        let cleaned = input.replace(/\D/g, '');
        if (cleaned.length == 10) {
            return true;
        } else if (!required && cleaned.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    telInputs.forEach(telInput => {

        // Find the related helptext element (next sibling with class .af-helptext)
        let helptext = telInput.nextElementSibling;
        while (helptext && !helptext.classList.contains('af-helptext')) {
            helptext = helptext.nextElementSibling;
        }

        telInput.addEventListener('input', (e) => {
            let input = e.target.value;
            let cleaned = input.replace(/\D/g, '');

            // Format input as the user types
            let formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            e.target.value = formatted;

            // Clear errors immediately if valid
            if (validateTel(telInput)) {
                helptext.style.display = 'none';
            }
        });

        // Validate phone numbers when the input loses focus
        telInput.addEventListener('blur', (e) => {
            let input = e.target.value;
            let cleaned = input.replace(/\D/g, '');

            // Hide/show the helptext based on validation
            if (validateTel(telInput)) {
                helptext.style.display = 'none';
            } else {
                helptext.style.display = 'block';
            }
        });
    });


    // ----------------------------------------------------------------
    // --------------------- EMAIL VALIDATION -------------------------
    // ----------------------------------------------------------------
    const emailInputs = document.querySelectorAll('input[type="email"]');

    function validateEmail(element){
        let input = element.value;
        let required = element.hasAttribute('required');
        let valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        if (valid) {
            return true;
        } else if (!required && input.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    emailInputs.forEach(emailInput => {

        // Find the related helptext element (next sibling with class .af-helptext)
        let helptext = emailInput.nextElementSibling;
        while (helptext && !helptext.classList.contains('af-helptext')) {
            helptext = helptext.nextElementSibling;
        }

        emailInput.addEventListener('input', (e) => {
            let input = e.target.value;

            // Clear errors immediately if valid
            if (validateEmail(emailInput)) {
                helptext.style.display = 'none';
            }
        });

        // Validate email when the input loses focus
        emailInput.addEventListener('blur', (e) => {
            let input = e.target.value;

            // Hide/show the helptext based on validation
            if (validateEmail(emailInput)) {
                helptext.style.display = 'none';
            } else {
                helptext.style.display = 'block';
            }
        });

    });


    // ----------------------------------------------------------------
    // -------------------- MISC INPUT VALIDATION ---------------------
    // ----------------------------------------------------------------
    const allInputs = document.querySelectorAll('input');

    //Remove any inputs that are already being validated
    let miscInputs = Array.from(allInputs).filter(input => {
        return !Array.from(telInputs).includes(input) && !Array.from(emailInputs).includes(input);
    });

    console.log(miscInputs);

    function validateInput(element){
        let input = element.value;
        let required = element.hasAttribute('required');
        let type = element.type;
        if (type === 'checkbox') {
            if (element.checked) {
                return true;
            } else if (!required) {
                return true;
            } else {
                return false;
            }
        } else {
            if (input.length > 0) {
                return true;
            } else if (!required) {
                return true;
            } else {
                return false;
            }
        }
    }

    miscInputs.forEach(miscInput => {

        // Find the related helptext element (next sibling with class .af-helptext)
        let helptext = miscInput.nextElementSibling;
        while (helptext && !helptext.classList.contains('af-helptext')) {
            helptext = helptext.nextElementSibling;
        }

        miscInput.addEventListener('input', (e) => {
            let input = e.target.value;

            // Clear errors immediately if valid
            if (validateInput(miscInput)) {
                helptext.style.display = 'none';
            } else {
                // Also display the helptext if the input is a checkbox
                if (miscInput.type === 'checkbox') {
                    helptext.style.display = 'block';
                }
            }
        });

        // Validate input when the input loses focus
        miscInput.addEventListener('blur', (e) => {
            let input = e.target.value;

            // Hide/show the helptext based on validation
            if (validateInput(miscInput)) {
                helptext.style.display = 'none';
            } else {
                helptext.style.display = 'block';
            }
        });

    });

    // ----------------------------------------------------------------
    // ---------------------- FORM SUBMISSION -------------------------
    // ----------------------------------------------------------------
    submitButton.addEventListener('click', (e) => {
        let valid = true;
        telInputs.forEach(telInput => {
            telInput.dispatchEvent(new Event('blur'));
            if (!validateTel(telInput)) {
                valid = false;
            }
        });

        emailInputs.forEach(emailInput => {
            emailInput.dispatchEvent(new Event('blur'));
            if (!validateEmail(emailInput)) {
                valid = false;
            }
        });

        miscInputs.forEach(miscInput => {
            miscInput.dispatchEvent(new Event('blur'));
            if (!validateInput(miscInput)) {
                valid = false;
            }
        });

        if (!valid) {
            e.preventDefault();
            // Emphasize any visible helptext elements with a momentey fade animation
            document.querySelectorAll('.af-helptext').forEach(helptext => {helptext.style.transition = 'opacity 0.2s ease-in-out';});
            setTimeout(() => {
            document.querySelectorAll('.af-helptext').forEach(helptext => {helptext.style.opacity = '0.8';});
            }, 50);
            setTimeout(() => {
                document.querySelectorAll('.af-helptext').forEach(helptext => {helptext.style.opacity = '1';});
            }, 400);
        }
    });
});