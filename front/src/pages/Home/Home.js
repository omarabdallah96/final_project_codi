import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SessionContext from "../../components/session/SessionContext";
import { useContext } from "react";
import { TextField } from "@mui/material";
import api from "../../components/API/API";
import { Button } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import "./Home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SendIcon from "@mui/icons-material/Send";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Storage from "../../components/API/Storage";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  parent: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: "white",
    color: "#1976d2",
  },
  root: {
    maxWidth: 100,
    marginBottom: 20,
    height: 100,
    display: "flex",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const [postdata, setData] = useState([]);
  const [myorder, setorder] = useState([]);

  const [weight, setwheight] = useState(1);
  const [description, setdescription] = useState("");

  async function neworder(postid) {
    const today = moment().format("YYYY-MM-DD");

    const body = {
      user_re_id: id,
      post_id: postid,
      status: 1,
      date_order: today,

      space: weight,

      description: description,
    };
    try {
      await api.post("/orders", body);
      toast("order  sended");
    } catch (error) {
      toast.error("order not sended");
    }
  }
  
  const filterByReference = (arr1, arr2) => {
       let res = [];
       res = arr1.filter(el => {
          return arr2.find(element => {
             return element.post_id === el.post_id;
          });
       });
    setData(res)

       return res;

    }

  const {
    session: { user },
  } = useContext(SessionContext);

  const { id, photo } = user;
  const classes = useStyles();

  useEffect(() => {
    const getPost = async () => {
      const { data } = await api.get(`/filterpost/${id}`);
      setData(data);
    };
    const getorder = async () => {
      const { data } = await api.get(`/myorder/${id}`);
      setorder(data)
     
    };
    getorder();
    getPost();
    filterByReference(postdata, myorder)
    console.log(postdata, myorder)
  }, [id]);
  if (postdata.length > 0)
    return (
      <center>
        <br />
        <br />
        <br />

        <div className="parent-container">
          {postdata.map((post) => {
            return (
              <Card
                elevation={5}
                className={classes.parent}
                sx={{ maxWidth: 345 }}
              >
                <CardHeader
                  avatar={
                    <>
                      <Avatar
                        src={Storage + post.photo}
                        sx={{ bgcolor: red[500] }}
                        alt={Storage + `avatar.png`}
                        aria-label="recipe"
                      ></Avatar>
                      {post.name} {post.lastname}
                    </>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.title}
                  subheader={post.date_depart}
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <tr
                      style={{
                        textAlign: "center",
                        fontSize: "15px",
                        fontFamily: "system-ui",
                      }}
                    >
                      <td>{post.from_country} </td>
                      &nbsp; &nbsp;
                      <span>
                        <FlightTakeoffIcon /> &nbsp; &nbsp; &nbsp;
                        <FlightLandIcon />
                      </span>
                      &nbsp; &nbsp;
                      <td> {post.to_country}</td>
                    </tr>
                    <br />
                    <tr style={{ color: "red" }}>
                      <td>{post.date_depart} </td>
                      &nbsp; &nbsp; &nbsp;
                      <td>{post.date_depart}</td>
                    </tr>
                    <tr style={{ display: "grid" }}>
                      <td>
                        <span></span>
                      </td>

                      <td>
                        <span>
                          <LocalMallIcon color="error" />
                        </span>
                      </td>
                      <td>
                        <span>{post.space} KG</span>
                      </td>
                      <td>
                        <span>{post.note} </span>
                      </td>
                      <td></td>
                    </tr>
                    <br />

                    <td style={{ display: "grid" }}>
                      <TextField
                        size="small"
                        id="outlined-number"
                        label="Order Weight"
                        type="number"
                        defaultValue="1"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setwheight(e.target.value)}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, 1);
                        }}
                      />
                      <br />
                      <TextField
                        size="small"
                        id="outlined-number"
                        label="Order Description"
                        type="text"
                        defaultValue={description}
                        multiline
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setdescription(e.target.value)}
                      />

                      <br />
                      <Button
                        onClick={(id) => neworder(post.post_id)}
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                      >
                        order
                      </Button>
                    </td>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </center>
    );
  else {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> <div>Loading</div>
      </div>
    );
  }
}
