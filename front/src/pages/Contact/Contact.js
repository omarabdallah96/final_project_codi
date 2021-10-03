import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

const initialFValues = {
  // firstName: '',
  // lastName: '',
  // email: '',
  // mobileNumber: '',
  // address: '',
  question: "",
};

export default function Request() {
  const classes = useStyles();
  const [values, setValues] = useState(initialFValues);
  const [openAlert, setOpenAlert] = useState(false);
  const { id: donationId } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  //Get All requests
  const [request, setRequest] = useState([]);

  useEffect(() => {}, []);

  //Post a request

  return (
    <>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{ backgroundColor: "white  " }} position="fixed">
            <Toolbar>
              <Link to="/">
                <IconButton style={{ outlineStyle: "none" }}>
                  <HomeIcon fontSize="large" style={{ color: "#1976d2" }} />
                </IconButton>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </>
      <Container className={classes.container}>
          <br />
        <form className={classes.form}>
          <Typography variant="h5"> Contact Us </Typography>
          <div className={classes.item}>
            <TextField
              id="standard-basic"
              label="First Name"
              size="small"
              style={{ width: "100%" }}
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.item}>
            <TextField
              id="standard-basic"
              label="Last Name"
              size="small"
              style={{ width: "100%" }}
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.item}>
            <TextField
              id="standard-basic"
              label="Email"
              size="small"
              style={{ width: "100%" }}
              name="email"
              autoComplete="off"
              value={values.email}
              onChange={handleInputChange}
            />
          </div>
       
        
          <div className={classes.item}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
              label="Write Your Message"
              size="small"
              style={{ width: "100%" }}
              name="question"
              value={values.question}
              onChange={handleInputChange}
            />
          </div>

          <div className={classes.item}>
           
            <Button
              variant="outlined"
              style={{ color: "white" ,background:"rgb(25, 118, 210) "}}
            >
              Cancel
            </Button>
            &nbsp;
            <Button
              type="submit"
              variant="outlined"
              style={{ color: "white" ,background:"rgb(25, 118, 210) "}}
            >
              Send
            </Button>
          </div>
        </form>
      </Container>

      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      ></Snackbar>
    </>
  );
}
