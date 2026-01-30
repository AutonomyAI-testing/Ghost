export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
}

export interface UseTodoListReturn {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    updateTodo: (id: string, text: string) => void;
    clearCompleted: () => void;
}
