import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const restartBtn = document.querySelector('button[data-restart]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutsRef = document.querySelector('[data-minutes]');
const secondssRef = document.querySelector('[data-seconds]');

startBtn.disabled = true;
stopBtn.disabled = true;
restartBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const nowTime = Date.now();

    if (selectedDate.getTime() < nowTime) {
      startBtn.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      stopBtn.disabled = false;
      restartBtn.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

let intervalId = null;

function startTimer() {
  const selectedDate = new Date(dateInput.value);
  const nowDate = Date.now();
  const deltaTime = selectedDate - nowDate;

  if (deltaTime <= 0) {
    clearInterval(intervalId);
    startBtn.disabled = true;
    Notiflix.Notify.success('Finished');
    setTimeout(() => {
      // reload();
    }, 1000);
    return;
  }
  updateTimer(deltaTime);
}

function updateTimer(deltaTime) {
  const { days, hours, minutes, seconds } = convertMs(deltaTime);

  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutsRef.textContent = addLeadingZero(minutes);
  secondssRef.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', () => {
  Notiflix.Notify.info('START');
  intervalId = setInterval(startTimer, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  Notiflix.Notify.info('STOP!');
});

restartBtn.addEventListener('click', preRestart);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function preRestart() {
  Notiflix.Notify.info('RESTART');
  setTimeout(() => {
    restartTimer();
  }, 1000);
}

function restartTimer() {
  clearInterval(intervalId);
  daysRef.textContent = '00';
  hoursRef.textContent = '00';
  minutsRef.textContent = '00';
  secondssRef.textContent = '00';
  // dateInput.value = '';
  // startBtn.disabled = true;
  // stopBtn.disabled = true;
  // restartBtn.disabled = true;
  reload();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function reload() {
  document.location.reload();
}
