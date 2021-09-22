import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import SessionContext from "../../components/session/SessionContext";
import { TextField } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import api from "../../components/API/API";
import { Button } from "@material-ui/core";
import Storage from "../../components/API/Storage";
import { Paper } from "@mui/material";
import { toast } from "react-toastify";

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
  const altimage = Storage + "avatar.png";

  const [value, setValue] = React.useState(0);
  const {
    session: { user },
    actions: { logout },
  } = useContext(SessionContext);
  const deleteOrder= async(orderid)=>{
    

      try {
        await  api.delete(`deleteOrder/${orderid}`)


        
      } catch (error) {

        return toast.error("error");

        
      

    }


  }

  const { id, email, name, lastname, address, photo, phone } = user;
  const [mypost, setmypost] = useState([]);
  const [order, setmyorder] = useState([]);

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
          label="address"
          variant="outlined"
        />
      </div>
    );
  };
  const Myorder = () => {
    if (!order) {
      return console.log("oo");
    }
    return (
      <div>
        {order ? (
          <div className="parent-container">
            {order.map((myorder) => (
              <Paper style={{ marginLeft: 10 }} square={true} elevation={3}>
                <center>
                  <tr>
                 {myorder.id} 
                  </tr>
                  <tr>
                    <TextField label="Order Status" value={myorder.order_status} />
                  </tr>
                  <tr>
                    <TextField maxWidth label="Order Date" type="date" value={myorder.date_order} />
                  </tr>
                  <tr>
                    <TextField   label="" value={myorder.space} />
                  </tr>
                  <tr>
                    <TextField  value={myorder.description} />
                  </tr>
                  <br />
                  <tr>
                    <Button onClick={deleteOrder(myorder.id)} variant="contained" color="Secondary">
                      Cancel
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </tr>
                  <br />
                </center>
              </Paper>
            ))}
          </div>
        ) : (
          <div>no</div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const getpost = async () => {
      const { data } = await api.get(`/userpost/${id}`);
      setmypost(data);
    };
    const getorder = async () => {
      const { data } = await api.get(`/myorder/${id}`);
      setmyorder(data);
    };
    getpost();
    getorder();
    console.log(altimage);
  }, [id]);

  const Post = () => {
    if (!mypost) {
      return console.log("oo");
    }
    return (
      <div>
        {mypost ? (
          <div className="parent-container">
            {mypost.map((post) => (
              <Card
                style={{ marginBottom: 10, marginLeft: 10 }}
                sx={{ maxWidth: 345 }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={Storage + "avatar.png"}
                      src={Storage + photo}
                      aria-label="recipe"
                    ></Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.name}
                  subheader={post.date_depart}
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <td> {post.date_arrive}</td>
                    <br />
                    <td>{post.to_country} </td>&nbsp;
                    <td>{post.from_country} </td>
                    <br />
                    <td>{post.space}</td>
                    {post.note}
                    <td style={{ display: "grid" }}>
                      <br />
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                    </td>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>no</div>
        )}
      </div>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <center>
        <br />
        <br />
        <br />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
          }}
          class="profile-img"
        >
          {photo ? (
            <img
              style={{
                maxWidth: 100,
                maxHeight: 100,
                borderRadius: "50%",
                borderBlockColor: "red",
              }}
              src={Storage + photo}
            />
          ) : (
            <img
              style={{
                maxWidth: 100,
                maxHeight: 100,
                borderRadius: "50%",
                borderBlockColor: "red",
              }}
              src={altimage}
            />
          )}

          <br />
          <Button onClick={logout} variant="contained" color="primary">
            logout
          </Button>
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
          <Tab style={{ outlineWidth: 0 }} label="Post" {...a11yProps(0)} />
          <Tab style={{ outlineWidth: 0 }} label="About" {...a11yProps(1)} />
          <Tab style={{ outlineWidth: 0 }} label="Request" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Post />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About />
      </TabPanel>
      <TabPanel value={value} index={2}>
        
        <Myorder />
      </TabPanel>
    </Box>
  );
}
