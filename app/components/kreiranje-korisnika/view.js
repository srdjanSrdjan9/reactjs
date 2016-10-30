import React, { Component, PropTypes } from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;
// import { NotificationSystem } from 'react-notification-system';
import { /* isFinished,*/ getMessage } from './selectors';
import { Notification } from 'react-notification';
import { Button } from 'react-bootstrap';

import {
  // CANCEL,
  CHANGE_FORM_VALUE,
  CONFIRM,
  UGASI_NOT
} from './actions';
import { tView } from './model';

export default class KreiranjeKorisnika extends Component {
  onChange() {
    const { dispatch } = this.props;
    const value = this.refs.form.getValue();
    if (!value) {
      console.warn('Nije dobro uneta vrednost!'); // eslint-disable-line no-console
    } else {
      dispatch({ type: CHANGE_FORM_VALUE, value });
    }
  }

  save() {
    const { dispatch } = this.props;
    const value = this.refs.form.getValue();
    if (!value) {
      console.warn('Nije dobro uneta vrednost!'); // eslint-disable-line no-console
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
          value={state && state.formState}
          onChange={this.onChange.bind(this)}
        />
        <Button
          bsStyle="primary"
          bsSize="medium"
          onClick={this.save.bind(this)} > Sacuvaj </Button>
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

KreiranjeKorisnika.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};
