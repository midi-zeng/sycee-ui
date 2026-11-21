import { useEffect, useRef, useState } from 'react';
import { InfiniteScroll } from '@sycee-ui/react';

export default function Error() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function retry() {
    setError(false);
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
      setFinished(true);
    }, 700);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <InfiniteScroll
      height={180}
      loading={loading}
      error={error}
      finished={finished}
      onLoadMore={retry}
      style={{
        width: '100%',
        maxWidth: 520,
        border: '1px solid var(--sy-color-border)',
        borderRadius: 'var(--sy-radius-md)',
        background: 'var(--sy-color-bg)',
      }}
    >
      <div style={{ padding: 16 }}>The next page could not be requested.</div>
    </InfiniteScroll>
  );
}
