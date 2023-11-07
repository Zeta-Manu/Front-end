import React from "react";
import { AppBar, Toolbar, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <div className="fixed w-screen h-screen flex justify-center items-center">
            <div className="w-2/3">
                <React.Fragment>
                    <AppBar sx={{ background: "#063970", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <Toolbar>
                            <button className="text-xl text-white font-nunito-sans mx-2 z-20">Manu</button>
                            <LanguageIcon sx={{ marginLeft: 'auto' }} />
                            <Link to="/"><Button variant="contained" sx={{ marginLeft: '10px' }}>Login</Button></Link>
                            <SettingsIcon sx={{ marginLeft: '10px' }} />
                        </Toolbar>
                    </AppBar>

                </React.Fragment>
            </div>
        </div>
    );
}

export default Navbar;