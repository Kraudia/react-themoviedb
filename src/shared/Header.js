import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Header = () => (
    <Menu borderless color={'green'} inverted stackable>
      <Menu.Item header ><Link to={'/'}>Allegro</Link></Menu.Item>
    </Menu>
);

export default Header;
