import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronCircleRight, faChevronCircleLeft, faHeart, faCartArrowDown, faCartPlus, faCartShopping, faPlusCircle, faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/Navbar.jsx'

library.add(faChevronCircleLeft, faChevronCircleRight, faHeart, faCartArrowDown, faCartPlus, faCartShopping, faPlusCircle, faMinusCircle, faTimesCircle);

const queryClient = new QueryClient();

export const invalidateQuery = (query) =>{
  queryClient.invalidateQueries(query)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <Navbar />
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>,
)
