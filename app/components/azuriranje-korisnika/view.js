import React, { Component, PropTypes } from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;
import { Notification } from 'react-notification';
import { /* isFinished,*/ getMessage } from './selectors';
import { Button } from 'react-bootstrap';
import {
  // CANCEL,
  CHANGE_FORM_VALUE,
  UGASI_NOT,
  CONFIRM
} from './actions';
import { tView } from './model';

const formOptions = {
  fields: {
    KorisnikID: {
      label: 'ID korisnika',
      disabled: true
    },
    Ime: {
      label: 'Ime'
    },
    Prezime: {
      label: 'Prezime'
    },
    Jmbg: {
      label: 'Matični broj'
    },
    Adresa: {
      label: 'Adresa'
    },
    DatumRegistrovanja: {
      label: 'Datum registrovanja',
      disabled: true
    }
  }
};

export default class AzuriranjeKorisnika extends Component {
  onChange() {
    const { dispatch } = this.props;
    const value = this.refs.form.getValue();
    if (value) {
      dispatch({ type: CHANGE_FORM_VALUE, value });
    }
  }

  save() {
    const { dispatch } = this.props;
    const value = this.refs.form.getValue();
    if (!value) {
      console.warn('Nije dobro uneta vrednost!');// eslint-disable-line no-console
    } else {
      dispatch({ type: CONFIRM });
    }
  }

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
          onChange={this.onChange.bind(this)}
        />
        <Button bsStyle="primary" onClick={this.save.bind(this)} > Aжuriraj </Button>
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

AzuriranjeKorisnika.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};
