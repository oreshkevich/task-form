import Inputmask from 'inputmask';
import {validateForm} from './validation';
import '../style.scss';
const phoneInput = document.querySelector("input[type='tel']");
Inputmask('+375 (99) 999-99-99').mask(phoneInput);

document
  .getElementById('feedback-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!validateForm(this)) return;

    const formData = new FormData(this);
    console.log(`formData`, formData);
    try {
      const response = await fetch('http://localhost:9090/api/registration', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.status === 'success') {
        console.log(`data`, data);
        alert(data.message);
        this.reset();
        console.log('Форма успешно отправлена');
      } else {
        for (const [field, errorMessage] of Object.entries(data.fields)) {
          const input = this.querySelector(`[name="${field}"]`);
          const error = document.createElement('div');
          error.className = 'error';
          error.innerText = errorMessage;
          input.after(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

const modal = document.getElementById('modal');
const openModalButton = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-modal');

openModalButton.addEventListener('click', () => {
  modal.classList.add('active');
  document.body.classList.add('no-scroll');
});

closeModalButton.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
});
