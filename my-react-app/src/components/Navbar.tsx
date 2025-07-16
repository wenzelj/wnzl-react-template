import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Avatar } from '@mui/material';
import { googleLogout } from '@react-oauth/google';

interface NavbarProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  user: any;
  setUser: (user: any) => void;
}

function Navbar({ mode, toggleTheme, user, setUser }: NavbarProps) {
  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        {user && (
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
        )}
        {user ? (
          <>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={user.name} src={user.picture} />
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;


