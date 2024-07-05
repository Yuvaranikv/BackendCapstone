// src/components/Navbar.js
import React from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); 
  };
  const handleBooksClick=() =>{
    navigate('/books/list');
  }

  const handleAuthorsClick=() =>{
    navigate('/authors/list');
  }
  const handleGenesClick=() =>{
    navigate('/genres/list');
  }
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
      className="sidebar-menu"
    >
      <div className="menu-content">
        <Menu.Item as="a" onClick={handleHomeClick}>
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={handleBooksClick}>
          <Icon name="book" />
          Books
        </Menu.Item>
        <Menu.Item as="a" onClick={handleAuthorsClick}>
          <Icon name="user circle" />
          Authors
        </Menu.Item>
        <Menu.Item as="a" onClick={handleGenesClick}>
          <Icon name="book" />
          Genres
        </Menu.Item>
       
      </div>
    </Sidebar>
  );
};

export default Navbar;
