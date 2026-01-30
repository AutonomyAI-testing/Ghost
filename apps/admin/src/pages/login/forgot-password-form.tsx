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
import { usePasswordReset } from '@/hooks/use-authentication';

interface ForgotPasswordFormData {
    email: string;
}

interface ForgotPasswordFormProps {
    onBackToLogin: () => void;
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
    const form = useForm<ForgotPasswordFormData>({
        defaultValues: {
            email: '',
        },
    });

    const passwordResetMutation = usePasswordReset();
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await passwordResetMutation.mutateAsync(data.email);
            setSuccessMessage(
                'Password reset email sent! Check your inbox for instructions.'
            );
            form.reset();
        } catch (error) {
            const err = error as Error;
            setErrorMessage(
                err.message || 'Failed to send password reset email. Please try again.'
            );
        }
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Instructions */}
                    <div className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <svg
                            className="w-5 h-5 flex-shrink-0 text-green-600 dark:text-green-500 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p>
                            Enter your email address and we'll send you instructions to reset
                            your password.
                        </p>
                    </div>

                    {/* Success message */}
                    {successMessage && (
                        <div className="animate-in slide-in-from-top-2 duration-300">
                            <Banner variant="success" role="status" className="text-sm">
                                <div className="flex items-start gap-2">
                                    <svg
                                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>{successMessage}</span>
                                </div>
                            </Banner>
                        </div>
                    )}

                    {/* Error message */}
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
                                        disabled={passwordResetMutation.isLoading}
                                        className="h-11 text-base transition-all duration-200 focus:ring-2 focus:ring-green-500/20"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm" />
                            </FormItem>
                        )}
                    />

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3 pt-2">
                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/30"
                            disabled={passwordResetMutation.isLoading}
                        >
                            {passwordResetMutation.isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <LoadingIndicator size="sm" color="light" />
                                    <span>Sending...</span>
                                </div>
                            ) : (
                                'Send reset instructions'
                            )}
                        </Button>

                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors py-2"
                            disabled={passwordResetMutation.isLoading}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <span>Back to sign in</span>
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
