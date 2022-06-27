import { Card, CardContent, CardHeader, Typography } from '@material-ui/core'
import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import useTransactions from '../../useTransactions.js';


import useStyles from "./styles.js"
const Details = ({title}) => {
    const classes = useStyles();
    const {total,chartData} = useTransactions(title);
  return (
    <Card className={title==="Income"? classes.income : classes.expense}>
        <CardHeader title={title}/>
        <CardContent>
            <Typography variant='h5'>₹{total}</Typography>
            <Doughnut data={chartData}/>
        </CardContent>
    </Card>
  )
}

export default Details