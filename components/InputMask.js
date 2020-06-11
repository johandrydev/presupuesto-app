import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// Libraries
import NumberFormat from 'react-number-format'
// MaterialUI components
import TextField from "@material-ui/core/TextField"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& input': {
      direction: 'rtl'
    },
  },
}))

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

/**
 * Component from InputMask
 * @property label string
 * @property change function onChange
 * @property err boolean for show class error
 * @property val string value input
 */
const InputMask = ({label, change, err, val}) => {
  const {root} = useStyles()
  return (
    <>
      <TextField
        className={root}
        variant="outlined"
        label={label}
        fullWidth
        value={val}
        onChange={change}
        error={err}
        helperText={(err) ? "Ingrese un monto válido" : ''}
        name="numberformat"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </>
  )
}

InputMask.propTypes = {
  label: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  err: PropTypes.bool.isRequired,
  val: PropTypes.string.isRequired
}

export default InputMask