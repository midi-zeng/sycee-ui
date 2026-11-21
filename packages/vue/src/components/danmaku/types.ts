import type { VNodeChild } from 'vue';

export interface DanmakuItem {
  id?: string | number;
  content: VNodeChild;
  color?: string;
  speed?: number;
  delay?: number;
  track?: number;
}
