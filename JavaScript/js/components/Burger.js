// Burger.js
export function initBurger() {
    const catalotButtonEl = document.querySelector('.header__catalog-btn');
    const mainMenuEl = document.querySelector('.main-menu');
    const closeButtonEl = document.querySelector('.main-menu__close');

    // Функция для открытия/закрытия меню
    function toggleMenu() {
        mainMenuEl.classList.toggle('main-menu--active');
    }

    // Функция для закрытия меню
    function closeMenu() {
        mainMenuEl.classList.remove('main-menu--active');
    }

    // Обработчики событий для открытия/закрытия с кнопок
    if (closeButtonEl) {
        closeButtonEl.addEventListener('click', toggleMenu);
    }
    if (catalotButtonEl) {
        catalotButtonEl.addEventListener('click', toggleMenu);
    }

    // Обработчик события для клика на ::before
    if (mainMenuEl) {
        mainMenuEl.addEventListener('click', function (event) {
            if (mainMenuEl.classList.contains('main-menu--active')) {
                if (event.target === mainMenuEl) {
                    closeMenu();
                }
            }
        });
    }
}