import React, { Component, PropTypes } from 'react';
import DataGrid from 'react-datagrid';
import 'react-datagrid/index.css';
import { Modal, Button } from 'react-bootstrap';
import { forwardTo } from '../../common/redux-extensions';

import KreiranjeKorisnika from '../kreiranje-korisnika/';
import AzuriranjeKorisnika from '../azuriranje-korisnika/';
import BrisanjeKorisnika from '../brisanje-korisnika/';

// import { isChildFinished } from './selectors';
import {
  CHILD_AZURIRANJE_KORISNIKA,
  CHILD_BRISANJE_KORISNIKA,
  CHILD_KREIRANJE_KORISNIKA
} from './model';

import {
  START_KREIRANJE_KORISNIKA,
  REFRESH_DATASET,
  START_AZURIRANJE_KORISNIKA,
  START_BRISANJE_KORISNIKA,
  CHANGE_SELECTION,
  CHILDACTION,
  SORT_CHANGE,
  CANCEL
} from './actions';

const columns = [
  { name: 'Ime' },
  { name: 'Prezime' },
  { name: 'Jmbg', title: 'Matični broj' },
  { name: 'Adresa' },
  { name: 'DatumRegistrovanja', title: 'Datum registrovanja' }
];

export default class PregledKorisnika extends Component {
  render() {
    const { state, dispatch } = this.props;
    const { data, selectedKorisnik, sortInfo } = state;

    return (
      <div>
        <div>
          <Button bsStyle="primary" onClick={() => dispatch({ type: START_KREIRANJE_KORISNIKA })}> Kreiraj korisnika </Button>
          {state.selectedKorisnik &&
            <Button bsStyle="primary" onClick={() => dispatch({ type: START_AZURIRANJE_KORISNIKA })}> Ažuriraj korisnika </Button>}
          {state.selectedKorisnik && 
            <Button bsStyle="primary" onClick={() => dispatch({ type: START_BRISANJE_KORISNIKA })}> Obriši korisnika </Button>}
          <Button bsStyle="success" onClick={() => dispatch({ type: REFRESH_DATASET })}> Osveži podatke </Button>
        </div>
        <div>
          <Modal show={state.childState != null} onHide={() => dispatch({ type: CANCEL })}>
            <Modal.Header closeButton>
              <Modal.Title>{getChildTitle(state.activeChild)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {getModalBody(state, dispatch)}
            </Modal.Body>
          </Modal>
          <DataGrid
            idProperty="KorisnikID"
            columns={columns}
            dataSource={data}
            sortInfo={sortInfo}
            selected={selectedKorisnik ? selectedKorisnik.KorisnikID : null}
            onSelectionChange={(id) => dispatch({ type: CHANGE_SELECTION, id })}
            onSortChange={(sort) => dispatch({ type: SORT_CHANGE, sortInfo: sort })}
          />
        </div>
      </div>
    );
  }
}

PregledKorisnika.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};

function getChildTitle(activeChild) {
  switch (activeChild) {
    case CHILD_AZURIRANJE_KORISNIKA: return 'Azuriranje korisnika';
    case CHILD_KREIRANJE_KORISNIKA: return 'Kreiranje korisnika';
    case CHILD_BRISANJE_KORISNIKA: return 'Brisanje korisnika';
    default: return null;
  }
}

function getModalBody(state, dispatch) {
  switch (state.activeChild) {
    case CHILD_KREIRANJE_KORISNIKA:
      return <KreiranjeKorisnika.view state={state.childState} dispatch={forwardTo(dispatch, CHILDACTION)} />;
    case CHILD_BRISANJE_KORISNIKA:
      return <BrisanjeKorisnika.view state={state.childState} dispatch={forwardTo(dispatch, CHILDACTION)} />;
    case CHILD_AZURIRANJE_KORISNIKA:
      return <AzuriranjeKorisnika.view state={state.childState} dispatch={forwardTo(dispatch, CHILDACTION)} />;
    default:
      return null;
  }
}
