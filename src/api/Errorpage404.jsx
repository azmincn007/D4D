import React from 'react';
import { useNavigate } from 'react-router-dom';

function Errorpage404() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2);
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4 animate-bounce">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Oops! Page Not Found</h1>
        <p className="text-muted-foreground md:text-lg text-center">
          The page you're looking for doesn't seem to exist. Let's get you back on track.
        </p>
        <button
          onClick={handleGoBack}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Errorpage404;