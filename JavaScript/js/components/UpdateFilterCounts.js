// UpdateFilterCounts.js

// Подсчитывает количество товаров в массиве, соответствующих заданному значению фильтра
function countProductsByFilter(products, filterValue) {
  let count = 0;

  products.forEach(product => {
    if (product.type && Array.isArray(product.type)) {
      if (product.type.includes(filterValue)) {
        count++;
      }
    } else if (product.type === filterValue) {
      count++;
    }
  });

  return count;
}

// Обновляет текстовое содержимое элемента счетчика в DOM
function updateCountElement(countElement, count) {
  if (countElement) {
    countElement.textContent = count;
  }
}

//Обновление счетчика на странице
export function updateFilterCounts(products) {
  const checkboxes = document.querySelectorAll('.custom-checkbox__field[name="type"]');

  checkboxes.forEach(checkbox => {
    const filterValue = checkbox.value;
    const count = countProductsByFilter(products, filterValue);
    const countElement = checkbox.parentNode.querySelector('.custom-checkbox__count');

    updateCountElement(countElement, count);
  });
}