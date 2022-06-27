 const reducer =(state,action)=>{
    let transactions;
switch (action.type) {
    case "DELETE":
         transactions = state.filter((f)=>f.id !== action.payload)
         localStorage.setItem("transactions",JSON.stringify(transactions))
        return transactions;

     case "ADD":
         transactions = [action.payload,...state]   
         localStorage.setItem("transactions",JSON.stringify(transactions))
        return transactions;

     default :
     return state;   

}
}
export default reducer;



