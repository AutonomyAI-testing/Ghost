import {useEffect, useState} from 'react';
import type {Todo, UseTodoListReturn} from './types';

/**
 * Custom hook for managing a todo list with localStorage persistence
 * @param storageKey - The key to use for localStorage (default: 'ghost-todos')
 * @returns Object containing todos array and CRUD operations
 */
export function useTodoList(storageKey = 'ghost-todos'): UseTodoListReturn {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Load todos from localStorage on mount
    useEffect(() => {
        try {
            const storedTodos = localStorage.getItem(storageKey);
            if (storedTodos) {
                const parsed = JSON.parse(storedTodos);
                if (Array.isArray(parsed)) {
                    setTodos(parsed);
                }
            }
        } catch (error) {
            console.error('Failed to load todos from localStorage:', error);
        }
    }, [storageKey]);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(todos));
        } catch (error) {
            console.error('Failed to save todos to localStorage:', error);
        }
    }, [todos, storageKey]);

    /**
     * Add a new todo item
     * @param text - The text content of the todo
     */
    const addTodo = (text: string) => {
        const trimmedText = text.trim();
        if (!trimmedText) {
            return;
        }

        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text: trimmedText,
            completed: false,
            createdAt: Date.now()
        };

        setTodos(prev => [...prev, newTodo]);
    };

    /**
     * Toggle the completed status of a todo
     * @param id - The ID of the todo to toggle
     */
    const toggleTodo = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    };

    /**
     * Delete a todo item
     * @param id - The ID of the todo to delete
     */
    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    /**
     * Update the text of a todo item
     * @param id - The ID of the todo to update
     * @param text - The new text content
     */
    const updateTodo = (id: string, text: string) => {
        const trimmedText = text.trim();
        if (!trimmedText) {
            return;
        }

        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? {...todo, text: trimmedText} : todo
            )
        );
    };

    /**
     * Remove all completed todos
     */
    const clearCompleted = () => {
        setTodos(prev => prev.filter(todo => !todo.completed));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted
    };
}
