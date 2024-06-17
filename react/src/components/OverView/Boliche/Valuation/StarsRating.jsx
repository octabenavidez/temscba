import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function StarsRating({ handleStarClick }) {
    const [hoverStar, setHoverStar] = useState(0);

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((starNumber) => (
                <StarIcon
                    key={starNumber}
                    className={`size-5 cursor-pointer ${
                        starNumber <= hoverStar ? "text-yellow-400" : ""
                    }`}
                    onClick={() => handleStarClick(starNumber)}
                    onMouseEnter={() => setHoverStar(starNumber)}
                    onMouseLeave={() => setHoverStar(0)}
                />
            ))}
        </div>
    );
}
