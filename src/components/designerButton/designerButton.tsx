import React from 'react';
import { FaLocationArrow } from "react-icons/fa";

export default function DesignerButton({ direction = 'left', text = 'See my work' }) {
  const isLeft = direction === 'left';
  // `rotate-260` used to sit here — not a valid Tailwind rotation, so it silently
  // did nothing. Using the arbitrary-value syntax makes the intent real.
  const positionClass = isLeft
    ? 'left-36 md:left-20 lg:left-36'
    : 'right-36 md:right-20 lg:right-36 transform rotate-[260deg]';

  return (
    <button className="relative bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg shadow-md hover:brightness-95 transition duration-200 flex items-center md:py-2 md:px-6 lg:py-2 lg:px-4">
      {text}
      <span className={`absolute bottom-10 md:bottom-6 lg:bottom-10 ${positionClass}`}>
        <FaLocationArrow size={20} className="fill-primary" />
      </span>
    </button>
  );
}
