import { useCallback, useEffect, useRef, useState } from 'react';
import { InfiniteScroll } from '@sycee-ui/react';

const PAGE_SIZE = 4;
const TOTAL = 24;

const makeRows = (start: number, count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: start + index,
    title: `Activity ${start + index + 1}`,
  }));

export default function Basic() {
  const [rows, setRows] = useState(() => makeRows(0, 8));
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const loaded = useRef(8);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const loadMore = useCallback(() => {
    if (loading || finished) return;
    setLoading(true);
    timer.current = setTimeout(() => {
      const next = makeRows(loaded.current, Math.min(PAGE_SIZE, TOTAL - loaded.current));
      loaded.current += next.length;
      setRows((current) => [...current, ...next]);
      setFinished(loaded.current >= TOTAL);
      setLoading(false);
    }, 700);
  }, [finished, loading]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <InfiniteScroll
      height={300}
      loading={loading}
      finished={finished}
      onLoadMore={loadMore}
      style={{
        width: '100%',
        maxWidth: 520,
        border: '1px solid var(--sy-color-border)',
        borderRadius: 'var(--sy-radius-md)',
        background: 'var(--sy-color-bg)',
      }}
    >
      <div style={{ display: 'grid', gap: 8, padding: 10 }}>
        {rows.map((row) => (
          <div
            key={row.id}
            style={{
              padding: '10px 12px',
              border: '1px solid var(--sy-color-border)',
              borderRadius: 'var(--sy-radius-sm)',
              background: 'var(--sy-color-bg-secondary)',
            }}
          >
            {row.title}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
