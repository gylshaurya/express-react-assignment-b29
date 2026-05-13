import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId");
    navigate("/")
  }


  return (
    <div className="home-page">
      <nav className="nav">
        <span className="nav-logo">MoviePuzzler</span>
        <div className="nav-buttons">
          {username ? (
            <>
              <span className="nav-user">Hi, {username}</span>
              <button className="btn-secondary" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => navigate("/login")}>Log in</button>
              <button className="btn-primary" onClick={() => navigate("/signup")}>Sign up</button>
            </>
          )}
        </div>

      </nav>

      <div className="hero">
        <h1>Guess the movie from a <span>brutally honest</span> description</h1>
        <p>We describe popular films as literally as possible. Figure out which movie it is.</p>
        {username
          ? <button className="btn-primary" onClick={() => navigate("/movie-puzzler")}>Start Playing</button>
          : <button className="btn-primary" onClick={() => navigate("/signup")}>Sign up to Play</button>
        }
      </div>
    </div>
  );
}