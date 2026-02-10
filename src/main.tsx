import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import ErrorBoundary from './components/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-red-500">System Error</h1>
          <p className="text-gray-400">The application encountered a critical error.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
          >
            Reload System
          </button>
        </div>
      </div>
    }>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
