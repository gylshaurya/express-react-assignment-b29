import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MoviePuzzler() {
  const navigate = useNavigate();
  const [puzzle, setPuzzle] = useState(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [showHint, setShowHint] = useState(false);

  const fetchPuzzle = async (diff) => {
    setGuess("");
    setAttempts(0);
    setResult(null);
    setShowHint(false);
    const res = await fetch(`/api/puzzles/random${diff ? `?difficulty=${diff}` : ""}`);
    const data = await res.json();
    setPuzzle(data);
  };

  useEffect(() => { fetchPuzzle(""); }, []);

  const handleGuess = () => {
    if (!guess.trim()) return;
    if (guess.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setResult("correct");
    } else {
      setAttempts(attempts + 1);
      setResult("wrong");
    }
  };

  if (!puzzle) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div className="home-page">
      <nav className="nav">
        <span className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>MoviePuzzler</span>
        <button className="btn-secondary" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("username"); navigate("/login"); }}>Log out</button>
      </nav>

      <div className="game-container">
        <div className="difficulty-row">
          {["", "easy", "medium", "hard"].map((d) => (
            <button key={d} className={`diff-btn ${difficulty === d ? "diff-btn-active" : ""}`} onClick={() => { setDifficulty(d); fetchPuzzle(d); }}>
              {d === "" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        <div className="puzzle-card">
          <p className="label">{puzzle.difficulty.toUpperCase()}</p>
          <p className="puzzle-text">"{puzzle.description}"</p>
        </div>

        {result === "correct" && <div className="result-correct">Correct! The answer was <strong>{puzzle.answer}</strong></div>}
        {result === "wrong" && <div className="result-wrong">Wrong, try again</div>}

        {result !== "correct" && (
          <div className="guess-row">
            <input className="guess-input" type="text" placeholder="Type your answer..." value={guess} onChange={(e) => setGuess(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleGuess()} />
            <button className="btn-primary" onClick={handleGuess}>Submit</button>
          </div>
        )}

        {attempts >= 3 && result !== "correct" && (
          <div className="hint-section">
            {!showHint ? <button className="btn-secondary" onClick={() => setShowHint(true)}>Show Hint</button> : <p className="hint-text">Hint: {puzzle.hint}</p>}
          </div>
        )}

        <button className="btn-secondary" onClick={() => fetchPuzzle(difficulty)}>Skip</button>
      </div>
    </div>
  );
}