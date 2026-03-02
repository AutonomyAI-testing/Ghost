import type {Meta, StoryObj} from '@storybook/react-vite';
import {useState} from 'react';
import {Counter} from './counter';

const meta = {
    title: 'Components / Counter',
    component: Counter,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'A numeric counter component with increment and decrement buttons. Supports both controlled and uncontrolled usage with customizable min/max values and step increments.'
            }
        }
    }
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof Counter>;

// Overview
export const Default: Story = {
    args: {
        defaultValue: 0
    },
    parameters: {
        docs: {
            description: {
                story: 'Basic counter with default styling and behavior.'
            }
        }
    }
};

// Sizes
export const Small: Story = {
    args: {
        size: 'sm',
        defaultValue: 5
    },
    parameters: {
        docs: {
            description: {
                story: 'Compact counter for dense UIs or sidebars.'
            }
        }
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        defaultValue: 10
    },
    parameters: {
        docs: {
            description: {
                story: 'Larger counter with increased hit target for better accessibility.'
            }
        }
    }
};

// States
export const WithMinMax: Story = {
    args: {
        defaultValue: 50,
        min: 0,
        max: 100
    },
    parameters: {
        docs: {
            description: {
                story: 'Counter with minimum and maximum constraints. Buttons disable at boundaries.'
            }
        }
    }
};

export const CustomStep: Story = {
    args: {
        defaultValue: 0,
        step: 5,
        min: 0,
        max: 50
    },
    parameters: {
        docs: {
            description: {
                story: 'Counter that increments/decrements by 5 instead of the default 1.'
            }
        }
    }
};

export const Disabled: Story = {
    args: {
        defaultValue: 42,
        disabled: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled counter with no interactions allowed.'
            }
        }
    }
};

// Controlled Component
export const Controlled: Story = {
    render: () => {
        const [count, setCount] = useState(0);
        return (
            <div className="flex flex-col gap-4">
                <Counter
                    value={count}
                    onChange={setCount}
                    min={-10}
                    max={10}
                />
                <p className="text-sm text-muted-foreground">
                    Current value: <strong>{count}</strong>
                </p>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled counter that syncs with external state. Useful when the counter value needs to be managed at a higher level.'
            }
        }
    }
};

// Quantity Selector Use Case
export const QuantitySelector: Story = {
    args: {
        defaultValue: 1,
        min: 1,
        max: 99,
        step: 1
    },
    parameters: {
        docs: {
            description: {
                story: 'Common e-commerce use case for selecting product quantities.'
            }
        }
    }
};
