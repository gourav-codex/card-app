import React, { useState } from 'react';
import './App.css';

const App = () => {
  const data = [
    {
      name: 'Harry Potter',
      budget_name: 'Software subscription',
      owner_id: 1,
      spent: {
        value: 200,
        currency: 'SGD',
      },
      available_to_spend: {
        value: 2000,
        currency: 'SGD',
      },
      card_type: 'burner',
      expiry: '20 Feb',
      limit: 200,
      status: 'active',
    },
    {
      name: 'Peter Parker',
      budget_name: 'Software subscription',
      owner_id: 2,
      spent: {
        value: 100,
        currency: 'SGD',
      },
      available_to_spend: {
        value: 300,
        currency: 'SGD',
      },
      card_type: 'subscription',
      limit: 20,
      status: 'active',
    },
    {
      name: 'Percy Jackson',
      budget_name: 'Software subscription',
      owner_id: 3,
      spent: {
        value: 150,
        currency: 'SGD',
      },
      available_to_spend: {
        value: 350,
        currency: 'SGD',
      },
      card_type: 'subscription',
      limit: 60,
      status: 'blocked',
    },
  ];

  const [activeTab, setActiveTab] = useState('your');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getVisibleCards = () => {
    let visibleCards = [];
    if (activeTab === 'your') {
      visibleCards = data.filter((card) => card.owner_id === 1);
    } else if (activeTab === 'all') {
      visibleCards = data.filter((card) => card.status !== 'blocked');
    } else if (activeTab === 'blocked') {
      visibleCards = data.filter((card) => card.status === 'blocked');
    }

    if (searchTerm.trim() !== '') {
      const searchResults = visibleCards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return searchResults;
    }

    return visibleCards;
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Card Filter Page</h1>
        </div>
      
  </nav>
      <div className="tabs">
        <button
          className={activeTab === 'your' ? 'active' : ''}
          onClick={() => handleTabChange('your')}
        >
          Your Cards
        </button>
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => handleTabChange('all')}
        >
          All Cards
        </button>
        <button
          className={activeTab === 'blocked' ? 'active' : ''}
          onClick={() => handleTabChange('blocked')}
        >
          Blocked Cards
        </button>
      </div>
      <input type="text" className="search-bar" placeholder="Search by card name" value={searchTerm} onChange={handleSearch} />
      <div className="card-list">
        {getVisibleCards().map((card) => (
          <div className="card" key={card.name}>
            <div className="card-type">
              {card.card_type === 'burner' && (
                <div className='type-1'>{card.card_type}</div>
              )}
              {card.card_type === 'subscription' && (
                <div className='type-2'>{card.card_type}</div>
              )}
            </div>
            <h3 style={{ fontWeight: 800 }}>{card.name}</h3>
            <p>Budget Name: {card.budget_name}</p>
            <p>Owner ID: {card.owner_id}</p>

            <div className="progress-bar">
    <div
      className="progress-bar-inner"
      style={{ width: `${(card.spent.value / card.available_to_spend.value) * 100}%` }}
    ></div>
  </div>
            <p>Spent: {card.spent.value} {card.spent.currency}</p>
            <p>Available to Spend: {card.available_to_spend.value} {card.available_to_spend.currency}</p>
            {card.card_type === 'burner' && (
              <p>Expiry: {card.expiry}</p>
            )}
            {card.card_type === 'subscription' && (
              <p>Limit: {card.limit}</p>
            )}
            <p>Status: {card.status}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
