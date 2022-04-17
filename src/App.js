import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainNav from './components/MainNav';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';
import Trending from './Pages/Trending/Trending';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path='/' element={<Trending />} />
            <Route path='movies' element={<Movies />} />
            <Route path='series' element={<Series />} />
            <Route path='search' element={<Search />} />
          </Routes>
        </Container>
      </div>
      <MainNav />
    </BrowserRouter>
  );
}

export default App;
