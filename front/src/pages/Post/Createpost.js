import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountrySelect from "../../components/country/countrylist";
import moment from "moment";
import api from "../../components/API/API";
import SessionContext from "../../components/session/SessionContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import NoteAltSharpIcon from '@mui/icons-material/NoteAltSharp';
import FlightTakeoffSharpIcon from '@mui/icons-material/FlightTakeoffSharp';
import Loading from "../../components/Loading/Loading";




const theme = createTheme();

export default function Create_Post(props) {

  const {
    session: { user },
  } = useContext(SessionContext);

  const { id} = user;
  const today = moment().format("YYYY.MM.DD");
  const nextweek=moment().add(7, "days").format("YYYY-MM-DD")
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setstate((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };
  let [state, setstate] = useState({
    user_id: "",
    space: "",
    title: "",
    from_country: "",
    to_country: "",
    date_depart: today,
    date_arrive:nextweek ,
    note: "",
  });
  const handleSubmit = async (event)  => {
    event.preventDefault();

    const body = {
      user_id: id,
      space: state.space,
      title: "travle",
      from_country: state.from_country,
      to_country: state.to_country,
      date_depart: state.date_depart,
      date_arrive: state.date_arrive,
      note: state.note,
    };
    console.log(body);

    try {
     await api.post("/blogs", body);
      props.history.push('/profile');

    } catch (error) {

      return toast.error("Please Enter Valid Data");
      
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <NoteAltSharpIcon fontSize="large" style={{marginTop:10}} color="primary" />
          <Typography component="h1" variant="h5">
          <Loading  plane="50"/>

            Create New Post

          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CountrySelect
                  label="From Country"
                  selectedcountry={handleChange}
                  name="from_country"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CountrySelect
                  label="To Country"
                  selectedcountry={handleChange}
                  name="to_country"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="date"
                  label="Date Departure"
                  defaultValue={moment().format("YYYY-MM-DD")}
                  fullWidth
                  id="email"
                  name="date_depart"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="date_arrive"
                  type="date"
                  defaultValue={moment().add(7, "days").format("YYYY-MM-DD")}
                  id="password"
                  label="Date"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  name="space"
                  type="number"
                  defaultValue="1"
                  id="password"
                  label="availble space"
                  autoComplete="off"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 2);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="note"
                  type="text"
                  multiline
                  id="password"
                  label="Note"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              style={{ marginTop: 10 }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >              

              Create Post 
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
