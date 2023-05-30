import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const formData = {}; 
if (STORAGE_KEY) {
    const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    formData.email = parsedData.email;
    formData.message = parsedData.message;
}

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

useLocalStorage();


function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
    e.preventDefault();
    if (inputEl.value.trim() === '' || messageEl.value.trim() === '') {
        alert('Fill out all the fields of the form!');
    } else {
        e.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
        formData.email = '';
        formData.message = '';
    }
}

function useLocalStorage() {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
        console.log(savedData);
        const parsedData = JSON.parse(savedData);

        if (parsedData.email) {
            inputEl.value = parsedData.email;
        }
        if (parsedData.message) {
            messageEl.value = parsedData.message;
        }
    }
}