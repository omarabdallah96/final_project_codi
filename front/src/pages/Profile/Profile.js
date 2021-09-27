import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import SessionContext from "../../components/session/SessionContext";
import { FormLabel, TextField } from "@material-ui/core";
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
import { style } from "@mui/system";
import { countries } from "country-data";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

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
  const deleteOrder = async (orderid) => {
    try {
      await api.delete(`deleteOrder/${orderid}`);
      let filter = [...order].filter((order) => order.order_id !== orderid);
      setmyorder(filter);
    } catch (error) {
      return toast.error("error");
    }
  };

  const { id, email, name, lastname, address, username, photo, phone } = user;
  const [mypost, setmypost] = useState([]);
  const [order, setmyorder] = useState([]);
  const [received, setReceivd] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const deletepost = async (id_deleted) => {
    try {
      api.delete(`/blogs/${id_deleted}`);

      let filter = [...mypost].filter((post) => post.id !== id_deleted);
      setmypost(filter);
    } catch (error) {
      toast.error(error);
    }
  };

  const About = () => {
    return (
      <center className="profie-container ">
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          <br />
          <TextField
            id="outlined-basic"
            value={email}
            label="email"
            variant="outlined"
          />
          <br />
          <TextField
            id="outlined-basic"
            value={username}
            label="@username"
            variant="outlined"
          />
          <br />
          <TextField
            id="outlined-basic"
            value={phone}
            label="phone"
            variant="outlined"
          />
          <br />
          <TextField
            id="outlined-basic"
            value={address}
            label="address"
            variant="outlined"
          />
          <br />
          <Button variant="contained" color="primary">
            update profile
          </Button>
          <br />
        </Paper>
      </center>
    );
  };

  const Myorder = () => {
    if (order === undefined || order.length == 0) {
      return <div>Make Some Order</div>;
    }
    return (
      <div>
        {order ? (
          <div className="parent-container">
            {order.map((myorder) => (
              <Paper
                style={{
                  marginLeft: 10,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                square={true}
                elevation={3}
              >
                {myorder.order_id}
                <span># {myorder.post_id}</span>
                <TextField
                  align="center"
                  label="Order Status"
                  value={myorder.order_status}
                />
                <TextField
                  fullWidth
                  label="Order Date"
                  type="date"
                  value={myorder.date_order}
                />
                <TextField label="" value={myorder.space} />
                <TextField value={myorder.description} />
                <br />
                <Button variant="contained" color="primary">
                  Update Order
                </Button>
                &nbsp;
                <Button
                  onClick={(id) => deleteOrder(myorder.order_id)}
                  variant="contained"
                  color="Error"
                >
                  Cancel
                </Button>
                <br />
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
    //get my post
    const getpost = async () => {
      const { data } = await api.get(`/userpost/${id}`);
      setmypost(data);
    };
    //get my sent orders
    const getsentorder = async () => {
      const { data } = await api.get(`/myorder/${id}`);
      setmyorder(data);
      console.log(data);

    };
    //get my sent orders
    const getreceivdorder = async () => {
      const { data } = await api.get(`/postorder/${id}`);
      setReceivd(data);
    };
    getpost();
    getsentorder();
    getreceivdorder();
  }, [id]);

  const Post = () => {
    if (mypost === undefined || mypost.length == 0) {
      return <div>No Post</div>;
    }
    return (
      <div>
        {mypost ? (
          <div className="parent-container">
            {mypost.map((post) => (
              <Card
                elevation={5}
                key={post.id}
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
                      <DeleteOutlineIcon
                        onClick={() => deletepost(post.id)}
                        color="secondary"
                      />
                    </IconButton>
                  }
                  title={post.date_depart}
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <center>
                      <td>
                        {countries[post.to_country].name}
                        <br />

                        <img
                          loading="lazy"
                          width="30"
                          height="20"
                          src={`https://flagcdn.com/w40/${post.to_country.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${post.to_country.toLowerCase()}.png 2x`}
                          alt=""
                        />
                      </td>
                      <td>
                        {countries[post.from_country].name}
                        <br />

                        <img
                          loading="lazy"
                          width="30"
                          height="20"
                          src={`https://flagcdn.com/w40/${post.from_country.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${post.from_country.toLowerCase()}.png 2x`}
                          alt=""
                        />
                      </td>
                      <br />
                      <TextField
                        label="space"
                        variant="outlined"
                        defaultValue={post.space}
                        size="small"
                        onChange={(e) => console.log(e.target.value)}
                      />
                      <br />
                      <br />
                      {post.date_depart > [moment().format("YYYY-MM-DD")] ? (
                        <span>expired</span>
                      ) : null}

                      <TextField
                        label="note"
                        variant="outlined"
                        defaultValue={post.space}
                        size="small"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    </center>

                    <td style={{ display: "grid" }}>
                      <br />
                      <Button
                        variant="contained"
                        style={{ background: "#007bff", color: "white" }}
                      >
                        <EditIcon />
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
          <label htmlFor="photo">
            {photo ? (
              <Avatar
                alt={Storage + "avatar.png"}
                src={Storage + photo}
                aria-label="recipe"
              ></Avatar>
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
            <input
              type="file"
              id="photo"
              style={{
                visibility: "hidden",
                height: 0,
                width: 0,
                display: "none",
              }}
            />
            <EditIcon  />
          </label>
          <br />
          <Button onClick={logout} variant="contained" color="Secondary">
            logout
          </Button>
          <div class="col-md-2">
            <br />
            <FormLabel style={{ color: "#007bff" }}>
              {name}&nbsp;{lastname}
            </FormLabel>
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
          <Tab style={{ outlineWidth: 0 }} label="Posts" {...a11yProps(0)} />
          <Tab style={{ outlineWidth: 0 }} label="Info" {...a11yProps(1)} />
          <Tab style={{ outlineWidth: 0 }} label="Orders" {...a11yProps(2)} />
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
