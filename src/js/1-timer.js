import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dataInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
const daysDate = document.querySelector('[data-days]');
const hoursDate = document.querySelector('[data-hours]');
const minutesDate = document.querySelector('[data-minutes]');
const secondsDate = document.querySelector('[data-seconds]');

let userSelectedDate = null;

const showToast = () => {
  iziToast.error({
    message: 'Please choose a date in the future',
    messageColor: '#fff',
    backgroundColor: '#ef4040',
    close: 'true',
    position: 'topRight',
  });
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      startButton.disabled = true;
      showToast();
    } else {
      startButton.disabled = false;
    }
  },
};

const updateClock = ({ days, hours, minutes, seconds }) => {
  daysDate.textContent = `${addLeadingZero(days)}`;
  hoursDate.textContent = `${addLeadingZero(hours)}`;
  minutesDate.textContent = `${addLeadingZero(minutes)}`;
  secondsDate.textContent = `${addLeadingZero(seconds)}`;
};

const startTimer = () => {
  if (userSelectedDate <= new Date()) {
    startButton.disabled = true;
    showToast();
    return;
  }
  dataInput.disabled = true;
  startButton.disabled = true;
  const timerInterval = setInterval(() => {
    if (userSelectedDate <= new Date()) {
      clearInterval(timerInterval);
      dataInput.disabled = false;
    } else {
      updateClock(convertMs(userSelectedDate - Date.now()));
    }
  }, 1000);
};

startButton.addEventListener('click', startTimer);

flatpickr(dataInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};
