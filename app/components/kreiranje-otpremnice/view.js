import React, { Component, PropTypes } from 'react';
import t from 'tcomb-form';
const Form = t.form.Form;
import { /* isFinished,*/ getMessage, kupciEnum, robaEnum } from './selectors';
import { Notification } from 'react-notification';
import { Button } from 'react-bootstrap';
import {
  // CANCEL,
  CHANGE_FORM_VALUE,
  CONFIRM,
  UGASI_NOT
} from './actions';
// import { tView } from './model';

const formOptions = {
  fields: {
    Datumizdavanja: {
      label: 'Datum izdavanja'
    },
    Mesto: {
      label: 'Mesto'
    },
    RobuPrimio: {
      label: 'Robu primio'
    },
    KupacID: {
      label: 'Kupac'
    },
    Stavke: {
      item: {
        RedniBrojStavke: {
          disabled: true
        },
        JedCena: {
          label: 'Jedinična cena'
        },
        Kolicina: {
          label: 'Količina'
        },
        UkupnaCena: {
          label: 'Ukupna cena'
        },
        JedMere: {
          label: 'Jedinica mere'
        },
        RobaID: {
          label: 'Roba'
        }
      }
    }
  }
};

function getFormType(state) {
  const tStavka = t.struct({
    RedniBrojStavke: t.Number,
    JedCena: t.Number,
    Kolicina: t.Number,
    UkupnaCena: t.Number,
    JedMere: t.enums({
      1: 'kilogram'
    }),
    RobaID: t.enums(robaEnum(state))
  });

  const tView = t.struct({
    DatumIzdavanja: t.Date,
    Mesto: t.String,
    RobuPrimio: t.String,
    KupacID: t.enums(kupciEnum(state)),
    Stavke: t.list(tStavka)
  });

  return tView;
}

export default class KreiranjeOtpremnice extends Component {
  onChange(row, path, kind) {
    const { dispatch } = this.props;
    const stavke = [];

    if (kind === 'add' || kind === 'moveUp' || kind === 'moveDown' || kind === 'remove') {
      row.Stavke.forEach(x => {
        const newStavka = {
          ...x,
          RedniBrojStavke: row.Stavke.indexOf(x) + 1
        };
        stavke.push(newStavka);
      });
      const value = {
        ...row,
        Stavke: stavke
      };
      dispatch({ type: CHANGE_FORM_VALUE, value });
    } else {
      dispatch({ type: CHANGE_FORM_VALUE, value: row });
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
    const { notification } = state;

    return (
      <div>
        <Form
          ref="form"
          type={getFormType(state)}
          options={formOptions}
          value={state.formState}
          onChange={this.onChange.bind(this)}
        />
        <Button bsStyle="primary" onClick={this.save.bind(this)} > Sačuvaj </Button>
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
