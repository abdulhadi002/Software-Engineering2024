// src/components/Layout.tsx
import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout">
            <Nav />
            <main className="main">
                {children} {/* This is where other page content will be rendered */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
