import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
// Custom Components
import shortid from 'shortid'
import InputMask from "./InputMask"
// MaterialUI components
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

/**
 * Component from Formulario
 * @property addGasto function add gasto to main state
 */
const Formulario = ({addGasto}) => {
  const classes = useStyles()
  // state from mount
  const [ value, setValue ] = useState('')
  // state from error mount
  const [ errorInput, setError ] = useState(false)
  // state from input name
  const [ name, changeName ] = useState({
    val: "",
    err: false,
    errTex: "Este campo es obligatorio"
  });

  // change mount input
  const handleChange = (e) => {
    setValue(e.target.value)
    if (e.target.value !== '') {
      const cantidad = parseFloat(e.target.value)
      if (cantidad > 0) {
        setError(false)
      } else {
        setError(true)
      }
    }
  }
  // change name input
  const handleChangeText = e => {
    changeName({
      ...name,
      val: e.target.value,
      err: e.target.value === ""
    });
  };

  // save gasto
  const handleSave = () => {
    // validate
    if (value !== '' && parseFloat(value) > 0 && name.val.trim() !== '') {
      setError(false)
      const gasto = {
        id: shortid.generate(),
        name: name.val,
        mount: parseFloat(value)
      }
      // send gasto to main component
      addGasto(gasto)
      // reset form
      setValue('')
      changeName({
        ...name,
        val: '',
        err: false
      });
      setError(false)
    } else {
      // add form error
      if (value === '' || parseFloat(value) <= 0) {
        setError(true)
      }
      if (name.val.trim() === '') {
        changeName({
          ...name,
          err: name.val.trim() === ""
        });
      }
    }
  }

  return (
    <>
      <h3 className="title-card">Ingresa los gastos realizados</h3>
      <div className={classes.root}>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          name="name"
          label="Nombre del gasto"
          value={name.val}
          onChange={handleChangeText}
          error={name.err}
          helperText={name.err ? name.errTex : ""}
        />
        <InputMask
          label="Ingrese el monto gastado"
          change={handleChange}
          err={errorInput}
          val={value}
        />
        <div className="btn-form">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            onClick={handleSave}
          >
            Agregar Gasto
          </Button>
        </div>
      </div>
    </>
  );
};

Formulario.propTypes = {
  addGasto: PropTypes.func.isRequired
}

export default Formulario;
