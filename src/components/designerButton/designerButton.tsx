import React from 'react';
import { FaLocationArrow } from "react-icons/fa";

export default function DesignerButton({ direction = 'left', text = 'Develop Now' }) {
  const isLeft = direction === 'left';
  const positionClass = isLeft ? 'left-36 md:left-20 lg:left-36' : 'right-36 md:right-20 lg:right-36 transform rotate-260';
  const bgColor = isLeft ? 'bg-purple-600' : 'bg-orange-600';
  const hoverColor = isLeft ? 'hover:bg-purple-700' : 'hover:bg-orange-700';
  const arrowColor = isLeft ? 'purple' : 'orange';

  return (
    <button className={`relative ${bgColor} text-white font-semibold py-2 px-4 rounded-lg shadow-md ${hoverColor} transition duration-200 flex items-center md:py-2 md:px-6 lg:py-2 lg:px-4`}>
      {text}
      <span className={`absolute bottom-10 md:bottom-6 lg:bottom-10 ${positionClass}`}>
        <FaLocationArrow size={20}  fill={arrowColor} />
      </span>
    </button>
  );
}