import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainNav from './components/MainNav';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
      </div>
      <MainNav />
    </BrowserRouter>
  );
}

export default App;
