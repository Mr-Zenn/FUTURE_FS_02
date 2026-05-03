import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo">◈</div>
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Sign in to your Mini CRM</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <InputField label="Email" placeholder="you@example.com" type="email"
            value={form.email} onChange={set("email")} required />
          <InputField label="Password" placeholder="••••••••" type="password"
            value={form.password} onChange={set("password")} required />
          <Button type="submit" loading={loading} style={{ width: "100%", marginTop: "8px" }}>
            Sign In
          </Button>
        </form>
        <p className="auth-footer">No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
