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
import { countries } from "country-data";
import theme from "../../components/Style/Style";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./Home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import SendIcon from "@mui/icons-material/Send";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Storage from "../../components/API/Storage";
import FlightIcon from "@mui/icons-material/Flight";
import moment from "moment";
import Loading2 from "../../components/Loading/Loading2";
import { Link } from "react-router-dom";
import OrderCard from "../../components/OrderCard/OrderCard";
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

export default function RecipeReviewCard(props) {
  const [postdata, setData] = useState([]);
  const [myorder, setorder] = useState([]);

  const [weight, setwheight] = useState(1);
  const [description, setdescription] = useState("");

  async function neworder(postid) {
    const today = moment().format("YYYY-MM-DD");

    const body = {
      user_re_id: id,
      post_id: postid,
      order_status: "pending",
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
      setorder(data);
    };
    getorder();
    getPost();
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
              <OrderCard
                v={post.id}
                fullname={post.name + " " + post.lastname}
                change={(e) => console.log(e.target.value)}
                post_date={post.post_date}
                avatar={Storage + post.photo}
                from_country={countries[post.from_country].name}
                to_country={countries[post.to_country].name}
                from_country_code={post.from_country}
                to_country_code={post.to_country}
              />
            );
          })}
        </div>
      </center>
    );
  else {
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Loading2 />
      </>
    );
  }
}
