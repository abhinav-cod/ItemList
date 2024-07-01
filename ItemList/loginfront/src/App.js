import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ApiProvider } from './ApiContext';
import Login from './Login';
//import Logout from './Logout'
//import Home from './Home';
//import ItemList from './ItemList';
//import ItemEditor from './ItemEditor';
import './App.css'

function App() {
  const isAuthenticated = !!localStorage.getItem('access');

  return (
    <ApiProvider>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
//          <Route path="/logout" element={isAuthenticated ? <Logout /> :  <Navigate to="/login" />} />
//          <Route path="/items" element={isAuthenticated ? <ItemList /> : <Navigate to="/login" />} />
//          <Route path="/edit/:id" element={isAuthenticated ? <ItemEditor /> : <Navigate to="/login" />} />
//          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;