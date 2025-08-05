// Validation.js

import { addValidationRules } from './FormValidationRules.js';
import { openModal } from './Modal.js';

export function initValidation() {
  const form = document.querySelector('.questions__form');

  const validator = new JustValidate(form);

  addValidationRules(validator)
    .onSuccess(async (event) => {
      event.preventDefault();
      await sendData(form);
    });

  async function sendData(form) {
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Форма успешно отправлена');
        form.reset();
        openModal('success', 'Форма успешно отправлена!');
      } else {
        console.error('Ошибка при отправке формы:', response.status);
        openModal('error', 'Произошла ошибка при отправке формы. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      openModal('error', 'Произошла ошибка при отправке формы. Попробуйте еще раз.');
    }
  }
}