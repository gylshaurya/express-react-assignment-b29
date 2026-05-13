import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <button onClick={() => navigate("/login")}>Log in</button>
        </p>
      </div>
    </div>
  );
}