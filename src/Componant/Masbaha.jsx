import { useState, useEffect, useRef } from 'react'
import './Masbaha.css'

export const Masbaha = () => {
  const [count, setCount] = useState(0);
  const [isListening, setIsListening] = useState(false); 
  const recognitionRef = useRef(null); 

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1); 
  };

  const resetCount = () => {
    setCount(0);
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; 
      recognition.interimResults = false; 
      recognition.lang = 'ar-SA'; 

      recognition.onresult = (event) => {
        const lastResultIndex = event.results.length - 1;
        const spokenText = event.results[lastResultIndex][0].transcript.trim();
        
        console.log("الكلمة المسموعة:", spokenText);

        const phrases = [
          "سبحان الله", 
          "الحمد لله", 
          "الحمدلله", 
          "لا اله الا الله", 
          "لا إله إلا الله", 
          "الله اكبر", 
          "الله أكبر", 
          "لا حول ولا قوه الا بالله", 
          "لا حول ولا قوة إلا بالله"
        ];

        const matched = phrases.some(phrase => spokenText.includes(phrase));
        
        if (matched) {
          incrementCount();
        }
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };

      recognitionRef.current = recognition;
    } else {
      alert("متصفحك لا يدعم خاصية التعرف على الصوت. جربي متصفح Google Chrome.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
<div>
  <h1 style={{ textAlign: 'center', margin: '20px 0', color: '#2c3e50' }}>المسبحة الرقمية</h1>
    <div className="masbaha-container">
      <div className="masbaha-device">
        
        <div className="screen-box">
          <div className="lcd-display">
            <span className="digital-number">
              {count.toString().padStart(5, '0')}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <button 
            onClick={toggleListening} 
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            style={{
              padding: '8px 15px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: isListening ? '#e74c3c' : '#2ecc71',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isListening ? "🔴 إيقاف الاستماع" : "🎤 تفعيل التسبيح الصوتي"}
          </button>
        </div>

        <div className="label-row">
          <span className="label-text">COUNT</span>
          <span className="label-text">RESET</span>
        </div>

        <div className="button-area">
          <button onClick={incrementCount} className="big-button" aria-label="Count">
            <div className="inner-circle-big"></div>
          </button>

          <button onClick={resetCount} className="small-button" aria-label="Reset">
            <div className="inner-circle-small"></div>
          </button>
        </div>

      </div>
    </div>
    </div> 
  );
};
