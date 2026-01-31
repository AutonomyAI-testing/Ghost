import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

/**
 * Helper to merge Tailwind CSS classes
 * Uses clsx for conditional class handling and tailwind-merge to resolve conflicts
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
