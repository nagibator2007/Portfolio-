export function initAccordion() {
  const accordionButtons = document.querySelectorAll('.accordion__btn');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isActive = document.querySelector('.accordion__btn--active');
      isActive?.classList.remove('accordion__btn--active')
      button.classList.toggle('accordion__btn--active', isActive !== button);
    });
  });
}