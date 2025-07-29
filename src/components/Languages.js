import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function Languages() {
  const [languages, setLanguages] = useState([]);
  const [search, setSearch] = useState('');

  // useCallback prevents fetchLanguages from being recreated on every render
  const fetchLanguages = useCallback(async () => {
    const res = await axios.get('http://localhost:4000/api/languages', {
      params: { name: search }
    });
    setLanguages(res.data);
  }, [search]); // ✅ Include `search` as a dependency here

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]); // ✅ Now include fetchLanguages safely

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Languages to Learn</h2>
      <input
        placeholder="Search by language name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 mb-4"
      />
      <div className="grid gap-4">
        {languages.map(lang => (
          <div key={lang._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{lang.name}</h3>
            <p><a href={lang.youtubeLink} target="_blank" rel="noreferrer" className="text-blue-600">YouTube</a></p>
            <p><a href={lang.documentLink} target="_blank" rel="noreferrer" className="text-blue-600">Document</a></p>
            <p><a href={lang.practiceLink} target="_blank" rel="noreferrer" className="text-blue-600">Practice</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Languages;
