import './App.css';
import { AppHeader } from './cmps/app-header';
import React from 'react';
import { MainContent } from './cmps/main-content';

function App() {

  return (
    <div className="App">
      <AppHeader/>
      <MainContent/>
    </div>
  )
}

export default App;
