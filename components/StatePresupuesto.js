import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// MaterialUI components
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& .alerts": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      "& .alert": {
        margin: "1rem 0 0"
      }
    },
    "& .btn": {
      margin: ".5rem"
    },
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

/**
 * Component from StatePresupuesto
 * @property presupuesto function for save budge
 * @property restante function for save remaining
 * @property resetPresupuesto function for show component
 */
const StatePresupuesto = ({ presupuesto, restante, resetPresupuesto }) => {
  const classes = useStyles();
  // state from alert
  const [clsAlert, changeClsAlert] = useState("success");

  useEffect(() => {
    if (presupuesto / 4 > restante) {
      changeClsAlert("error");
    } else if (presupuesto / 2 > restante) {
      changeClsAlert("warning");
    } else {
      changeClsAlert("success");
    }
  }, [restante, presupuesto]);

  return (
    <div className={classes.root}>
      <div className="alerts">
        <Alert className="alert" severity="info">
          Presupuesto: ${new Intl.NumberFormat("es-CO").format(presupuesto)}
        </Alert>
        <Alert className="alert" severity={clsAlert}>
          Restante: ${new Intl.NumberFormat("es-CO").format(restante)}
        </Alert>
      </div>
      <Button
        className="btn"
        onClick={resetPresupuesto}
        variant="contained"
        fullWidth
        disableElevation
      >
        Establecer nuevo presupuesto
      </Button>
    </div>
  );
};

StatePresupuesto.propTypes = {
  presupuesto: PropTypes.number.isRequired,
  restante: PropTypes.number.isRequired,
  resetPresupuesto: PropTypes.func.isRequired
};

export default StatePresupuesto;
