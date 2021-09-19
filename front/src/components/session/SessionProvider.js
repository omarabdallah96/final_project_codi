import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { setCookie, getCookie, removeCookie } from "../../cookies";
import { toast } from "react-toastify";
import axios from 'axios';

export default function SessionProvider({ children }) {
  let id = getCookie("id");
  let token = getCookie("token");
  const [loggedin,setLoggedin]=useState(false)
  const [session, setValue] = useState({
    user: {
      token: getCookie("token"),
    },
  });

  useEffect(() => {
   
    function initializeSession() {
      
    
      if (token)
        fetch(`http://127.0.0.1:8000/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (!res) {
                removeCookie("token");
                removeCookie("id");


              }
            let user = { ...res, token };
            setLoggedin(true)
            updateSession({ user });
          
          });
    }
    initializeSession();
  }, [token]);

  function updateSession(nextSession) {
    let value =
      typeof nextSession === "function"
        ? nextSession
        : (prevSession) => ({ ...prevSession, ...nextSession });
    setValue(value);
  }

  async function login({ email, password }) {
    // try to login
    let {
      error,
      disabled,
      id = 4,
      token,
    } = await fetch("http://127.0.0.1:8000/api/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    // return from the function if you have an error
    if (disabled || !token) return toast.error(disabled);

    if (error || !token) return toast.error(error);


    // get the data of the loggedin user
    setCookie("token", token);
    setCookie("id", id);

    let result = await fetch(`http://127.0.0.1:8000/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    let role=result.role

    let user = { ...result, token,role };

    updateSession({ user });
    // toast(`Welcome ${user.name}!`);
  }

  function logout() {
    setLoggedin(false)
    updateSession({ user: { token: null } });
    removeCookie("id");
    removeCookie("token");

  }
 async function register(email, username, password) {
    let req ={
      username:username,
      email:email,

      password:password,
      role:"user",
      name:"",
      lastname:'',
      status:"active",
      photo:"",
      address:"lebanon",
      phone:"0"

    }
    console.log(req);
  let result=  await axios.post("http://127.0.0.1:8000/api/register",req) 
   
  
    console.log(result);

    // return from the function if you have an error
    // if (error || !token) return toast.error(error);
  }

  const context = {
    session,
    actions: {
      login,
      logout,
      register,
      loggedin,
    },
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
