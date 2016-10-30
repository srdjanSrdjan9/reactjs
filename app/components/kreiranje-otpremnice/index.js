import view from './view';
import reducer, { init } from './reducer';
import { tState as model } from './model';
import * as selectors from './selectors';

export default {
  view,
  reducer,
  init,
  model,
  selectors
};
