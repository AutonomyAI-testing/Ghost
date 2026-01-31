import {SimpleButton} from './SimpleButton';

/**
 * SimpleButtonDemo - A demo page showcasing the SimpleButton component
 * This component displays all variants, sizes, and states of SimpleButton
 */
export default function SimpleButtonDemo() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8 dark:bg-gray-950">
            <div className="w-full max-w-4xl space-y-12 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                        SimpleButton Component
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        A simple, reusable button component with variant and size support
                    </p>
                </div>

                {/* Variants Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Variants
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <SimpleButton variant="primary" onClick={() => alert('Primary clicked!')}>
                            Primary Button
                        </SimpleButton>
                        <SimpleButton variant="secondary" onClick={() => alert('Secondary clicked!')}>
                            Secondary Button
                        </SimpleButton>
                    </div>
                </section>

                {/* Sizes Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Sizes
                    </h2>
                    <div className="flex flex-wrap items-center gap-4">
                        <SimpleButton variant="primary" size="sm">
                            Small
                        </SimpleButton>
                        <SimpleButton variant="primary" size="md">
                            Medium (Default)
                        </SimpleButton>
                        <SimpleButton variant="primary" size="lg">
                            Large
                        </SimpleButton>
                    </div>
                </section>

                {/* States Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        States
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <SimpleButton variant="primary">
                            Normal
                        </SimpleButton>
                        <SimpleButton variant="primary" disabled>
                            Disabled
                        </SimpleButton>
                        <SimpleButton variant="secondary" disabled>
                            Secondary Disabled
                        </SimpleButton>
                    </div>
                </section>

                {/* Size Combinations */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        All Combinations
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Primary Variants */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                Primary Variant
                            </h3>
                            <div className="space-y-3">
                                <SimpleButton variant="primary" size="sm" className="w-full">
                                    Small Primary
                                </SimpleButton>
                                <SimpleButton variant="primary" size="md" className="w-full">
                                    Medium Primary
                                </SimpleButton>
                                <SimpleButton variant="primary" size="lg" className="w-full">
                                    Large Primary
                                </SimpleButton>
                            </div>
                        </div>

                        {/* Secondary Variants */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                Secondary Variant
                            </h3>
                            <div className="space-y-3">
                                <SimpleButton variant="secondary" size="sm" className="w-full">
                                    Small Secondary
                                </SimpleButton>
                                <SimpleButton variant="secondary" size="md" className="w-full">
                                    Medium Secondary
                                </SimpleButton>
                                <SimpleButton variant="secondary" size="lg" className="w-full">
                                    Large Secondary
                                </SimpleButton>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Usage Example */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Usage Example
                    </h2>
                    <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
{`import {SimpleButton} from './SimpleButton';

function MyComponent() {
  return (
    <SimpleButton 
      variant="primary" 
      size="md"
      onClick={() => console.log('Clicked!')}
    >
      Click me
    </SimpleButton>
  );
}`}
                    </pre>
                </section>
            </div>
        </div>
    );
}
