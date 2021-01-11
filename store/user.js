import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialUserState = {
  uid: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    login: (state, uid) => {
      return {...state, uid: uid.payload, isLogin: true}
    },
    logout: () => {
      return initialUserState
    },
    setUser: (state, {payload}) => {
      return {...state, user: payload}
    },
  },
})

export const {actions, reducer} = userSlice
export const {login, logout, setUser} = actions

export const setupStore = () => {
  const middlewares = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'user/setUser',
        ],
      },
    }),
  ]

  // only development
  // if (process.env.NODE_ENV === 'development') {
  //   middlewares.push(logger)
  // }

  const persistConfig = {
    key: 'user',
    version: 1,
    storage,
  }

  const store = configureStore({
    reducer: persistReducer(persistConfig, userSlice.reducer),
    middleware: middlewares,
    devTools: true,
  })

  return store
}
