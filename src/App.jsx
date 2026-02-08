import React, { useState } from 'react';
import HindiBengaliFlashcards from './HindiBengaliFlashcards.jsx';
import BengaliAlphabet from './BengaliAlphabet.jsx';
import './Navigation.css';

function App() {
  const [currentApp, setCurrentApp] = useState('menu');

  if (currentApp === 'hindi-bengali') {
    return (
      <div>
        <button className="back-button" onClick={() => setCurrentApp('menu')}>
          ← Back to Menu
        </button>
        <HindiBengaliFlashcards />
      </div>
    );
  }

  if (currentApp === 'bengali-alphabet') {
    return (
      <div>
        <button className="back-button" onClick={() => setCurrentApp('menu')}>
          ← Back to Menu
        </button>
        <BengaliAlphabet />
      </div>
    );
  }

  return (
    <div className="menu-container">
      <div className="menu-content">
        <h1 className="menu-title">Language Learning Flashcards</h1>
        <p className="menu-subtitle">Choose a flashcard set to practice</p>
        
        <div className="menu-cards">
          <div className="menu-card" onClick={() => setCurrentApp('hindi-bengali')}>
            <div className="menu-card-icon">🗣️</div>
            <h2>Hindi-Bengali Sentences</h2>
            <p>Practice natural conversations with English, Hindi, and Bengali translations</p>
            <div className="menu-card-stats">43 sentences</div>
          </div>

          <div className="menu-card" onClick={() => setCurrentApp('bengali-alphabet')}>
            <div className="menu-card-icon">অ</div>
            <h2>Bengali Alphabet</h2>
            <p>Learn the Bengali script with pronunciation guides and example words</p>
            <div className="menu-card-stats">50 letters & symbols</div>
          </div>
        </div>

        <footer className="menu-footer">
          <p>Click on any card to start learning</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
