import type {Meta, StoryObj} from '@storybook/react-vite';
import TodoList from './todo-list';
import {useEffect} from 'react';

const meta: Meta<typeof TodoList> = {
    title: 'Features/TodoList',
    component: TodoList,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        storageKey: {
            control: 'text',
            description: 'Key to use for localStorage persistence'
        },
        maxItems: {
            control: 'number',
            description: 'Maximum number of todos allowed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty state of the todo list
 */
export const Empty: Story = {
    args: {
        storageKey: 'storybook-todos-empty'
    },
    render: (args) => {
        // Clear localStorage for this story
        useEffect(() => {
            localStorage.removeItem(args.storageKey || 'ghost-todos');
        }, [args.storageKey]);

        return <TodoList {...args} />;
    }
};

/**
 * Todo list with some items - mix of completed and active
 */
export const WithItems: Story = {
    args: {
        storageKey: 'storybook-todos-with-items'
    },
    render: (args) => {
        // Pre-populate with sample todos
        useEffect(() => {
            const sampleTodos = [
                {
                    id: '1',
                    text: 'Review pull requests',
                    completed: false,
                    createdAt: Date.now() - 3600000
                },
                {
                    id: '2',
                    text: 'Update documentation',
                    completed: true,
                    createdAt: Date.now() - 7200000
                },
                {
                    id: '3',
                    text: 'Fix bug in todo component',
                    completed: false,
                    createdAt: Date.now() - 1800000
                },
                {
                    id: '4',
                    text: 'Write unit tests',
                    completed: false,
                    createdAt: Date.now() - 900000
                },
                {
                    id: '5',
                    text: 'Deploy to production',
                    completed: true,
                    createdAt: Date.now() - 10800000
                }
            ];
            localStorage.setItem(args.storageKey || 'ghost-todos', JSON.stringify(sampleTodos));
        }, [args.storageKey]);

        return <TodoList {...args} />;
    }
};

/**
 * Todo list with all items completed
 */
export const AllCompleted: Story = {
    args: {
        storageKey: 'storybook-todos-all-completed'
    },
    render: (args) => {
        // Pre-populate with completed todos
        useEffect(() => {
            const completedTodos = [
                {
                    id: '1',
                    text: 'Morning standup meeting',
                    completed: true,
                    createdAt: Date.now() - 3600000
                },
                {
                    id: '2',
                    text: 'Code review session',
                    completed: true,
                    createdAt: Date.now() - 7200000
                },
                {
                    id: '3',
                    text: 'Lunch break',
                    completed: true,
                    createdAt: Date.now() - 10800000
                }
            ];
            localStorage.setItem(args.storageKey || 'ghost-todos', JSON.stringify(completedTodos));
        }, [args.storageKey]);

        return <TodoList {...args} />;
    }
};

/**
 * Todo list with long text to demonstrate text handling
 */
export const WithLongText: Story = {
    args: {
        storageKey: 'storybook-todos-long-text'
    },
    render: (args) => {
        // Pre-populate with long text todos
        useEffect(() => {
            const longTextTodos = [
                {
                    id: '1',
                    text: 'This is a really long todo item text that demonstrates how the component handles lengthy content and whether it wraps properly or needs truncation',
                    completed: false,
                    createdAt: Date.now() - 3600000
                },
                {
                    id: '2',
                    text: 'Short todo',
                    completed: false,
                    createdAt: Date.now() - 1800000
                },
                {
                    id: '3',
                    text: 'Another very long todo item that shows how the UI adapts when users write detailed descriptions of their tasks and responsibilities for the day or week ahead',
                    completed: true,
                    createdAt: Date.now() - 7200000
                }
            ];
            localStorage.setItem(args.storageKey || 'ghost-todos', JSON.stringify(longTextTodos));
        }, [args.storageKey]);

        return <TodoList {...args} />;
    }
};

/**
 * Fully interactive todo list for testing all features
 */
export const Interactive: Story = {
    args: {
        storageKey: 'storybook-todos-interactive'
    },
    render: (args) => {
        // Pre-populate with a couple of sample todos
        useEffect(() => {
            const interactiveTodos = [
                {
                    id: '1',
                    text: 'Click to toggle completion',
                    completed: false,
                    createdAt: Date.now()
                },
                {
                    id: '2',
                    text: 'Click text to edit inline',
                    completed: false,
                    createdAt: Date.now() - 1000
                }
            ];
            localStorage.setItem(args.storageKey || 'ghost-todos', JSON.stringify(interactiveTodos));
        }, [args.storageKey]);

        return <TodoList {...args} />;
    }
};

/**
 * Todo list with a maximum item limit
 */
export const WithMaxItems: Story = {
    args: {
        storageKey: 'storybook-todos-max-items',
        maxItems: 5
    },
    render: (args) => {
        // Pre-populate with 4 items (one away from max)
        useEffect(() => {
            const maxItemsTodos = [
                {
                    id: '1',
                    text: 'First todo',
                    completed: false,
                    createdAt: Date.now()
                },
                {
                    id: '2',
                    text: 'Second todo',
                    completed: true,
                    createdAt: Date.now() - 1000
                },
                {
                    id: '3',
                    text: 'Third todo',
                    completed: false,
                    createdAt: Date.now() - 2000
                },
                {
                    id: '4',
                    text: 'Fourth todo',
                    completed: false,
                    createdAt: Date.now() - 3000
                }
            ];
            localStorage.setItem(args.storageKey || 'ghost-todos', JSON.stringify(maxItemsTodos));
        }, [args.storageKey]);

        return (
            <div>
                <TodoList {...args} />
                <p className="mt-4 text-center text-sm text-grey-600 dark:text-grey-400">
                    Maximum of {args.maxItems} items allowed
                </p>
            </div>
        );
    }
};
