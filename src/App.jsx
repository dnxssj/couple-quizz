import React, { useState, useEffect } from 'react';
import { FaHeartBroken, FaHeart, FaLaughSquint } from 'react-icons/fa';
import { GiHearts, GiDevilMask } from 'react-icons/gi';
import confetti from 'canvas-confetti';
import './App.css';

const questions = [
  {
    question: "¿Cuál de estas opciones elegiría?",
    options: ["Pizza", "Sushi", "Asado", "Pasta"],
    correct: "Pizza"
  },
  {
    question: "¿Qué música me gusta más?",
    options: ["Rock", "Reggaetón", "Clásica", "Electrónica", "Rap/Trap"],
    correct: "Rap/Trap"
  },
  {
    question: "¿Qué día nos conocimos?",
    options: ["20/02/2025", "05/05/2024", "26/04/2025"],
    correct: "26/04/2025"
  },
  {
    question: "¿Cuál es mi color favorito?",
    options: ["Rojo", "Magenta", "Verde", "Lila", "Marrón"],
    correct: "Verde"
  },
  {
    question: "¿A qué hora suelo dormirme entre semana?",
    options: ["22:00", "00:00", "03:00", "01:00"],
    correct: "22:00"
  },
  {
    question: "¿Qué es lo que más me molesta?",
    options: ["Mentiras", "Ruido", "Desorden", "Frío"],
    correct: "Mentiras"
  },
  {
    question: "¿De quienes llevamos match en discord?",
    options: ["Nezuko y Zenitsu", "Tanjiro y Kanao", "Shinobu y Tomioka", "Obanai y Mitsuri"],
    correct: "Shinobu y Tomioka"
  },
  {
    question: "¿Cuándo es mi cumpleaños?",
    options: ["12/04/2007", "09/05/2005", "09/06/2005", "12/08/2001"],
    correct: "09/05/2005"
  }
];

function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [confettiFired, setConfettiFired] = useState(false);

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[current].correct;
    setAnswers([...answers, isCorrect]);
    if (isCorrect) {
      setScore(score + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  const renderEffect = () => {
    if (!answers.length) return null;
    return answers[answers.length - 1] ? (
      <div className="effect right">
        <GiHearts size={60} />
        <p>¡Muy bien! No eres tan estúpida 💖</p>
      </div>
    ) : (
      <div className="effect wrong">
        <FaHeartBroken size={60} />
        <p>Qué idiota... 😢</p>
      </div>
    );
  };

  useEffect(() => {
    if (finished && !confettiFired && score / questions.length >= 0.8) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
      setConfettiFired(true);
    }
  }, [finished, score, questions.length, confettiFired]);

  if (!started) {
    return (
      <div className="App">
        <div className="welcome">
          <h1>💘 ¿Cuánto me conoces?</h1>
          <p>Responde las preguntas y descubre si realmente me amas o solo te gusto un poco 😏</p>
          <button className="start-button" onClick={() => setStarted(true)}>
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    let finalMessage = "";
    let icon = null;

    if (percentage === 50) {
      finalMessage = "Te estás tambaleando... ¿de verdad me quieres?";
      icon = <GiDevilMask size={80} color="red" />;
    } else if (percentage > 80) {
      finalMessage = "¡Me conoces perfectamente! ❤️";
      icon = <GiHearts size={80} color="hotpink" />;
    } else if (percentage >= 60) {
      finalMessage = "¡Vas por buen camino!";
      icon = <FaHeart size={80} color="salmon" />;
    } else {
      finalMessage = "Esto requiere una charla... 😅";
      icon = <FaLaughSquint size={80} color="gray" />;
    }

    return (
      <div className="final">
        <h2>Resultado final: {percentage}%</h2>
        <div className="icon">{icon}</div>
        <p>{finalMessage}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>¿Cuánto conoces a Daniel?</h1>
      <div className="progress">
        <div
          className="bar"
          style={{ width: `${(answers.length / questions.length) * 100}%` }}
        />
      </div>

      {streak >= 2 && (
        <div className="streak">
          🔥 ¡Racha de {streak} respuestas correctas! 🔥
        </div>
      )}

      <div className="card">
        <h2>{questions[current].question}</h2>
        <div className="options">
          {questions[current].options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
      {renderEffect()}
    </div>
  );
}

export default App;
