import React from 'react';

function Skeleton({ className = '', variant = 'custom' }) {
  const baseClasses = 'skeleton animate-pulse-soft';

  const variantClasses = {
    card: 'w-full h-64 rounded-xl',
    text: 'w-full h-4 rounded',
    circle: 'w-10 h-10 rounded-full',
    custom: '',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

export function GallerySkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton
            variant="custom"
            className="w-full rounded-xl"
            style={{ height: `${180 + Math.random() * 120}px` }}
          />
          <div className="flex gap-1.5 px-1">
            <Skeleton variant="custom" className="w-8 h-6 rounded-full" />
            <Skeleton variant="custom" className="w-8 h-6 rounded-full" />
            <Skeleton variant="custom" className="w-8 h-6 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}

export default Skeleton;
