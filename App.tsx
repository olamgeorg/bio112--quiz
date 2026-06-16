import { useState, useEffect } from 'react'

const questions = [
  {
    q: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    answer: "Mitochondria"
  },
  {
    q: "DNA stands for?",
    options: ["Deoxyribonucleic Acid", "Dioxyribonucleic Acid", "Deoxyribose Nucleic Acid", "Dioxyribose Acid"],
    answer: "Deoxyribonucleic Acid"
  },
  {
    q: "Which cell has no nucleus?",
    options: ["Plant cell", "Animal cell", "Bacterial cell", "Fungal cell"],
    answer: "Bacterial cell"
  }
]

export default function App() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState("")
  const [showResult, setShowResult] = useState(false)

  // PWA install states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then(() => setCanInstall(false))
    }
  }

  const handleAnswer = (option: string) => {
    setSelected(option)
    if (option === questions[current].answer) setScore(score + 1)
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1)
        setSelected("")
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  if (showResult) {
    return (
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'#f9fafb',padding:'20px',textAlign:'center',maxWidth:'600px',margin:'0 auto'}}>
        <h1 style={{fontSize:'36px',color:'#2563eb',marginBottom:'20px'}}>BIO 112 Quiz 🧬</h1>
        <h2 style={{fontSize:'28px',color:'#333'}}>Your Score: {score}/{questions.length}</h2>
        <p style={{fontSize:'18px',color:'#666',marginTop:'10px'}}>{score === questions.length? 'Perfect! 🎉' : score >= 2? 'Great job! 👏' : 'Keep practicing! 💪'}</p>
        <button onClick={() => {setCurrent(0); setScore(0); setShowResult(false); setSelected("")}}
          style={{marginTop:'20px',padding:'12px 24px',background:'#2563eb',color:'white',border:'none',borderRadius:'8px',fontSize:'16px',cursor:'pointer',width:'100%'}}>
          Retake Quiz
        </button>

        {canInstall && (
          <button onClick={installApp}
            style={{marginTop:'12px',padding:'12px 24px',background:'#10b981',color:'white',border:'none',borderRadius:'8px',fontSize:'16px',cursor:'pointer',width:'100%'}}>
            📲 Install App
          </button>
        )}
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',padding:'20px',maxWidth:'600px',margin:'0 auto'}}>
      <h1 style={{fontSize:'32px',color:'#2563eb',textAlign:'center',marginBottom:'30px'}}>BIO 112 Quiz 🧬</h1>
      <p style={{textAlign:'center',color:'#666',marginBottom:'20px'}}>Question {current + 1} of {questions.length}</p>

      <div style={{background:'white',padding:'30px',borderRadius:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
        <h2 style={{fontSize:'20px',color:'#333',marginBottom:'20px'}}>{questions[current].q}</h2>

        {questions[current].options.map((option, idx) => (
          <button key={idx} onClick={() => handleAnswer(option)} disabled={selected!== ""}
            style={{
              width:'100%',padding:'15px',margin:'8px 0',border:'2px solid',
              borderColor: selected === option? (option === questions[current].answer? '#10b981' : '#ef4444') : '#e5e7eb',
              background: selected === option? (option === questions[current].answer? '#d1fae5' : '#fee2e2') : 'white',
              borderRadius:'8px',fontSize:'16px',cursor:selected? 'default' : 'pointer',textAlign:'left'
            }}>
            {option}
          </button>
        ))}
      </div>

      {canInstall && (
        <button onClick={installApp}
          style={{marginTop:'20px',padding:'12px 24px',background:'#10b981',color:'white',border:'none',borderRadius:'8px',fontSize:'16px',cursor:'pointer',width:'100%'}}>
          📲 Install App
        </button>
      )}
    </div>
  )
}
