import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');

  const fetchTeachers = useCallback(async () => {
    const res = await axios.get('http://localhost:4000/api/teachers', {
      params: { name, skill }
    });
    setTeachers(res.data);
  }, [name, skill]); // ✅ include name and skill

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]); // ✅ include the callback safely

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Teachers Directory</h2>
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search by teacher name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Search by skill"
          value={skill}
          onChange={e => setSkill(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="grid gap-4">
        {teachers.map(t => (
          <div key={t._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p><strong>Department:</strong> {t.department}</p>
            <p><strong>Experience:</strong> {t.yearsOfExperience} years</p>
            <p><strong>Skills:</strong> {t.skills.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teachers;
