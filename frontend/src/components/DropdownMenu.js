import React from 'react';
import {Menu, MenuItem, Divider, Typography, Box} from '@mui/material';

const DropdownMenu = ({ anchorEl, onOpen, onClose }) => {

    const onLogin = () => {
        window.location.href = '/login';
    }

    const onRegister = () => {
        window.location.href = '/register';
    }

    const onLogout = () => {
        window.location.href = '/logout';
    }

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            PaperProps={{
                className: 'dropdown-menu'
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            disableScrollLock={true}
        >
            {
                !localStorage.getItem('token') ? (
                    <Box>
                        <MenuItem onClick={onLogin}>Log in</MenuItem>
                        <MenuItem onClick={onRegister}>Register</MenuItem>
                        <Divider />
                    </Box>
                ) : null
            }
            <Typography className={'dropdown-header'}>
                Other
            </Typography>
            <MenuItem onClick={onClose}>For businesses</MenuItem>
            <MenuItem onClick={onClose}>Download the app</MenuItem>
            <MenuItem onClick={onClose}>Customer support</MenuItem>
            {
                localStorage.getItem('token') ? (
                    <Box>
                        <Divider />
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </Box>
                ) : null
            }
        </Menu>
    );
};

export default DropdownMenu;
