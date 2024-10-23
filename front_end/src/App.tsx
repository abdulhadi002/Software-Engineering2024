import React from 'react';
import './App.css';
import Nav from './/components/Nav';  // Import Nav component
import Footer from './/components/Footer'

function App() {
  return (
    <div className="App">
      <Nav /> {/* Using Nav component */}
      <main className="main">
        <h1>Welcome to the Main Section</h1>
        <p>This is the main content area.</p>
      </main>
      <Footer /> {/* Using Footer component */}
    </div>
  );
}

export default App;