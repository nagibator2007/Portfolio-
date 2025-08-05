// Modal.js

// Открывает модальное окно с заданным типом и сообщением.
export function openModal(type, message) {
  let modal;

  if (type === 'success') {
    modal = document.querySelector('#success-modal');
  } else if (type === 'error') {
    modal = document.querySelector('#error-modal');
  }

  if (modal) {
    const modalMessage = modal.querySelector('.modal__message');
    if (modalMessage) {
      modalMessage.textContent = message;
    }
    modal.classList.add('modal--open');

    const closeButton = modal.querySelector('.modal__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        modal.classList.remove('modal--open');
      });
    }
  }
}