import React from 'react';

const JumpingArrowIcon = () => {
  return (
    <div className="relative w-6 h-6 animate-bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
};

export default JumpingArrowIcon;
