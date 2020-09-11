import { writable } from 'svelte/store';

export const connected = writable(false);
export const token = writable(null);
export const migration = writable(null);
export const error = writable(null);
export const mc3 = writable(null);