import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { router } from './routes'
import { persistor, store } from './store'

export default function App() {
  return (
    <Provider store={store}>
      {/* Hold rendering until persisted state is restored, so the auth guard doesn't redirect a signed-in user */}
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}
