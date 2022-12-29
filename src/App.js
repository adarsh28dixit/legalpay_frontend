import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './components/Signin';
import Register from './components/Register';
import { BankingProvider } from './Context/CreateContext';
import Main from './components/Main';


function App() {
  return (
    <BrowserRouter>
    <BankingProvider>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/signin' element={ <Signin />} />
        <Route path='/register' element={ <Register />} />
        <Route path='/main' element={ <Main />} />
      </Routes>
     
    </div>
    </BankingProvider>
    </BrowserRouter>
  );
}

export default App;
