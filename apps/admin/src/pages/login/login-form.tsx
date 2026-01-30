import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Button,
    Input,
    Banner,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@tryghost/shade';
import { useLogin } from '@/hooks/use-authentication';

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormProps {
    onForgotPassword: () => void;
    onSuccess?: () => void;
}

export function LoginForm({ onForgotPassword, onSuccess }: LoginFormProps) {
    const form = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginMutation = useLogin();
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const onSubmit = async (data: LoginFormData) => {
        setErrorMessage('');
        
        try {
            await loginMutation.mutateAsync({
                username: data.email,
                password: data.password,
            });
            
            // On success, redirect to admin
            onSuccess?.();
            window.location.href = '/ghost/#/dashboard';
        } catch (error) {
            const err = error as Error & { type?: string };
            
            // Handle specific error types
            if (err.type === 'TooManyRequestsError') {
                setErrorMessage('Too many login attempts. Please try again later.');
            } else if (err.type === 'PasswordResetRequiredError') {
                setErrorMessage('Password reset required. Please check your email.');
            } else if (err.type === 'UnauthorizedError') {
                setErrorMessage('Invalid email address or password.');
            } else {
                setErrorMessage(err.message || 'An error occurred during login. Please try again.');
            }
        }
    };

    return (
        <div className="w-full max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* General error message */}
                    {errorMessage && (
                        <Banner variant="destructive" role="alert">
                            {errorMessage}
                        </Banner>
                    )}

                    {/* Email field */}
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address',
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="jamie@example.com"
                                        autoComplete="username"
                                        autoFocus
                                        disabled={loginMutation.isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password field */}
                    <FormField
                        control={form.control}
                        name="password"
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 10,
                                message: 'Your password must be at least 10 characters long',
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="•••••••••••••"
                                        autoComplete="current-password"
                                        disabled={loginMutation.isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Forgot password link */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 transition-colors"
                            disabled={loginMutation.isLoading}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isLoading}
                    >
                        {loginMutation.isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
