import '../styles/globals.css'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {setupStore} from '../store/user'

const store = setupStore()

let persistor = persistStore(store)

function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
