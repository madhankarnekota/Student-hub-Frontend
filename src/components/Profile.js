import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/students/${id}`)
      .then(res => setStudent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!student) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{student.name}'s Profile</h2>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Mobile:</strong> {student.mobile}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Year:</strong> {student.year}</p>
      <p><strong>Skills:</strong> {student.skills?.join(', ')}</p>
      <p><strong>GitHub:</strong> <a href={student.github} target="_blank" rel="noreferrer" className="text-blue-600">{student.github}</a></p>
      <p><strong>LinkedIn:</strong> <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-blue-600">{student.linkedin}</a></p>
    </div>
  );
}

export default Profile;