import './About.css'
import img1 from './image/values-2.png';
import img2 from './image/values-2.png';
import img3 from './image/values-2.png';
import { useEffect, useState } from 'react'
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function About() {
    useEffect(() => {

        window.scroll({
          top: 0,
          left: 0,
        });
      }, [])
    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{ backgroundColor: "white  " }} position="fixed">
            <Toolbar>
              <Link to="/">
                <IconButton style={{ outlineStyle: "none" }}>
                  <HomeIcon fontSize="large"  style={{ color: "#1976d2" }} />
                </IconButton>
              </Link>
              

             
              profile
            </Toolbar>
          </AppBar>
        </Box>
      
        <section id="values" class="values mt-5">

      <div class="container" data-aos="fade-up">

        <header class="section-header">
          <h2>About us</h2>
          <p>Who we are</p>
        </header>

        <div class="row">

          <div class="col-lg-4">
            <div class="box" data-aos="fade-up" data-aos-delay="200">
              <img src={img1} class="img-fluid" alt=""/>
              <h3>Ad cupiditate sed est odio</h3>
              <p>Eum ad dolor et. Autem aut fugiat debitis voluptatem consequuntur sit. Et veritatis id.</p>
            </div>
          </div>

          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="box" data-aos="fade-up" data-aos-delay="400">
              <img src={img2} class="img-fluid" alt=""/>
              <h3>Voluptatem voluptatum alias</h3>
              <p>Repudiandae amet nihil natus in distinctio suscipit id. Doloremque ducimus ea sit non.</p>
            </div>
          </div>

          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="box" data-aos="fade-up" data-aos-delay="600">
              <img src={img3} class="img-fluid" alt=""/>
              <h3>Fugit cupiditate alias nobis.</h3>
              <p>Quam rem vitae est autem molestias explicabo debitis sint. Vero aliquid quidem commodi.</p>
            </div>
          </div>

        </div>

      </div>

    </section>
    </>

    );
}