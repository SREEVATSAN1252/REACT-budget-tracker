import { Grid } from "@material-ui/core";

import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import React from "react";
import Details from "./components/details/Details";
import Main from "./main/Main";
import useStyles from "./styles.js";
const App = () => {
  const classes = useStyles();
  
  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: "90vh" }}
      >
        <Grid item xs={12} sm={4}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton  />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
