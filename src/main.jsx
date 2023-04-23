import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import BaereProvider from './context/BaereProvider'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <BaereProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BaereProvider>
</BrowserRouter>,
)
