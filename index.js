import React, { useState } from "react";
// Custom Components
import AlertCustom from "./components/AlertCustom";
import Formulario from "./components/Formulario";
import Gasto from "./components/Gasto";
import Presupuesto from "./components/Presupuesto";
import StatePresupuesto from "./components/StatePresupuesto";
// MaterialUI Components
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { render } from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import "./style.css";

const App = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const useStyles = makeStyles(theme => ({
    cardPresupuesto: {
      padding: matches ? "2rem" : "2rem 1rem",
      background: "white",
      borderRadius: "1rem"
    }
  }));
  const { cardPresupuesto } = useStyles();
  const [ budget, changeBudget ] = useState(0);
  const [ remaining, changeRemaining ] = useState(0);
  const [ showQuestion, changeShowQ ] = useState(true);
  const [ showErr, changeShowErr ] = useState(false);
  const [ gastos, changeGastos ] = useState([]);
  const [ open, changeOpen ] = useState(false);

  const addGasto = gasto => {
    if (gasto.mount <= remaining) {
      changeShowErr(false);
      changeRemaining(remaining - gasto.mount)
      return changeGastos([...gastos, gasto]);
    } else {
      changeShowErr(true);
    }
  };

  const handleAcept = () => {
    changeOpen(!open)
    changeShowQ(true)
    changeBudget(0)
    changeRemaining(0)
    changeGastos([])
  }

  const handleClose = () => {
    changeOpen(!open)
  }

  return (
    <Container component="main" maxWidth="md">
      <h1 className="title">Gasto Semanal</h1>
      <div className={cardPresupuesto}>
       {showQuestion ? (
         <Presupuesto
          saveBudge={changeBudget}
          saveRemaining={changeRemaining}
          changeShow={changeShowQ}
        />
       ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Formulario addGasto={addGasto} />
            {showErr && (
              <Alert severity="error">
                Debe cargar un gasto que corresponda al restante
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <StatePresupuesto presupuesto={budget} restante={remaining} resetPresupuesto={handleClose} />
          </Grid>
        </Grid>
       )}
      </div>
      {!showQuestion && <h3 className="title">Lista de Gastos</h3>}
      <Grid container spacing={3}>
        {gastos.map(gasto => (
          <Gasto key={gasto.id} gasto={gasto} />
        ))}
      </Grid>
      <AlertCustom open={open} handleClose={handleClose} handleAcept={handleAcept} />
    </Container>
  );
};

render(<App />, document.getElementById("root"));
