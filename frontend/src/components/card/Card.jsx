import React from 'react';
import ArrowIcon from '../common/ArrowIcon';

const Card = ({ imagePath, title, description, actionArrow, height, width }) => {
  return (
    <div className='flex flex-wrap flex-col items-start p-6'>
      <img
        src={imagePath}
        alt={title}
        className="border rounded-lg hover:scale-105 cursor-pointer object-cover"
        style={{
          height: height ?? '220px',
          width: width ?? '200px'
        }}
      />
      <div className='flex justify-between items-center w-full mt-2'>
        <div className='flex flex-col'>
          <p className='text-[16px] p-1'>{title}</p>
          {description && (
            <p className='text-[12px] px-1 text-gray-600'>{description}</p>
          )}
        </div>
        {actionArrow && (
          <span className='cursor-pointer pr-2 items-center'>
            <ArrowIcon />
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;