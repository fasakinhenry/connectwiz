import { useSyncExternalStore } from 'react';
import { store } from './store';

export function useConnectWizStore() {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}
