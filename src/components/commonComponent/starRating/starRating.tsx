import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
    totalStars?: number;
    onRatingChange: (rating: number) => void;
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onRatingChange, rating }) => {
    const [hover, setHover] = useState<number>(0);

    return (
        <div className="rating-stars">
            {Array.from({ length: totalStars }, (_, index) => {
                const starValue = index + 1;
                return (
                    <FaStar
                        key={starValue}
                        size={24}
                        color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => onRatingChange(starValue)}
                        className="rating-star"
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
