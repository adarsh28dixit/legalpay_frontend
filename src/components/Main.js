import React, { useContext, useState } from "react";
import axios from "axios";
import { BankingContext } from "../Context/CreateContext";

export default function Main() {
  const [balance, setBalance] = useState();
  const [showBalance, setShowBalance] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const {user} = useContext(BankingContext);
  console.log(user)


  const[depositData, setDepositData] = useState({amount: ""})
  const {amount} = depositData;
  const depositOnChange = (e) => {
    setDepositData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }
  console.log(amount)

  const request = async () => {
    setShowBalance(true);
    setShowDeposit(false);
    setShowWithdraw(false);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:3000/request", config);
      
      setBalance(data.amount);
      console.log(balance);
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: "Failed to load the chats",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  };
  const deposit = () => {
    setShowBalance(false);
    setShowDeposit(true);
    setShowWithdraw(false);
  };
  const withdrawn = () => {
    setShowBalance(false);
    setShowDeposit(false);
    setShowWithdraw(true);
  };

  const handleDeposit = async() => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put("http://localhost:3000/deposit",{amount}, config);
      
      //setBalance(data.amount);
      if(data){
        alert('successfully deposited')
      }
      console.log(balance);
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: "Failed to load the chats",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  }

  const handleWithdraw = async() => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put("http://localhost:3000/withdrawn",{amount}, config);
      
      //setBalance(data.amount);
      if(data){
        alert('successfully withdrawn')
      }
      console.log(balance);
    } catch (error) {
      // toast({
      //   title: "Error Occured!",
      //   description: "Failed to load the chats",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left",
      // });
    }
  }
  return (
    <>
      <h3>Welcome to Banking System!</h3>
      {showBalance && <>Available balance: {balance}</>}
      {showDeposit && (
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Enter amount to deposit:</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="amount"
              value={amount}
              onChange={depositOnChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleDeposit}>
            Submit
          </button>
        </form>
      )}
      {showWithdraw && (
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Enter amount to withdrawn!
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="amount"
              value={amount}
              onChange={depositOnChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleWithdraw}>
            Submit
          </button>
        </form>
      )}
      <div className="main-buttons">
        <button type="button" className="btn btn-primary" onClick={request}>
          Request
        </button>
        <button type="button" className="btn btn-secondary" onClick={deposit}>
          Deposit
        </button>
        <button type="button" className="btn btn-secondary" onClick={withdrawn}>
          Withdrawn
        </button>
      </div>
    </>
  );
}
