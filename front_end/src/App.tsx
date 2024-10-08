import './App.css';  // Import av hoved-CSS for applikasjonen
import Registrering from './components/Registrering';  // Import av Registrering-komponenten
import Header from './components/Header';  // Import av Header-komponenten

function App() {
  return (
    <div>   
      <header>
        <Header />
      </header>
      <main>
        <Registrering />  {/* Dynamisk innhold, kan byttes ut med andre sider */}
      </main>
    </div>
  );
}

export default App;
