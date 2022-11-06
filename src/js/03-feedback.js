var throttle = require('lodash.throttle');

const KEY = 'feedback-form-state';
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');
const form = document.querySelector('form.feedback-form');

const getDataFromStorage = () => {
  return localStorage.getItem(KEY) ? JSON.parse(localStorage.getItem(KEY)) : {};
};

const dataFromStorage = getDataFromStorage();
input.value = dataFromStorage.email ? dataFromStorage.email : '';
textarea.value = dataFromStorage.message ? dataFromStorage.message : '';

const onInput = throttle(ev => {
  try {
    const data = {};
    data[ev.target.name] = ev.target.value;

    const dataFromStorage = getDataFromStorage();

    const dataForStorage = { ...dataFromStorage, ...data };

    localStorage.setItem(KEY, JSON.stringify(dataForStorage));
  } catch {
    alert('Sorry, something went wrong');
  }
}, 5000);

const onSubmit = ev => {
  try {
    ev.preventDefault();

    const dataFromStorage = getDataFromStorage();

    console.log(dataFromStorage);

    localStorage.removeItem(KEY);
    form.reset();
  } catch {
    alert('Sorry, something went wrong');
  }
};

input.addEventListener('input', onInput);
textarea.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
