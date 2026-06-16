import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      right: 20,
      background: '#ec4899',
      color: 'white',
      padding: '12px 16px',
      borderRadius: 12,
      zIndex: 9999
    }}>
      <p style={{ margin: 0, fontSize: 14 }}>Install Bio112 Quiz for faster access?</p>
      <button onClick={handleInstall} style={{
        marginTop: 8,
        background: 'white',
        color: '#ec4899',
        border: 'none',
        padding: '6px 12px',
        borderRadius: 8,
        fontWeight: 'bold'
      }}>Install</button>
    </div>
  )
}
