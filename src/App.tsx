import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import Converter from './components/Converter';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Converter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;