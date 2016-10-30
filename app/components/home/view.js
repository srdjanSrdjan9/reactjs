import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { forwardTo } from '../../common/redux-extensions';
import { CHANGE_TAB_SELECTION, CHILDACTION } from './actions';

import view from '../kreiranje-korisnika/';
import PregledKorisnika from '../pregled-svih-korisnika/';
import KreiranjeOtpremnice from '../kreiranje-otpremnice/';
import Pretraga from '../pregled-stanja/';
// import { initialState } from '../kreiranje-korisnika/reducer';

export default class Home extends Component {
  render() {
    const { state, dispatch } = this.props;

    return (
      <div>
        <Tabs selectedIndex={state.selectedIndex} onSelect={(id) => dispatch({ type: CHANGE_TAB_SELECTION, id })} >
          <TabList>
            <Tab>KORISNICI</Tab>
            <Tab>DOKUMENTI</Tab>
            <Tab>STATISTIKA</Tab>
          </TabList>
          <TabPanel>
            <h1> Korisnici </h1>
            <PregledKorisnika.view state={state.selectedTabState} dispatch={forwardTo(dispatch, CHILDACTION)} />
          </TabPanel>
          <TabPanel>
            <h1> Dokumenti </h1>
            <KreiranjeOtpremnice.view state={state.selectedTabState} dispatch={forwardTo(dispatch, CHILDACTION)} />
          </TabPanel>
          <TabPanel>
            <h1> Roba </h1>
            <Pretraga.view state={state.selectedTabState} dispatch={forwardTo(dispatch, CHILDACTION)} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

Home.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};
