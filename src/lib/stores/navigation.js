import { writable } from 'svelte/store';

export const navigationDirection = writable('forward');

export function setNavigationDirection(direction) {
  navigationDirection.set(direction);
}
