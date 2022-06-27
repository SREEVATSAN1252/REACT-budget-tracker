import { Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { context } from '../context/context.js';
import Form from './form/Form.jsx';
import List from './list/List.jsx';
import useStyles from "./styles.js"
const Main = () => {
const classes = useStyles();
const {balance} = useContext(context);
  return (
    <Card className={classes.root}> 
    <CardHeader title="Expense Tracker" subheader="powered by speechly" />
    <CardContent>
        <Typography align='center  ' variant='h5'>
            Total Balance {balance}

        </Typography>
        <Typography  variant='subtitle1' style={{lineHeight:"1.5em",marginTop:"20px"}}>
Try saying: Add income for 100 in category Salary Monday....
        </Typography>
        <Divider/>
        <Form/>
    </CardContent>
    <CardContent className={classes.CardContent}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <List/>

            </Grid>
        </Grid>

    </CardContent>
 
    </Card>
  )
}

export default Main