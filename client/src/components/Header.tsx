import { AppBar, Toolbar } from '@mui/material';
import Logo from './share/Logo';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavigationLink from './share/NavigationLink';

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <AppBar
      sx={{ bgcolor: 'transparent', position: 'static', boxShadow: 'none' }}
    >
      <Toolbar sx={{ display: 'flex' }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#06908e"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                bg="#3f4179"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#06908e"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#3f4179"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
