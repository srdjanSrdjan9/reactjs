import { connect } from 'react-redux';

import ModuleTester from './View';
import { default as reducer } from './reducer';

ModuleTester.reducer = reducer;

export { default as reducer } from './reducer';

export default connect(state => {
  return {
    state
  };
})(ModuleTester);
