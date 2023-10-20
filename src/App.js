import { useState } from 'react';
import './App.css';
import mainMint from './mainMint'
import Navbar from './Navbar'

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className='App'>
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <mainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
