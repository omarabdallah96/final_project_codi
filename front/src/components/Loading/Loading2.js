import React from "react";
import "./Loading2.css";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

function Loading2(props) {
  return (
    <center>
        <div class="loading ldgDualRing">
          <AirplanemodeActiveIcon
            style={{
              transform: "rotate(180deg)",
              fontSize: "80px",
              color: "rgb(25, 118, 210)",
            }}
          />
        </div>
      
    </center>
  );
}

export default Loading2;
