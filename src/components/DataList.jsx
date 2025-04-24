import React, { useState, useEffect } from 'react';
import AddData from './DataCreate';
import EditData from './DataEdit';

const DataList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isDataList, setIsDataList] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('officeData')) || [];
    setData(storedData);
  }, []);

  const handleAddData = (newData) => {
    const updatedData = [...data, newData];
    setData(updatedData);
    localStorage.setItem('officeData', JSON.stringify(updatedData));
  };

  const handleEditData = (updatedData) => {
    const updatedList = data.map(item => (item.id === updatedData.id ? updatedData : item));
    setData(updatedList);
    localStorage.setItem('officeData', JSON.stringify(updatedList));
    setIsEditing(false);
    setEditData(null);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    localStorage.setItem('officeData', JSON.stringify(updatedData));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="office-data-list">
      {isCreating &&
        <AddData onAddData={handleAddData} setIsCreating={setIsCreating} setIsDataList={setIsDataList} />
      }
      {isEditing && editData &&
        <EditData data={editData} onEditData={handleEditData} setIsEditing={setIsEditing} setIsDataList={setIsDataList} />
      }
      {isDataList && (
        <>
          <h1>Office Data List</h1>
          <div className="action-container">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => { setIsCreating(true); setIsDataList(false); }}>Add Data</button>
          </div>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Name</th>
                <th onClick={() => handleSort('status')}>Acceptance Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td className='button-container'>
                    <button onClick={() => { setEditData(item); setIsEditing(true); setIsDataList(false); }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DataList;