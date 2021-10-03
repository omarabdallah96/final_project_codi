import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { setCookie, getCookie, removeCookie } from "../../cookies";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import sessionapi from '../API/sessionapi'

export default function SessionProvider({ children }) {
  let token = getCookie("token");
  let id = getCookie("id");


  const [loggedin, setLoggedin] = useState(false);
  const [session, setValue] = useState({
    user: {
      token: getCookie("token"),
      id: getCookie("id"),

    },
  });

  useEffect(() => {
    function initializeSession() {
      let token = getCookie("token");

      if (token)
        fetch(`${sessionapi}api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (!res) {
              return <Redirect to="/account" />;
            }
            let role=res.role

            let user = { ...res, token ,role};
            setLoggedin(true);
            updateSession({ user });
          });
    }
    initializeSession();
  }, [token,id]);

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
      error,id = 4,
      token,
    } = await fetch(`${sessionapi}api/login`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
    

    // return from the function if you have an error
    // if (disabled || !token) return toast.error(disabled);

    if (error || !token) return toast.error(error);

    // get the data of the loggedin user
    setCookie("token", token,30);
    setCookie("id", id,30);

    let result = await fetch(`${sessionapi}api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    let role = result.role;
    console.log(result);
   

    let user = { ...result, token, role };

    updateSession({ user });
    // toast(`Welcome ${user.name}!`);
  }

  function logout() {
    removeCookie("id");
    removeCookie("token");
    updateSession({ user: { token: null ,id:null} });

  }
  // async function register(email, username, password) {
  //   let req = {
  //     username: username,
  //     email: email,
  //     password: password,
  //     role: "user",
  //     name: "",
  //     lastname: "",
  //     status: "active",
  //     address: "lebanon",
  //     phone: "0",
  //     photo: "kgOrcxjkELpYSGkSj2fsvRuAqICRZm1n5FUqyc3S.png",

  //   };
  
  //   console.log(req);
  //   let result = await axios.post(`${sessionapi}api/uploadimage`, req);

  //   console.log(result);

  //   // return from the function if you have an error
  //   // if (error || !token) return toast.error(error);
  // }

  const context = {
    session,
    actions: {
      login,
      logout,
      
      loggedin,
    },
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
