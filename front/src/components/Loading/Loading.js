import React from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import "./Loading.css";

function Loading(props) {
  return (
    <center>
      <div class="rotating" id="pot">
        <AirplanemodeActiveIcon style={{ fontSize: props.plane,color:"#007bff" }} />
        
      </div>
      
    </center>
  );
}

export default Loading;
