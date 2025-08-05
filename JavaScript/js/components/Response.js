// Response.js
import { createProductCardHTML } from './ProductCards.js';

export function initResponse(products) {
  const catalogListEl = document.querySelector('.catalog__list');

  renderProducts(products, catalogListEl);
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