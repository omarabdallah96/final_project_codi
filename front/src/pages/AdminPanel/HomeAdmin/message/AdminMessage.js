import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";



export default function RecipeReviewCard() {
  const message = [
    {
      fullname: "omar abdallah",
      date: "2-10-2021",
      subject: "hello i need your help please",
    },
  ]


  return (
      <>
    <Typography variant="h6" color="text.secondary">
    Inbox
  </Typography>
    <div style={{display:"grid",gridAutoColumns:"50% 50%"}} >
    
        <Card elevation={4} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                A
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="bahaa barakat"
            subheader="2-10-2021"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
                hello i need your help please
            </Typography>
          </CardContent>
        </Card>;
        <Card elevation={4} sx={{ maxWidth: 345 }}>
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
            title="fakher ddine"
            subheader="2-10-2021"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
                i did'nt receive my order
            </Typography>
          </CardContent>
        </Card>;
        <Card elevation={4} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                m
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="mouhamad bachir"
            subheader="1-10-2021"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
                can i order foods?
            </Typography>
          </CardContent>
        </Card>;<Card elevation={4} sx={{ maxWidth: 345 }}>
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
            title="ali traaf"
            subheader="26-9-2021"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
                hello i need your help please
            </Typography>
          </CardContent>
        </Card>;
    </div>
    </>
  );
}
