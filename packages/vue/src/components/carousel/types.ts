import type { VNodeChild } from 'vue';

export interface CarouselItem {
  key?: string | number;
  content: VNodeChild;
  ariaLabel?: string;
}
