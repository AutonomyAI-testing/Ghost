import type {Meta, StoryObj} from '@storybook/react-vite';
import {SimpleButton} from './SimpleButton';

const meta = {
    title: 'Components / SimpleButton',
    component: SimpleButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A simple, reusable button component with basic styling variants and sizes. Use for straightforward interactive actions across the Ghost admin interface.'
            }
        }
    }
} satisfies Meta<typeof SimpleButton>;

export default meta;
type Story = StoryObj<typeof SimpleButton>;

// Overview
export const Primary: Story = {
    name: 'Default',
    args: {
        variant: 'primary',
        children: 'Primary button'
    },
    parameters: {
        docs: {
            description: {
                story: 'Main use case: call-to-action button with solid background styling.'
            }
        }
    }
};

// Variants
export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary button'
    },
    parameters: {
        docs: {
            description: {
                story: 'Use for secondary actions or when a lighter visual weight is needed.'
            }
        }
    }
};

// Sizes
export const Small: Story = {
    args: {
        variant: 'primary',
        size: 'sm',
        children: 'Small button'
    },
    parameters: {
        docs: {
            description: {
                story: 'Use in compact UIs, tables, or where space is limited.'
            }
        }
    }
};

export const Medium: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        children: 'Medium button'
    },
    parameters: {
        docs: {
            description: {
                story: 'Default size for most use cases - provides balanced visual weight and touch target.'
            }
        }
    }
};

export const Large: Story = {
    args: {
        variant: 'primary',
        size: 'lg',
        children: 'Large button'
    },
    parameters: {
        docs: {
            description: {
                story: 'Use when prominence and larger hit targets are needed, such as primary CTAs.'
            }
        }
    }
};

// States
export const Disabled: Story = {
    args: {
        variant: 'primary',
        disabled: true,
        children: 'Disabled button'
    },
    parameters: {
        docs: {
            description: {
                story: 'Use to indicate an action is unavailable. The button cannot be clicked when disabled.'
            }
        }
    }
};

export const SecondaryDisabled: Story = {
    args: {
        variant: 'secondary',
        disabled: true,
        children: 'Disabled secondary'
    },
    parameters: {
        docs: {
            description: {
                story: 'Secondary variant in disabled state.'
            }
        }
    }
};
