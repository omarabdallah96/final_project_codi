import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import CountrySelect from "./country/countrylist";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useContext } from "react";
import SessionContext from "./session/SessionContext";
import { useEffect } from "react";
export default function ButtonAppBar() {
  const {
    session: { user },
    actions: { logout, loggedin },
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
                  <HomeIcon style={{ color: "#1976d2" }} />
                </IconButton>
              </Link>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <SearchRoundedIcon color="primary" />
              </Typography>
              <Link to="profile" sx={{ flexGrow: 1 }}>
                <PersonIcon  xs style={{ color: "#1976d2" }} />
                <button onClick={logout}>Logout</button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      ) : null}
    </>
  );
}
