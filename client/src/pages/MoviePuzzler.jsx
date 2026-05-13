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
  const [solvedCount, setSolvedCount] = useState(0);

  const userId = localStorage.getItem("userId");

  const fetchPuzzle = async (diff) => {
    setGuess("");
    setAttempts(0);
    setResult(null);
    setShowHint(false);
    const params = new URLSearchParams({ userId });
    if (diff) params.append("difficulty", diff);
    const res = await fetch(`/api/puzzles/random?${params}`);
    const data = await res.json();
    if (res.ok) setPuzzle(data);
    else setPuzzle(null);
  };

  const fetchSolved = async () => {
  const res = await fetch(`/api/puzzles/solved?userId=${userId}`);
  const data = await res.json();
  setSolvedCount(data.count);
};

  useEffect(() => { 
    fetchPuzzle("");
    fetchSolved();
   }, []);

  const handleGuess = async() => {
    if (!guess.trim()) return;
    if (guess.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setResult("correct");
      await fetch("/api/puzzles/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, puzzleId: puzzle._id }),
      });
      setSolvedCount(prev => prev + 1);
    } else {
      setAttempts(attempts + 1);
      setResult("wrong");
    }
  };

  const handleDifficulty = (diff) => {
    setDifficulty(diff);
    fetchPuzzle(diff);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (!puzzle) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div className="home-page">
      <nav className="nav">
        <span className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          MoviePuzzler
        </span>
        <button className="btn-secondary" onClick={handleLogout}>Log out</button>
      </nav>

      <div className="game-container">

      <p className="solved-count">Solved: {solvedCount} / 30</p>

        <div className="difficulty-row">
          {["", "easy", "medium", "hard"].map((d) => (
            <button
              key={d}
              className={`diff-btn ${difficulty === d ? "diff-btn-active" : ""}`}
              onClick={() => handleDifficulty(d)}
            >
              {d === "" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        <div className="puzzle-card">
          <p className="label">{puzzle.difficulty.toUpperCase()}</p>
          <p className="puzzle-text">"{puzzle.description}"</p>
        </div>

        {result === "correct" && (
          <div className="result-correct">
            Correct! The answer was <strong>{puzzle.answer}</strong>
            <button className="btn-primary" onClick={() => fetchPuzzle(difficulty)} style={{ marginTop: "12px", display: "block" }}>Next Puzzle</button>
          </div>
        )}

        {result === "wrong" && (
          <div className="result-wrong">
            Wrong, try again
          </div>
        )}

        {result !== "correct" && (
          <div className="guess-row">
            <input
              type="text"
              className="guess-input"
              placeholder="Type your answer..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            />
            <button className="btn-primary" onClick={handleGuess}>Submit</button>
            <button className="btn-secondary" onClick={() => fetchPuzzle(difficulty)}>Skip</button>
          </div>
        )}

        {attempts >= 3 && result !== "correct" && (
          <div className="hint-section">
            {!showHint
              ? <button className="btn-secondary" onClick={() => setShowHint(true)}>Show Hint</button>
              : <p className="hint-text">Hint: {puzzle.hint}</p>
            }
          </div>
        )}

      </div>
    </div>
  );
}