import { useEffect, useState } from "react"

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShow(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      left: 20,
      right: 20,
      background: "#2563eb",
      color: "white",
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
      zIndex: 9999
    }}>
      <p style={{margin: "0 0 10px 0", fontWeight: "bold"}}>Install Bio 112 Quiz App?</p>
      <button onClick={install} style={{
        background: "white",
        color: "#2563eb",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer"
      }}>
        Install Now
      </button>
    </div>
  )
}
