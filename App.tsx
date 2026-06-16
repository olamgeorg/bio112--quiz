import { useState } from 'react'
import PWAInstallPrompt from "./components/PWAInstallPrompt" // <-- No { }

function App() {
  const [isLight] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center p-4">BIO 112 Quiz</h1>

      {/* Put your BIO 112 questions here */}
      <div className="p-4">
        <p>Quiz content goes here...</p>
      </div>

      <footer className="text-center p-4 text-sm">
        Bio 112 Practice Quiz © 2026
      </footer>

      <PWAInstallPrompt isLight={isLight} />
    </div>
  )
}
export default App
