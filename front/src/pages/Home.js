import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SessionContext from "../components/session/SessionContext";
import { useContext } from "react";
import { TextField } from "@mui/material";
import api from "../components/API/API";
import CountrySelect from "../components/country/countrylist";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
  },
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
  const getPost = async () => {
    const { data } = await api.get("/blogs");
    setData(data);

    console.log(data);
  };

  const {
    session: { user },
  } = useContext(SessionContext);

  const { email, name, lastname, avatar } = user;
  const classes = useStyles();

  useEffect(async () => {
    await getPost();
  }, []);
  if (postdata.length > 0)
    return (
      <center>
        <br />
        <br />
        <br />
        {/* <Card sx={{ maxWidth: 345 }}>
          <CountrySelect />
          <CountrySelect />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card> */}
        <div className={classes.flex}>
          {postdata.map((post) => {
            return (
              <Card className={classes.parent} sx={{ maxWidth: 345 }}>
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
