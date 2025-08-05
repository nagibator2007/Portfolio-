// SortProducts.js

// Сортирует массив товаров по заданному критерию

export function sortData(data, sortBy) {
  switch (sortBy) {
    case 'price-min':
      return [...data].sort((a, b) => a.price.new - b.price.new);
    case 'price-max':
      return [...data].sort((a, b) => b.price.new - a.price.new);
    case 'rating-max':
      return [...data].sort((a, b) => b.rating - a.rating);
    default:
      return data;
  }
}