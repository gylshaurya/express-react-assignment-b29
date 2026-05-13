import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/login")
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
        <h1>Guess the movie from a <span>literally honest</span> description</h1>
        <p>A billionaire beats up the mentally ill while wearing a rubber suit → The Dark Knight</p>
        {!username && ( <button className="btn-primary" onClick={() => navigate("/signup")}>Start Playing</button>)}
        {username && ( <button className="btn-primary" onClick={() => navigate("/movie-puzzler")}>Start Playing</button>)}


      </div>
    </div>
  );
}