import { useState } from 'react';
import { Pagination } from '@sycee-ui/react';

export default function SiblingCount() {
  const [page, setPage] = useState(5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Pagination page={page} total={100} siblingCount={1} onChange={setPage} />
      <Pagination page={page} total={100} siblingCount={2} onChange={setPage} />
      <Pagination page={page} total={100} siblingCount={3} onChange={setPage} />
    </div>
  );
}
