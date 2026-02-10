import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    fallback: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="p-4 border border-red-500/50 rounded bg-red-500/10 text-red-200">
                    <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
                    <p className="text-sm opacity-80">Please try refreshing the page.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
