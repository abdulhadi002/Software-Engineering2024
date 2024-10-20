import * as React from "react";
import "../styles/Registrering.css";
  // Import av CSS

type RegistreringProps = {
  //onRegister: (username: string, password: string) => void;
};

export default function Registrering(props: RegistreringProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //props.onRegister(username, password);
  };

  return (
    <div className="grid-container">
      <header className="header">
        <h1>Registrering</h1>
      </header>

      <main className="main">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="button" type="submit">Register</button>
        </form>
      </main>

      <footer className="footer">
        <p>© 2024 SafePulse</p>
      </footer>
    </div>
  );
}
