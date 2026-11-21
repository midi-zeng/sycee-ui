<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import { cx } from '../../utils/cx';
import { useLocale } from '../../locale';
import Icon from '../icon/Icon.vue';
import Spinner from '../spinner/Spinner.vue';

defineOptions({ name: 'SyUpload' });

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

interface Props {
  /** Multiple file selection. @default false */
  multiple?: boolean;
  /** Accepted file types (native `accept` attribute). */
  accept?: string;
  /** Maximum number of files; extra files are ignored. */
  maxCount?: number;
  /** Renders a drag-and-drop area instead of a plain button. @default false */
  drag?: boolean;
  disabled?: boolean;
}

const {
  multiple = false,
  accept,
  maxCount,
  drag = false,
  disabled = false,
} = defineProps<Props>();

const model = defineModel<UploadFile[]>();
const t = useLocale();

const emit = defineEmits<{
  change: [files: UploadFile[]];
  remove: [file: UploadFile];
  error: [file: UploadFile];
}>();

const instance = getCurrentInstance();
const props = instance?.vnode.props ?? {};
const hasChangeListener = props.onChange !== undefined;
const hasRemoveListener = props.onRemove !== undefined;
const hasErrorListener = props.onError !== undefined;
const beforeUpload = props.beforeUpload as
  | ((file: File) => boolean | Promise<boolean>)
  | undefined;
const request = props.request as ((options: UploadRequestOptions) => void) | undefined;

let uidSeed = 0;

const inputRef = ref<HTMLInputElement | null>(null);
const dragOver = ref(false);

const files = computed(() => model.value ?? []);

function setFiles(next: UploadFile[]) {
  model.value = next;
  if (hasChangeListener) emit('change', next);
}

async function handleFiles(incoming: FileList | File[]) {
  const list = Array.from(incoming);
  const accepted: File[] = [];
  for (const file of list) {
    if (maxCount !== undefined && files.value.length + accepted.length >= maxCount) break;
    let keep = true;
    if (beforeUpload) keep = await beforeUpload(file);
    if (keep) accepted.push(file);
  }
  if (accepted.length === 0) return;
  const entries: UploadFile[] = accepted.map((file) => {
    uidSeed += 1;
    return { uid: `sy-upload-${uidSeed}`, name: file.name, size: file.size, status: 'uploading' };
  });
  // Snapshot including the new entries; transport callbacks map over it so
  // status flips do not depend on possibly stale state.
  const snapshot = [...files.value, ...entries];
  setFiles(snapshot);
  const transport = request ?? ((options: UploadRequestOptions) => options.onSuccess());
  accepted.forEach((file, index) => {
    const uid = entries[index].uid;
    transport({
      file,
      onSuccess: () => {
        setFiles(snapshot.map((entry) => (entry.uid === uid ? { ...entry, status: 'success' } : entry)));
      },
      onError: () => {
        setFiles(snapshot.map((entry) => (entry.uid === uid ? { ...entry, status: 'error' } : entry)));
        const failed = snapshot.find((entry) => entry.uid === uid);
        if (failed && hasErrorListener) emit('error', failed);
      },
    });
  });
}

function onInputChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files) void handleFiles(input.files);
  // Reset so selecting the same file again still fires a change event.
  input.value = '';
}

function remove(file: UploadFile) {
  if (disabled) return;
  setFiles(files.value.filter((entry) => entry.uid !== file.uid));
  if (hasRemoveListener) emit('remove', file);
}

function openPicker() {
  if (!disabled) inputRef.value?.click();
}

function onNodeKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openPicker();
  }
}

function onDragOver(event: DragEvent) {
  if (disabled) return;
  event.preventDefault();
  dragOver.value = true;
}

function onDragLeave() {
  dragOver.value = false;
}

function onDrop(event: DragEvent) {
  if (disabled) return;
  event.preventDefault();
  dragOver.value = false;
  if (event.dataTransfer?.files) void handleFiles(event.dataTransfer.files);
}
</script>

<template>
  <div
    :class="
      cx(
        'sy-upload',
        drag && 'sy-upload--drag',
        dragOver && 'is-dragover',
        disabled && 'is-disabled',
        $attrs.class as string,
      )
    "
  >
    <input
      ref="inputRef"
      class="sy-upload__input"
      type="file"
      style="display: none"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      aria-hidden="true"
      tabindex="-1"
      @change="onInputChange"
    />
    <div
      v-if="drag"
      class="sy-upload__trigger"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled || undefined"
      @click="openPicker"
      @keydown="onNodeKeydown"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <Icon name="upload" />
      <span>{{ t.dropFiles }}</span>
    </div>
    <button v-else type="button" class="sy-upload__trigger" :disabled="disabled" @click="openPicker">
      <Icon name="upload" />
      <span>{{ t.selectFiles }}</span>
    </button>
    <ul v-if="files.length > 0" class="sy-upload__list">
      <li
        v-for="file in files"
        :key="file.uid"
        :class="
          cx(
            'sy-upload__item',
            file.status === 'uploading' && 'is-uploading',
            file.status === 'success' && 'is-success',
            file.status === 'error' && 'is-error',
          )
        "
      >
        <Icon name="file" />
        <span class="sy-upload__name">{{ file.name }}</span>
        <span
          class="sy-upload__status"
          :aria-label="
            file.status === 'uploading'
              ? t.uploading
              : file.status === 'success'
                ? t.uploadSuccess
                : t.uploadError
          "
        >
          <Spinner v-if="file.status === 'uploading'" size="sm" />
          <Icon v-else-if="file.status === 'success'" name="success" />
          <Icon v-else name="danger" />
        </span>
        <button
          type="button"
          class="sy-upload__remove"
          :aria-label="t.removeFile(file.name)"
          :disabled="disabled"
          @click="remove(file)"
        >
          <Icon name="close" />
        </button>
      </li>
    </ul>
  </div>
</template>
