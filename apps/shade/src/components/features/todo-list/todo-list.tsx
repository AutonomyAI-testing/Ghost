import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {EmptyIndicator} from '@/components/ui/empty-indicator';
import {useTodoList} from './use-todo-list';
import {TodoInput} from './todo-input';
import {TodoItem} from './todo-item';
import {CheckCircle2} from 'lucide-react';
import {cn} from '@/lib/utils';

export interface TodoListProps {
    /**
     * Custom CSS class for the container
     */
    className?: string;
    /**
     * Key to use for localStorage persistence
     */
    storageKey?: string;
    /**
     * Maximum number of todos allowed
     */
    maxItems?: number;
}

/**
 * TodoList - A complete todo list component with add, edit, complete, and delete functionality.
 * Features localStorage persistence and keyboard shortcuts.
 */
export default function TodoList({
    className,
    storageKey = 'ghost-todos',
    maxItems
}: TodoListProps) {
    const {todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted} = useTodoList(storageKey);

    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = todos.length - completedCount;
    const hasCompletedTodos = completedCount > 0;

    const handleAddTodo = (text: string) => {
        if (maxItems && todos.length >= maxItems) {
            return;
        }
        addTodo(text);
    };

    return (
        <Card className={cn('w-full max-w-2xl', className)} variant="outline">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold">My Todos</CardTitle>
                    {hasCompletedTodos && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={clearCompleted}
                        >
                            Clear completed
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {/* Input for adding new todos */}
                <TodoInput className="mb-4" onAdd={handleAddTodo} />

                {/* Todo list */}
                {todos.length === 0 ? (
                    <EmptyIndicator
                        title="No todos yet"
                        description="Add one above to get started!"
                    >
                        <CheckCircle2 />
                    </EmptyIndicator>
                ) : (
                    <div className="space-y-2">
                        {todos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onDelete={() => deleteTodo(todo.id)}
                                onToggle={() => toggleTodo(todo.id)}
                                onUpdate={text => updateTodo(todo.id, text)}
                            />
                        ))}
                    </div>
                )}

                {/* Summary */}
                {todos.length > 0 && (
                    <div className="mt-4 flex items-center justify-between text-sm text-grey-600 dark:text-grey-400">
                        <span>
                            {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                        </span>
                        <span>
                            {completedCount} {completedCount === 1 ? 'item' : 'items'} completed
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
