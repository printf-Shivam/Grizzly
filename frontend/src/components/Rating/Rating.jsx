import React, { useMemo } from 'react'
import SvgStarIcon from '../common/SvgStarIcon'
import SvgEmptyStar from '../common/SvgEmptyStar'

const Rating = ({ rating = 0 }) => {
  const validRating = Math.max(0, Math.min(5, Number(rating) || 0));

  const ratingNumber = useMemo(() => {
    return Array(Math.floor(validRating)).fill();
  }, [validRating]);

  return (
    <div className="flex items-center">
      {ratingNumber.map((_, index) => (
        <SvgStarIcon key={index} />
      ))}

      {Array(5 - ratingNumber.length)
        .fill()
        .map((_, index) => (
          <SvgEmptyStar key={'empty-' + index} />
        ))}

      <p className="px-2 text-gray-600">{validRating}</p>
    </div>
  );
};


export default Rating
