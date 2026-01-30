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
    LoadingIndicator,
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
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* General error message */}
                    {errorMessage && (
                        <div className="animate-in slide-in-from-top-2 duration-300">
                            <Banner variant="destructive" role="alert" className="text-sm">
                                <div className="flex items-start gap-2">
                                    <svg
                                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>{errorMessage}</span>
                                </div>
                            </Banner>
                        </div>
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
                                <FormLabel className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Email address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="jamie@example.com"
                                        autoComplete="username"
                                        autoFocus
                                        disabled={loginMutation.isLoading}
                                        className="h-11 text-base transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm" />
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
                                <FormLabel className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        disabled={loginMutation.isLoading}
                                        className="h-11 text-base transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm" />
                            </FormItem>
                        )}
                    />

                    {/* Forgot password link */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 transition-colors underline-offset-4 hover:underline"
                            disabled={loginMutation.isLoading}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit button */}
                    <Button
                        type="submit"
                        className="w-full h-11 text-base font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/30"
                        disabled={loginMutation.isLoading}
                    >
                        {loginMutation.isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <LoadingIndicator size="sm" color="light" />
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            'Sign in'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
