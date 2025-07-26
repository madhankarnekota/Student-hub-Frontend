import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/students', {
        params: { name, skill }
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [name, skill]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students Dashboard</h2>
      <div className="flex gap-4 mb-4">
        <input placeholder="Filter by name" value={name} onChange={e => setName(e.target.value)} className="border p-2" />
        <input placeholder="Filter by skill" value={skill} onChange={e => setSkill(e.target.value)} className="border p-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {students.map(student => (
          <div key={student._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p>Skills: {student.skills?.join(', ')}</p>
            <button onClick={() => navigate(`/profile/${student._id}`)} className="text-blue-600 mt-2">Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;