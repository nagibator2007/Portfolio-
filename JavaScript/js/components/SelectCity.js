// SelectCity.js
export function initSelectCity() {
  const locationButtonEl = document.querySelector('.location__city');
  const arrowEl = document.querySelector('.location__arrow');
  const cityListEl = document.querySelector('.location__sublist');
  const cityDisplayEl = document.querySelector('.location__city-name');

  // Добавляем обработчик события на кнопку выбора города
  locationButtonEl.addEventListener('click', function (event) {
    event.stopPropagation();

    locationButtonEl.classList.toggle('location__city--active');

    if (locationButtonEl.classList.contains('location__city--active')) {
      arrowEl.style.transform = 'rotate(-180deg)';
    } else {
      arrowEl.style.transform = 'rotate(0deg)';
    }
  });

  // Функция для закрытия списка городов
  function closeElement() {
    locationButtonEl.classList.remove('location__city--active');
    arrowEl.style.transform = 'rotate(0deg)';
  }

  // Добавляем обработчик события на document.body для закрытия списка городов при клике вне списка
  document.body.addEventListener('click', function (event) {
    if (!locationButtonEl.contains(event.target) && locationButtonEl.classList.contains('location__city--active')) {
      closeElement();
    }
  });

  // Добавляем обработчик события на список городов для выбора города
  cityListEl.addEventListener('click', function (event) {

    if (event.target.classList.contains('location__sublink')) {
      const selectedCity = event.target.textContent;
      cityDisplayEl.textContent = selectedCity;
      closeElement();
    }
  });
}