// Filters.js

import { createProductCardHTML } from './ProductCards.js';
import { filterByType } from './FilterByType.js';
import { filterByAvailability } from './FilterByAvailability.js';
import { sortData } from './SortProducts.js';
import { getSelectedTypes, getSelectedAvailability } from './GetSelectedFilters.js';

let currentSort = 'price-min';
let catalogListEl;

function resetFilterValues() {
  // Сброс чекбоксов
  const typeCheckboxes = document.querySelectorAll('.custom-checkbox__field[name="type"]');
  typeCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  // Сброс радиокнопок
  const availabilityRadios = document.querySelectorAll('.custom-radio__field[name="status"]');
  availabilityRadios.forEach(radio => {
    radio.checked = false;
  });

  // Сброс селекта сортировки
  const sortSelect = document.querySelector('.catalog__sort-select');
  if (sortSelect) {
    sortSelect.value = 'price-min';
    currentSort = 'price-min';
  }
}

// Инициализирует кнопку сброса фильтров.
export function initResetFilters(appData) {
  const resetButton = document.querySelector('.catalog-form__reset');

  resetButton.addEventListener('click', (event) => {
    event.preventDefault();

    resetFilterValues();

    if (appData && appData.products) { // Проверка на существование appData и appData.products
      applyFilters(appData.products);
    }
  });
}

// Применяет фильтры к данным и отображает результаты.
export function applyFilters(products) {
  catalogListEl = document.querySelector('.catalog__list');

  try {
    const selectedTypes = getSelectedTypes();
    const selectedAvailability = getSelectedAvailability();

    let filteredProducts = products;
    filteredProducts = filterByType(filteredProducts, selectedTypes);
    filteredProducts = filterByAvailability(filteredProducts, selectedAvailability);
    filteredProducts = sortData(filteredProducts, currentSort);

    renderProducts(filteredProducts, catalogListEl);

  } catch (error) {
    console.error('Ошибка при применении фильтров:', error);
  }
}



// Инициализирует селект сортировки.
export function initSorting(appData) {
  const sortSelect = document.querySelector('.catalog__sort-select');

  sortSelect.addEventListener('change', (event) => {
    currentSort = event.target.value;
    applyFilters(appData.products);
  });
}

function renderProducts(products, catalogListEl) {
  catalogListEl.innerHTML = '';

  products.forEach(product => {
    const listItemEl = document.createElement('li');
    listItemEl.classList.add('catalog__item');
    listItemEl.innerHTML = createProductCardHTML(product);
    catalogListEl.appendChild(listItemEl);
  });
}