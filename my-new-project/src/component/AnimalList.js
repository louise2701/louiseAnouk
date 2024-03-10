import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    species: '',
    size: '',
    weight: '',
    region: '',
    reproduction: '',
    diet: '',
    age: '',
    status: '',
  });
  const [searchCriteria, setSearchCriteria] = useState({
    species: '',
    size: '',
    weight: '',
    region: '',
    reproduction: '',
    diet: '',
    age: '',
    status: '',
  });

  useEffect(() => {
    fetchAnimals();
  }, [searchCriteria]);

  const BASE_URL = 'http://localhost:8080'; // Update this with your backend URL

  const fetchAnimals = async () => {
    try {
      console.log('Search Criteria:', searchCriteria);
      const response = await axios.get(`${BASE_URL}/animals`, { params: searchCriteria });
      console.log('API Response:', response.data);
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching animals:', error.message);
    }
  };
  
  const handleAddAnimal = async () => {
    try {
      await axios.post(`${BASE_URL}/animal/insert`, newAnimal);
      fetchAnimals();
      setNewAnimal({
        species: '',
        size: '',
        weight: '',
        region: '',
        reproduction: '',
        diet: '',
        age: '',
        status: '',
      });
    } catch (error) {
      console.error('Error adding animal:', error.message);
    }
  };
  
  const handleUpdateAnimal = async (id, updatedFields) => {
    try {
      await axios.post(`${BASE_URL}/animal/update/${id}`, updatedFields);
      fetchAnimals();
    } catch (error) {
      console.error('Error updating animal:', error.message);
    }
  };
  
  const handleDeleteAnimal = async id => {
    try {
      await axios.delete(`${BASE_URL}/animal/${id}`);
      fetchAnimals();
    } catch (error) {
      console.error('Error deleting animal:', error.message);
    }
  };
  

 

  return (
    <div>
      <h2>List of Animals</h2>
      <div>
        <label>Search by Species:</label>
        <input
          type="text"
          value={searchCriteria.species}
          onChange={e => setSearchCriteria({ ...searchCriteria, species: e.target.value })}
        />
        <br />
        <label>Search by Size:</label>
        <input
          type="text"
          value={searchCriteria.size}
          onChange={e => setSearchCriteria({ ...searchCriteria, size: e.target.value })}
        />
        <br />
        <label>Search by Weight:</label>
        <input
          type="text"
          value={searchCriteria.weight}
          onChange={e => setSearchCriteria({ ...searchCriteria, weight: e.target.value })}
        />
        <br />
        <label>Search by Region:</label>
        <input
          type="text"
          value={searchCriteria.region}
          onChange={e => setSearchCriteria({ ...searchCriteria, region: e.target.value })}
        />
        <br />
        <label>Search by Reproduction:</label>
        <input
          type="text"
          value={searchCriteria.reproduction}
          onChange={e => setSearchCriteria({ ...searchCriteria, reproduction: e.target.value })}
        />
        <br />
        <label>Search by Diet:</label>
        <input
          type="text"
          value={searchCriteria.diet}
          onChange={e => setSearchCriteria({ ...searchCriteria, diet: e.target.value })}
        />
        <br />
        <label>Search by Age:</label>
        <input
          type="text"
          value={searchCriteria.age}
          onChange={e => setSearchCriteria({ ...searchCriteria, age: e.target.value })}
        />
        <br />
        <label>Search by Status:</label>
        <input
          type="text"
          value={searchCriteria.status}
          onChange={e => setSearchCriteria({ ...searchCriteria, status: e.target.value })}
        />
        <br />
        <button onClick={fetchAnimals}>Search</button>
      </div>
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>
            <span>{animal.species}</span> - <span>{animal.status}</span>
            <button onClick={() => handleUpdateAnimal(animal.id, { status: 'Adopted' })}>
              Adopt
            </button>
            <button onClick={() => handleDeleteAnimal(animal.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add a New Animal</h2>
      <div className="form-container">
        <div>
          <label>Species:</label>
          <input
            type="text"
            value={newAnimal.species}
            onChange={e => setNewAnimal({ ...newAnimal, species: e.target.value })}
          />
        </div>
        <div>
          <label>Size (meters):</label>
          <input
            type="number"
            value={newAnimal.size}
            onChange={e => setNewAnimal({ ...newAnimal, size: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            value={newAnimal.weight}
            onChange={e => setNewAnimal({ ...newAnimal, weight: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            value={newAnimal.region}
            onChange={e => setNewAnimal({ ...newAnimal, region: e.target.value })}
          />
        </div>
        <div>
          <label>Reproduction:</label>
          <input
            type="text"
            value={newAnimal.reproduction}
            onChange={e => setNewAnimal({ ...newAnimal, reproduction: e.target.value })}
          />
        </div>
        <div>
          <label>Diet:</label>
          <input
            type="text"
            value={newAnimal.diet}
            onChange={e => setNewAnimal({ ...newAnimal, diet: e.target.value })}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={newAnimal.age}
            onChange={e => setNewAnimal({ ...newAnimal, age: parseInt(e.target.value) || null })}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={newAnimal.status}
            onChange={e => setNewAnimal({ ...newAnimal, status: e.target.value })}
          />
        </div>

        <button onClick={handleAddAnimal}>Add Animal</button>
      </div>
    </div>
  );
}

export default AnimalList;
