import React from 'react';
import { LoginForm } from './login-form';
import { ForgotPasswordForm } from './forgot-password-form';
import { Card, CardContent } from '@tryghost/shade';

type LoginView = 'login' | 'forgot-password';

export function LoginPage() {
    const [currentView, setCurrentView] = React.useState<LoginView>('login');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Logo / Site Icon */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform duration-300 group-hover:scale-105">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 3H7.5C6.67157 3 6 3.67157 6 4.5V19.5C6 20.3284 6.67157 21 7.5 21H16.5C17.3284 21 18 20.3284 18 19.5V8.5M13.5 3L18 8.5M13.5 3V8.5H18"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 13H15M9 16H15"
                                    />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="text-center space-y-2">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {currentView === 'login' ? 'Welcome back' : 'Reset password'}
                            </h1>
                            {currentView === 'login' && (
                                <p className="text-base text-gray-600 dark:text-gray-400">
                                    Sign in to continue to your Ghost admin
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Form Container */}
                    <Card variant="outline" className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-2xl border-gray-200/50 dark:border-gray-800/50">
                        <CardContent className="p-8">
                            {currentView === 'login' ? (
                                <LoginForm
                                    onForgotPassword={() => setCurrentView('forgot-password')}
                                />
                            ) : (
                                <ForgotPasswordForm
                                    onBackToLogin={() => setCurrentView('login')}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Powered by{' '}
                            <a
                                href="https://ghost.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 transition-colors"
                            >
                                Ghost
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
