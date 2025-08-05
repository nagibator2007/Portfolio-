// GetSelectedFilters.js

// Получаем выбранные типы товаров из чекбоксов
export function getSelectedTypes() {
  const typeCheckboxes = document.querySelectorAll('.custom-checkbox__field[name="type"]:checked');
  return Array.from(typeCheckboxes).map(checkbox => checkbox.value);
}

// Получает выбранные значения доступности товаров из радиокнопок
export function getSelectedAvailability() {
  const availabilityRadios = document.querySelectorAll('.custom-radio__field[name="status"]:checked');
  return Array.from(availabilityRadios).map(radio => radio.value);
}