import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5000/api/v1/"

import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    {/* <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'}/> */}
  </QueryClientProvider>
)
