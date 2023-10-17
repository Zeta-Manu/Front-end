import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {

    return(
        <div className="fixed w-screen h-screen flex justify-center items-center">
            <div className="w-2/3">
                <React.Fragment> 
                    <AppBar sx={{ background: "#063970" ,borderRadius: '15px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'}} className="my-2 ml-10 mr-2">
                        <Toolbar>
                            <Typography className="text-white">Manu</Typography>
                            <LanguageIcon sx={{ marginLeft: 'auto'}} />
                            <Button variant="contained" sx={{ marginLeft: '10px'}}>Login</Button>
                            <SettingsIcon sx={{ marginLeft: '10px'}} />
                        </Toolbar>
                    </AppBar>

                </React.Fragment>
            </div>
        </div>
    );
}

export default Navbar;