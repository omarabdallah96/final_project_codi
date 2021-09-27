import React from "react";
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
import { countries } from "country-data";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    margin: "20px 20px",
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
    border: " 1px solid #007bff",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={3} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={props.avatar}
            aria-label="recipe"
            className={classes.avatar}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.fullname}
        subheader={props.post_date}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <tr>
            <td>{props.from_country}</td> &nbsp;
           
           
            <td>{props.to_country}</td>
          </tr>
          <tr>
           
            <td> <img
              loading="lazy"
              width="40"
              height="20"
              src={`https://flagcdn.com/w40/${props.from_country_code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${props.from_country_code.toLowerCase()}.png `}
              alt=""
            /></td>
                        &nbsp;

             <td> <img
              loading="lazy"
              width="40"
              height="20"
              src={`https://flagcdn.com/w40/${props.to_country_code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${props.to_country_code.toLowerCase()}.png`}
              alt=""
            /></td>
          </tr>
        <TextField />
        </Typography>
      </CardContent>
     
    </Card>
  );
}
