import { useState } from 'react';
import { Upload } from '@sycee-ui/react';
import type { UploadFile } from '@sycee-ui/react';

export default function Basic() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragFiles, setDragFiles] = useState<UploadFile[]>([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
      <Upload fileList={files} onChange={setFiles} multiple accept="image/*" />
      <Upload fileList={dragFiles} onChange={setDragFiles} drag />
    </div>
  );
}
