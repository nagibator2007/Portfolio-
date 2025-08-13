import { useState, useEffect } from 'react';
import { getRestaurants, updateRestaurantRating, Restaurant } from '../api/api';

interface UseRestaurantsResult {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  handleRatingChange: (restaurantId: string, newRating: number) => Promise<void>;
}

const useRestaurants = (): UseRestaurantsResult => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err: any) {
        setError(err.message || 'Не удалось получить рестораны');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRatingChange = async (restaurantId: string, newRating: number) => {
      await updateRestaurantRating({ id: restaurantId, raiting: newRating });
      // Оптимистичное обновление рейтинга в состоянии
      setRestaurants(prevRestaurants =>
        prevRestaurants.map(restaurant =>
          restaurant.id === restaurantId ? { ...restaurant, raiting: newRating } : restaurant
        )
      );
  };

  return { restaurants, loading, error, handleRatingChange };
};

export default useRestaurants;