import { toast } from '@zerodevx/svelte-toast'

export const success = m => toast.push(m, {
  theme: {
    '--toastBackground': 'white',
    '--toastColor': 'var(--text)',
    '--toastBarBackground': 'var(--brand)'
  }
})

export const error = m => toast.push(m, {
  theme: {
    '--toastBackground': 'white',
    '--toastColor': 'var(--text)',
    '--toastBarBackground': 'red'
  }
})