import React, { Component, PropTypes } from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;
import { /* isFinished,*/ getMessage, robaEnum } from './selectors';
import { Notification } from 'react-notification';
import { Button } from 'react-bootstrap';
import {
  // CANCEL,
  CHANGE_FORM_VALUE,
  SEND_REQUEST,
  UGASI_NOT
} from './actions';
// import { tView } from './model';

function getFormType(state) {
  const tView = t.struct({
    RobaID: t.enums(robaEnum(state)),
    naRaspolaganju: t.maybe(t.Number),
    potrazivanje: t.maybe(t.Number)
  });

  return tView;
}

const formOptions = {
  fields: {
    RobaID: {
      label: 'Roba'
    },
    naRaspolaganju: {
      label: 'Robe na raspolaganju(kg)',
      disabled: true
    },
    potrazivanje: {
      label: 'Potraživanje robe(kg)',
      disabled: true
    }
  }
};

export default class KreiranjeOtpremnice extends Component {
  save() {
    const { dispatch } = this.props;
    const value = this.refs.form.getValue();
    if (!value) {
      console.warn('Nije dobro uneta vrednost!'); // eslint-disable-line no-console
    } else {
      dispatch({ type: SEND_REQUEST });
    }
  }

  render() {
    const { state, dispatch } = this.props;
    const { notification } = state;

    return (
      <div>
        <Form
          ref="form"
          type={getFormType(state)}
          options={formOptions}
          value={state.formState}
          onChange={(value) => dispatch({ type: CHANGE_FORM_VALUE, value })}
        />
        <Button bsStyle="primary" onClick={this.save.bind(this)} > Pretraži </Button>
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

KreiranjeOtpremnice.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};
