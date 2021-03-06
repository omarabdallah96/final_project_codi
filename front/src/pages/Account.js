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
import { Box } from "@mui/system";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url(https://static.remove.bg/remove-bg-web/8fb1a6ef22fefc0b0866661b4c9b922515be4ae9/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png})`,
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
  const [selectdcountry, setCountry] = useState("");
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
    actions: { login },
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
    const email = regemail;
    const password = regpassword;
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

    console.log(formData);
    try {
      await api.post("/uploadimage", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`Welcome ${regname}`);
      await login({ email, password });
    } catch (error) {
      toast.error("Please Your Inputs");
    }
  };

  return (
    <div   
    >
      {account ? (
        <Container
        
          className={classes.root}
          component="main"
          maxWidth="xs"
        >
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
            <Avatar className={classes.avatar}></Avatar>

            <Typography component="h1" variant="h5">
              Create New Account
            </Typography>
            <form
              onSubmit={handleRegister}
              enctype="multipart/form-data"
              className={classes.form}
            >
              <Box style={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  label="First Name"
                  autoComplete="off"
                  autoFocus
                  name="regname"
                  value={regname}
                  onChange={handleChange}
                />
                &nbsp;
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  label="Last Name"
                  autoComplete="off"
                  name="reglastname"
                  value={reglastname}
                  onChange={handleChange}
                />
              </Box>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="off"
                name="regemail"
                value={regemail}
                onChange={handleChange}
              />
              <Box style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  label="Username"
                  type="text"
                  id="regusername"
                  autoComplete="off"
                  name="regusername"
                  value={regusername}
                  onChange={handleChange}
                />
                &nbsp;
                <label
                  for="photo"
                  style={{
                    border: "1px solid #ccc",
                    display: "inline-block",
                    padding: "6px 12px",
                    cursor: "pointer",
                    height: "55px",
                    marginTop: "15px",
                    width: "50%",
                  }}
                  class="custom-file-upload"
                >
                  <AddPhotoAlternateOutlinedIcon fontSize="large" />
                </label>
              </Box>

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

              <input
                variant="outlined"
                margin="normal"
                required
                fullWidth
                hidden
                type="file"
                id="photo"
                autoComplete="off"
                name="photo"
                value={photo}
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg"
              />
              <CountrySelect
                label="Country"
                selectedcountry={(e) => setCountry(e.target.value)}
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
      <Typography>
        
        <Link to="/about">About US</Link> &nbsp;
        <Link to="/contact">Contact US</Link>

      
      
      </Typography>
    </div>
  );
}
