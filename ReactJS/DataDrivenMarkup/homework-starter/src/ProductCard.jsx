// ProductCard.jsx
import "./ProductCard.css";

export const ProductCard = ({ title, price, discount, imageUrl, id }) => {
    const discountedPrice = discount ? price * (1 - discount) : null;

    return (
        <div className="product-card">
            <img src={imageUrl} alt={title} className="product-card__image" />
            {discount && (
                <div className="product-card__price-container">
                    <span className="product-card__old-price">{price.toLocaleString('ru-RU')} ₽</span>
                    <span className="product-card__price product-card__price--discounted">{discountedPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
            )}
            {!discount && (
                <span className="product-card__price">{price.toLocaleString('ru-RU')} ₽</span>
            )}
            <h2 className="product-card__title">{title}</h2>
        </div>
    );
};