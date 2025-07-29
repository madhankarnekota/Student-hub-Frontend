import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = formData;

    if (email === 'admin@gmail.com' && password === 'admin') {
      navigate('/admin');
    } else {
      try {
        const res = await axios.post('http://localhost:4000/login', formData);
        if (res.status === 200) {
          localStorage.setItem('student', JSON.stringify(res.data.student));
          navigate('/dashboard');
        }
      } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
