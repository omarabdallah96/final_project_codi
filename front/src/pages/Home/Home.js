import React, { useEffect, useState } from "react";

import SessionContext from "../../components/session/SessionContext";
import { useContext } from "react";
import api from "../../components/API/API";

import { countries } from "country-data";
import { Pagination } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import "./Home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Loading2 from "../../components/Loading/Loading2";
import OrderCard from "../../components/OrderCard/OrderCard";
import Header from '../../components/Header'
import Storage from '../../components/API/Storage'
export default function RecipeReviewCard(props) {
  const [postdata, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);


  const [wheight, setwheight] = useState(1);
  const [description, setdescription] = useState("");

  async function neworder(postid) {
    const today = moment().format("YYYY-MM-DD");
    const body = {
      user_re_id: id,
      post_id: postid,
      order_status: "pending",
      date_order: today,

      space: wheight,

      description: description,
    };
    try {
      await api.post("/orders", body);
      toast.success("The request has  been sent");

      let filter = [...postdata].filter((order) => order.post_id !== postid);
      setData(filter);
    } catch (error) {
      toast.error("The request has not been sent");
    }
  }

  const {
    session: { user },
  } = useContext(SessionContext);

  const { id, } = user;
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // const { data } = await api.get(`/filterpost/${id}`);
    // setData(data);
    async function fetchData() {
      const response = await api.get(`/filterpost/${id}?page=${page}`);
      const data = response.data.data;
      const total = response.data.total;
      setTotal(Math.ceil(total / 8));
      setData(data);

    }

    // const getorder = async () => {
    //   const { data } = await api.get(`/myorder/${id}`);
    //   setorder(data);
    // };
    // getorder();
    fetchData();
  }, [id, page]);
  if (postdata === undefined || postdata.length === 0) {
    return (
      <>
              <Header />

      <div style={{ marginTop: 150 }}>
        <Loading2 />
        <h1 style={{ color: "#007bff" }}>There are no new flights Available</h1>
        <SentimentVeryDissatisfiedIcon fontSize="large" />

      </div>
</>
    );
  }
  return (
    <>
          <Header />

    <center>
      <br />
      <br />
      <br />

      <div className="parent-container">
        {postdata.map((post) => {
          return (
            <OrderCard
              wp
              wplink={post.phone}
              cost={post.cost}
              v={post.id}
              fullname={post.name + " " + post.lastname}
              change={(e) => console.log(e.target.value)}
              post_date={post.post_date}
              avatar={Storage+ post.photo}
              from_country={countries[post.from_country].name}
              to_country={countries[post.to_country].name}
              from_country_code={post.from_country}
              to_country_code={post.to_country}
              note={(e) => setdescription(e.target.value)}
              wheight={(e) => setwheight(e.target.value)}
              order={(postid) => neworder(post.id)}
              wheight1="1"
              note1=""
            />
          );
        })}
      </div>
      <Pagination
        count={total}
        size="small"
        // color="primary"
        onChange={handleChange}
      />
    </center>
    </>
  );
}
