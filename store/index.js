import createStore from "./createStore";
import { persistStore } from 'redux-persist';
import { createWrapper } from "next-redux-wrapper";
import reducers from "./modules/rootReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga'
import persistReducers from './persistReducers';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  
  const middlewares = [sagaMiddleware]
  // Create store
  const store = createStore(persistReducers(reducers), middlewares);
  const persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)
  
  // Return store
  return store;
};

// export an assembled wrapper
export const storeWrapper = createWrapper(makeStore, { debug: false });

