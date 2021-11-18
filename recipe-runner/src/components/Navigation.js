import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';

export default function Navigation() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <AppBar position="static" elevation={1}sx={{backgroundColor: "#4673A2"}}>
                <Toolbar>
                    <IconButton
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}><Link href="recipes" underline='none'>Recipes</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link href="ingredients" underline='none'>Ingredients</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link href="users" underline='none'>Users</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link href="shoppingcarts" underline='none'>ShoppingCarts</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link href="selectedrecipes" underline='none'>SelectedRecipes</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link href="recipeingredients" underline='none'>RecipeIngredients</Link></MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/" underline='none' color="inherit">RecipeRunner Admin</Link>
                    </Typography>
                    <Button href="/" color="inherit">Home</Button>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}