import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BankingContext = createContext();

export const BankingProvider = (props) => {
    const navigate = useNavigate();
    const[user, setUser] = useState();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
        setUser(userInfo);
    
        // if (!userInfo) {
        //   navigate("/");
        // }
      }, [navigate]);
  return (
    <BankingContext.Provider value={{user, setUser}}>
      {props.children}
    </BankingContext.Provider>
  );
};
