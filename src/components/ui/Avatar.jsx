import React, { useMemo } from 'react';

function Avatar({ name = '?', color = '#6366f1', size = 'md' }) {
  const initial = useMemo(() => {
    return name.charAt(0).toUpperCase();
  }, [name]);

  const sizeClasses = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center 
                  font-bold text-white shrink-0 select-none`}
      style={{ backgroundColor: color }}
      title={name}
      aria-label={`Avatar for ${name}`}
    >
      {initial}
    </div>
  );
}

export default Avatar;
