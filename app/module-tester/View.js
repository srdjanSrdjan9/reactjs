import React, { Component, PropTypes } from 'react';
import DataGrid from '@minedeljkovic/react-datagrid';
import '@minedeljkovic/react-datagrid/index.css';
import t from 'tcomb-form';
const Form = t.form.Form;
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Panel from 'react-bootstrap/lib/Panel';
import 'react-json-inspector/json-inspector.css';
import Inspector from 'react-json-inspector';

import {
  CHANGE_MODULE_FORM,
  START_MODULE_TEST,
  TEST_MODULE_CHILD_ACTION,
  DISPATCH_MODULE_ACTION,
  CHANGE_ACTION_FORM
} from './actions';
import { ModuleFormState, ActionFormState } from './types';
import { extractedModules } from './util';

const selectorsColumns = [{
  name: 'name'
}, {
  name: 'value',
  render: (value, row) => {
    const jsonPreviewPopover = (
      <OverlayTrigger trigger="click" placement="right" overlay={<Popover id="selector-result" title={<span><strong>{row.name}</strong> selector result:</span>}><Inspector data={value} /></Popover>}>
        <Button>...</Button>
      </OverlayTrigger>
    );
    return (
     <Input type="text" readOnly buttonBefore={jsonPreviewPopover} value={JSON.stringify(value)} />
    );
  }
}];

export default class ModuleTester extends Component {
  _onActivateClick() {
    const value = this.refs.moduleForm.getValue();
    if (value) {
      this.props.dispatch({ type: START_MODULE_TEST, moduleConfiguration: value });
    }
  }
  _onDispatchClick() {
    const value = this.refs.actionForm.getValue();
    if (value) {
      this.props.dispatch({ type: DISPATCH_MODULE_ACTION, action: value });
    }
  }

  render() {
    const { dispatch, state } = this.props;

    let child = null;
    let selectors = [];
    if (state.activeModule != null) {
      const module = extractedModules[state.activeModule];
      const childComponentType = module.view;
      child = childComponentType != null && React.createElement(childComponentType, {
        state: state.moduleState,
        dispatch: action => dispatch({ type: TEST_MODULE_CHILD_ACTION, action }) });

      selectors = Object.keys(module.selectors).
        filter(key => typeof module.selectors[key] === 'function').
        map(key => ({
          name: key,
          value: module.selectors[key](state.moduleState)
        }));
    }

    return (
      <div>
        <h2>Module tester</h2>
        <Panel collapsible defaultExpanded header="Module configuration">
          <Form
            ref="moduleForm"
            type={ModuleFormState}
            value={state.moduleForm}
            onChange={value => dispatch({ type: CHANGE_MODULE_FORM, value })}
          />
          <button onClick={this._onActivateClick.bind(this)}>Activate</button>
        </Panel>
        <div>
          <Panel collapsible defaultExpanded header="Selectors">
            <DataGrid
              idProperty="name"
              columns={selectorsColumns}
              dataSource={selectors}
            />
          </Panel>
        </div>
        <div>
          <Panel collapsible defaultExpanded header="Dispatch action">
            <Form
              ref="actionForm"
              type={ActionFormState}
              value={state.actionForm}
              onChange={value => dispatch({ type: CHANGE_ACTION_FORM, value })}
            />
            <button onClick={this._onDispatchClick.bind(this)}>Dispatch</button>
          </Panel>
        </div>
        <div style={{ padding: 10 }}>
          {child}
        </div>
      </div>
    );
  }
}

ModuleTester.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func
};
