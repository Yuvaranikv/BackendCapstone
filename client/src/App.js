import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoginPage from './pages/login'
import AddNewBook from './pages/books/add-book';
import AddAuthors from './pages/authors/add-author';
import ListAuthors from './pages/authors/list-author';
import Footer from './shared/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Genreslist from './pages/genres/list-genres';

function App() {
  return (
    <>
  <Router>
    <Routes>
    <Route exact path="/" element={<LoginPage/>}/>
    
      {/* <Route path="/books" element={<Book/>}/>
      <Route path="/book/add" element={<AddNewBook/>}/>
      <Route path="/authors" element={<AddAuthors/>}/>
      <Route path="/authors/add" element={<AddAuthors/>}/>
      <Route path="/authors/list" element={<ListAuthors/>}/> */}
       <Route path="/authors/list" element={<ListAuthors/>}/>
       <Route path="/genres/list" element={<Genreslist/>}/>
       <Route path="/Footer" element={<Footer/>}/>
    </Routes>
  </Router>
   <ToastContainer />
   </>
  );
}

export default App;
