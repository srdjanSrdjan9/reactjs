import React, { Component, PropTypes } from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;
import { getMessage } from './selectors';
import { Notification } from 'react-notification';
import { Button } from 'react-bootstrap';

import {
  // CANCEL,
  CONFIRM,
  UGASI_NOT
} from './actions';

import { tView } from './model';

const formOptions = {
  fields: {
    KorisnikID: {
      label: 'ID korisnika',
      disabled: true
    },
    Ime: {
      label: 'Ime',
      disabled: true
    },
    Prezime: {
      label: 'Prezime',
      disabled: true
    },
    Jmbg: {
      label: 'Matični broj',
      disabled: true
    },
    Adresa: {
      label: 'Adresa',
      disabled: true
    },
    DatumRegistrovanja: {
      label: 'Datum registrovanja',
      disabled: true
    }
  }
};

export default class BrisanjeKorisnika extends Component {
  render() {
    const { state, dispatch } = this.props;
    const notification = state && state.notification;

    return (
      <div>
        <Form
          ref="form"
          type={tView}
          value={state && state.ViewState}
          options={formOptions}
        />
        <Button bsStyle="primary" onClick={() => dispatch({ type: CONFIRM })} > Obriši </Button>
        <Notification
          isActive={notification}
          message={<font size="6">{getMessage(state)}</font>}
          action="Dismiss"
          title="Poruka"
          onDismiss={() => dispatch({ type: UGASI_NOT })}
      />
      </div>
    );
  }
}

BrisanjeKorisnika.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};
