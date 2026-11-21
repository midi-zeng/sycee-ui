import type { InjectionKey } from 'vue';

export interface CollapseContextValue {
  openKeys: Set<string | number>;
  accordion: boolean;
  toggle: (name: string | number) => void;
  headerBaseId: string;
}

export const COLLAPSE_CONTEXT_KEY: InjectionKey<CollapseContextValue> = Symbol(
  'sy-collapse-context',
);
