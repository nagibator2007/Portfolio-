// Slider.js

import { createSmallProductCardHTML } from './ProductCards.js';

export function initSlider(data) {
  const sliderContainer = document.querySelector('.day-products__slider'); // Получаем контейнер слайдера
  const dayProducts = document.querySelector('.day-products');

  const goodsOfDay = data.filter(item => item.goodsOfDay);

  if (!goodsOfDay.length) {
    dayProducts.remove();
    return;
  }

  // Создаем swiperWrapper
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  // Вызываем renderSlides для заполнения swiperWrapper слайдами
  renderSlides(goodsOfDay, swiperWrapper);

  sliderContainer.innerHTML = '';
  sliderContainer.appendChild(swiperWrapper);

  // Инициализируем Swiper только после добавления контента
  initSwiper();
}

function renderSlides(slides, swiperWrapper) {
  swiperWrapper.innerHTML = '';

  slides.forEach(slide => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.innerHTML = createSmallProductCardHTML(slide);
    swiperWrapper.appendChild(swiperSlide);
  });
}

function initSwiper() {
  return new Swiper('.day-products__slider', {
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
    spaceBetween: 40,
    slidesPerView: 4,
  });
}