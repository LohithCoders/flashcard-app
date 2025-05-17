import React, { useState } from 'react';
import './App.css';

const initialFlashcards = [
  {
    id: 1,
    question: 'What is the capital of France?',
    answer: 'Paris',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg'
  },
  {
    id: 2,
    question: 'Who wrote "Romeo and Juliet"?',
    answer: 'William Shakespeare',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg'
  }
];

function App() {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const goToNextCard = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handleKnow = () => {
    goToNextCard();
  };

  const handleDontKnow = () => {
    goToNextCard();
  };

  const handleAddFlashcard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newCard = {
        id: Date.now(),
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
        image: newImage.trim() || ''
      };
      setFlashcards([...flashcards, newCard]);
      setNewQuestion('');
      setNewAnswer('');
      setNewImage('');
      setCurrentIndex(flashcards.length); // Show newly added card
      setFlipped(false);
    }
  };

  const handleDeleteFlashcard = (id) => {
    const updated = flashcards.filter(card => card.id !== id);
    setFlashcards(updated);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="app">
      <h1 className="app-title">Flashcard Viewer</h1>

      {currentCard ? (
        <div
          className={`flashcard ${flipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
        >
          {!flipped ? (
            <>
              <h2 className="question">{currentCard.question}</h2>
              {currentCard.image && (
                <img
                  className="flashcard-image"
                  src={currentCard.image}
                  alt="Flashcard visual"
                />
              )}
            </>
          ) : (
            <h2 className="answer">{currentCard.answer}</h2>
          )}
        </div>
      ) : (
        <p className="no-flashcards">No flashcards available.</p>
      )}

      <div className="buttons">
        <button className="btn" onClick={handleKnow}>
          Know
        </button>
        <button className="btn" onClick={handleDontKnow}>
          Don't Know
        </button>
        {currentCard && (
          <button
            className="btn btn-delete"
            onClick={() => handleDeleteFlashcard(currentCard.id)}
          >
            Delete
          </button>
        )}
      </div>

      <div className="add-flashcard">
        <h2>Add New Flashcard</h2>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <button className="btn add-btn" onClick={handleAddFlashcard}>
          Add Flashcard
        </button>
      </div>
    </div>
  );
}

export default App;
