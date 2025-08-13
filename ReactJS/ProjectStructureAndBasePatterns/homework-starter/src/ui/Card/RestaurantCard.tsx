import React from 'react';
import { Restaurant } from '../../api/api';
import StarRating from '../StarRating/StartRating';
import './style.css'; 

interface RestaurantCardProps {
  restaurant: Restaurant;
  onRatingChange: (restaurantId: string, newRating: number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onRatingChange }) => {
  const { id, name, description, url, raiting } = restaurant;

  const handleRatingChange = (newRating: number) => {
    onRatingChange(id, newRating);
  };

  return (
    <div className="restaurant-card">
      <img src={url} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <StarRating raiting={raiting} onRatingChange={handleRatingChange} />
    </div>
  );
};

export default RestaurantCard;