import { combineReducers, configureStore } from '@reduxjs/toolkit'
import useReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createMigrate from 'redux-persist/es/createMigrate';
import productSlice from './product/productSlice';
import orderSlice from './product/orderSlice';


const rootReducer = combineReducers({ user: useReducer, product: productSlice, neworders:orderSlice})

const migrations = {
    0: (state) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          moodColorCategory: {
            colorPalette: 'DEFAULT',
          }
        }
      }
    },
  };

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['product'],
    version:1,
    migrate: createMigrate(migrations, { debug: true }),
}
const mypersistReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: mypersistReducer
})
export const persistor = persistStore(store)