import React from 'react';
import './App.css';
import AppRouter from "./Routers/AppRouter"

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <AppRouter/>
      </header>
    </div>
  );
}

export default App;
