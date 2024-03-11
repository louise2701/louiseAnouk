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
  const [selectedAnimal, setSelectedAnimal] = useState(null);

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
  
 
  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
    // Set the fields in the form with the selected animal's information
    setNewAnimal({
      species: animal.species,
      size: animal.size,
      weight: animal.weight,
      region: animal.region,
      reproduction: animal.reproduction,
      diet: animal.diet,
      age: animal.age,
      status: animal.status,
    });
  };
  
  const handleDeleteAnimal = async id => {
    try {
      await axios.delete(`${BASE_URL}/animal/${id}`);
      fetchAnimals();
    } catch (error) {
      console.error('Error deleting animal:', error.message);
    }
  };
  
  const handleUpdateAnimal = async () => {
    try {
      if (!selectedAnimal) {
        return;
      }
  
      await axios.post(`${BASE_URL}/animal/update/${selectedAnimal.id}`, newAnimal);
      fetchAnimals();
  
      // Reset the form and selected animal
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
      setSelectedAnimal(null);
    } catch (error) {
      console.error('Error updating animal:', error.message);
    }
  };
  
 

  return (
    <div>
      <h2>List of Animals</h2>
      <div>
       
      
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
      
        <button onClick={fetchAnimals}>Search</button>
      </div>
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>
            <span>{animal.species}</span> - <span>{animal.status}</span>
           
            <button onClick={() => handleDeleteAnimal(animal.id)}>Delete</button>
            <button onClick={() => handleSelectAnimal(animal)}>Update</button>
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

        <button onClick={selectedAnimal ? handleUpdateAnimal : handleAddAnimal}>
  {selectedAnimal ? "Update Animal" : "Add Animal"}
</button>

      </div>
    </div>
  );
}

export default AnimalList;
