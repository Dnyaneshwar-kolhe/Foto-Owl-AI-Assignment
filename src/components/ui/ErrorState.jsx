import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';

function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  variant = 'error',
}) {
  const Icon = variant === 'network' ? WifiOff : AlertTriangle;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-warm" />
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h3>

      <p className="text-sm text-text-secondary max-w-sm mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          id="error-retry-button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                     gradient-accent text-white hover:opacity-90 transition-opacity
                     hover-lift focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
