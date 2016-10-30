import reducer, { init } from './components/home/reducer';

export default function* root(state, ...rest) {
  if (typeof state === 'undefined') return yield* init();
  return yield* reducer(state, ...rest);
}
