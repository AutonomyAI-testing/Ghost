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
        <div className="w-full max-w-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Instructions */}
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        Enter your email address and we'll send you instructions to reset
                        your password.
                    </div>

                    {/* Success message */}
                    {successMessage && (
                        <Banner variant="success" role="status">
                            {successMessage}
                        </Banner>
                    )}

                    {/* Error message */}
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
                                        disabled={passwordResetMutation.isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={passwordResetMutation.isLoading}
                        >
                            {passwordResetMutation.isLoading
                                ? 'Sending...'
                                : 'Send reset instructions'}
                        </Button>

                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            disabled={passwordResetMutation.isLoading}
                        >
                            ← Back to sign in
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
