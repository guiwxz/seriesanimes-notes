import React from 'react';
import { Provider } from 'react-redux';

import './styles.css'

import SideBar from './components/SideBar';
import List from './components/List';

import store from './store';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
          <SideBar />
          <List />
      </div>
    </Provider>
    
  );
}

export default App;
