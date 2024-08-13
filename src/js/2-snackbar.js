import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseForm = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const fulfilledState = document.querySelector('input[value="fulfilled"]');
let delayInMs = null;

delayInput.addEventListener('input', () => {
  delayInMs = delayInput.value;
});

const onFormSubmit = event => {
  event.preventDefault();
  const makePromise = () => {
    const fulfilled = fulfilledState.checked;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fulfilled != false) {
          resolve(`✅ Fulfilled promise in ${delayInMs}ms`);
        } else {
          reject(`❌ Rejected promise in ${delayInMs}ms`);
        }
      }, delayInMs);
    });
  };
  makePromise()
    .then(value => {
      iziToast.show({
        message: value,
        backgroundColor: '#59a10d',
        messageColor: 'white',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
        backgroundColor: '#ef4040',
        messageColor: 'white',
        position: 'topRight',
      });
    });
  promiseForm.reset();
};

promiseForm.addEventListener('submit', onFormSubmit);
