import React, { useEffect, useState } from 'react';
import { Skeleton } from 'boneyard-js/react';

const defaultFallback = (
  <div className="space-y-5 py-8" aria-hidden="true">
    <div className="h-8 w-40 animate-pulse rounded bg-black/10" />
    <div className="grid gap-4 md:grid-cols-2">
      <div className="h-56 animate-pulse rounded bg-black/10" />
      <div className="space-y-3">
        <div className="h-6 w-3/4 animate-pulse rounded bg-black/10" />
        <div className="h-6 w-full animate-pulse rounded bg-black/10" />
        <div className="h-6 w-5/6 animate-pulse rounded bg-black/10" />
        <div className="h-11 w-36 animate-pulse rounded bg-black/10" />
      </div>
    </div>
  </div>
);

const PageSkeleton = ({
  name,
  loading = false,
  resetKey = 'page',
  minDuration = 220,
  fallback = defaultFallback,
  children,
}) => {
  const [introLoading, setIntroLoading] = useState(true);

  useEffect(() => {
    setIntroLoading(true);
    const timeoutId = window.setTimeout(() => {
      setIntroLoading(false);
    }, minDuration);

    return () => window.clearTimeout(timeoutId);
  }, [minDuration, resetKey]);

  return (
    <Skeleton
      name={name}
      loading={loading || introLoading}
      fallback={fallback}
      transition
    >
      {children}
    </Skeleton>
  );
};

export default PageSkeleton;
