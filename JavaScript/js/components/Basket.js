// Basket.js

export function initBasket(productsData) { // Принимаем данные в качестве аргумента
  let basketItems = [];
  let basketCounter = 0;

  const basketButton = document.querySelector('.header__user-btn');
  const basketElement = document.querySelector('.header__basket');
  const basketList = document.querySelector('.basket__list');
  const basketEmptyBlock = document.querySelector('.basket__empty-block');
  const basketCounterElement = document.querySelector('.header__user-count');
  const basketLink = document.querySelector('.basket__link');

  // Теперь у нас есть данные, можно инициализировать UI
  updateBasketUI();

  basketButton.addEventListener('click', (event) => {
    event.preventDefault();
    basketElement.classList.toggle('basket--active');
  });

  document.addEventListener('click', (event) => {
    if (!basketButton.contains(event.target) && event.target !== basketButton) {
      basketElement.classList.remove('basket--active');
    }
  });

  basketElement.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  // Обработчик добавления товара в корзину (делегирование событий)
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('product-card__link')) {
      event.preventDefault();
      const productCard = event.target.closest('.product-card');
      if (productCard) {
        const productId = parseInt(productCard.dataset.productId, 10);
        addProductToBasket(productId);
      }
    }
  });

  // Обработчик удаления товара из корзины (делегирование событий)
  basketList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.basket__close')) {
      const productIdToRemove = parseInt(target.closest('.basket__close').dataset.productId, 10);
      removeProductFromBasket(productIdToRemove);
    }
  });

  // Функция добавления товара в корзину
  function addProductToBasket(productId) {
    const product = productsData.find(item => item.id === productId);

    if (product) {
      basketItems.push(product);
      basketCounter++;
      updateBasketUI();
    }
  }

  // Функция удаления товара из корзины
  function removeProductFromBasket(productId) {
    const indexToRemove = basketItems.findIndex(item => item.id === productId);

    if (indexToRemove !== -1) {
      basketItems.splice(indexToRemove, 1);
      basketCounter = basketItems.length;
      updateBasketUI();
    }
  }

  function updateBasketUI() {
    basketCounterElement.textContent = basketCounter;

    if (basketItems.length > 0) {
      basketEmptyBlock.style.display = 'none';
      basketLink.style.display = 'flex'
      basketList.innerHTML = basketItems.map(item => `
          <li class="basket__item">
          <div class="basket__img">
              <img src="${item.image}" alt="${item.name}" height="60" width="60">
          </div>
          <span class="basket__name">${item.name}</span>
          <span class="basket__price">${item.price.new} руб</span>
          <button class="basket__close" type="button" data-product-id="${item.id}">
              <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-close"></use>
              </svg>
          </button>
          </li>
`).join('');
    } else {
      basketEmptyBlock.style.display = 'block';
      basketLink.style.display = 'none'
      basketList.innerHTML = '';
    }
  }
}