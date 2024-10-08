import React from 'react';
import "../styles/Header.css"

export default function Header() {
  return (
    <header className="header">
      <h1>SafePulse</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
