// FilterByAvailability.js

export function filterByAvailability(products, selectedAvailability) {
  if (!selectedAvailability.includes('instock')) {
    return products;
  }

  return products.filter(product => {
    for (const city in product.availability) {
      if (product.availability[city] > 0) {
        return true;
      }
    }
    return false;
  });
}