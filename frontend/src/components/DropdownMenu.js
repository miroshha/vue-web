import React from 'react';
import { Menu, MenuItem, Divider, Typography } from '@mui/material';

const DropdownMenu = ({ anchorEl, onOpen, onClose }) => {

    const onLogin = () => {
        window.location.href = '/login';
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
                    <>
                        <MenuItem onClick={onLogin}>Log in</MenuItem>
                        <Divider />
                    </>
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
                    <>
                        <Divider />
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </>
                ) : null
            }
        </Menu>
    );
};

export default DropdownMenu;
