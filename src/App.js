import React, { useState, useEffect } from 'react';

const BirthdayPage = () => {
  // Stages: 'countdown' -> 'shaking' -> 'opening' -> 'vanishing' -> 'revealed'
  const [stage, setStage] = useState('countdown');
  const [timeLeft, setTimeLeft] = useState(5);
  const [lidAngle, setLidAngle] = useState(0);

  // Logic Controller
  useEffect(() => {
    if (stage === 'countdown') {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setStage('shaking');
      }
    }

    if (stage === 'shaking') {
      const timer = setTimeout(() => setStage('opening'), 1500);
      return () => clearTimeout(timer);
    }

    if (stage === 'opening') {
      const interval = setInterval(() => {
        setLidAngle(a => {
          if (a >= 130) {
            clearInterval(interval);
            setTimeout(() => setStage('vanishing'), 600);
            return a;
          }
          return a + 5;
        });
      }, 30);
      return () => clearInterval(interval);
    }

    if (stage === 'vanishing') {
      const timer = setTimeout(() => setStage('revealed'), 1000);
      return () => clearTimeout(timer);
    }
  }, [stage, timeLeft]);

  return (
    <div className="birthday-magic">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
          overflow: hidden;
          background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fccb90);
          font-family: 'Poppins', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .birthday-magic {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1500px;
        }

        /* Particles */
        .particle {
          position: fixed;
          pointer-events: none;
          animation: floatUp 6s linear infinite;
          z-index: 1;
          filter: drop-shadow(0 0 5px rgba(255,255,255,0.5));
        }

        @keyframes floatUp {
          0% { transform: translateY(110vh) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 1; scale: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) rotate(720deg) scale(1.2); opacity: 0; }
        }

        /* Glass Countdown */
        .glass-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 100;
          transition: opacity 0.8s ease;
        }

        .count-num {
          font-size: 15rem;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 10px 50px rgba(255, 20, 147, 0.5);
          animation: pulse 1s ease infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        /* Gift Box Styles */
        .gift-container {
          position: relative;
          width: 300px;
          height: 300px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          z-index: 10;
        }

        .vanishing { opacity: 0; transform: scale(0.5) rotateY(180deg); }

        .box-body {
          width: 100%;
          height: 100%;
          background: #ff69b4;
          border: 12px solid #ffd700;
          border-radius: 20px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2), inset 0 0 50px rgba(0,0,0,0.1);
          position: relative;
        }

        .box-lid {
          position: absolute;
          top: -20px;
          left: -10px;
          width: 320px;
          height: 80px;
          background: #ff85c1;
          border: 10px solid #ffd700;
          border-radius: 15px;
          transform-origin: center bottom;
          z-index: 15;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .shaking { animation: shake 0.2s infinite; }

        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }

        /* Message Card */
        .message-card {
          position: absolute;
          padding: 3rem 5rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(25px) saturate(200%);
          border: 2px solid rgba(255,255,255,0.5);
          border-radius: 40px;
          text-align: center;
          box-shadow: 0 50px 100px rgba(0,0,0,0.1);
          transform: scale(0);
          transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 200;
        }

        .message-card.show { transform: scale(1); }

        .message-card h1 {
          font-size: 5rem;
          background: linear-gradient(to right, #ff1493, #ff69b4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .message-card p {
          font-size: 1.5rem;
          color: #444;
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .message-card { width: 90%; padding: 2rem; }
          .message-card h1 { font-size: 2.5rem; }
          .count-num { font-size: 8rem; }
        }
      `}</style>

      {/* Floating Background Decorations */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 20 + 10}px`
          }}
        >
          {['💖', '✨', '🎈', '🌸'][i % 4]}
        </div>
      ))}

      {/* 1. Countdown Overlay */}
      {stage === 'countdown' && (
        <div className="glass-overlay">
          <h2 style={{ color: '#ff1493', marginBottom: '20px' }}>SURPRISE LOADING...</h2>
          <div className="count-num">{timeLeft}</div>
        </div>
      )}

      {/* 2. Gift Box Scene */}
      {stage !== 'revealed' && (
        <div className={`gift-container ${stage === 'shaking' ? 'shaking' : ''} ${stage === 'vanishing' ? 'vanishing' : ''}`}>
          <div 
            className="box-lid" 
            style={{ transform: `rotateX(-${lidAngle}deg) translateY(${lidAngle > 0 ? -50 : 0}px)` }} 
          />
          <div className="box-body">
            {/* Ribbon */}
            <div style={{ position: 'absolute', left: '50%', width: '40px', height: '100%', background: '#ffd700', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', top: '50%', width: '100%', height: '40px', background: '#ffd700', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      )}

      {/* 3. Final Message Reveal */}
      <div className={`message-card ${stage === 'revealed' ? 'show' : ''}`}>
        <h1>Happy Birthday ``Dear!</h1>
        <p>May your day be as wonderful as you are! ✨</p>
        <div style={{ marginTop: '20px', fontSize: '2rem' }}>🎂🎁🥳</div>
      </div>
    </div>
  );
};

export default BirthdayPage;