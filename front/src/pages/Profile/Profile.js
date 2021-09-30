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
import CountrySelect from "../../components/country/countrylist";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useHistory, Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import OrderCard from "../../components/OrderCard/OrderCard";
import Edit from "@mui/icons-material/Edit";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PresentToAllOutlinedIcon from "@mui/icons-material/PresentToAllOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import WhatsApp from "@mui/icons-material/WhatsApp";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
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
  const [diplayorder, setDisplay] = useState(true);
  const altimage = Storage + "avatar.png";
  let history = useHistory();
  const [alignment, setAlignment] = React.useState("received");
  const handletoggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
  const updateorder = async (updated_id, orderstatus) => {
    try {
      let { success } = await api.put(`updateorder/${updated_id}`, {
        order_status: orderstatus,
      });
      if (success) {
        console.log("ok");
      }
    } catch (error) {}
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
  const updatedpost = async () => {};

  const [update_email, setEmail] = useState("");
  const [update_username, setUsername] = useState("");

  const hadleupdate = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#photo").files[0];
    const formData = new FormData();

    if (fileInput !== undefined) {
      formData.append("name", state.name);
      formData.append("lastname", state.lastname);
      formData.append("username", state.username);
      formData.append("phone", state.phone);

      formData.append("email", state.email);
      formData.append("status", "active");

      formData.append("photo", fileInput);

      formData.append("address", "selectdcountry");
    } else {
      formData.append("name", state.name);
      formData.append("lastname", state.lastname);
      formData.append("username", state.username);
      formData.append("phone", state.phone);

      formData.append("email", state.email);
      formData.append("status", "active");

      formData.append("address", state.address);
    }

    try {
      const { success } = await api.post(`/updateprofile/${id}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Your Profile Updated");
      history.push("/");
    } catch (error) {
      toast.error("Please Your Inputs");
    }
  };
  const handlupdate = (event) => {
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
    name: "",
    lastname: "",
    email: "",
    username: "",
    address: "",
  });

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
    const getmyinfo = async () => {
      const { data } = await api.get(`/user`);
      setstate(data);
    };

    getpost();
    getsentorder();
    getreceivdorder();
    getmyinfo();

    switch (alignment) {
      case "received":
        setDisplay(true);

        break;
      case "sent":
        setDisplay(false);

        break;
    }
  }, [id, alignment]);

  return (
    <Box sx={{ width: "100%", background: "white" }}>
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
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt={Storage + "avatar.png"}
              src={Storage + state.photo}
              aria-label="recipe"
            ></Avatar>
          ) : (
            <img
              style={{
                maxWidth: 200,
                maxHeight: 200,
                borderRadius: "50%",
                borderBlockColor: "red",
              }}
              src={altimage}
            />
          )}

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
          inkBarStyle={{ background: "red" }}
        >
          <Tab style={{ outlineWidth: 0 }} label="Posts" {...a11yProps(0)} />
          <Tab style={{ outlineWidth: 0 }} label="Info" {...a11yProps(1)} />
          <Tab style={{ outlineWidth: 0 }} label="Orders" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <>
          <div className="parent-container">
            {mypost.length > 0 ? (
              mypost.map((post) => (
                <>
                  <OrderCard
                    delete
                    cost={post.cost}
                    v={post.id}
                    fullname={name + lastname}
                    change={(e) => console.log(e.target.value)}
                    post_date={post.post_date}
                    avatar={Storage + post.photo}
                    from_country={countries[post.from_country].name}
                    to_country={countries[post.to_country].name}
                    from_country_code={post.from_country}
                    to_country_code={post.to_country}
                    // note={(e) => setdescription(e.target.value)}
                    delete={(postid) => updatedpost(post.id)}
                  />
                </>
              ))
            ) : (
              <div>
                You Dont Have Any Post &nbsp;
                <Link style={{ textDecoration: "none" }} to="/newpost">
                  <Button
                    size="small"
                    endIcon={<Edit fontSize="small" />}
                    style={{ background: "#007bff", color: "white" }}
                    variant="outlined"
                  >
                    Post now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={(e) => hadleupdate(e)}
              sx={{ mt: 3 }}
            >
              <label htmlFor="photo">
                <AddAPhotoIcon />
                <input
                  hidden
                  required
                  type="file"
                  id="photo"
                  accept="image/png, image/gif, image/jpeg"
                  onchange={(evt) => {
                    const [file] = document.querySelector("#photo");
                    if (file) {
                      document.querySelector("#image").src =
                        URL.createObjectURL(file);
                    }
                  }}
                />
              </label>
              <img src="" alt="" id="image" srcset="" />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First name"
                    value={state.name}
                    onChange={handlupdate}
                    name="name"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={state.lastname}
                    required
                    fullWidth
                    label="Last Name"
                    onChange={handlupdate}
                    name="lastname"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={state.username}
                    required
                    type="text"
                    fullWidth
                    label="Username"
                    autoComplete="off"
                    name="username"
                    onChange={handlupdate}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    value={state.email}
                    fullWidth
                    type="email"
                    label="Email"
                    name="email"
                    autoComplete="off"
                    onChange={handlupdate}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    defaultValue={state.phone}
                    required
                    fullWidth
                    type="number"
                    label="Phone"
                    name="phone"
                    onChange={handlupdate}
                    autoComplete="off"
                  />
                  <br />
                  <br />
                  <Grid item xs={12}>
                    <CountrySelect
                      required
                      default={state.address}
                      fullWidth
                      label="Address"
                      name="address"
                      autoComplete="off"
                      selectedcountry={handlupdate}
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Button
                style={{ marginTop: 10, background: "#2196F3", color: "white" }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handletoggle}
        >
          <ToggleButton
            style={{
              marginRight: 10,
              outline: "none",
              fontSize: "medium",
              width: 160,
              border: "1px solid ",
            }}
            value="sent"
          >
            &nbsp; sent &nbsp;
            <PresentToAllOutlinedIcon />
            &nbsp;
          </ToggleButton>
          <ToggleButton
            variant="outline"
            fullWidth
            style={{
              marginRight: 10,
              outline: "none",
              fontSize: "medium",
              width: 160,
              border: "1px solid ",
            }}
            value="received"
          >
            &nbsp; Received &nbsp;
            <PresentToAllOutlinedIcon style={{ transform: "rotate(180deg)" }} />
            &nbsp;
          </ToggleButton>
        </ToggleButtonGroup>

        {received.length > 0 && diplayorder ? (
          <>
            <br />
            <br />

            <div id="received" className="parent-container">
              {received.map((myorder) => (
                <Card
                  elevation={3}
                  sx={{ maxWidth: 345, margin: " 10px 10px" }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        src={Storage + myorder.photo}
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <a
                          href={`https://api.whatsapp.com/send?phone=+${phone}`}
                          target="_blank"
                        >
                          <WhatsApp />
                        </a>
                      </IconButton>
                    }
                    title={myorder.name + " " + myorder.lastname}
                    subheader={myorder.date_order}
                  />

                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <Typography variant="" color="text.secondary">
                        <img
                          loading="lazy"
                          width="40"
                          height="20"
                          src={`https://flagcdn.com/w40/${myorder.address.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${myorder.address.toLowerCase()}.png`}
                          alt=""
                        />
                      </Typography>
                      <br />

                      <Typography
                        style={{
                          marginTop: 10,
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                        variant="caption"
                        color="text.secondary"
                      >
                        <LocalMallOutlinedIcon
                          style={{ outline: "none", color: "#007bff" }}
                        />
                        <span> {myorder.space} KG</span>
                      </Typography>
                      <Typography
                        style={{
                          marginTop: 10,
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                        variant="caption"
                        color="text.secondary"
                      >
                        <NoteAltOutlinedIcon
                          style={{ outline: "none", color: "#007bff" }}
                        />
                        {myorder.description}
                      </Typography>
                      <Typography
                        style={{
                          marginTop: 10,
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                        variant="caption"
                        color="text.secondary"
                      >
                        <Button
                          variant="outlined"
                          name="rejected"
                          color="secondary"
                          style={{ outline: "none", background: "seconday" }}
                          onClick={(e) =>
                            updateorder(myorder.post_id, e.currentTarget.name)
                          }
                        >
                          <HighlightOffOutlinedIcon />
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                          name="accepted"
                          variant="outlined"
                          style={{ outline: "none", background: "#007bff" }}
                          onClick={(e) =>
                            updateorder(myorder.post_id, e.currentTarget.name)
                          }
                        >
                          <CheckOutlinedIcon style={{ color: "white" }} />
                        </Button>
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div>
            {received.length < 1 && diplayorder ? (
              <>
                <br />
                <br />
                You did not receive any order
                <br />
                <br />
                <Link style={{ textDecoration: "none" }} to="/">
                  <Button
                    size="small"
                    endIcon={<HomeOutlinedIcon fontSize="small" />}
                    style={{ background: "#007bff", color: "white" }}
                    variant="outlined"
                  >
                    Go Home
                  </Button>
                </Link>
              </>
            ) : null}
          </div>
        )}
        {order.length > 0 && !diplayorder ? (
          <>
            <br />
            <br />
            <div id="sent" className="parent-container">
              {order.map((myorder) => (
                 <Card
                 elevation={3}
                 sx={{ maxWidth: 345, margin: " 10px 10px" }}
               >
                 <CardHeader
                   avatar={
                     <Avatar
                       src={Storage + myorder.photo}
                       sx={{ bgcolor: red[500] }}
                       aria-label="recipe"
                     ></Avatar>
                   }
                   action={
                     <IconButton aria-label="settings">
                       <a
                         href={`https://api.whatsapp.com/send?phone=+${phone}`}
                         target="_blank"
                       >
                         <WhatsApp />
                       </a>
                     </IconButton>
                   }
                   title={myorder.name + " " + myorder.lastname}
                   subheader={myorder.date_order}
                 />

                 <CardContent>
                   <Typography variant="body2" color="text.secondary">
                     <Typography variant="" color="text.secondary">
                       <img
                         loading="lazy"
                         width="40"
                         height="20"
                         src={`https://flagcdn.com/w40/${myorder.address.toLowerCase()}.png`}
                         srcSet={`https://flagcdn.com/w40/${myorder.address.toLowerCase()}.png`}
                         alt=""
                       />
                     </Typography>
                     <br />

                     <Typography
                       style={{
                         marginTop: 10,
                         textAlign: "center",
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         flexDirection: "row",
                       }}
                       variant="caption"
                       color="text.secondary"
                     >
                       <LocalMallOutlinedIcon
                         style={{ outline: "none", color: "#007bff" }}
                       />
                       <span> {myorder.space} KG</span>
                     </Typography>
                     <Typography
                       style={{
                         marginTop: 10,
                         textAlign: "center",
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         flexDirection: "row",
                       }}
                       variant="caption"
                       color="text.secondary"
                     >
                       <NoteAltOutlinedIcon
                         style={{ outline: "none", color: "#007bff" }}
                       />
                       {myorder.description}
                     </Typography>
                     <Typography
                       style={{
                         marginTop: 10,
                         textAlign: "center",
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         flexDirection: "row",
                       }}
                       variant="caption"
                       color="text.secondary"
                     >
                       <Button
                         variant="outlined"
                         name="rejected"
                         color="secondary"
                         style={{ outline: "none", background: "seconday" }}
                         onClick={(e) =>
                           updateorder(myorder.post_id, e.currentTarget.name)
                         }
                       >
                         <HighlightOffOutlinedIcon />
                       </Button>
                       &nbsp; &nbsp;
                       <Button
                         name="accepted"
                         variant="outlined"
                         style={{ outline: "none", background: "#007bff" }}
                         onClick={(e) =>
                           updateorder(myorder.post_id, e.currentTarget.name)
                         }
                       >
                         <CheckOutlinedIcon style={{ color: "white" }} />
                       </Button>
                     </Typography>
                   </Typography>
                 </CardContent>
               </Card>
              ))}
            </div>
          </>
        ) : (
          <div>
            {!diplayorder && order.length < 1 ? (
              <div>
                <br />
                <br />
                You have not sent any request
                <br />
                <br />
                <Link style={{ textDecoration: "none" }} to="/">
                  <Button
                    size="small"
                    endIcon={<AddShoppingCartIcon fontSize="small" />}
                    style={{ background: "#007bff", color: "white" }}
                    variant="outlined"
                  >
                    Order now
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </TabPanel>
    </Box>
  );
}
