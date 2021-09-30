import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import api from "../../components/API/API";
import OrderCard from "../../components/OrderCard/OrderCard";
import { countries } from "country-data";
import { Pagination } from "@mui/material";


export default function Profile2(props) {
  const [item, setValue] = useState("one");
  const [mypost, setMypost] = useState([]);
  const [w,setwheight]=useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    //get my post
    const getpost = async () => {
      const { data } = await api.get(`/userpost/${2}`);
      setMypost(data);
    };
    //get my sent orders
    // const getsentorder = async () => {
    //   const { data } = await api.get(`/myorder/${id}`);
    //   setmyorder(data);
    // };
    // //get my sent orders
    // const getreceivdorder = async () => {
    //   const { data } = await api.get(`/postorder/${id}`);
    //   setReceivd(data);
    // };
    // const getmyinfo = async () => {
    //   const { data } = await api.get(`/user`);
    //   setMyinfo(data);
    // };

    getpost();
    // getsentorder();
    // getreceivdorder();
    // getmyinfo();
  }, []);
  return (
  
      <center >
        <br />
        <br />
        <br />
        
<div class="container">
  <h2>Dynamic Tabs</h2>
  <ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
    <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
    <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
    <li><a data-toggle="tab" href="#menu3">Menu 3</a></li>
  </ul>

  <div class="tab-content">
    <div id="home" class="tab-pane fade in active">
           <div className="parent-container">
            
          {mypost.map((post) => {
            return (
              <OrderCard
                cost={post.cost}
                v={post.id}
                change={(e) => console.log(e.target.value)}
                post_date={post.post_date}
                avatar={Storage + post.photo}
                from_country={countries[post.from_country].name}
                to_country={countries[post.to_country].name}
                from_country_code={post.from_country}
                to_country_code={post.to_country}
                // note={(e) => setdescription(e.target.value)}
                wheight={(e) => setwheight(e.target.value)}
                // order={(postid) => neworder(post.id)}
              />
            );
          })}
        </div>
       </div>
    <div id="menu1" class="tab-pane fade">
      <h3>Menu 1</h3>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
    <div id="menu2" class="tab-pane fade">
      <h3>Menu 2</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
    </div>
    <div id="menu3" class="tab-pane fade">
      <h3>Menu 3</h3>
      <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    </div>
  </div>
</div>

     
        <Pagination
          count={1}
          size="small"
          // color="primary"
          onChange={handleChange}
        />
      </center>
  
  );
}
