import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persitedReducer = persistReducer(
    {
      key: '@PetSOS',
      storage: storageSession,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persitedReducer;
};
