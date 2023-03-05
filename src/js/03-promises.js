import Notiflix from 'notiflix';

const form = document.querySelector('form');

form.addEventListener('submit', hendleFormSubmit);
form.addEventListener('input', handleFormIsLessThenThero);

function handleFormIsLessThenThero() {
  const delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  if (delay < 0 || step < 0 || amount < 0) {
    Notiflix.Notify.failure('Value must be greater than zero');
    return;
  }
}

function hendleFormSubmit(event) {
  event.preventDefault();

  const delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    const amountPosition = i;
    const currentDelay = delay + i * step;

    createPromise(amountPosition, currentDelay);

    form.reset();
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
