import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {Plus, Minus} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Button} from './button';

const counterVariants = cva(
    'flex items-center justify-center gap-2 rounded-md border border-input bg-background',
    {
        variants: {
            size: {
                sm: 'h-7 px-2',
                default: 'h-9 px-3',
                lg: 'h-11 px-4'
            }
        },
        defaultVariants: {
            size: 'default'
        }
    }
);

const counterDisplayVariants = cva(
    'min-w-[3rem] text-center font-medium tabular-nums',
    {
        variants: {
            size: {
                sm: 'text-xs',
                default: 'text-sm',
                lg: 'text-base'
            }
        },
        defaultVariants: {
            size: 'default'
        }
    }
);

const counterButtonVariants = cva(
    'h-full px-2 hover:bg-accent hover:text-accent-foreground',
    {
        variants: {
            size: {
                sm: '[&_svg]:size-3',
                default: '[&_svg]:size-4',
                lg: '[&_svg]:size-5'
            }
        },
        defaultVariants: {
            size: 'default'
        }
    }
);

export interface CounterProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof counterVariants> {
    /** Current value of the counter */
    value?: number;
    /** Initial value for uncontrolled component */
    defaultValue?: number;
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Step to increment/decrement by */
    step?: number;
    /** Callback when value changes */
    onChange?: (value: number) => void;
    /** Whether the counter is disabled */
    disabled?: boolean;
}

const Counter = React.forwardRef<HTMLDivElement, CounterProps>(
    (
        {
            className,
            size = 'default',
            value: controlledValue,
            defaultValue = 0,
            min = -Infinity,
            max = Infinity,
            step = 1,
            onChange,
            disabled = false,
            ...props
        },
        ref
    ) => {
        const isControlled = controlledValue !== undefined;
        const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
        const currentValue = isControlled ? controlledValue : uncontrolledValue;

        const handleIncrement = () => {
            const newValue = Math.min(currentValue + step, max);
            if (!isControlled) {
                setUncontrolledValue(newValue);
            }
            onChange?.(newValue);
        };

        const handleDecrement = () => {
            const newValue = Math.max(currentValue - step, min);
            if (!isControlled) {
                setUncontrolledValue(newValue);
            }
            onChange?.(newValue);
        };

        const canDecrement = currentValue > min;
        const canIncrement = currentValue < max;

        return (
            <div
                ref={ref}
                className={cn(counterVariants({size, className}))}
                {...props}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDecrement}
                    disabled={disabled || !canDecrement}
                    aria-label="Decrease value"
                    className={cn(counterButtonVariants({size}))}
                >
                    <Minus />
                </Button>
                <div className={cn(counterDisplayVariants({size}))}>
                    {currentValue}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleIncrement}
                    disabled={disabled || !canIncrement}
                    aria-label="Increase value"
                    className={cn(counterButtonVariants({size}))}
                >
                    <Plus />
                </Button>
            </div>
        );
    }
);
Counter.displayName = 'Counter';

export {Counter, counterVariants};
