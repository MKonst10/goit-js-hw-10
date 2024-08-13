import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const promiseForm = document.querySelector('.form');

function makePromise(delay, promiseState) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (promiseState === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
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
}

promiseForm.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(promiseForm.elements.delay.value);
  const promiseState = promiseForm.elements.state.value;
  makePromise(delay, promiseState);
});
