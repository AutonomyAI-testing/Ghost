import React from 'react';
import { LoginForm } from './login-form';
import { ForgotPasswordForm } from './forgot-password-form';

type LoginView = 'login' | 'forgot-password';

export function LoginPage() {
    const [currentView, setCurrentView] = React.useState<LoginView>('login');

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
                        <LoginForm
                            onForgotPassword={() => setCurrentView('forgot-password')}
                        />
                    ) : (
                        <ForgotPasswordForm
                            onBackToLogin={() => setCurrentView('login')}
                        />
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
