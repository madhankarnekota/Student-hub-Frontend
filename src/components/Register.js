import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', department: '', year: '', skills: '', mobile: '', github: '', linkedin: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const toSend = { ...formData, skills: formData.skills.split(',').map(s => s.trim()) };
      const res = await axios.post('http://localhost:4000/api/register', toSend);
      setSuccess(res.data.message);
      setError('');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-2" />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2" />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="border p-2" />
        <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="border p-2" />
        <input name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="border p-2" />
        <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="border p-2" />
        <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} className="border p-2" />
        <input name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} className="border p-2" />
        <input name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="border p-2" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
