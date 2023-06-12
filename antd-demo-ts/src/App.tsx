import React, { useState } from 'react';
import './App.css';
import Display from './Display';
import Form from './Form';
import {Button, List} from 'antd';

const App: React.FC = () => {
  const [displayList, setDisplayList] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  const handleDisplayListClick = () => {
    setDisplayList(true);
    setDisplayForm(false);
  };

  const handleAddNewItemClick = () => {
    setDisplayList(false);
    setDisplayForm(true);
  };

  return (
    <div className='bg-color'>
      <div className='App'>
        <Button onClick={handleDisplayListClick}>Display List</Button>
        <Button onClick={handleAddNewItemClick}>Add New Donation Item</Button>
      </div>
      {displayList && <Display />}
      {displayForm && <Form />}
    </div>
  );
};

export default App;
