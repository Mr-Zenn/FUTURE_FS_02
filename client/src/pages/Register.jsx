import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-logo">◈</div>
        <h2>Create account</h2>
        <p className="auth-subtitle">Start managing your leads today</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <InputField label="Full Name" placeholder="John Doe"
            value={form.name} onChange={set("name")} required />
          <InputField label="Email" placeholder="you@example.com" type="email"
            value={form.email} onChange={set("email")} required />
          <InputField label="Password" placeholder="••••••••" type="password"
            value={form.password} onChange={set("password")} required />
          <Button type="submit" loading={loading} style={{ width: "100%", marginTop: "8px" }}>
            Create Account
          </Button>
        </form>
        <p className="auth-footer">Have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
