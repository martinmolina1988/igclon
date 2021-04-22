import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import Auth from "./pages/Auth";
import AuthContext from "./context/AuthContext";
import { getToken, decodeToken, removeToken } from "./utils/token";
import Navigation from './routes/Navigation';
import "./app.scss";

export default function App() {
  const [auth, setAuth] = useState(undefined)
  const [updateReload, setUpdateReload] = useState(false)
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token))
    }
    setUpdateReload(false)
  }, [updateReload])
  const logout = () => {
    removeToken();
    setAuth(null);
  }

  const setUser = (user) => {
    setAuth(user)
  }

  const authData = useMemo(() => ({
    auth,
    logout,
    setUser
  }), [auth])


  if (auth === undefined) return null;
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {
          !auth ?
            < Auth /> :
            <Navigation setUpdateReload={setUpdateReload} updateReload={updateReload} />
        }

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

