import React, { useState, useEffect } from 'react';
import Star from '../Star/Star';

interface StarRatingProps {
  raiting: number;
  onRatingChange: (newRating: number) => void;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ raiting, onRatingChange, disabled }) => {
  const [ratingState, setRatingState] = useState(raiting);

  useEffect(() => {
    setRatingState(raiting);
  }, [raiting]);

  const handleStarClick = (newRating: number) => {
    if (disabled) return;
    setRatingState(newRating);
    onRatingChange(newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          filled={i <= ratingState}
          onClick={disabled ? undefined : () => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      {renderStars()}
    </div>
  );
};

export default StarRating;