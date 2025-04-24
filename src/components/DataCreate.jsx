// src/AddData.js
import React, { useState } from 'react';

const AddData = ({ onAddData, setIsCreating, setIsDataList }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && status) {
      const newData = { id: Date.now(), name, status };
      onAddData(newData);
      setName('');
      setStatus('');
    }
    setIsCreating(false);
    setIsDataList(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Office Data Create</h1>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter acceptance status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      />
      <div className="button-container">
        <button type="submit">Add Data</button>
        <button onClick={() => { setIsCreating(false); setIsDataList(true); }}>Kembali</button>
      </div>
    </form>
  );
};

export default AddData;