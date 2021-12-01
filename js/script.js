/*
Treehouse FSJS Techdegree:
* Project 3 - Interactive Form
*/

/* Variables to store form inputs */
const form = document.querySelector('form');
const userName = document.getElementById('name');
const email = document.getElementById('email');

const selectJob = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOption = color.children;

const activities = document.getElementById('activities');
const activitiesBox = document.getElementById('activities-box');
const checkBox = document.querySelectorAll('[type="checkbox"]');
const total = document.getElementById('activities-cost');
let totalCost = 0;

const payment = document.getElementById('payment');
const paymentOptions = payment.children;
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');


userName.focus(); // Focuses on the name field upon initial load

otherJobRole.style.display = 'none'; // Hides the "Other Job Role" field by default

// Displays or Hides the "Other Job Role" option depending on the "Job Role" selected
selectJob.addEventListener( 'change', e => {
    e.target.value === 'other' 
        ? otherJobRole.style.display = 'block' 
        : otherJobRole.style.display = 'none';
});

color.disabled = true; // disables the color field by default

// Displays the color option after selecting a design, 
// then displays different color options depending on the design selected
design.addEventListener('change', e => {
    color.disabled = false;
    for ( let i = 0; i < colorOption.length; i++ ) {
        const designSelected = colorOption[i].getAttribute('data-theme');
        const target = e.target.value;
        if ( designSelected === target ) {
            colorOption[i].hidden = false;
            colorOption[i].setAttribute('selected', 'selected');
        } else {
            colorOption[i].hidden = true;
            colorOption[i].removeAttribute('selected');
        }
    }
});

// Displays and updates the total cost based on the chosen activities
activities.addEventListener('change', e => {
    const clicked = e.target;
    const dataCost = +clicked.getAttribute('data-cost');
    clicked.checked ? totalCost += dataCost : totalCost -= dataCost;
    total.innerHTML = `Total: $${totalCost}`;
});

// Prevent users from selecting activities that occur at the same time
activitiesBox.addEventListener('change', e => {
    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
    for ( let i = 0; i < checkBox.length; i++ ) {
        const checkboxType = checkBox[i].getAttribute('data-day-and-time');
        if ( checkboxType === clickedType && clicked !== checkBox[i] ) {
            if (clicked.checked) {
                checkBox[i].disabled = true;
                checkBox[i].parentElement.classList.add('disabled');
            } else {
                checkBox[i].disabled = false;
                checkBox[i].parentElement.classList.remove('disabled');
            }
        }
    }
});


// Sets the preferred or most common payment method
const preferredPayment = paymentOptions[1].setAttribute('selected','selected');

// Hides the sections of the other payment method options by default
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// Displays the correct payment details depending on the payment method selected
payment.addEventListener('change', e => {
    for ( let i = 0; i < paymentOptions.length; i++ ) {
        const target = e.target.value;
        switch (target) {
            case 'paypal':
                creditCard.style.display = 'none';
                paypal.style.display = 'block';
                bitcoin.style.display = 'none';
                break;
            case 'bitcoin':
                creditCard.style.display = 'none';
                paypal.style.display = 'none';
                bitcoin.style.display = 'block';
                break;
            default:
                creditCard.style.display = 'block';
                paypal.style.display = 'none';
                bitcoin.style.display = 'none';
                break;
        }
    }
});


// Checks if an input is valid and removes the error message upon validation
function validationPass(e) {
    const parent = e.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none';
}

// Checks if an input is invalid and displays the error message upon validation
function validationFail(e) {
    const parent = e.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.style.display = 'block';
}

    /* Helper function to validate name input */
    function nameValidator() {
        const nameValue = userName.value;
        const nameIsValid = /^\s*?[a-zA-Z]+\s*?[a-zA-Z]*?\s*?/.test(nameValue);
        nameIsValid ? validationPass(userName) : validationFail(userName);
        return nameIsValid;
    }

    /* Helper function to validate email input */
    function emailValidator() {
        const emailValue = email.value;
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
        const emailIsEmpty = /^\s*$/.test(email.value);
        if (emailIsValid) {
            validationPass(email);
        } else if (emailIsEmpty) {
            email.nextElementSibling.textContent = 'Email address field cannot be blank';
            validationFail(email);
        } else {
            validationFail(email);
        }
        return emailIsValid;
    }

    /* Helper function to validate activities section */
    function activitiesValidator() {
        const activitiesIsValid = totalCost > 0;
        activitiesIsValid ? validationPass(activitiesBox) : validationFail(activitiesBox);
        return activitiesIsValid;
    }

    /* Helper function to validate credit card number input */
    function cardNumberValidator() {
        const cardNumberValue = cardNumber.value;
        const cardNumberIsValid = /^\d{13,16}$/.test(cardNumberValue);
        cardNumberIsValid ? validationPass(cardNumber) : validationFail(cardNumber);
        return cardNumberIsValid;
    }

    /* Helper function to validate zip code input */
    function zipCodeValidator() {
        const zipCodeValue = zipCode.value;
        const zipCodeIsValid = /^\d{5}$/.test(zipCodeValue);
        zipCodeIsValid ? validationPass(zipCode) : validationFail(zipCode);
        return zipCodeIsValid;
    }

    /* Helper function to validate cvv input */
    function cvvValidator() {
        const cvvValue = cvv.value;
        const cvvIsValid = /^\d{3}$/.test(cvvValue);
        cvvIsValid ? validationPass(cvv) : validationFail(cvv);
        return cvvIsValid;
    }


// Adds additional style to the boxes in "Register for Activites" section
// It adds a border to the box that is in focus
for ( let i =0; i < checkBox.length; i++ ) {
    checkBox[i].addEventListener('focus', e => {
        e.target.parentElement.classList.add('focus');
    });
    checkBox[i].addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focus');
    });
}

// Provides real-time validation to the required fields
// https://www.javascripttutorial.net/dom/events/detect-if-an-element-has-focus/
form.addEventListener('keyup', e => {
    if (userName === document.activeElement) {
        nameValidator();
    } else if (email === document.activeElement) {
        emailValidator();
    } else if (cardNumber === document.activeElement ) {
        cardNumberValidator();
    } else if (zipCode === document.activeElement) {
        zipCodeValidator();
    } else if (cvv === document.activeElement) {
        cvvValidator();
    }
});

// Checks for the required fields before submission and 
// prevents the form from submitting if there are invalid fields
form.addEventListener('submit', e => {
    if (!nameValidator() && !emailValidator() && !activitiesValidator()) { 
        e.preventDefault(); 
    }
    if (payment.value === 'credit-card') {
        if ( !cardNumberValidator() && !zipCodeValidator() && !cvvValidator() ) {
            e.preventDefault();
        }
    }
});