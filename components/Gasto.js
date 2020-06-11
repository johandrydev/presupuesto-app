import React from "react";
import PropTypes from 'prop-types'
// MaterialUI components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275
  },
  action: {
    backgroundColor: "#3f51b5",
    color: "white",
    display: "flex",
    justifyContent: "flex-end"
  }
}));

/**
 * Component from Gasto
 * @property gasto object data from gasto
 */
const Gasto = ({ gasto }) => {
  const { root, action } = useStyles();
  const { name, mount } = gasto;
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card className={root}>
        <CardContent>
          <strong>{name}</strong>
        </CardContent>
        <CardActions className={action}>
          <div>${new Intl.NumberFormat("es-CO").format(mount)}</div>
        </CardActions>
      </Card>
    </Grid>
  );
};

Gasto.propTypes = {
  gasto: PropTypes.object.isRequired
}

export default Gasto;
