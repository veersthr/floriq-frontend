import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In To Floriq</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={submitHandler} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-primary auth-submit">Sign In</button>
        </form>
        <p className="auth-footer">
          New Customer? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
