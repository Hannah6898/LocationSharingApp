import React, { useState, useCallback, useEffect } from "react";
import jwt_decode from "jwt-decode";

let logoutTimer;
export const useAuthentication = ()=>{
    const [token, setToken] = useState(false);
    const [tokenExperationDate, setTokenExperationDate] = useState();
    const [userId, setUserId] = useState(false);
  
    const login = useCallback((uid, token) => {
      setToken(token);
      setUserId(uid);
      setTokenExperationDate(jwt_decode(token).exp);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
        })
      );
    }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      setTokenExperationDate(null);
      localStorage.removeItem("userData");
    }, []);
  
    useEffect(() => {
      if (token && tokenExperationDate) {
        const remainingTime = tokenExperationDate * 1000 - Date.now();
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExperationDate]);
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (storedData && storedData.token) {
        const localTokenExpirationDate = jwt_decode(storedData.token).exp;
        if (localTokenExpirationDate > Date.now() / 1000) {
          login(storedData.userId, storedData.token);
        }
      }
    }, [login]);

    return{token, login, logout, userId}
}