import { useContext } from "react";
import { expenseCategories, incomeCategories, resetCategories } from "./components/details/category"
import { context } from "./context/context";

const useTransactions=(title)=>{
    resetCategories();
    const {transactions}=useContext(context)
    const transactionPerType = transactions.filter((c)=>c.type===title)
    const total = transactionPerType.reduce((acc,currval)=>acc+=currval.amount,0)
    const categories = title==="Income" ? incomeCategories:expenseCategories
transactionPerType.forEach((t)=>{
    const category = categories.find((c)=>c.type===t.category)
    if(category){
        category.amount += t.amount;
    }
})
const filteredCategories = categories.filter((sc) => sc.amount > 0);

const chartData = {
  datasets: [{
    data: filteredCategories.map((c) => c.amount),
    backgroundColor: filteredCategories.map((c) => c.color),
  }],
  labels: filteredCategories.map((c) => c.type),
};

return { filteredCategories, total, chartData };
};

export default useTransactions;