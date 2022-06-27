import { createContext, useReducer } from "react";
import React from "react";
import reducer from "./reducer";

const initialState = JSON.parse(localStorage.getItem("transactions"))||[];

export const context = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(reducer, initialState);
  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };
  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD",
      payload: transaction,
    });
  };
console.log(transactions);
const balance = transactions.reduce((acc,currval)=>{
return (currval.type==="Expense"?acc-currval.amount:acc+currval.amount)
},0)
  return (
    <context.Provider
      value={{deleteTransaction,addTransaction,transactions,balance}
      }
    >
      {children}
    </context.Provider>
  );
};
