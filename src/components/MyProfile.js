import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('student'));
    axios.get(`http://localhost:4000/profile/${user._id}`).then(res => setStudent(res.data));
  }, []);

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {student.name}</p>
      <p>Department: {student.department}</p>
      <p>Skills: {student.skills.join(', ')}</p>
      <p>GitHub: <a href={student.github}>{student.github}</a></p>
      <p>LinkedIn: <a href={student.linkedin}>{student.linkedin}</a></p>
    </div>
  );
};

export default MyProfile;
