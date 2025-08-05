// main.js
import { initBurger } from "./components/Burger.js";
import { initSelectCity } from "./components/SelectCity.js";
import { initResponse } from "./components/Response.js";
import { applyFilters, initSorting, initResetFilters } from "./components/Filters.js";
import { initBasket } from './components/Basket.js';
import { initAccordion } from './components/Accordion.js';
import { initSlider } from './components/Slider.js';
import { initValidation } from './components/FormValidations.js';
import { updateFilterCounts } from './components/UpdateFilterCounts.js'; // Import the validation

// Создаем объект для хранения данных
const appData = {
  products: null, // Здесь будут храниться данные о товарах
};

window.addEventListener('DOMContentLoaded', () => {
  initBurger();
  initSelectCity();
  initAccordion();
  initValidation();

  // Загружаем данные и передаем их в компоненты
  fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
      appData.products = data;
      initSlider(data);
      initBasket(data);
      updateFilterCounts(data);
      initResponse(data);


      // Инициализируем сортировку и фильтры после загрузки данных
      initSorting(appData);
      initResetFilters(appData);
      applyFilters(data);

      const filterElements = document.querySelectorAll('.custom-checkbox__field[name="type"], .custom-radio__field[name="status"]');
      filterElements.forEach(element => {
        element.addEventListener('change', () => applyFilters(appData.products));
      });
    })
    .catch(error => {
      console.error('Ошибка загрузки данных:', error);
    });
});