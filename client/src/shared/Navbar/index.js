import React from 'react';
import { Menu, Sidebar, Icon, Image, Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleBooksClick = () => {
    navigate('/books/menu');
  };

  const handleAuthorsClick = () => {
    navigate('/authors/list');
  };

  const handleGenresClick = () => {
    navigate('/genres/list');
  };

  const handlePurchaseClick = () => {
    navigate('/purchase/list');
  };

  const handleSalesClick = () => {
    navigate('/sales/list');
  };

  const handleStocksClick = () => {
    navigate('/stock/list');
  };

  const handleSignoutClick = () => {
    navigate('/');
  };

  const dropdownOptions = [
    // { key: 'settings', text: 'Settings', icon: 'settings', onClick: () => console.log('Settings clicked') },
    // { key: 'profile', text: 'Profile', icon: 'user', onClick: () => console.log('Profile clicked') },
    { key: 'sign-out', text: 'Sign out', icon: 'sign out', onClick: handleSignoutClick },
  ];

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
        <Menu.Item as="a" onClick={handlePurchaseClick}>
          <Icon name="plus cart" />
          Purchase
        </Menu.Item>
        <Menu.Item as="a" onClick={handleSalesClick}>
          <Icon name="shopping cart" />
          Sales
        </Menu.Item>
        <Menu.Item as="a" onClick={handleStocksClick}>
          <Icon name="chart line" />
          Stock
        </Menu.Item>
        {/* <Menu.Item as="a" onClick={handleAuthorsClick}>
          <Icon name="user circle" />
          Authors
        </Menu.Item>
        <Menu.Item as="a" onClick={handleGenresClick}>
          <Icon name="book" />
          Genres
        </Menu.Item> */}
        <Menu.Item as="a" onClick={handleSignoutClick}>
        <Icon name="sign-out" />
          Sign-out
        </Menu.Item>
      </div>
      <div className="profile-dropdown"style={{marginTop:380}}>
        <Dropdown
          item
          icon={null}
          trigger={
            <span>
              <Image
                src="https://react.semantic-ui.com/images/avatar/small/zoe.jpg"
                avatar
                spaced="right"
              />
              Admin
            </span>
          }
          options={dropdownOptions}
          direction="left"
        />
      </div>
    </Sidebar>
  );
};

export default Navbar;
