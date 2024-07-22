let inputs = document.querySelectorAll("input,textarea");
let radioBtns = document.querySelectorAll('input[type="radio"]');
let form = document.querySelector('form');
let submitBtn = document.querySelector('input[type="submit"]');
let radioContainer = document.querySelector('.radioContainer');
let confirmationMessage = document.querySelector('.popUpMsg');
let radioBtnChecked = false;
let firstEmptyFocused = false;
let allFieldsValid = true;


function checkRequiredFields() {
    form.addEventListener('submit', function (e) {
        firstEmptyFocused = false;
        radioBtnChecked = false;
        allFieldsValid = true;
        e.preventDefault();
        inputs.forEach(function (input) {
            if (input.type === 'text'
                || input.type === 'email'
                || input.tagName === 'TEXTAREA') {
                if (input.value.trim() === '') {
                    allFieldsValid = false;
                    let errorMessage = input.parentElement.lastElementChild;
                    errorMessage.style.display = 'block';
                    input.classList.add('error');
                    input.setAttribute('aria-describedby', 'required-alert');
                    if (!firstEmptyFocused) {
                        input.focus();
                        firstEmptyFocused = true;
                    }
                    return;
                }
            } else if (input.type === 'radio' && !radioBtnChecked) {
                for (btn of radioBtns) {
                    if (btn.checked) {
                        radioBtnChecked = true;
                        return;
                    }
                }
                allFieldsValid = false;
                let requiredText = input.parentElement.parentElement.lastElementChild;
                requiredText.style.display = 'block';
                radioContainer.setAttribute('tabindex', '0');
                radioContainer.setAttribute('aria-disabled', 'true');
                radioContainer.setAttribute('aria-describedby', 'query-alert');
                if (!firstEmptyFocused) {
                    radioContainer.focus();
                    firstEmptyFocused = true;
                }
            } else if (input.type === 'checkbox' && !input.checked) {
                allFieldsValid = false;
                let requiredText = input.parentElement.lastElementChild;
                requiredText.style.display = 'block';
                if (!firstEmptyFocused) input.focus();
            }
        });
        if (allFieldsValid) {
            showPopUp();
            submitBtn.setAttribute('aria-describedby', 'confirm-alert');
        }
    });
}
checkRequiredFields();

function checkCorrectlyFilled() {
    inputs.forEach(function (input) {
        input.addEventListener('input', function (e) {
            let errorMessage = e.target.parentElement.lastElementChild;
            if (e.target.type === 'text' || e.target.tagName === 'TEXTAREA') {
                if (e.target.value !== '') {
                    errorMessage.style.display = 'none';
                    e.target.classList.remove('error');
                } else {
                    errorMessage.style.display = 'block';
                    e.target.classList.add('error');
                }
            } else if (e.target.type === 'radio' && e.target.checked) {
                errorMessage = e.target.parentElement.parentElement.lastElementChild;
                errorMessage.style.display = 'none';
            } else if (e.target.type === 'checkbox' && e.target.checked) {
                errorMessage.style.display = 'none';
            } else if (e.target.type === 'email') {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                    errorMessage.style.display = 'none';
                    e.target.classList.remove('error');
                } else {
                    errorMessage.style.display = 'block';
                    e.target.classList.add('error');
                }
            } else return;
        });
    });
}
checkCorrectlyFilled();

function showPopUp() {
    confirmationMessage.classList.add('show');
    setTimeout(() => {
        confirmationMessage.classList.remove('show');
    }, 3000);
}
