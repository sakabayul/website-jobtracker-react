// src/EditData.js
import React, { useState } from 'react';

const EditData = ({ data, onEditData, setIsEditing, setIsDataList }) => {
  const [name, setName] = useState(data.name);
  const [status, setStatus] = useState(data.status);

  const handleSubmit = (e) => {
    if (name !== data.name) {
      e.preventDefault();
      const updatedData = { ...data, name, status };
      onEditData(updatedData);
      setIsEditing(false);
      setIsDataList(true);
    } else {
      alert("Tidak bisa!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Office Data Edit</h1>
      <input
        type="text"
        placeholder="Edit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Edit acceptance status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      />
      <div className="button-container">
        <button type="submit">Update Data</button>
        <button onClick={() => { setIsEditing(false); setIsDataList(true); }}>Kembali</button>
      </div>
    </form>
  );
};

export default EditData;