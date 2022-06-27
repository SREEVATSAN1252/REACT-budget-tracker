import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { context } from "../../context/context.js";
import useStyles from "./styles.js";
import { expenseCategories, incomeCategories } from "../../components/details/category.js";
import { useSpeechContext } from "@speechly/react-client";
const Form = () => {
  const {segment} = useSpeechContext();
  const classes = useStyles();
  const initialState = {
    amount: "",
    category: "",
    date: new Date(),
    type: "Income",
  };
  const [formData, setFormData] = useState(initialState);
  const {addTransaction} = useContext(context)
  const createList = ()=>{
    const transaction = {...formData,amount:Number(formData.amount),id:uuidv4()}
    addTransaction(transaction)
    setFormData(initialState)
  }
const selectedCategory = formData.type==="Income"?incomeCategories:expenseCategories
useEffect(() => {
  if (segment) {
    if (segment.intent.intent === 'add_expense') {
      setFormData({ ...formData, type: 'Expense' });
    } else if (segment.intent.intent === 'add_income') {
      setFormData({ ...formData, type: 'Income' });
    } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
      return createList();
    } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
      return setFormData(initialState);
    }

    segment.entities.forEach((s) => {
      const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

      switch (s.type) {
        case 'amount':
          setFormData({ ...formData, amount: s.value });
          break;
        case 'category':
          if (incomeCategories.map((iC) => iC.type).includes(category)) {
            setFormData({ ...formData, type: 'Income', category });
          } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
            setFormData({ ...formData, type: 'Expense', category });
          }
          break;
        case 'date':
          setFormData({ ...formData, date: s.value });
          break;
        default:
          break;
      }
    });

    if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
      createList();
    }
  }
}, [segment]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && segment.words.map((w)=>w.value).join(" ")}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
           {selectedCategory.map((c)=>
           <MenuItem value={c.type} key={c.type}>{c.type}</MenuItem>
           )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="  "
          fullWidth
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullwidth
        onClick={createList}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
