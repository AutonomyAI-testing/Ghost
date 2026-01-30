import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LoginCredentials {
    username: string;
    password: string;
}

interface LoginResponse {
    users?: Array<{
        id: string;
        name: string;
        email: string;
        slug: string;
    }>;
}

interface PasswordResetRequest {
    passwordreset: Array<{
        email: string;
    }>;
}

interface PasswordResetResponse {
    passwordreset: Array<{
        email: string;
        message?: string;
    }>;
}

interface ApiError {
    errors?: Array<{
        message: string;
        type?: string;
        errorType?: string;
    }>;
}

/**
 * Hook to handle user login authentication.
 * 
 * Makes a POST request to /ghost/api/admin/session with email and password.
 * On success, sets a session cookie and returns user data.
 * Automatically invalidates all queries to refetch with authenticated state.
 * 
 * @returns Mutation object with login function and state (isPending, error, mutateAsync)
 */
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation<LoginResponse, Error, LoginCredentials>({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await fetch('/ghost/api/admin/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'app-pragma': 'no-cache',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData: ApiError = await response.json().catch(() => ({}));
                const errorMessage = errorData.errors?.[0]?.message || 'Login failed';
                const errorType = errorData.errors?.[0]?.errorType || errorData.errors?.[0]?.type;
                
                const error = new Error(errorMessage) as Error & { type?: string };
                error.type = errorType;
                throw error;
            }

            return response.json();
        },
        onSuccess: () => {
            // Invalidate all queries to refetch with authenticated state
            void queryClient.invalidateQueries();

            // Emit auth change event for Ember bridge synchronization
            if (window.EmberBridge?.state) {
                const event = new CustomEvent('emberAuthChange', {
                    detail: { isAuthenticated: true }
                });
                window.dispatchEvent(event);
            }
        },
    });
}

/**
 * Hook to handle password reset requests.
 * 
 * Makes a POST request to /ghost/api/admin/authentication/password_reset
 * to send a password reset email to the specified address.
 * 
 * @returns Mutation object with password reset function and state (isPending, error, mutateAsync)
 */
export function usePasswordReset() {
    return useMutation<PasswordResetResponse, Error, string>({
        mutationFn: async (email: string) => {
            const requestBody: PasswordResetRequest = {
                passwordreset: [{ email }],
            };

            const response = await fetch('/ghost/api/admin/authentication/password_reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'app-pragma': 'no-cache',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData: ApiError = await response.json().catch(() => ({}));
                const errorMessage = errorData.errors?.[0]?.message || 'Password reset failed';
                throw new Error(errorMessage);
            }

            return response.json();
        },
    });
}
