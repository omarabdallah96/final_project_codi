import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, { useContext, useState } from "react";
import SessionContext from "../components/session/SessionContext";
import travel from "../assets/travel.png";
import api from "../components/API/API";
import CountrySelect from "../components/country/countrylist";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
  link: {
    color: "#146eb4",
  },
}));

export default function SignIn() {
  const [account, setaccount] = useState(true);
  const [selectdcountry,setCountry]=useState("")
  const toggle = () => {
    if (account) {
      setaccount(false);

      return;
    } else {
      setaccount(true);
    }
  };

  const classes = useStyles();
  const {
    actions: { login, register },
  } = useContext(SessionContext);

  const [state, setValue] = useState({
    email: "",
    password: "",
    regpassword: "",
    regemail: "",
    regusername: "",
    phone: "",

    photo: "",
    reglastname: "",
  });

  const {
    email,
    password,
    regemail,
    regusername,
    regpassword,
    photo,
    regname,
    reglastname,
    regcountry,
    phone,
  } = state;

  function setState(nextState) {
    setValue((prevState) => ({
      ...prevState,
      ...nextState,
    }));
  }

  function handleChange(e) {
    let { name, value } = e.target;
    setState({ [name]: value });
  }

  async function handleLogin(e) {
    e.nativeEvent.preventDefault();
    login(state);
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#photo");
    const formData = new FormData();
    formData.append("name", regname);
    formData.append("lastname", reglastname);
    formData.append("username", regusername);
    formData.append("phone", phone);

    formData.append("email", regemail);
    formData.append("password", regpassword);
    formData.append("status", "active");

    formData.append("photo", fileInput.files[0]);
    formData.append("role", "user");

    formData.append("address", selectdcountry);
    const body = {
      name: regname,
      lastname: reglastname,
      username: regusername,
      phone: phone,
      email: regemail,
      password: regpassword,
      status: regpassword,
      photo: fileInput,
      role: "user",
    };

    await api.post("/uploadimage", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    setaccount(true);
  };

  return (
    <div>
      {account ? (
        <Container className={classes.root} component="main" maxWidth="xs">
          <CssBaseline />

          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
          </Avatar> */}
            <img src={travel} alt="" style={{ maxHeight: 100 }} srcset="" />
            <Typography component="h1" variant="h5">
              Log In To Your Account
            </Typography>
            <form onSubmit={handleLogin} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="off"
                autoFocus
                name="email"
                value={email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                name="password"
                value={password}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid className={classes.link}>
                <Button
                  type="submit"
                  fullWidth
                  onClick={toggle}
                  variant="contained"
                  className={classes.submit}
                >
                  Create new user
                </Button>
              </Grid>
            </form>
          </div>
        </Container>
      ) : (
        <Container className={classes.root} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Account
            </Typography>
            <form onSubmit={handleRegister} enctype="multipart/form-data" className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First Name"
                autoComplete="off"
                autoFocus
                name="regname"
                value={regname}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last Name"
                autoComplete="off"
                autoFocus
                name="reglastname"
                value={reglastname}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="off"
                autoFocus
                name="regemail"
                value={regemail}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                type="text"
                id="regusername"
                autoComplete="off"
                name="regusername"
                value={regusername}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone"
                type="text"
                id="phone"
                autoComplete="off"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                name="regpassword"
                value={regpassword}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="file"
                id="photo"
                autoComplete="off"
                name="photo"
                value={photo}
                onChange={handleChange}
              />
              <CountrySelect
                label="Country"
                selectedcountry={(e)=>setCountry(e.target.value)}
                name="address"
              
              
             />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                register
              </Button>
              <Grid className={classes.link}>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    id="backlogin"
                    variant="contained"
                    className={classes.submit}
                    onClick={toggle}
                  >
                    back to login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </div>
  );
}
