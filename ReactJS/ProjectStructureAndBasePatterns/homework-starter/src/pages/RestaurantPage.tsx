import React, { useState } from 'react';
import RestaurantCard from '../ui/Card/RestaurantCard';
import Search from '../ui/Search/Search';
import Header from '../ui/Header/Header';
import useRestaurants from '../hooks/useRestaurants';

const RestaurantPage: React.FC = () => {
    const { restaurants, loading, error, handleRatingChange } = useRestaurants();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div>
                <Header />
                <p>Загрузка ресторанов...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <p>Ошибка: {error}</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <Search onSearch={handleSearch} />
            <div className="restaurant-card__wrapper">
                {filteredRestaurants.map(restaurant => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onRatingChange={handleRatingChange}
                    />
                ))}
            </div>
        </>
    );
};

export default RestaurantPage;