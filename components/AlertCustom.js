import React, {useState} from 'react';
import PropTypes from 'prop-types'
// MaterialUI components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * Component from Alert
 * @property open boolean indicates if it is visible
 * @property handleClose function close Alert Component
 * @property handleAcept function acept reset budget form
 */
const AlertCustom = ({open, handleClose, handleAcept}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Seguro que desea reiniciar su presupuesto semanal?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAcept} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

AlertCustom.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAcept: PropTypes.func.isRequired
}

export default AlertCustom