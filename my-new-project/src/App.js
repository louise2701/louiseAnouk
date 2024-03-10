import React, { useState } from 'react';
import './App.css';
import AnimalList from './component/AnimalList';
import StaffList from './component/StaffList';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'animals':
        return (
          <div>
            <button onClick={() => navigateTo('home')}>Go to Home</button>
            <AnimalList />
          </div>
        );
      case 'staff':
        return (
          <div>
            <button onClick={() => navigateTo('home')}>Go to Home</button>
            <StaffList />
          </div>
        );
      default:
        return (
          <div>
            <header>
              <h1>Your Wildlife Conservation Haven</h1>
              <p>Providing a refuge for endangered animals and dedicated staff members.</p>
            </header>
            <div className="container">
              <section className="animal-list">
                <h2>Endangered Species Showcase</h2>
                <p>Explore the diverse and incredible animals under our care.</p>
                <button onClick={() => navigateTo('animals')}>Go to Animals</button>
              </section>
              <section className="staff-list">
                <h2>Dedicated Team</h2>
                <p>Meet the passionate individuals working tirelessly to protect and care for our animals.</p>
                <button onClick={() => navigateTo('staff')}>Go to Staff</button>
              </section>
            </div>
          </div>
        );
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
