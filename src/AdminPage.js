import { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [language, setLanguage] = useState({
    name: '',
    youtubeLink: '',
    documentLink: '',
    practiceLink: ''
  });

  const [teacher, setTeacher] = useState({
    name: '',
    yearsOfExperience: '',
    department: '',
    skills: ''
  });

  const handleLangSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/languages', language);
      alert('Language added!');
      setLanguage({ name: '', youtubeLink: '', documentLink: '', practiceLink: '' });
    } catch (err) {
      alert('Error adding language');
      console.error(err);
    }
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/teachers', {
        ...teacher,
        skills: teacher.skills.split(',').map(skill => skill.trim())
      });
      alert('Teacher added!');
      setTeacher({ name: '', yearsOfExperience: '', department: '', skills: '' });
    } catch (err) {
      alert('Error adding teacher');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <h3 className="text-xl font-semibold mb-2">Add Language</h3>
      <form onSubmit={handleLangSubmit} className="grid gap-2 max-w-md mb-6">
        <input
          placeholder="Language Name"
          value={language.name}
          onChange={e => setLanguage({ ...language, name: e.target.value })}
          required
          className="border p-2"
        />
        <input
          placeholder="YouTube Link"
          value={language.youtubeLink}
          onChange={e => setLanguage({ ...language, youtubeLink: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Document Link"
          value={language.documentLink}
          onChange={e => setLanguage({ ...language, documentLink: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Practice Link"
          value={language.practiceLink}
          onChange={e => setLanguage({ ...language, practiceLink: e.target.value })}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Add Language
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Add Teacher</h3>
      <form onSubmit={handleTeacherSubmit} className="grid gap-2 max-w-md">
        <input
          placeholder="Name"
          value={teacher.name}
          onChange={e => setTeacher({ ...teacher, name: e.target.value })}
          required
          className="border p-2"
        />
        <input
          placeholder="Years of Experience"
          value={teacher.yearsOfExperience}
          onChange={e => setTeacher({ ...teacher, yearsOfExperience: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Department"
          value={teacher.department}
          onChange={e => setTeacher({ ...teacher, department: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Skills (comma-separated)"
          value={teacher.skills}
          onChange={e => setTeacher({ ...teacher, skills: e.target.value })}
          className="border p-2"
        />
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
          Add Teacher
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
