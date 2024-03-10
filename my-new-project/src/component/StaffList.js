import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StaffList() {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    diploma: '',
    experience: '',
    number: '',
    age: null,
  });
  const BASE_URL = 'http://localhost:8090';
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    role: '',
    diploma: '',
    experience: '',
    number: '',
    age: null,
  });

  useEffect(() => {
    fetchStaff();
  }, [searchCriteria]);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/personnel`, { params: searchCriteria });
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error.message);
    }
  };

  const handleAddStaff = async () => {
    try {
      await axios.post(`${BASE_URL}/personnel/insert`, newStaff);
      fetchStaff();
      setNewStaff({
        name: '',
        role: '',
        diploma: '',
        experience: '',
        number: '',
        age: null,
      });
    } catch (error) {
      console.error('Error adding staff:', error.message);
    }
  };

  const handleUpdateStaff = async (id, updatedFields) => {
    try {
      const response = await axios.patch(`${BASE_URL}/personnel/update/${id}`, updatedFields);
      if (response.status === 200) {
        fetchStaff();
      } else {
        console.error('Error updating staff:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating staff:', error.message);
    }
  };
  
  const handleDeleteStaff = async id => {
    try {
      const response = await axios.delete(`${BASE_URL}/personnel/${id}`);
      if (response.status === 200) {
        fetchStaff();
      } else {
        console.error('Error deleting staff:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting staff:', error.message);
    }
  };

  return (
    <div>
       <h2>List of Staff Members</h2>
      <div className="search-container">
        <label>Search by Name:</label>
        <input
          type="text"
          value={searchCriteria.name}
          onChange={e => setSearchCriteria({ ...searchCriteria, name: e.target.value })}
        />
        <br />
        <label>Search by Role:</label>
        <input
          type="text"
          value={searchCriteria.role}
          onChange={e => setSearchCriteria({ ...searchCriteria, role: e.target.value })}
        />
        <br />
        <label>Search by Diploma:</label>
        <input
          type="text"
          value={searchCriteria.diploma}
          onChange={e => setSearchCriteria({ ...searchCriteria, diploma: e.target.value })}
        />
        <br />
        <label>Search by Experience:</label>
        <input
          type="text"
          value={searchCriteria.experience}
          onChange={e => setSearchCriteria({ ...searchCriteria, experience: e.target.value })}
        />
        <br />
        <label>Search by Number:</label>
        <input
          type="text"
          value={searchCriteria.number}
          onChange={e => setSearchCriteria({ ...searchCriteria, number: e.target.value })}
        />
        <br />
        <label>Search by Age:</label>
        <input
          type="number"
          value={searchCriteria.age}
          onChange={e => setSearchCriteria({ ...searchCriteria, age: parseInt(e.target.value) || null })}
        />
        <br />
        <button onClick={fetchStaff}>Search</button>
      </div>

      <ul>
        {staff.map(person => (
          <li key={person.id}>
            <span>{person.name}</span> - <span>{person.role}</span>
            <button onClick={() => handleUpdateStaff(person.id, { role: 'Updated Role' })}>
              Update Role
            </button>
            <button onClick={() => handleDeleteStaff(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add a New Staff Member</h2>
      <div className="form-container">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newStaff.name}
            onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={newStaff.role}
            onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
          />
        </div>
        <div>
          <label>Diploma:</label>
          <input
            type="text"
            value={newStaff.diploma}
            onChange={e => setNewStaff({ ...newStaff, diploma: e.target.value })}
          />
        </div>
        <div>
          <label>Experience:</label>
          <input
            type="text"
            value={newStaff.experience}
            onChange={e => setNewStaff({ ...newStaff, experience: e.target.value })}
          />
        </div>
        <div>
          <label>Number:</label>
          <input
            type="text"
            value={newStaff.number}
            onChange={e => setNewStaff({ ...newStaff, number: e.target.value })}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={newStaff.age}
            onChange={e => setNewStaff({ ...newStaff, age: parseInt(e.target.value) || null })}
          />
        </div>

        <button onClick={handleAddStaff}>Add Staff Member</button>
      </div>
    </div>
  );
}

export default StaffList;
