import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Trash2} from 'lucide-react';
import type {Todo} from './types';
import {cn} from '@/lib/utils';

interface TodoItemProps {
    todo: Todo;
    onToggle: () => void;
    onDelete: () => void;
    onUpdate: (text: string) => void;
}

export function TodoItem({todo, onToggle, onDelete, onUpdate}: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.text);

    const handleSave = () => {
        if (editValue.trim() && editValue !== todo.text) {
            onUpdate(editValue);
        } else {
            setEditValue(todo.text);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditValue(todo.text);
            setIsEditing(false);
        }
    };

    return (
        <div className="group flex items-center gap-3 rounded-lg border border-grey-200 bg-white p-4 transition-colors hover:border-grey-300 dark:border-grey-800 dark:bg-grey-950 dark:hover:border-grey-700">
            {/* Checkbox */}
            <button
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                    todo.completed
                        ? 'border-green-600 bg-green-600 dark:border-green-500 dark:bg-green-500'
                        : 'border-grey-400 hover:border-green-500 dark:border-grey-600 dark:hover:border-green-500'
                )}
                type="button"
                onClick={onToggle}
            >
                {todo.completed && (
                    <svg className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </button>

            {/* Text content or edit input */}
            <div className="flex-1">
                {isEditing ? (
                    <Input
                        aria-label="Edit todo text"
                        autoFocus
                        className="h-auto py-1"
                        type="text"
                        value={editValue}
                        onBlur={handleSave}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <button
                        className={cn(
                            'w-full text-left text-base transition-colors',
                            todo.completed
                                ? 'text-grey-500 line-through dark:text-grey-600'
                                : 'text-grey-900 hover:text-grey-700 dark:text-grey-100 dark:hover:text-grey-300'
                        )}
                        type="button"
                        onClick={() => setIsEditing(true)}
                    >
                        {todo.text}
                    </button>
                )}
            </div>

            {/* Delete button */}
            <Button
                aria-label={`Delete todo: ${todo.text}`}
                className="opacity-0 transition-opacity group-hover:opacity-100"
                size="icon"
                variant="ghost"
                onClick={onDelete}
            >
                <Trash2 className="size-4 text-grey-600 dark:text-grey-400" />
            </Button>
        </div>
    );
}
