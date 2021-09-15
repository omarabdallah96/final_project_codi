import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { setCookie, getCookie, removeCookie } from "../../cookies";
import { toast } from "react-toastify";

export default function SessionProvider({ children }) {
  const [session, setValue] = useState({
    user: {
      token: getCookie("token"),
    },
  });

  useEffect(() => {
    function initializeSession() {
      
      let id = getCookie("id");
      let token = getCookie("token");
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
              }
            let user = { ...res, token };
            updateSession({ user });
          
          });
    }
    initializeSession();
  }, []);

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
    if (error || !token) return toast.error(error);

    // get the data of the loggedin user
    setCookie("token", token);
    setCookie("id", id);

    let result = await fetch(`http://127.0.0.1:8000/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    let user = { ...result, token };

    updateSession({ user });
    // toast(`Welcome ${user.name}!`);
  }

  function logout() {
    updateSession({ user: { token: null } });
    removeCookie("id");
    removeCookie("token");
  }
  function register(email, username, password) {
    console.log(email, username, password);
  }

  const context = {
    session,
    actions: {
      login,
      logout,
      register,
    },
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
