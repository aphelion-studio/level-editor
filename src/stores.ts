import { writable } from 'svelte/store'
import sample from './sample.json'
import type { Level } from './types'

export const level = writable<Level>(sample as Level)
