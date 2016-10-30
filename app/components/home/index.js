
import { connect } from 'react-redux';

import Home from './view';
import { default as reducer } from './reducer';

Home.reducer = reducer;

export { default as reducer } from './reducer';

export default connect(state => {
  return {
    state
  };
})(Home);

// AKO DODJE DO PROMENA

// import view from './view';
// import reducer, { init } from './reducer';
// import { tState as model } from './model';
// import * as selectors from './selectors';

// export default {
//   view,
//   reducer,
//   init,
//   model,
//   selectors
// };
