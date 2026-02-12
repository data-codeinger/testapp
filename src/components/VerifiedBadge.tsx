import React from 'react';

interface VerifiedBadgeProps {
  size?: 'small' | 'large';
  showOutline?: boolean;
  className?: string;
}

export function VerifiedBadge({ size = 'small', showOutline = false, className = '' }: VerifiedBadgeProps) {
  const sizeClasses = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
  const outlineClass = showOutline ? 'ring-1 ring-white ring-offset-1 ring-offset-transparent' : '';
  
  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full bg-[#67295F] ${sizeClasses} ${outlineClass} ${className}`}
      title="Verified"
    >
      <svg 
        className={`${size === 'small' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-white`}
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
  );
}
