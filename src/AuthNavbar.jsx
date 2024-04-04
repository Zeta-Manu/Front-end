import React from "react";
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import logo from './assets/logo.svg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from './AuthProvider';

const AuthNavbar = () => {

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="sticky top-0 flex justify-center items-center">
            <div className="w-2/3">
                <React.Fragment>
                    <AppBar sx={{ background: "#C5DFE7", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <Toolbar>
                            <img src={logo} alt="Logo" style={{ width: '45px', height: '45px', marginLeft: '8px' }} />
                            <Link to="/landing"><button className="text-xl text-black font-nunito-sans mx-2 z-20">Manu</button></Link>
                            <LanguageIcon sx={{ marginLeft: 'auto', color: '#808080' }} />
                            <Link to="/"><Typography sx={{ marginLeft: '15px', color: 'black' }}>Home</Typography></Link>
                            <Button onClick={handleLogout} variant="contained" sx={{
                                marginLeft: '15px', backgroundColor: '#BCFDE7', color: 'black', '&:hover': {
                                    color: 'white',
                                },
                            }}>Logout</Button>
                            <AccountCircleIcon sx={{ marginLeft: '15px', color: '#5F81AD' }} />
                            <SettingsIcon sx={{ marginLeft: '15px', color: '#808080' }} />
                        </Toolbar>
                    </AppBar>

                </React.Fragment>
            </div>
        </div>
    );
}

export default AuthNavbar;
