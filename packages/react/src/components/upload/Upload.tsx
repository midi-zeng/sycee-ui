import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, HTMLAttributes, InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import { Icon } from '../icon/Icon';
import { Spinner } from '../spinner/Spinner';

export interface UploadFile {
  /** Stable id of the entry. */
  uid: string;
  /** File name. */
  name: string;
  /** Size in bytes, when known. */
  size?: number;
  /** @default 'uploading' */
  status: 'uploading' | 'success' | 'error';
}

export interface UploadRequestOptions {
  file: File;
  /** Marks the entry as uploaded successfully. */
  onSuccess: () => void;
  /** Marks the entry as failed. */
  onError: () => void;
}

export interface UploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Uncontrolled initial file list. @default [] */
  defaultValue?: UploadFile[];
  /** Controlled file list. */
  fileList?: UploadFile[];
  /** Called whenever the file list changes. */
  onChange?: (files: UploadFile[]) => void;
  /** Called after a file is removed from the list. */
  onRemove?: (file: UploadFile) => void;
  /** Multiple file selection. @default false */
  multiple?: boolean;
  /** Accepted file types (native `accept` attribute). */
  accept?: string;
  /** Maximum number of files; extra files are ignored. */
  maxCount?: number;
  /** Renders a drag-and-drop area instead of a plain button. @default false */
  drag?: boolean;
  disabled?: boolean;
  /** Called before a file enters the list; return false to reject it. */
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  /** Transport for the upload; by default the file is marked as succeeded immediately. */
  request?: (options: UploadRequestOptions) => void;
  /** Native input attributes forwarded to the hidden file input. */
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'>;
}

const DEFAULT_UID_SEED = 0;
let uidSeed = DEFAULT_UID_SEED;

function nextUid(): string {
  uidSeed += 1;
  return `sy-upload-${uidSeed}`;
}

export const Upload = forwardRef<HTMLDivElement, UploadProps>(function Upload(
  {
    defaultValue = [],
    fileList,
    onChange,
    onRemove,
    multiple = false,
    accept,
    maxCount,
    drag = false,
    disabled = false,
    beforeUpload,
    request,
    inputProps,
    className,
    ...rest
  },
  ref,
) {
  const t = useLocale();
  const isControlled = fileList !== undefined;
  const [innerFiles, setInnerFiles] = useState<UploadFile[]>(defaultValue);
  const files = isControlled ? fileList : innerFiles;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = useId();
  const [dragOver, setDragOver] = useState(false);

  const setFiles = useCallback(
    (next: UploadFile[]) => {
      if (!isControlled) setInnerFiles(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  // Default transport: succeed immediately (no actual network activity).
  const defaultRequest = (options: UploadRequestOptions) => {
    options.onSuccess();
  };

  const handleFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      void (async () => {
        const accepted: File[] = [];
        for (const file of list) {
          if (maxCount !== undefined && files.length + accepted.length >= maxCount) break;
          let keep = true;
          if (beforeUpload) keep = await beforeUpload(file);
          if (keep) accepted.push(file);
        }
        if (accepted.length === 0) return;
        const entries: UploadFile[] = accepted.map((file) => ({
          uid: nextUid(),
          name: file.name,
          size: file.size,
          status: 'uploading',
        }));
        // Snapshot including the new entries; transport callbacks map over it
        // so status flips do not depend on possibly stale closures.
        const snapshot = [...files, ...entries];
        setFiles(snapshot);
        const transport = request ?? defaultRequest;
        accepted.forEach((file, index) => {
          const uid = entries[index].uid;
          transport({
            file,
            onSuccess: () => {
              setFiles(
                snapshot.map((entry) =>
                  entry.uid === uid ? { ...entry, status: 'success' as const } : entry,
                ),
              );
            },
            onError: () => {
              setFiles(
                snapshot.map((entry) =>
                  entry.uid === uid ? { ...entry, status: 'error' as const } : entry,
                ),
              );
            },
          });
        });
      })();
    },
    [files, maxCount, beforeUpload, request, setFiles],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) handleFiles(event.target.files);
    // Reset so selecting the same file again still fires a change event.
    event.target.value = '';
  };

  const remove = (file: UploadFile) => {
    if (disabled) return;
    setFiles(files.filter((entry) => entry.uid !== file.uid));
    onRemove?.(file);
  };

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer?.files) handleFiles(event.dataTransfer.files);
  };

  // Clean up when unmounting; the hidden input needs no special teardown.
  useEffect(
    () => () => {
      inputRef.current = null;
    },
    [],
  );

  return (
    <div
      ref={ref}
      className={cx('sy-upload', drag && 'sy-upload--drag', dragOver && 'is-dragover', disabled && 'is-disabled', className)}
      {...rest}
    >
      <input
        {...inputProps}
        ref={inputRef}
        id={inputId}
        className="sy-upload__input"
        type="file"
        style={{ display: 'none' }}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleInputChange}
      />
      {drag ? (
        <div
          className="sy-upload__trigger"
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          aria-labelledby={inputId}
          onClick={openPicker}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openPicker();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Icon name="upload" />
          <span>{t.dropFiles}</span>
        </div>
      ) : (
        <button
          type="button"
          className="sy-upload__trigger"
          onClick={openPicker}
          disabled={disabled}
        >
          <Icon name="upload" />
          <span>{t.selectFiles}</span>
        </button>
      )}
      {files.length > 0 ? (
        <ul className="sy-upload__list">
          {files.map((file) => (
            <li
              key={file.uid}
              className={cx(
                'sy-upload__item',
                file.status === 'uploading' && 'is-uploading',
                file.status === 'success' && 'is-success',
                file.status === 'error' && 'is-error',
              )}
            >
              <Icon name="file" />
              <span className="sy-upload__name">{file.name}</span>
              <span
                className="sy-upload__status"
                aria-label={
                  file.status === 'uploading'
                    ? t.uploading
                    : file.status === 'success'
                      ? t.uploadSuccess
                      : t.uploadError
                }
              >
                {file.status === 'uploading' ? (
                  <Spinner size="sm" label={undefined} />
                ) : file.status === 'success' ? (
                  <Icon name="success" />
                ) : (
                  <Icon name="danger" />
                )}
              </span>
              <button
                type="button"
                className="sy-upload__remove"
                aria-label={t.removeFile(file.name)}
                disabled={disabled}
                onClick={() => remove(file)}
              >
                <Icon name="close" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
