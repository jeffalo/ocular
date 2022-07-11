// store for statuses

import { writable } from 'svelte/store';

const statuses = writable({});

export {
  statuses,
}