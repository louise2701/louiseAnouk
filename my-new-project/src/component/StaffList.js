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
    age: '',
  });
  const BASE_URL = 'http://localhost:8090';
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    role: '',
    diploma: '',
    experience: '',
    number: '',
    age: '',
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
  const [selectedStaff, setSelectedStaff] = useState(null);

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
        age: '',
      });
    } catch (error) {
      console.error('Error adding staff:', error.message);
    }
  };
  const handleSelectStaff = (person) => {
    setSelectedStaff(person);
    // Set the fields in the form with the selected staff member's information
    setNewStaff({
      name: person.name,
      role: person.role,
      diploma: person.diploma,
      experience: person.experience,
      number: person.number,
      age: person.age,
    });
  };
  
  
  const handleUpdateStaff = async () => {
    try {
      if (!selectedStaff) {
        return;
      }
  
      await axios.patch(`${BASE_URL}/personnel/update/${selectedStaff.id}`, newStaff);
      fetchStaff();
  
      // Reset the form and selected staff member
      setNewStaff({
        name: '',
        role: '',
        diploma: '',
        experience: '',
        number: '',
        age: '',
      });
      setSelectedStaff(null);
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
     
        <label>Search by Role:</label>
        <input
          type="text"
          value={searchCriteria.role}
          onChange={e => setSearchCriteria({ ...searchCriteria, role: e.target.value })}
        />
     <br />
        <label>Search by Experience:</label>
        <input
          type="text"
          value={searchCriteria.experience}
          onChange={e => setSearchCriteria({ ...searchCriteria, experience: e.target.value })}
        />
       
        <button onClick={fetchStaff}>Search</button>
      </div>

      <ul>
        {staff.map(person => (
          <li key={person.id}>
            <span>{person.name}</span> - <span>{person.role}</span>
            
            <button onClick={() => handleDeleteStaff(person.id)}>Delete</button>
            <button onClick={() => handleSelectStaff(person)}>Update</button>
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

        <button onClick={selectedStaff ? handleUpdateStaff : handleAddStaff}>
  {selectedStaff ? "Update Staff Member" : "Add Staff Member"}
</button>
      </div>
    </div>
  );
}

export default StaffList;
