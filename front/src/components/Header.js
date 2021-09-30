import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useContext } from "react";
import SessionContext from "./session/SessionContext";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useEffect } from "react";
export default function ButtonAppBar() {
  const {
    
    actions: {  loggedin },
  } = useContext(SessionContext);

  useEffect(() => {
    // Update the document title using the browser API
  }, []);

  return (
    <>
      {loggedin ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{ backgroundColor: "white  " }} position="fixed">
            <Toolbar>
              <Link to="/">
                <IconButton style={{ outlineStyle: "none" }}>
                  <HomeIcon fontSize="large"  style={{ color: "#1976d2" }} />
                </IconButton>
              </Link>
              

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/newpost">
                <PostAddIcon fontSize="large"  style={{color:"#1976d2"}} />

                </Link>

              </Typography>
              <Link to="profile" sx={{ flexGrow: 1 }}>
                <PersonIcon fontSize="large"  xs style={{ color: "#1976d2" }} />
              
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      ) : null}
    </>
  );
}
