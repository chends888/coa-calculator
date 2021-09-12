import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import IconButton from '@material-ui/core/IconButton';
// import Brightness4Icon from '@material-ui/icons/Brightness4';
// import Brightness7Icon from '@material-ui/icons/Brightness7';

const Header = ( {title, currentTheme, updateTheme} ) => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          {title}
          {/* <IconButton
            sx={{ ml: 1 }}
            onClick={updateTheme}
            color="inherit"
          >
            {currentTheme === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton> */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
