import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import WhatsApp from "@mui/icons-material/WhatsApp";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";

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
            {props.wp ? (
              <a
                href={`https://api.whatsapp.com/send?phone=${props.wplink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp style={{color:"rgb(0, 123, 255)"}}/>
              </a>
            ) : null}
            {props.delete ? (
              <DeleteOutline onClick={props.delete} style={{color:"rgb(0, 123, 255)"}} />
            ) : null}
          </IconButton>
        }
        title={props.fullname}
        subheader={props.post_date}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Cost {props.cost} $/KG
          <center>
            <tr>
              <td>{props.from_country}</td> &nbsp;
              <td>{props.to_country}</td>
            </tr>
            <tr>
              <td>
                <img
                  loading="lazy"
                  width="40"
                  height="20"
                  src={`https://flagcdn.com/w40/${props.from_country_code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${props.from_country_code.toLowerCase()}.png `}
                  alt=""
                />
              </td>
              &nbsp;
              <td>
                <img
                  loading="lazy"
                  width="40"
                  height="20"
                  src={`https://flagcdn.com/w40/${props.to_country_code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${props.to_country_code.toLowerCase()}.png`}
                  alt=""
                />
              </td>
            </tr>
            <br />
          </center>
          <TextField
            label="Order Wheight"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 2);
            }}
            type="number"
            defaultValue={props.wheight1}
            variant="outlined"
            size="small"
            onChange={props.wheight}
          />
          <br />
          <br />
          <TextField
            label="Note"
            type="text"
            defaultValue={props.note1}
            variant="outlined"
            size="small"
            onChange={props.note}
          />
          <br />
          <br />
          {props.order ? (
            <Button
              style={{ color: "white", background: "#007bff", outline: "none" }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={props.order}
            >
              order
            </Button>
          ) : null}
          {props.delete ? (
            <Button
              style={{ color: "white", background: "#007bff", outline: "none" }}
              variant="contained"
              endIcon={<Edit />}
              onClick={props.delete}
            >
              Edit
            </Button>
          ) : null}
        </Typography>
      </CardContent>
    </Card>
  );
}
