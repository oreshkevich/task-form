export function validateForm() {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input, textarea');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  for (const input of inputs) {
    const isEmpty = !input.value.trim();
    const isEmailInvalid =
      input.name === 'email' && !emailRegex.test(input.value);

    if (isEmpty || isEmailInvalid) {
      isValid = false;
    }

    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }

    if (isEmpty) {
      input.classList.add('error');
      const error = document.createElement('span');
      error.classList.add('error-message');
      error.textContent = 'Поле обязательно';
      input.parentNode.insertBefore(error, input.nextSibling);
    } else if (isEmailInvalid) {
      input.classList.add('error');
      const error = document.createElement('span');
      error.classList.add('error-message');
      error.textContent = 'Некорректный email';
      input.parentNode.insertBefore(error, input.nextSibling);
    } else {
      input.classList.remove('error');
    }
  }

  return isValid;
}
