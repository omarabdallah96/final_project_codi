import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import SessionContext from "../../components/session/SessionContext";
import { TextField, InputLabel } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../components/API/API";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const {
    session: { user },
    actions: { logout },
  } = useContext(SessionContext);

  const {id, email, name, lastname, avatar, address, photo, phone } = user;
  const [mypost,setmypost]=useState([])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const About = () => {
    return (
      <div>
        <TextField
          id="outlined-basic"
          value={email}
          label="email"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={phone}
          label="phone"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={address}
          label="adress"
          variant="outlined"
        />
      </div>
    );
  };
  const getpost =async()=>{
   const {data}= await api.get(`/userpost/1`)
   setmypost(data)
   console.log(mypost);
  }

  useEffect(async () => {
    await getpost();
  }, [user]);

  const Post = () => {
    return (
      <div>
        {mypost ?<div> 
          
          {mypost.map((post) => (
             <Card sx={{ maxWidth: 345 }}>
             <CardHeader
               avatar={
                 <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                   R
                 </Avatar>
               }
               action={
                 <IconButton aria-label="settings">
                   <MoreVertIcon />
                 </IconButton>
               }
               title={post,id}
               subheader={post.date_depart}
             />
           
             <CardContent>
               <Typography variant="body2" color="text.secondary">
                 This impressive paella is a perfect party dish and a fun meal to
                 cook together with your guests. Add 1 cup of frozen peas along
                 with the mussels, if you like.
               </Typography>
             </CardContent>
             
           </Card>


      ))}
         
        </div>
        :null}
        
      </div>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <center>
        <br />
        <br />
        <br />
        <div class="profile-img">
          <img
            style={{
              maxWidth: 200,
              maxHeight: 200,
              borderRadius: "50%",
              borderBlockColor: "red",
            }}
            src="https://static.remove.bg/remove-bg-web/ad5bb40e8ada6fca658b7a6da9ae4eb718ac2aba/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
            alt=""
          />
          <div class="col-md-2">
            <br />
            <span style={{ color: "blue" }}>
              {name}&nbsp;{lastname}
            </span>
          </div>
        </div>
      </center>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Post" {...a11yProps(0)} />
          <Tab label="About" {...a11yProps(1)} />
          <Tab label="Request" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Post />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About />
      </TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </Box>
  );
}
