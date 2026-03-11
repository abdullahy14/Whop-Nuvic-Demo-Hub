import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redact(value: string, visible = 4): string {
  if (!value) return '***';
  if (value.length <= visible) return '*'.repeat(value.length);
  return `${value.slice(0, visible)}${'*'.repeat(Math.max(4, value.length - visible))}`;
}
