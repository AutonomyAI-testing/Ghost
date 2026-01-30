import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Mock the LoginPage component with similar structure
function LoginPage() {
    const [currentView, setCurrentView] = React.useState<'login' | 'forgot-password'>('login');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Logo / Site Icon */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                        <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        </svg>
                    </div>
                    <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        {currentView === 'login' ? 'Sign in' : 'Reset password'}
                    </h1>
                    {currentView === 'login' && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Sign in to your Ghost admin
                        </p>
                    )}
                </div>

                {/* Form Container */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 px-8 py-10">
                    {currentView === 'login' ? (
                        <div className="w-full max-w-md">
                            <form className="space-y-6">
                                {/* Email field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="jamie@example.com"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                {/* Password field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="•••••••••••••"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                {/* Forgot password link */}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentView('forgot-password')}
                                        className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="w-full max-w-md">
                            <form className="space-y-6">
                                {/* Instructions */}
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Enter your email address and we'll send you instructions to reset
                                    your password.
                                </div>

                                {/* Email field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="jamie@example.com"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                {/* Action buttons */}
                                <div className="flex flex-col gap-3">
                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                    >
                                        Send reset instructions
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setCurrentView('login')}
                                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                    >
                                        ← Back to sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    <p>
                        Powered by{' '}
                        <a
                            href="https://ghost.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                        >
                            Ghost
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

const meta = {
    title: 'Pages/LoginPage',
    component: LoginPage,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};
