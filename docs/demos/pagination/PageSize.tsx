import { Pagination } from '@sycee-ui/react';

export default function PageSize() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Pagination total={100} />
      <Pagination total={100} pageSize={25} />
    </div>
  );
}
