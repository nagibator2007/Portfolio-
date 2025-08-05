// FilterByType.js

export function filterByType(products, selectedTypes) {
  if (selectedTypes.length === 0) {
    return products;
  }

  return products.filter(product => {
    if (Array.isArray(product.type)) {
      return product.type.some(type => selectedTypes.includes(type));
    } else {
      return selectedTypes.includes(product.type);
    }
  });
}