import { createStore } from 'redux';
import rootReducer from './RootReducer.js';

const store = createStore(rootReducer);

export default store;