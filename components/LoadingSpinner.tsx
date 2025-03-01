import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading articles...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full space-y-4">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-t-2 border-r-2 border-primary/30 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-t-2 border-l-2 border-primary/60 rounded-full animate-spin animation-delay-150"></div>
        <div className="absolute inset-4 border-t-2 border-b-2 border-primary rounded-full animate-spin animation-delay-300"></div>
      </div>
      <p className="text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingState;
