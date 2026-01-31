import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

// Helper to merge Tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const simpleButtonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-black text-white hover:bg-gray-800 focus-visible:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus-visible:ring-white',
                secondary: 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800'
            },
            size: {
                sm: 'h-7 px-3 py-1.5 text-xs',
                md: 'h-[34px] px-4 py-2',
                lg: 'h-11 px-8 py-3 text-base'
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md'
        }
    }
);

export interface SimpleButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof simpleButtonVariants> {
    /**
     * The content of the button
     */
    children: React.ReactNode;
    /**
     * Additional CSS classes to apply
     */
    className?: string;
}

/**
 * SimpleButton - A reusable button component with variant and size support
 *
 * @example
 * ```tsx
 * <SimpleButton variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </SimpleButton>
 * ```
 */
const SimpleButton = React.forwardRef<HTMLButtonElement, SimpleButtonProps>(
    ({className, variant, size, children, type = 'button', ...props}, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={cn(simpleButtonVariants({variant, size, className}))}
                {...props}
            >
                {children}
            </button>
        );
    }
);

SimpleButton.displayName = 'SimpleButton';

export {SimpleButton};
export default SimpleButton;
