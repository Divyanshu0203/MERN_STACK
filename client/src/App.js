import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/data', form);
    setForm({ name: '', email: '' });
    fetchData();
  };

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3001/api/data');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Submit Data</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Submit</button>
      </form>

      <h3>Stored Data</h3>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{item.name} - {item.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
