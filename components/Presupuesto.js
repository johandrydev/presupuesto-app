import React, { useState } from 'react'
import PropTypes from 'prop-types'
// Custom Components
import InputMask from './InputMask'
// MaterialUI components
import Button from '@material-ui/core/Button'

/**
 * Component from Presupuesto
 * @property saveBudge function for save budge
 * @property saveRemaining function for save remaining
 * @property changeShow function for show component
 */
const Presupuesto = ({saveBudge, saveRemaining, changeShow}) => {
  // state from budge
  const [ value, setValue ] = useState('')
  // state from error budge
  const [ errorInput, setError ] = useState(false)

  // change value from budge
  const handleChange = (e) => {
    setValue(e.target.value)
    if (e.target.value !== '') {
      const quantity = parseFloat(e.target.value)
      if (quantity > 0) {
        setError(false)
      } else {
        setError(true)
      }
    }
  }
  // send budge
  const handleSubmit = () => {
    // validate
    if (value !== '' && parseFloat(value) > 0) {
      setError(false)
      const val = parseFloat(value)
      saveBudge(val)
      saveRemaining(val)
      changeShow(false)
    } else {
      setError(true)
    }
  }

  return (
    <div>
      <h3 className="title-card">Coloca tu presupuesto semanal</h3>
      <InputMask
        label="Cantidad del presupuesto"
        change={handleChange}
        err={errorInput}
        val={value}
      />
      <div className="btn-form">
        <Button variant="contained" color="primary" fullWidth disableElevation onClick={handleSubmit}>
          Definir Presupuesto
        </Button>
      </div>
    </div>
  )
}

Presupuesto.propTypes = {
  saveBudge: PropTypes.func.isRequired,
  saveRemaining: PropTypes.func.isRequired,
  changeShow: PropTypes.func.isRequired
}

export default Presupuesto